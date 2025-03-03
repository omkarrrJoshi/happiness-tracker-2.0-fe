import { AppState, DateState } from "../../types/stateTypes";

export const getDateReducer = (state: AppState): DateState => {
  return state.date;
}

export const getSelectedDate = (state: AppState): string => {
  return getDateReducer(state).selectedDate
}

export const getCurrentDate = (state: AppState): string => {
  return getDateReducer(state).currentDate
}