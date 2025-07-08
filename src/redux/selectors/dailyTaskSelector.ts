import { ACTIVITY, INSIGHT_READING, BRAIN_PRACTICES, NAMASMARAN, SHLOKA, LIFE_MASTERY, BOOK, PRANAYAMA } from "../../constants/constants";
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

export const getActivityData = (state: AppState): DailyTask[] => {
  return getDailyTaskReducer(state).activity.data;
}

export const getActivityLoading = (state: AppState): boolean => {
  return getDailyTaskReducer(state).activity.loading;
}

export const getActivityError = (state: AppState): string | null => {
  return getDailyTaskReducer(state).activity.errors;
}

export const getActivityMessage = (state: AppState): string | null => {
  return getDailyTaskReducer(state).activity.message;
}

export const getPranayamaData = (state: AppState): DailyTask[] => {
  return getDailyTaskReducer(state).pranayama.data;
}

export const getPranayamaLoading = (state: AppState): boolean => {
  return getDailyTaskReducer(state).pranayama.loading;
}

export const getPranayamaError = (state: AppState): string | null => {
  return getDailyTaskReducer(state).pranayama.errors;
}

export const getPranayamaMessage = (state: AppState): string | null => {
  return getDailyTaskReducer(state).pranayama.message;
}


export const getBookData = (state: AppState): DailyTask[] => {
  return getDailyTaskReducer(state).book.data;
}

export const getBookLoading = (state: AppState): boolean => {
  return getDailyTaskReducer(state).book.loading;
}

export const getBookError = (state: AppState): string | null => {
  return getDailyTaskReducer(state).book.errors;
}

export const getBookMessage = (state: AppState): string | null => {
  return getDailyTaskReducer(state).book.message;
}

export const getInsightReadingData = (state: AppState): DailyTask[] => {
  return getDailyTaskReducer(state).insight_reading.data;
}

export const getInsightReadingLoading = (state: AppState): boolean => {
  return getDailyTaskReducer(state).insight_reading.loading;
}

export const getInsightReadingError = (state: AppState): string | null => {
  return getDailyTaskReducer(state).insight_reading.errors;
}

export const getInsightReadingMessage = (state: AppState): string | null => {
  return getDailyTaskReducer(state).insight_reading.message;
}

export const getBrainPracticesData = (state: AppState): DailyTask[] => {
  return getDailyTaskReducer(state).brain_practices.data;
}

export const getBrainPracticesLoading = (state: AppState): boolean => {
  return getDailyTaskReducer(state).brain_practices.loading;
}

export const getBrainPracticesError = (state: AppState): string | null => {
  return getDailyTaskReducer(state).brain_practices.errors;
}

export const getBrainPracticesMessage = (state: AppState): string | null => {
  return getDailyTaskReducer(state).brain_practices.message;
}

export const getLifeMasteryData = (state: AppState): DailyTask[] => {
  return getDailyTaskReducer(state).life_mastery.data;
}

export const getLifeMasteryLoading = (state: AppState): boolean => {
  return getDailyTaskReducer(state).life_mastery.loading;
}

export const getLifeMasteryError = (state: AppState): string | null => {
  return getDailyTaskReducer(state).life_mastery.errors;
}


export const getDailyTaskByRefId = (state: AppState, id: string | undefined, type: string | undefined): DailyTask | undefined => {
  if(type === SHLOKA){
    return getShlokaData(state).find(task => task.daily_task_ref_id === id);
  }
  else if(type === NAMASMARAN){
    return getNamasmaranData(state).find(task => task.daily_task_ref_id === id);
  }
  else if(type === ACTIVITY){
    return getActivityData(state).find(task => task.daily_task_ref_id === id);
  }
  else if(type === BOOK){
    return getBookData(state).find(task => task.daily_task_ref_id === id);
  }
  else if(type === PRANAYAMA){
    return getPranayamaData(state).find(task => task.daily_task_ref_id === id);
  }
  else if(type === INSIGHT_READING){
    return getInsightReadingData(state).find(task => task.daily_task_ref_id === id);
  }
  else if(type === BRAIN_PRACTICES){
    return getBrainPracticesData(state).find(task => task.daily_task_ref_id === id);
  }
  else if(type === LIFE_MASTERY){
    return getLifeMasteryData(state).find(task => task.daily_task_ref_id === id);
  }
  return undefined;
}