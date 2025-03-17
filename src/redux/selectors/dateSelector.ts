import { AppState, DateState } from "../../types/stateTypes";

export const getDateReducer = (state: AppState): DateState => {
  return state.date;
}

export const getSelectedDate = (state: AppState): string => {
  return getDateReducer(state).selectedDate;
}

export const getCurrentDate = (state: AppState): string => {
  return getDateReducer(state).currentDate;
}

export const getWeekStart = (state: AppState): string => {
  return getDateReducer(state).weekStart;
}

export const getWeekEnd = (state: AppState): string => {
  return getDateReducer(state).weekEnd;
}

export const getMonthStart = (state: AppState): string => {
  return getDateReducer(state).monthStart;
}

export const getMonthEnd = (state: AppState): string => {
  return getDateReducer(state).monthEnd;
}
