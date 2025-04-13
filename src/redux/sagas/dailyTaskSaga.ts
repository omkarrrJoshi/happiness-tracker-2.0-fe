import { call, Effect, put, takeEvery } from "redux-saga/effects";
import { createDailyTask, fetchDailyTask, fetchDailyTaskTracker, updateDailyTaskRef, updateDailyTaskProgress } from "../api/dailyTaskAPI";
import {
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
  updateDailyTaskRefFailure,
} from "../slices/dailyTaskSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { CREATE_DAILY_TASKS_REQUEST, FETCH_DAILY_TASK_TRACKER_REQUEST, FETCH_DAILY_TASKS_REQUEST, UPDATE_DAILY_TASK_PROGREASS_REQUEST, UPDATE_DAILY_TASK_REF_REQUEST } from "../actions/action_keys";
import ApiResponse from "../../types/apiResponse";
import { CreateDailyTaskPayload, FetchDailyTasTrackerRequest, UpdateDailyTaskProgressRequest, UpdateDailyTaskRefRequest } from "../../types/models/dailyTask";
import { showNotification } from "../../utils/notification";
import { fetchDailyTaskTrackerFailure, fetchDailyTaskTrackerRequest, fetchDailyTaskTrackerSuccess } from "../slices/dailyTaskTrackerSlice";

interface FetchDailyTaskPayload {
  user_id: string,
  date: string;
  type: "shloka" | "namasmaran";
}

function* handleFetchDailyTask(action: PayloadAction<FetchDailyTaskPayload>): Generator<Effect, void, any> {  
  try {
    const { date, type, user_id } = action.payload;
    yield put(fetchDailyTaskRequest( {type} ));

    const result: ApiResponse = yield call(fetchDailyTask, user_id, date, type);
    
    if (result.success) {
      yield put(fetchDailyTaskSuccess({ type, data: result.data, message: result.message }));
    } else {
      yield put(fetchDailyTaskFailure({ type, errors: result.errors, message: result.message }));
    }
  } catch (error: any) {
    yield put(fetchDailyTaskFailure({ type: action.payload.type, message: error.message, errors: [error] }));
  }
}

function* handleCreateDailyTask(action: PayloadAction<CreateDailyTaskPayload>): Generator<Effect, void, any> {
  const type = action.payload.type as "shloka" | "namasmaran";  
  const userId = action.payload.user_id; 
  try {
    yield put(createDailyTaskRequest( {type} ));

    const result: ApiResponse = yield call(createDailyTask, userId, action.payload);
    if (result.success) {
      showNotification(result.message, "success")
      yield put(createDailyTaskSuccess({ type, data: result.data, message: result.message }));
    } else {
      showNotification(result.message, "error", 6000)
      yield put(createDailyTaskFailure({ type, errors: result.errors, message: result.message }));
    }
  } catch (error: any) {
    yield put(createDailyTaskFailure({ type: type, message: error.message, errors: [error] }));
  }
}

function* handleUpdateDailyTaskProgress(action: PayloadAction<UpdateDailyTaskProgressRequest>): Generator<Effect, void, any> {
  const type = action.payload.type as "shloka" | "namasmaran"; 
  const user_id = action.payload.user_id;  
  try {
    yield put(updateDailyTaskProgressRequest( {type} ));

    const result: ApiResponse = yield call(updateDailyTaskProgress, user_id, action.payload);
    if (result.success) {
      showNotification(result.message, "success")
      yield put(updateDailyTaskProgressSuccess({ type, data: result.data, message: result.message }));
    } else {
      showNotification(result.message, "error", 6000)
      yield put(updateDailyTaskProgressFailure({ type, errors: result.errors, message: result.message }));
    }
  } catch (error: any) {
    yield put(updateDailyTaskProgressFailure({ type: type, message: error.message, errors: [error] }));
  }
}

function* handleUpdateDailyTaskRef(action: PayloadAction<UpdateDailyTaskRefRequest>): Generator<Effect, void, any> {
  const type = action.payload.type as "shloka" | "namasmaran"; 
  try {
    yield put(updateDailyTaskRefRequest( {type} ));

    const result: ApiResponse = yield call(updateDailyTaskRef, action.payload);
    if (result.success) {
      showNotification(result.message, "success")
      yield put(updateDailyTaskRefSuccess({ type, data: result.data, message: result.message }));
    } else {
      showNotification(result.message, "error", 6000)
      yield put(updateDailyTaskRefFailure({ type, errors: result.errors, message: result.message }));
    }
  } catch (error: any) {
    yield put(updateDailyTaskRefFailure({ type: type, message: error.message, errors: [error] }));
  }
}


function* handleFetchDailyTaskTracker(action: PayloadAction<FetchDailyTasTrackerRequest>): Generator<Effect, void, any> {
  const type = action.payload.type as "shloka" | "namasmaran"; ;
  const user_id = action.payload.user_id; 

  try {
    yield put(fetchDailyTaskTrackerRequest( {type} ));

    const result: ApiResponse = yield call(fetchDailyTaskTracker, user_id, action.payload);
    if (result.success) {
      yield put(fetchDailyTaskTrackerSuccess({ type, data: result.data, message: result.message }));
    } else {
      yield put(fetchDailyTaskTrackerFailure({ type, errors: result.errors, message: result.message }));
    }
  } catch (error: any) {
    yield put(fetchDailyTaskTrackerFailure({ type: type, message: error.message, errors: [error] }));
  }
}

export function* watchDailyTaskSaga() {
  yield takeEvery(FETCH_DAILY_TASKS_REQUEST, handleFetchDailyTask);
  yield takeEvery(CREATE_DAILY_TASKS_REQUEST, handleCreateDailyTask);
  yield takeEvery(UPDATE_DAILY_TASK_PROGREASS_REQUEST, handleUpdateDailyTaskProgress);
  yield takeEvery(UPDATE_DAILY_TASK_REF_REQUEST, handleUpdateDailyTaskRef);
  yield takeEvery(FETCH_DAILY_TASK_TRACKER_REQUEST, handleFetchDailyTaskTracker);
}
