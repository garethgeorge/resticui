// @generated by protoc-gen-es v2.2.2 with parameter "target=ts"
// @generated from file v1/operations.proto (package v1, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { BackupProgressEntry, BackupProgressError, RepoStats, ResticSnapshot, RestoreProgressEntry } from "./restic_pb";
import { file_v1_restic } from "./restic_pb";
import type { Hook_Condition, RetentionPolicy } from "./config_pb";
import { file_v1_config } from "./config_pb";
import type { Empty, Int64List } from "../types/value_pb";
import { file_types_value } from "../types/value_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file v1/operations.proto.
 */
export const file_v1_operations: GenFile = /*@__PURE__*/
  fileDesc("ChN2MS9vcGVyYXRpb25zLnByb3RvEgJ2MSIyCg1PcGVyYXRpb25MaXN0EiEKCm9wZXJhdGlvbnMYASADKAsyDS52MS5PcGVyYXRpb24i8wUKCU9wZXJhdGlvbhIKCgJpZBgBIAEoAxINCgVtb2RubxgMIAEoAxIPCgdmbG93X2lkGAogASgDEhQKDHBhcnRpdGlvbl9pZBgNIAEoCRIPCgdyZXBvX2lkGAIgASgJEg8KB3BsYW5faWQYAyABKAkSEwoLaW5zdGFuY2VfaWQYCyABKAkSEwoLc25hcHNob3RfaWQYCCABKAkSIwoGc3RhdHVzGAQgASgOMhMudjEuT3BlcmF0aW9uU3RhdHVzEhoKEnVuaXhfdGltZV9zdGFydF9tcxgFIAEoAxIYChB1bml4X3RpbWVfZW5kX21zGAYgASgDEhcKD2Rpc3BsYXlfbWVzc2FnZRgHIAEoCRIOCgZsb2dyZWYYCSABKAkSLwoQb3BlcmF0aW9uX2JhY2t1cBhkIAEoCzITLnYxLk9wZXJhdGlvbkJhY2t1cEgAEj4KGG9wZXJhdGlvbl9pbmRleF9zbmFwc2hvdBhlIAEoCzIaLnYxLk9wZXJhdGlvbkluZGV4U25hcHNob3RIABIvChBvcGVyYXRpb25fZm9yZ2V0GGYgASgLMhMudjEuT3BlcmF0aW9uRm9yZ2V0SAASLQoPb3BlcmF0aW9uX3BydW5lGGcgASgLMhIudjEuT3BlcmF0aW9uUHJ1bmVIABIxChFvcGVyYXRpb25fcmVzdG9yZRhoIAEoCzIULnYxLk9wZXJhdGlvblJlc3RvcmVIABItCg9vcGVyYXRpb25fc3RhdHMYaSABKAsyEi52MS5PcGVyYXRpb25TdGF0c0gAEjIKEm9wZXJhdGlvbl9ydW5faG9vaxhqIAEoCzIULnYxLk9wZXJhdGlvblJ1bkhvb2tIABItCg9vcGVyYXRpb25fY2hlY2sYayABKAsyEi52MS5PcGVyYXRpb25DaGVja0gAEjgKFW9wZXJhdGlvbl9ydW5fY29tbWFuZBhsIAEoCzIXLnYxLk9wZXJhdGlvblJ1bkNvbW1hbmRIAEIECgJvcCLPAQoOT3BlcmF0aW9uRXZlbnQSIgoKa2VlcF9hbGl2ZRgBIAEoCzIMLnR5cGVzLkVtcHR5SAASLwoSY3JlYXRlZF9vcGVyYXRpb25zGAIgASgLMhEudjEuT3BlcmF0aW9uTGlzdEgAEi8KEnVwZGF0ZWRfb3BlcmF0aW9ucxgDIAEoCzIRLnYxLk9wZXJhdGlvbkxpc3RIABIuChJkZWxldGVkX29wZXJhdGlvbnMYBCABKAsyEC50eXBlcy5JbnQ2NExpc3RIAEIHCgVldmVudCJoCg9PcGVyYXRpb25CYWNrdXASLAoLbGFzdF9zdGF0dXMYAyABKAsyFy52MS5CYWNrdXBQcm9ncmVzc0VudHJ5EicKBmVycm9ycxgEIAMoCzIXLnYxLkJhY2t1cFByb2dyZXNzRXJyb3IiTgoWT3BlcmF0aW9uSW5kZXhTbmFwc2hvdBIkCghzbmFwc2hvdBgCIAEoCzISLnYxLlJlc3RpY1NuYXBzaG90Eg4KBmZvcmdvdBgDIAEoCCJaCg9PcGVyYXRpb25Gb3JnZXQSIgoGZm9yZ2V0GAEgAygLMhIudjEuUmVzdGljU25hcHNob3QSIwoGcG9saWN5GAIgASgLMhMudjEuUmV0ZW50aW9uUG9saWN5IjsKDk9wZXJhdGlvblBydW5lEhIKBm91dHB1dBgBIAEoCUICGAESFQoNb3V0cHV0X2xvZ3JlZhgCIAEoCSI7Cg5PcGVyYXRpb25DaGVjaxISCgZvdXRwdXQYASABKAlCAhgBEhUKDW91dHB1dF9sb2dyZWYYAiABKAkiWAoTT3BlcmF0aW9uUnVuQ29tbWFuZBIPCgdjb21tYW5kGAEgASgJEhUKDW91dHB1dF9sb2dyZWYYAiABKAkSGQoRb3V0cHV0X3NpemVfYnl0ZXMYAyABKAMiXwoQT3BlcmF0aW9uUmVzdG9yZRIMCgRwYXRoGAEgASgJEg4KBnRhcmdldBgCIAEoCRItCgtsYXN0X3N0YXR1cxgDIAEoCzIYLnYxLlJlc3RvcmVQcm9ncmVzc0VudHJ5Ii4KDk9wZXJhdGlvblN0YXRzEhwKBXN0YXRzGAEgASgLMg0udjEuUmVwb1N0YXRzInEKEE9wZXJhdGlvblJ1bkhvb2sSEQoJcGFyZW50X29wGAQgASgDEgwKBG5hbWUYASABKAkSFQoNb3V0cHV0X2xvZ3JlZhgCIAEoCRIlCgljb25kaXRpb24YAyABKA4yEi52MS5Ib29rLkNvbmRpdGlvbipgChJPcGVyYXRpb25FdmVudFR5cGUSEQoNRVZFTlRfVU5LTk9XThAAEhEKDUVWRU5UX0NSRUFURUQQARIRCg1FVkVOVF9VUERBVEVEEAISEQoNRVZFTlRfREVMRVRFRBADKsIBCg9PcGVyYXRpb25TdGF0dXMSEgoOU1RBVFVTX1VOS05PV04QABISCg5TVEFUVVNfUEVORElORxABEhUKEVNUQVRVU19JTlBST0dSRVNTEAISEgoOU1RBVFVTX1NVQ0NFU1MQAxISCg5TVEFUVVNfV0FSTklORxAHEhAKDFNUQVRVU19FUlJPUhAEEhsKF1NUQVRVU19TWVNURU1fQ0FOQ0VMTEVEEAUSGQoVU1RBVFVTX1VTRVJfQ0FOQ0VMTEVEEAZCLFoqZ2l0aHViLmNvbS9nYXJldGhnZW9yZ2UvYmFja3Jlc3QvZ2VuL2dvL3YxYgZwcm90bzM", [file_v1_restic, file_v1_config, file_types_value]);

/**
 * @generated from message v1.OperationList
 */
export type OperationList = Message<"v1.OperationList"> & {
  /**
   * @generated from field: repeated v1.Operation operations = 1;
   */
  operations: Operation[];
};

/**
 * Describes the message v1.OperationList.
 * Use `create(OperationListSchema)` to create a new message.
 */
export const OperationListSchema: GenMessage<OperationList> = /*@__PURE__*/
  messageDesc(file_v1_operations, 0);

/**
 * @generated from message v1.Operation
 */
export type Operation = Message<"v1.Operation"> & {
  /**
   * required, primary ID of the operation. ID is sequential based on creation time of the operation.
   *
   * @generated from field: int64 id = 1;
   */
  id: bigint;

  /**
   * modification number of the operation for change detection.
   *
   * @generated from field: int64 modno = 12;
   */
  modno: bigint;

  /**
   * flow id groups operations together, e.g. by an execution of a plan.
   *
   * optional, flow id if associated with a flow
   *
   * @generated from field: int64 flow_id = 10;
   */
  flowId: bigint;

  /**
   * optional, partition id if associated with a partition
   *
   * @generated from field: string partition_id = 13;
   */
  partitionId: string;

  /**
   * @generated from field: string repo_id = 2;
   */
  repoId: string;

  /**
   * @generated from field: string plan_id = 3;
   */
  planId: string;

  /**
   * @generated from field: string instance_id = 11;
   */
  instanceId: string;

  /**
   * optional snapshot id if associated with a snapshot.
   *
   * @generated from field: string snapshot_id = 8;
   */
  snapshotId: string;

  /**
   * @generated from field: v1.OperationStatus status = 4;
   */
  status: OperationStatus;

  /**
   * required, unix time in milliseconds of the operation's creation (ID is derived from this)
   *
   * @generated from field: int64 unix_time_start_ms = 5;
   */
  unixTimeStartMs: bigint;

  /**
   * ptional, unix time in milliseconds of the operation's completion
   *
   * @generated from field: int64 unix_time_end_ms = 6;
   */
  unixTimeEndMs: bigint;

  /**
   * optional, human readable context message, typically an error message.
   *
   * @generated from field: string display_message = 7;
   */
  displayMessage: string;

  /**
   * logref can point to arbitrary logs associated with the operation.
   *
   * @generated from field: string logref = 9;
   */
  logref: string;

  /**
   * @generated from oneof v1.Operation.op
   */
  op: {
    /**
     * @generated from field: v1.OperationBackup operation_backup = 100;
     */
    value: OperationBackup;
    case: "operationBackup";
  } | {
    /**
     * @generated from field: v1.OperationIndexSnapshot operation_index_snapshot = 101;
     */
    value: OperationIndexSnapshot;
    case: "operationIndexSnapshot";
  } | {
    /**
     * @generated from field: v1.OperationForget operation_forget = 102;
     */
    value: OperationForget;
    case: "operationForget";
  } | {
    /**
     * @generated from field: v1.OperationPrune operation_prune = 103;
     */
    value: OperationPrune;
    case: "operationPrune";
  } | {
    /**
     * @generated from field: v1.OperationRestore operation_restore = 104;
     */
    value: OperationRestore;
    case: "operationRestore";
  } | {
    /**
     * @generated from field: v1.OperationStats operation_stats = 105;
     */
    value: OperationStats;
    case: "operationStats";
  } | {
    /**
     * @generated from field: v1.OperationRunHook operation_run_hook = 106;
     */
    value: OperationRunHook;
    case: "operationRunHook";
  } | {
    /**
     * @generated from field: v1.OperationCheck operation_check = 107;
     */
    value: OperationCheck;
    case: "operationCheck";
  } | {
    /**
     * @generated from field: v1.OperationRunCommand operation_run_command = 108;
     */
    value: OperationRunCommand;
    case: "operationRunCommand";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message v1.Operation.
 * Use `create(OperationSchema)` to create a new message.
 */
export const OperationSchema: GenMessage<Operation> = /*@__PURE__*/
  messageDesc(file_v1_operations, 1);

/**
 * OperationEvent is used in the wireformat to stream operation changes to clients
 *
 * @generated from message v1.OperationEvent
 */
export type OperationEvent = Message<"v1.OperationEvent"> & {
  /**
   * @generated from oneof v1.OperationEvent.event
   */
  event: {
    /**
     * @generated from field: types.Empty keep_alive = 1;
     */
    value: Empty;
    case: "keepAlive";
  } | {
    /**
     * @generated from field: v1.OperationList created_operations = 2;
     */
    value: OperationList;
    case: "createdOperations";
  } | {
    /**
     * @generated from field: v1.OperationList updated_operations = 3;
     */
    value: OperationList;
    case: "updatedOperations";
  } | {
    /**
     * @generated from field: types.Int64List deleted_operations = 4;
     */
    value: Int64List;
    case: "deletedOperations";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message v1.OperationEvent.
 * Use `create(OperationEventSchema)` to create a new message.
 */
export const OperationEventSchema: GenMessage<OperationEvent> = /*@__PURE__*/
  messageDesc(file_v1_operations, 2);

/**
 * @generated from message v1.OperationBackup
 */
export type OperationBackup = Message<"v1.OperationBackup"> & {
  /**
   * @generated from field: v1.BackupProgressEntry last_status = 3;
   */
  lastStatus?: BackupProgressEntry;

  /**
   * @generated from field: repeated v1.BackupProgressError errors = 4;
   */
  errors: BackupProgressError[];
};

/**
 * Describes the message v1.OperationBackup.
 * Use `create(OperationBackupSchema)` to create a new message.
 */
export const OperationBackupSchema: GenMessage<OperationBackup> = /*@__PURE__*/
  messageDesc(file_v1_operations, 3);

/**
 * OperationIndexSnapshot tracks that a snapshot was detected by backrest. 
 *
 * @generated from message v1.OperationIndexSnapshot
 */
export type OperationIndexSnapshot = Message<"v1.OperationIndexSnapshot"> & {
  /**
   * the snapshot that was indexed.
   *
   * @generated from field: v1.ResticSnapshot snapshot = 2;
   */
  snapshot?: ResticSnapshot;

  /**
   * tracks whether this snapshot is forgotten yet.
   *
   * @generated from field: bool forgot = 3;
   */
  forgot: boolean;
};

/**
 * Describes the message v1.OperationIndexSnapshot.
 * Use `create(OperationIndexSnapshotSchema)` to create a new message.
 */
export const OperationIndexSnapshotSchema: GenMessage<OperationIndexSnapshot> = /*@__PURE__*/
  messageDesc(file_v1_operations, 4);

/**
 * OperationForget tracks a forget operation.
 *
 * @generated from message v1.OperationForget
 */
export type OperationForget = Message<"v1.OperationForget"> & {
  /**
   * @generated from field: repeated v1.ResticSnapshot forget = 1;
   */
  forget: ResticSnapshot[];

  /**
   * @generated from field: v1.RetentionPolicy policy = 2;
   */
  policy?: RetentionPolicy;
};

/**
 * Describes the message v1.OperationForget.
 * Use `create(OperationForgetSchema)` to create a new message.
 */
export const OperationForgetSchema: GenMessage<OperationForget> = /*@__PURE__*/
  messageDesc(file_v1_operations, 5);

/**
 * OperationPrune tracks a prune operation.
 *
 * @generated from message v1.OperationPrune
 */
export type OperationPrune = Message<"v1.OperationPrune"> & {
  /**
   * output of the prune.
   *
   * @generated from field: string output = 1 [deprecated = true];
   * @deprecated
   */
  output: string;

  /**
   * logref of the prune output.
   *
   * @generated from field: string output_logref = 2;
   */
  outputLogref: string;
};

/**
 * Describes the message v1.OperationPrune.
 * Use `create(OperationPruneSchema)` to create a new message.
 */
export const OperationPruneSchema: GenMessage<OperationPrune> = /*@__PURE__*/
  messageDesc(file_v1_operations, 6);

/**
 * OperationCheck tracks a check operation.
 *
 * @generated from message v1.OperationCheck
 */
export type OperationCheck = Message<"v1.OperationCheck"> & {
  /**
   * output of the check operation.
   *
   * @generated from field: string output = 1 [deprecated = true];
   * @deprecated
   */
  output: string;

  /**
   * logref of the check output.
   *
   * @generated from field: string output_logref = 2;
   */
  outputLogref: string;
};

/**
 * Describes the message v1.OperationCheck.
 * Use `create(OperationCheckSchema)` to create a new message.
 */
export const OperationCheckSchema: GenMessage<OperationCheck> = /*@__PURE__*/
  messageDesc(file_v1_operations, 7);

/**
 * OperationRunCommand tracks a long running command. Commands are grouped into a flow ID for each session.
 *
 * @generated from message v1.OperationRunCommand
 */
export type OperationRunCommand = Message<"v1.OperationRunCommand"> & {
  /**
   * @generated from field: string command = 1;
   */
  command: string;

  /**
   * @generated from field: string output_logref = 2;
   */
  outputLogref: string;

  /**
   * not necessarily authoritative, tracked as an optimization to allow clients to avoid fetching very large outputs.
   *
   * @generated from field: int64 output_size_bytes = 3;
   */
  outputSizeBytes: bigint;
};

/**
 * Describes the message v1.OperationRunCommand.
 * Use `create(OperationRunCommandSchema)` to create a new message.
 */
export const OperationRunCommandSchema: GenMessage<OperationRunCommand> = /*@__PURE__*/
  messageDesc(file_v1_operations, 8);

/**
 * OperationRestore tracks a restore operation.
 *
 * @generated from message v1.OperationRestore
 */
export type OperationRestore = Message<"v1.OperationRestore"> & {
  /**
   * path in the snapshot to restore.
   *
   * @generated from field: string path = 1;
   */
  path: string;

  /**
   * location to restore it to.
   *
   * @generated from field: string target = 2;
   */
  target: string;

  /**
   * status of the restore.
   *
   * @generated from field: v1.RestoreProgressEntry last_status = 3;
   */
  lastStatus?: RestoreProgressEntry;
};

/**
 * Describes the message v1.OperationRestore.
 * Use `create(OperationRestoreSchema)` to create a new message.
 */
export const OperationRestoreSchema: GenMessage<OperationRestore> = /*@__PURE__*/
  messageDesc(file_v1_operations, 9);

/**
 * OperationStats tracks a stats operation.
 *
 * @generated from message v1.OperationStats
 */
export type OperationStats = Message<"v1.OperationStats"> & {
  /**
   * @generated from field: v1.RepoStats stats = 1;
   */
  stats?: RepoStats;
};

/**
 * Describes the message v1.OperationStats.
 * Use `create(OperationStatsSchema)` to create a new message.
 */
export const OperationStatsSchema: GenMessage<OperationStats> = /*@__PURE__*/
  messageDesc(file_v1_operations, 10);

/**
 * OperationRunHook tracks a hook that was run.
 *
 * @generated from message v1.OperationRunHook
 */
export type OperationRunHook = Message<"v1.OperationRunHook"> & {
  /**
   * ID of the operation that ran the hook.
   *
   * @generated from field: int64 parent_op = 4;
   */
  parentOp: bigint;

  /**
   * description of the hook that was run. typically repo/hook_idx or plan/hook_idx.
   *
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * logref of the hook's output. DEPRECATED.
   *
   * @generated from field: string output_logref = 2;
   */
  outputLogref: string;

  /**
   * triggering condition of the hook.
   *
   * @generated from field: v1.Hook.Condition condition = 3;
   */
  condition: Hook_Condition;
};

/**
 * Describes the message v1.OperationRunHook.
 * Use `create(OperationRunHookSchema)` to create a new message.
 */
export const OperationRunHookSchema: GenMessage<OperationRunHook> = /*@__PURE__*/
  messageDesc(file_v1_operations, 11);

/**
 * OperationEventType indicates whether the operation was created or updated
 *
 * @generated from enum v1.OperationEventType
 */
export enum OperationEventType {
  /**
   * @generated from enum value: EVENT_UNKNOWN = 0;
   */
  EVENT_UNKNOWN = 0,

  /**
   * @generated from enum value: EVENT_CREATED = 1;
   */
  EVENT_CREATED = 1,

  /**
   * @generated from enum value: EVENT_UPDATED = 2;
   */
  EVENT_UPDATED = 2,

  /**
   * @generated from enum value: EVENT_DELETED = 3;
   */
  EVENT_DELETED = 3,
}

/**
 * Describes the enum v1.OperationEventType.
 */
export const OperationEventTypeSchema: GenEnum<OperationEventType> = /*@__PURE__*/
  enumDesc(file_v1_operations, 0);

/**
 * @generated from enum v1.OperationStatus
 */
export enum OperationStatus {
  /**
   * used to indicate that the status is unknown.
   *
   * @generated from enum value: STATUS_UNKNOWN = 0;
   */
  STATUS_UNKNOWN = 0,

  /**
   * used to indicate that the operation is pending.
   *
   * @generated from enum value: STATUS_PENDING = 1;
   */
  STATUS_PENDING = 1,

  /**
   * used to indicate that the operation is in progress.
   *
   * @generated from enum value: STATUS_INPROGRESS = 2;
   */
  STATUS_INPROGRESS = 2,

  /**
   * used to indicate that the operation completed successfully.
   *
   * @generated from enum value: STATUS_SUCCESS = 3;
   */
  STATUS_SUCCESS = 3,

  /**
   * used to indicate that the operation completed with warnings.
   *
   * @generated from enum value: STATUS_WARNING = 7;
   */
  STATUS_WARNING = 7,

  /**
   * used to indicate that the operation failed.
   *
   * @generated from enum value: STATUS_ERROR = 4;
   */
  STATUS_ERROR = 4,

  /**
   * indicates operation cancelled by the system.
   *
   * @generated from enum value: STATUS_SYSTEM_CANCELLED = 5;
   */
  STATUS_SYSTEM_CANCELLED = 5,

  /**
   * indicates operation cancelled by the user.
   *
   * @generated from enum value: STATUS_USER_CANCELLED = 6;
   */
  STATUS_USER_CANCELLED = 6,
}

/**
 * Describes the enum v1.OperationStatus.
 */
export const OperationStatusSchema: GenEnum<OperationStatus> = /*@__PURE__*/
  enumDesc(file_v1_operations, 1);

