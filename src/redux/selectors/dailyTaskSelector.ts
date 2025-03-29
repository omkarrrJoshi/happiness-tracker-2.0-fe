import { NAMASMARAN, SHLOKA } from "../../constants/constants";
import { DailyTask } from "../../types/models/dailyTask";
import { AppState, DailyTaskState } from "../../types/stateTypes";

export const getDailyTaskReducer = (state: AppState): DailyTaskState => {
  return state.dailyTask;
}

export const getShlokaData = (state: AppState): DailyTask[] => {
  return getDailyTaskReducer(state).shloka.data;
}

export const getShlokaLoading = (state: AppState): boolean => {
  return getDailyTaskReducer(state).shloka.loading;
}

export const getShlokaError = (state: AppState): string | null => {
  return getDailyTaskReducer(state).shloka.errors;
}

export const getShlokaMessage = (state: AppState): string | null => {
  return getDailyTaskReducer(state).shloka.message;
}

export const getNamasmaranData = (state: AppState): DailyTask[] => {
  return getDailyTaskReducer(state).namasmaran.data;
}

export const getNamasmaranLoading = (state: AppState): boolean => {
  return getDailyTaskReducer(state).namasmaran.loading;
}

export const getNamasmaranError = (state: AppState): string | null => {
  return getDailyTaskReducer(state).namasmaran.errors;
}

export const getNamasmaranMessage = (state: AppState): string | null => {
  return getDailyTaskReducer(state).namasmaran.message;
}

export const getDailyTaskByRefId = (state: AppState, id: string | undefined, type: string | undefined): DailyTask | undefined => {
  if(type === SHLOKA){
    return getShlokaData(state).find(task => task.daily_task_ref_id === id);
  }
  else if(type === NAMASMARAN){
    return getNamasmaranData(state).find(task => task.daily_task_ref_id === id);
  }
  return undefined;
}