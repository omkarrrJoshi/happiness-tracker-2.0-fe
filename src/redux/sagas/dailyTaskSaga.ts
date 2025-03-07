import { call, Effect, put, takeEvery } from "redux-saga/effects";
import { createDailyTask, fetchDailyTask, updateDailyTaskProgress } from "../api/dailyTaskAPI";
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
} from "../slices/dailyTaskSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { CREATE_DAILY_TASKS_REQUEST, FETCH_DAILY_TASKS_REQUEST, UPDATE_DAILY_TASK_PROGREASS_REQUEST } from "../actions/action_keys";
import ApiResponse from "../../types/apiResponse";
import { CreateDailyTaskPayload, UpdateDailyTaskProgressRequest } from "../../types/models/dailyTask";

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
      yield put(createDailyTaskSuccess({ type, data: result.data, message: result.message }));
    } else {
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
      yield put(updateDailyTaskProgressSuccess({ type, data: result.data, message: result.message }));
    } else {
      yield put(updateDailyTaskProgressFailure({ type, errors: result.errors, message: result.message }));
    }
  } catch (error: any) {
    yield put(updateDailyTaskProgressFailure({ type: type, message: error.message, errors: [error] }));
  }
}

export function* watchDailyTaskSaga() {
  yield takeEvery(FETCH_DAILY_TASKS_REQUEST, handleFetchDailyTask);
  yield takeEvery(CREATE_DAILY_TASKS_REQUEST, handleCreateDailyTask);
  yield takeEvery(UPDATE_DAILY_TASK_PROGREASS_REQUEST, handleUpdateDailyTaskProgress);
}
