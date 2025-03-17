import { combineReducers } from "@reduxjs/toolkit";
import dailyTaskReducer from "./slices/dailyTaskSlice";
import dateReducer from "./slices/dateSlice"
import authReducer from "./slices/authSlice"
import dailyTasksTrackerReducer from "./slices/dailyTaskTrackerSlice"

const rootReducer = combineReducers({
  dailyTask: dailyTaskReducer,
  date: dateReducer,
  auth: authReducer,
  dailyTasksTracker: dailyTasksTrackerReducer,
});

export default rootReducer;
