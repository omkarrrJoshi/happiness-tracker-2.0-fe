import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DailyTaskState } from "../../types/stateTypes";
import { DailyTask } from "../../types/models/dailyTask";


const initialState: DailyTaskState = {
  shloka: { data: [], loading: false, errors: null, message: null },
  namasmaran: { data: [], loading: false, errors: null, message: null },
};

const dailyTaskSlice = createSlice({
  name: "dailyTask",
  initialState,
  reducers: {
    fetchDailyTaskRequest: (state, action: PayloadAction<{ type: "shloka" | "namasmaran" }>) => {
      state[action.payload.type].loading = true;
      state[action.payload.type].errors = null;
      state[action.payload.type].message = null;
    },
    fetchDailyTaskSuccess: (
      state,
      action: PayloadAction<{ type: "shloka" | "namasmaran"; data: DailyTask[]; message: string }>
    ) => {
      state[action.payload.type].loading = false;
      state[action.payload.type].data = action.payload.data;
      state[action.payload.type].message = action.payload.message;
    },
    fetchDailyTaskFailure: (
      state,
      action: PayloadAction<{ type: "shloka" | "namasmaran"; errors: any; message: string }>
    ) => {
      state[action.payload.type].loading = false;
      state[action.payload.type].errors = action.payload.errors;
      state[action.payload.type].message = action.payload.message;
    },
    //create
    createDailyTaskRequest: (state, action: PayloadAction<{ type: "shloka" | "namasmaran" }>) => {
      state[action.payload.type].loading = true;
      state[action.payload.type].errors = null;
      state[action.payload.type].message = null;
    },
    createDailyTaskSuccess: (
      state,
      action: PayloadAction<{ type: "shloka" | "namasmaran"; data: DailyTask; message: string }>
    ) => {
      state[action.payload.type].loading = false;
      state[action.payload.type].data.push(action.payload.data);
      state[action.payload.type].message = action.payload.message;
    },
    createDailyTaskFailure: (
      state,
      action: PayloadAction<{ type: "shloka" | "namasmaran"; errors: any; message: string }>
    ) => {
      state[action.payload.type].loading = false;
      state[action.payload.type].errors = action.payload.errors;
      state[action.payload.type].message = action.payload.message;
    },
    //update progress
  updateDailyTaskProgressRequest: (state, action: PayloadAction<{ type: "shloka" | "namasmaran" }>) => {
    state[action.payload.type].loading = true;
    state[action.payload.type].errors = null;
    state[action.payload.type].message = null;
  },
  updateDailyTaskProgressSuccess: (
    state,
    action: PayloadAction<{ type: "shloka" | "namasmaran"; data: DailyTask; message: string }>
  ) => {
    state[action.payload.type].loading = false;
    const data = action.payload.data
    const daily_progress = data.daily_progress;
    const daily_target = data.daily_target;
    const daily_task_ref_id = data.daily_task_ref_id

    const typeList = state[action.payload.type].data.map(task =>
      task.daily_task_ref_id === daily_task_ref_id
        ? { ...task, daily_progress, daily_target } // ✅ Update the matched entry
        : task
    );

    state[action.payload.type].data = typeList;

    state[action.payload.type].message = action.payload.message;
  },
  updateDailyTaskProgressFailure: (
    state,
    action: PayloadAction<{ type: "shloka" | "namasmaran"; errors: any; message: string }>
  ) => {
    state[action.payload.type].loading = false;
    state[action.payload.type].errors = action.payload.errors;
    state[action.payload.type].message = action.payload.message;
  },
  },
});

export const { 
  fetchDailyTaskRequest, 
  fetchDailyTaskSuccess, 
  fetchDailyTaskFailure, 
  createDailyTaskRequest, 
  createDailyTaskSuccess, 
  createDailyTaskFailure,
  updateDailyTaskProgressRequest,
  updateDailyTaskProgressSuccess,
  updateDailyTaskProgressFailure
} =
  dailyTaskSlice.actions;

export default dailyTaskSlice.reducer;
