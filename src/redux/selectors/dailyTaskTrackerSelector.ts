import { DailyTaskTracker } from "../../types/models/dailyTask";
import { AppState, DailyTasksTrackerState } from "../../types/stateTypes";

export const getDailyTaskTrackerReducer = (state: AppState): DailyTasksTrackerState => {
  return state.dailyTasksTracker;
}

export const getShlokaTrackerData = (state: AppState): DailyTaskTracker => {
  return getDailyTaskTrackerReducer(state).shloka.data;
}

export const getShlokaTrackerLoading = (state: AppState): boolean => {
  return getDailyTaskTrackerReducer(state).shloka.loading;
}

export const getShlokaTrackerError = (state: AppState): string | null => {
  return getDailyTaskTrackerReducer(state).shloka.errors;
}

export const getShlokaTrackerMessage = (state: AppState): string | null => {
  return getDailyTaskTrackerReducer(state).shloka.message;
}

export const getNamasmaranTrackerData = (state: AppState): DailyTaskTracker => {
  return getDailyTaskTrackerReducer(state).namasmaran.data || null;
}

export const getNamasmaranTrackerLoading = (state: AppState): boolean => {
  return getDailyTaskTrackerReducer(state).namasmaran.loading;
}

export const getNamasmaranTrackerError = (state: AppState): string | null => {
  return getDailyTaskTrackerReducer(state).namasmaran.errors;
}

export const getNamasmaranTrackerMessage = (state: AppState): string | null => {
  return getDailyTaskTrackerReducer(state).namasmaran.message;
}