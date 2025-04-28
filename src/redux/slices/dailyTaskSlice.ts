import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DailyTaskState } from "../../types/stateTypes";
import { DailyTask } from "../../types/models/dailyTask";
import { showImageNotification } from "../../utils/notification";
import { DailyTaskType } from "../../constants/types";


const initialState: DailyTaskState = {
  shloka: { data: [], loading: false, errors: null, message: null },
  namasmaran: { data: [], loading: false, errors: null, message: null },
  activity: { data: [], loading: false, errors: null, message: null }
};

const dailyTaskSlice = createSlice({
  name: "dailyTask",
  initialState,
  reducers: {
    fetchDailyTaskRequest: (state, action: PayloadAction<{ type: DailyTaskType }>) => {
      state[action.payload.type].loading = true;
      state[action.payload.type].errors = null;
      state[action.payload.type].message = null;
    },
    fetchDailyTaskSuccess: (
      state,
      action: PayloadAction<{ type: DailyTaskType; data: DailyTask[]; message: string }>
    ) => {
      state[action.payload.type].loading = false;
      state[action.payload.type].data = action.payload.data;
      state[action.payload.type].message = action.payload.message;
    },
    fetchDailyTaskFailure: (
      state,
      action: PayloadAction<{ type: DailyTaskType; errors: any; message: string }>
    ) => {
      state[action.payload.type].loading = false;
      state[action.payload.type].errors = action.payload.errors;
      state[action.payload.type].message = action.payload.message;
    },
    //create
    createDailyTaskRequest: (state, action: PayloadAction<{ type: DailyTaskType }>) => {
      state[action.payload.type].loading = true;
      state[action.payload.type].errors = null;
      state[action.payload.type].message = null;
    },
    createDailyTaskSuccess: (
      state,
      action: PayloadAction<{ type: DailyTaskType; data: DailyTask; message: string }>
    ) => {
      state[action.payload.type].loading = false;
      state[action.payload.type].data.push(action.payload.data);
      state[action.payload.type].message = action.payload.message;
    },
    createDailyTaskFailure: (
      state,
      action: PayloadAction<{ type: DailyTaskType; errors: any; message: string }>
    ) => {
      state[action.payload.type].loading = false;
      state[action.payload.type].errors = action.payload.errors;
      state[action.payload.type].message = action.payload.message;
    },
    //update progress
    updateDailyTaskProgressRequest: (state, action: PayloadAction<{ type: DailyTaskType }>) => {
      state[action.payload.type].loading = true;
      state[action.payload.type].errors = null;
      state[action.payload.type].message = null;
    },
    updateDailyTaskProgressSuccess: (
      state,
      action: PayloadAction<{ type: DailyTaskType; data: DailyTask; message: string }>
    ) => {
      state[action.payload.type].loading = false;

      const data = action.payload.data;
      const { daily_progress, daily_target, daily_task_ref_id } = data;

      const taskList = state[action.payload.type]?.data || [];

      const matchedTask = taskList.find(
        task => task.daily_task_ref_id === daily_task_ref_id
      );

      if(matchedTask && daily_progress >= daily_target && daily_progress > matchedTask?.daily_progress){
        const imageUrl = matchedTask?.image_url;

        showImageNotification(
          `You have successfully acheived today's target for ${matchedTask?.name}`,
          imageUrl || "",
          matchedTask?.name || "Task Image"
        );
      }

      // ✅ Directly update the matched task
      if (matchedTask) {
        matchedTask.daily_progress = daily_progress;
        matchedTask.daily_target = daily_target;
      }

      state[action.payload.type].message = action.payload.message;
    },
    updateDailyTaskProgressFailure: (
      state,
      action: PayloadAction<{ type: DailyTaskType; errors: any; message: string }>
    ) => {
      state[action.payload.type].loading = false;
      state[action.payload.type].errors = action.payload.errors;
      state[action.payload.type].message = action.payload.message;
    },

    //update ref
    updateDailyTaskRefRequest: (state, action: PayloadAction<{ type: DailyTaskType }>) => {
      state[action.payload.type].loading = true;
      state[action.payload.type].errors = null;
      state[action.payload.type].message = null;
    },
    updateDailyTaskRefSuccess: (
      state,
      action: PayloadAction<{ type: DailyTaskType; data: DailyTask; message: string }>
    ) => {
      state[action.payload.type].loading = false;
      const data = action.payload.data
      const name = data.name;
      const target = data.target;
      const link = data.link;
      const description = data.description;
      const start_date = data.start_date;
      const end_date = data.end_date;
      const image_url = data.image_url;

      const  daily_task_ref_id = data.id
      const typeList = state[action.payload.type].data.map(task =>
        task.daily_task_ref_id === daily_task_ref_id
          ? { ...task, name, target, link, description, start_date, end_date, image_url} // ✅ Update the matched entry
          : task
      );

      state[action.payload.type].data = typeList;

      state[action.payload.type].message = action.payload.message;
    },
    updateDailyTaskRefFailure: (
      state,
      action: PayloadAction<{ type: DailyTaskType; errors: any; message: string }>
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
  updateDailyTaskProgressFailure,
  updateDailyTaskRefRequest,
  updateDailyTaskRefSuccess,
  updateDailyTaskRefFailure
} =
  dailyTaskSlice.actions;

export default dailyTaskSlice.reducer;
