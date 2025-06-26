import dailyTaskReducer from "./slices/dailyTaskSlice";
import dateReducer from "./slices/dateSlice"
import authReducer from "./slices/authSlice"
import dailyTasksTrackerReducer from "./slices/dailyTaskTrackerSlice"

export const reducers = {
  dailyTask: dailyTaskReducer,
  date: dateReducer,
  auth: authReducer,
  dailyTasksTracker: dailyTasksTrackerReducer,
};
export default reducers;
