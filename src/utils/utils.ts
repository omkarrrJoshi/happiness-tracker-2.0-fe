import { MONTHLY_TASK_TYPES } from "../constants/constants";
import ApiResponse from "../types/apiResponse";
import { userService } from "../types/models/user";

export function constructUrl(
  baseUrl: string,
  queryParams?: Map<string, string>,
  pathParams?: Map<string, string>
): string {
  let finalUrl = baseUrl;

  // 🔹 Replace path params if provided
  if (pathParams) {
    pathParams.forEach((value, key) => {
      finalUrl = finalUrl.replace(`:${key}`, encodeURIComponent(value));
    });
  }

  // 🔹 Construct query params if provided
  if (queryParams && queryParams.size > 0) {
    const queryString = Array.from(queryParams.entries())
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");

    finalUrl += `?${queryString}`;
  }

  return finalUrl;
}

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // ✅ Ensure two-digit month
  const day = String(d.getDate()).padStart(2, "0"); // ✅ Ensure two-digit day
  return `${year}-${month}-${day}`;
};

export const apiClient = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: any,
  queryParams?: Map<string, string>,
  pathParams?: Map<string, string>,
): Promise<ApiResponse> => {
  // Construct the final URL
  const url = constructUrl(endpoint, queryParams, pathParams);
  const userId = userService.getUserId()
  if(userId === null){
    return {
      success: false,
      message: "user not set on FE"
    }
  }
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "user-id": userId,
    },
    body: method !== "GET" && body ? JSON.stringify(body) : undefined,
  });

  const result = await response.json();
  if (!response.ok) {
    return {
      success: false,
      statusCode: response.status,
      message: result.message || "API request failed",
      data: null,
      errors: result.errors
    };
  }
  return {
    success: true,
    statusCode: response.status,
    message: result.message || "Success",
    data: result.data,
    errors: null
  };
};


export const formatDateForDatePicker = (dateString: string | null) => {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split("T")[0]; // Extracts YYYY-MM-DD
};

export const isMonthlyTaskType = (type: string) => {
  return MONTHLY_TASK_TYPES.includes(type);
};