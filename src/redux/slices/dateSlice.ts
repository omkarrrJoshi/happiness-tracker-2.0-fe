import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateState } from "../../types/stateTypes";

// Utility function to normalize date (only `YYYY-MM-DD`)
const normalizeDate = (date: Date) => {
  return date.toISOString().split("T")[0]; // Returns "YYYY-MM-DD"
};

const initialState: DateState = {
  selectedDate: normalizeDate(new Date()), // Store as string
  currentDate: normalizeDate(new Date()),  // Store as string
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<{ date: string }>) {
      state.selectedDate = action.payload.date; // ✅ Store as string
    },
    resetDate(state) {
      state.selectedDate = state.currentDate; // ✅ Use string format
    }
  }
});

export const { setDate, resetDate } = dateSlice.actions;
export default dateSlice.reducer;
