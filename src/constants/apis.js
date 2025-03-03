const API_HOST = "https://happiness-tracker-2-0.onrender.com";
const API_VERSION = process.env.REACT_APP_API_VERSION;

//API TYPE
export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const DELETE = "DELETE";

//APIs
export const FETCH_DAILY_TASKS = `${API_HOST}/${API_VERSION}/daily-task`
export const CREATE_DAILY_TASK = `${API_HOST}/${API_VERSION}/daily-task`
export const UPDATE_DAILY_TASK_PROGRESS = `${API_HOST}/${API_VERSION}/daily-task/progress/:id`

