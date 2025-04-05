import { CREATE_DAILY_TASK, FETCH_DAILY_TASKS, FETCH_DAILY_TASKTRACKER, GET, POST, PUT, UPDATE_DAILY_TASK_PROGRESS, UPDATE_DAILY_TASK_REF } from "../../constants/apis";
import ApiResponse from "../../types/apiResponse";
import { CreateDailyTaskPayload, FetchDailyTasTrackerRequest, UpdateDailyTaskProgressRequest, UpdateDailyTaskRefRequest } from "../../types/models/dailyTask";
import { apiClient } from "../../utils/utils";


export const fetchDailyTask = async (userId:string, date: string, type: "shloka" | "namasmaran"): Promise<ApiResponse> => {
  const queryParams = new Map<string, string>();
  queryParams.set("date", date);
  queryParams.set("type", type);
  return apiClient(FETCH_DAILY_TASKS, GET, undefined, queryParams)
};

export const createDailyTask = async (userId: string, body: CreateDailyTaskPayload): Promise<ApiResponse> => {
  return apiClient(CREATE_DAILY_TASK, POST, body)
};

export const updateDailyTaskProgress = async (userId: string, request: UpdateDailyTaskProgressRequest): Promise<ApiResponse> => {
  const pathParams = new Map<string, string>();
  pathParams.set("id", request.id)
  return apiClient(UPDATE_DAILY_TASK_PROGRESS, PUT, request.body, undefined, pathParams)
};

export const updateDailyTaskRef = async (request: UpdateDailyTaskRefRequest): Promise<ApiResponse> => {
  const pathParams = new Map<string, string>();
  pathParams.set("id", request.id)
  return apiClient(UPDATE_DAILY_TASK_REF, PUT, request.body, undefined, pathParams)
}

export const fetchDailyTaskTracker = async (userId: string, request: FetchDailyTasTrackerRequest): Promise<ApiResponse> => {
  const queryParams = new Map<string, string>();
  queryParams.set("type", request.type)
  queryParams.set("start_date", request.start_date)
  queryParams.set("end_date", request.end_date)
  queryParams.set("ref_id",request.ref_id)
  return apiClient(FETCH_DAILY_TASKTRACKER, GET, undefined, queryParams)
};