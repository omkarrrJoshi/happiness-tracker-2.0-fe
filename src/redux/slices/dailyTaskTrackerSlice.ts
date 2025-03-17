import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DailyTasksTrackerState } from "../../types/stateTypes";
import { DailyTaskTracker } from "../../types/models/dailyTask";

const initialState: DailyTasksTrackerState = {
  shloka: { data: {total_progress: 0, total_target: 0}, loading: false, errors: null, message: null },
  namasmaran: { data: {total_progress: 0, total_target: 0}, loading: false, errors: null, message: null },
}

const dailyTasksTrackerSlice = createSlice({
  name: 'dailyTasksTracker',
  initialState,
  reducers: {
    //fetch
    fetchDailyTaskTrackerRequest: (state, action: PayloadAction<{ type: "shloka" | "namasmaran" }>) => {
      state[action.payload.type].loading = true;
      state[action.payload.type].errors = null;
      state[action.payload.type].message = null;
    },
    fetchDailyTaskTrackerSuccess: (
      state,
      action: PayloadAction<{ type: "shloka" | "namasmaran"; data: DailyTaskTracker; message: string }>
    ) => {
      state[action.payload.type].loading = false;
      state[action.payload.type].data = action.payload.data;
      state[action.payload.type].message = action.payload.message;
    },
    fetchDailyTaskTrackerFailure: (
      state,
      action: PayloadAction<{ type: "shloka" | "namasmaran"; errors: any; message: string }>
    ) => {
      state[action.payload.type].loading = false;
      state[action.payload.type].errors = action.payload.errors;
      state[action.payload.type].message = action.payload.message;
    },
  }
})

export const {
  fetchDailyTaskTrackerRequest,
  fetchDailyTaskTrackerSuccess,
  fetchDailyTaskTrackerFailure
} = dailyTasksTrackerSlice.actions;

export default dailyTasksTrackerSlice.reducer;