package hook

import (
	"context"
	"errors"
	"fmt"
	"reflect"
	"slices"
	"time"

	v1 "github.com/garethgeorge/backrest/gen/go/v1"
	cfg "github.com/garethgeorge/backrest/internal/config"
	"github.com/garethgeorge/backrest/internal/hook/types"
	"github.com/garethgeorge/backrest/internal/orchestrator/tasks"
	"google.golang.org/protobuf/proto"
)

func TasksTriggeredByEvent(config *v1.Config, flowID int64, planID string, repoID string, events []v1.Hook_Condition, vars interface{}) ([]tasks.Task, error) {
	var taskSet []tasks.Task

	repo := cfg.FindRepo(config, repoID)
	if repo == nil {
		return nil, fmt.Errorf("repo %v not found", repoID)
	}
	plan := cfg.FindPlan(config, planID)
	if plan == nil && planID != "" {
		return nil, fmt.Errorf("plan %v not found", planID)
	}

	baseOp := v1.Operation{
		Status:          v1.OperationStatus_STATUS_PENDING,
		InstanceId:      config.Instance,
		PlanId:          planID,
		RepoId:          repoID,
		FlowId:          flowID,
		UnixTimeStartMs: curTimeMs(),
	}

	for idx, hook := range repo.GetHooks() {
		event := firstMatchingCondition(hook, events)
		if event == v1.Hook_CONDITION_UNKNOWN {
			continue
		}

		name := fmt.Sprintf("repo/%v/hook/%v", repo.Id, idx)
		op := proto.Clone(&baseOp).(*v1.Operation)
		op.DisplayMessage = "running " + name
		op.Op = &v1.Operation_OperationRunHook{
			OperationRunHook: &v1.OperationRunHook{
				Name:      name,
				Condition: event,
			},
		}

		taskSet = append(taskSet, newOneoffRunHookTask(name, repoID, planID, flowID, time.Now(), hook, event, vars))
	}

	for idx, hook := range plan.GetHooks() {
		event := firstMatchingCondition(hook, events)
		if event == v1.Hook_CONDITION_UNKNOWN {
			continue
		}

		name := fmt.Sprintf("plan/%v/hook/%v", plan.Id, idx)
		op := proto.Clone(&baseOp).(*v1.Operation)
		op.DisplayMessage = fmt.Sprintf("running %v triggered by %v", name, event.String())
		op.Op = &v1.Operation_OperationRunHook{
			OperationRunHook: &v1.OperationRunHook{
				Name:      name,
				Condition: event,
			},
		}

		taskSet = append(taskSet, newOneoffRunHookTask(name, repoID, planID, flowID, time.Now(), hook, event, vars))
	}

	return taskSet, nil
}

func newOneoffRunHookTask(title, repoID, planID string, flowID int64, at time.Time, hook *v1.Hook, event v1.Hook_Condition, vars interface{}) tasks.Task {
	return &tasks.GenericOneoffTask{
		OneoffTask: tasks.OneoffTask{
			BaseTask: tasks.BaseTask{
				TaskName:   fmt.Sprintf("run hook %v", title),
				TaskRepoID: repoID,
				TaskPlanID: planID,
			},
			FlowID: flowID,
			RunAt:  at,
			ProtoOp: &v1.Operation{
				Op: &v1.Operation_OperationRunHook{},
			},
		},
		Do: func(ctx context.Context, st tasks.ScheduledTask, taskRunner tasks.TaskRunner) error {
			h, err := types.DefaultRegistry().GetHandler(hook)
			if err != nil {
				return err
			}

			v := reflect.ValueOf(&vars).Elem()
			clone := reflect.New(v.Elem().Type()).Elem()
			clone.Set(v.Elem()) // copy vars to clone
			if field := v.Elem().FieldByName("Event"); field.IsValid() {
				clone.FieldByName("Event").Set(reflect.ValueOf(event))
			}

			if err := h.Execute(ctx, hook, clone, taskRunner); err != nil {
				err = applyHookErrorPolicy(hook.OnError, err)
				return err
			}
			return nil
		},
	}
}

func firstMatchingCondition(hook *v1.Hook, events []v1.Hook_Condition) v1.Hook_Condition {
	for _, event := range events {
		if slices.Contains(hook.Conditions, event) {
			return event
		}
	}
	return v1.Hook_CONDITION_UNKNOWN
}

func curTimeMs() int64 {
	return time.Now().UnixNano() / 1000000
}

type Hook v1.Hook

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

// IsHaltingError returns true if the error is a fatal error or a request to cancel the operation
func IsHaltingError(err error) bool {
	var fatalErr *HookErrorFatal
	var cancelErr *HookErrorRequestCancel
	return errors.As(err, &fatalErr) || errors.As(err, &cancelErr)
}
