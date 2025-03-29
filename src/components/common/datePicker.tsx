import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datePicker.css";
import { getSelectedDate } from "../../redux/selectors/dateSelector";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDate } from "../../redux/slices/dateSlice";

const CustomDatePicker: React.FC = () => {
  const selectedDateString = useSelector(getSelectedDate)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);

  const selectedDate = new Date(selectedDateString);
  // Format date as "02-Mar"
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  };

  // Format day as "Sun"
  const formatDay = (date: Date) => {
    return date.toLocaleDateString("en-GB", { weekday: "short" });
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    const formattedDate = date.toISOString().split("T")[0]; // Convert to "YYYY-MM-DD"
    dispatch(setDate({ date: formattedDate })); // ✅ Update Redux state
    setIsOpen(false); // Close calendar
  };

  return (
    <div className="date-picker-container">
      <div className="date-display" onClick={() => setIsOpen(!isOpen)}>
        <span className="date">{formatDate(selectedDate)}</span>
        <span className="day">{formatDay(selectedDate)}</span>
      </div>
      {isOpen && (
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline
          popperPlacement="bottom-end"
          maxDate={new Date()}
        />
      )}
    </div>
  );
};

export default CustomDatePicker;
