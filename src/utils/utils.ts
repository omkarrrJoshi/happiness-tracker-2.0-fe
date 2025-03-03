import ApiResponse from "../types/apiResponse";

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
  userId: string,
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: any,
  queryParams?: Map<string, string>,
  pathParams?: Map<string, string>,
): Promise<ApiResponse> => {
  // Construct the final URL
  const url = constructUrl(endpoint, queryParams, pathParams);
  console.log("userId", userId)
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
