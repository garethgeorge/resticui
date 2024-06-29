package hook

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"reflect"
	"slices"
	"time"

	v1 "github.com/garethgeorge/backrest/gen/go/v1"
	"github.com/garethgeorge/backrest/internal/oplog"
	"github.com/garethgeorge/backrest/internal/rotatinglog"
	"go.uber.org/zap"
	"google.golang.org/protobuf/proto"
)

var (
	DefaultTemplate = `{{ .Summary }}`
)

type HookExecutor struct {
	config   *v1.Config
	oplog    *oplog.OpLog
	logStore *rotatinglog.RotatingLog
}

func NewHookExecutor(config *v1.Config, oplog *oplog.OpLog, bigOutputStore *rotatinglog.RotatingLog) *HookExecutor {
	return &HookExecutor{
		config:   config,
		oplog:    oplog,
		logStore: bigOutputStore,
	}
}

// ExecuteHooks schedules tasks for the hooks subscribed to the given event. The vars map is used to substitute variables
// Hooks are pulled both from the provided plan and from the repo config.
func (e *HookExecutor) ExecuteHooks(flowID int64, repo *v1.Repo, plan *v1.Plan, events []v1.Hook_Condition, vars interface{}) error {
	planId := plan.GetId()
	if planId == "" {
		planId = "_system_" // TODO: clean this up when refactoring hook execution
	}

	operationBase := v1.Operation{
		Status:     v1.OperationStatus_STATUS_INPROGRESS,
		PlanId:     planId,
		RepoId:     repo.GetId(),
		InstanceId: e.config.Instance,
		FlowId:     flowID,
	}

	for idx, hook := range repo.GetHooks() {
		h := (*Hook)(hook)
		event := firstMatchingCondition(h, events)
		if event == v1.Hook_CONDITION_UNKNOWN {
			continue
		}

		name := fmt.Sprintf("repo/%v/hook/%v", repo.Id, idx)
		operation := proto.Clone(&operationBase).(*v1.Operation)
		operation.DisplayMessage = "running " + name
		operation.UnixTimeStartMs = curTimeMs()
		operation.Op = &v1.Operation_OperationRunHook{
			OperationRunHook: &v1.OperationRunHook{
				Name:      name,
				Condition: event,
			},
		}
		zap.L().Info("running hook", zap.String("plan", repo.Id), zap.Int64("opId", operation.Id), zap.String("hook", name))
		if err := e.executeHook(operation, h, event, vars); err != nil {
			zap.S().Errorf("error on repo hook %v on condition %v: %v", idx, event.String(), err)
			if isHaltingError(err) {
				return fmt.Errorf("repo hook %v on condition %v: %w", idx, event.String(), err)
			}
		}
	}

	for idx, hook := range plan.GetHooks() {
		h := (*Hook)(hook)
		event := firstMatchingCondition(h, events)
		if event == v1.Hook_CONDITION_UNKNOWN {
			continue
		}

		name := fmt.Sprintf("plan/%v/hook/%v", plan.Id, idx)
		operation := proto.Clone(&operationBase).(*v1.Operation)
		operation.DisplayMessage = "running " + name
		operation.UnixTimeStartMs = curTimeMs()
		operation.Op = &v1.Operation_OperationRunHook{
			OperationRunHook: &v1.OperationRunHook{
				Name:      name,
				Condition: event,
			},
		}

		zap.L().Info("running hook", zap.String("plan", plan.Id), zap.Int64("opId", operation.Id), zap.String("hook", name))
		if err := e.executeHook(operation, h, event, vars); err != nil {
			zap.S().Errorf("error on plan hook %v on condition %v: %v", idx, event.String(), err)
			if isHaltingError(err) {
				return fmt.Errorf("plan hook %v on condition %v: %w", idx, event.String(), err)
			}
		}
	}
	return nil
}

func firstMatchingCondition(hook *Hook, events []v1.Hook_Condition) v1.Hook_Condition {
	for _, event := range events {
		if slices.Contains(hook.Conditions, event) {
			return event
		}
	}
	return v1.Hook_CONDITION_UNKNOWN
}

func (e *HookExecutor) executeHook(op *v1.Operation, hook *Hook, event v1.Hook_Condition, vars interface{}) error {
	if err := e.oplog.Add(op); err != nil {
		zap.S().Errorf("execute hook: add operation: %v", err)
		return errors.New("couldn't create operation")
	}

	output := &bytes.Buffer{}
	fmt.Fprintf(output, "triggering condition: %v\n", event.String())

	var retErr error
	if err := hook.Do(event, vars, io.MultiWriter(output)); err != nil {
		output.Write([]byte(fmt.Sprintf("Error: %v", err)))
		err = applyHookErrorPolicy(hook.OnError, err)
		var cancelErr *HookErrorRequestCancel
		if errors.As(err, &cancelErr) {
			// if it was a cancel then it successfully indicated it's intent to the caller
			// no error should be displayed in the UI.
			op.Status = v1.OperationStatus_STATUS_SUCCESS
		} else {
			op.Status = v1.OperationStatus_STATUS_ERROR
		}
		retErr = err
	} else {
		op.Status = v1.OperationStatus_STATUS_SUCCESS
	}

	outputRef, err := e.logStore.Write(output.Bytes())
	if err != nil {
		retErr = errors.Join(retErr, fmt.Errorf("write logstore: %w", err))
	}
	op.Logref = outputRef

	op.UnixTimeEndMs = curTimeMs()
	if err := e.oplog.Update(op); err != nil {
		retErr = errors.Join(retErr, fmt.Errorf("update oplog: %w", err))
	}
	return retErr
}

func curTimeMs() int64 {
	return time.Now().UnixNano() / 1000000
}

type Hook v1.Hook

func (h *Hook) Do(event v1.Hook_Condition, vars interface{}, output io.Writer) error {
	if !slices.Contains(h.Conditions, event) {
		return nil
	}

	// if vars has a .Event key set it to the event
	// this is a bit of a hack to allow the event to be used in the template
	if eventField := reflect.ValueOf(vars).FieldByName("Event"); eventField.IsValid() {
		eventField.Set(reflect.ValueOf(event))
	}

}

func applyHookErrorPolicy(onError v1.Hook_OnError, err error) error {
	if err == nil || errors.As(err, &HookErrorFatal{}) || errors.As(err, &HookErrorRequestCancel{}) {
		return err
	}

	if onError == v1.Hook_ON_ERROR_CANCEL {
		return &HookErrorRequestCancel{Err: err}
	} else if onError == v1.Hook_ON_ERROR_FATAL {
		return &HookErrorFatal{Err: err}
	}
	return err
}

// isHaltingError returns true if the error is a fatal error or a request to cancel the operation
func isHaltingError(err error) bool {
	var fatalErr *HookErrorFatal
	var cancelErr *HookErrorRequestCancel
	return errors.As(err, &fatalErr) || errors.As(err, &cancelErr)
}
