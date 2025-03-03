import { CREATE_DAILY_TASK, FETCH_DAILY_TASKS, GET, POST, PUT, UPDATE_DAILY_TASK_PROGRESS } from "../../constants/apis";
import ApiResponse from "../../types/apiResponse";
import { CreateDailyTaskPayload, UpdateDailyTaskProgressRequest } from "../../types/models/dailyTask";
import { apiClient } from "../../utils/utils";


export const fetchDailyTask = async (userId:string, date: string, type: "shloka" | "namasmaran"): Promise<ApiResponse> => {
  const queryParams = new Map<string, string>();
  queryParams.set("date", date);
  queryParams.set("type", type);
  return apiClient(userId, FETCH_DAILY_TASKS, GET, undefined, queryParams)
};

export const createDailyTask = async (userId: string, body: CreateDailyTaskPayload): Promise<ApiResponse> => {
  return apiClient(userId, CREATE_DAILY_TASK, POST, body)
};

export const updateDailyTaskProgress = async (userId: string, request: UpdateDailyTaskProgressRequest): Promise<ApiResponse> => {
  const pathParams = new Map<string, string>();
  pathParams.set("id", request.id)
  return apiClient(userId, UPDATE_DAILY_TASK_PROGRESS, PUT, request.body, undefined, pathParams)
};