import { combineReducers } from "@reduxjs/toolkit";
import dailyTaskReducer from "./slices/dailyTaskSlice";
import dateReducer from "./slices/dateSlice"
import authReducer from "./slices/authSlice"
const rootReducer = combineReducers({
  dailyTask: dailyTaskReducer,
  date: dateReducer,
  auth: authReducer,
});

export default rootReducer;
