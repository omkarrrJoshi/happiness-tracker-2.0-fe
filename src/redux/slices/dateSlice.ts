import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateState } from "../../types/stateTypes";

// ✅ Utility function to get date as YYYY-MM-DD
const formatDate = (date: Date): string => {
  return date.getFullYear() + 
    "-" + String(date.getMonth() + 1).padStart(2, "0") + 
    "-" + String(date.getDate()).padStart(2, "0");
};

// ✅ Utility to get end of the month
const getEndOfMonth = (date: Date): string => {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); // Last day of the month
  return formatDate(lastDay);
};

// ✅ Utility to get start of the week (Monday)
const getStartOfWeek = (date: Date): string => {
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust so Monday is the first day
  date.setDate(date.getDate() + diff);
  return formatDate(date);
};

// ✅ Utility to get end of the week (Sunday)
const getEndOfWeek = (date: Date): string => {
  const startOfWeek = new Date(getStartOfWeek(date)); // Get Monday
  startOfWeek.setDate(startOfWeek.getDate() + 6); // Move to Sunday
  return formatDate(startOfWeek);
};

// ✅ Get initial state based on system time
const currentDate = new Date();

const initialState: DateState = {
  selectedDate: formatDate(currentDate),
  currentDate: formatDate(currentDate),
  weekStart: getStartOfWeek(new Date(currentDate)), // Monday
  weekEnd: getEndOfWeek(new Date(currentDate)), // Sunday
  monthStart: formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)), // 1st day of month
  monthEnd: getEndOfMonth(new Date(currentDate)), // Last day of month
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<{ date: string }>) {
      state.selectedDate = action.payload.date;
      const selectedDate = new Date(action.payload.date);
      state.weekStart = getStartOfWeek(new Date(selectedDate));
      state.weekEnd = getEndOfWeek(new Date(selectedDate));
      state.monthStart = formatDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
      state.monthEnd = getEndOfMonth(new Date(selectedDate));
    },
    resetDate(state) {
      state.selectedDate = state.currentDate;
      state.weekStart = getStartOfWeek(new Date(state.currentDate));
      state.weekEnd = getEndOfWeek(new Date(state.currentDate));
      state.monthStart = formatDate(new Date(new Date(state.currentDate).getFullYear(), new Date(state.currentDate).getMonth(), 1));
      state.monthEnd = getEndOfMonth(new Date(state.currentDate));
    },
  }
});

export const { setDate, resetDate } = dateSlice.actions;
export default dateSlice.reducer;
