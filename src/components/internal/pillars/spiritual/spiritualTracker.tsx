import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSelectedDate, getMonthEnd, getMonthStart, getWeekEnd, getWeekStart } from "../../../../redux/selectors/dateSelector";
import { FETCH_DAILY_TASK_TRACKER_REQUEST } from "../../../../redux/actions/action_keys";
import { getUserId } from "../../../../redux/selectors/userSelector";
import { getNamasmaranTrackerData, getShlokaTrackerData } from "../../../../redux/selectors/dailyTaskTrackerSelector";
import PieChartTracker from "../../../common/tracker/pieChartTracker";
import "./spiritualTracker.css";
import { SHLOKA, NAMASMARAN } from "../../../../constants/constants";
import { DailyTask, DailyTaskTracker } from "../../../../types/models/dailyTask";
import { getNamasmaranData, getShlokaData } from "../../../../redux/selectors/dailyTaskSelector";

interface TrackerPageProps {
  pillar: string;
}

const SpiritualTracker: React.FC<TrackerPageProps> = ({ pillar }) => {
  const DEFAULT_CLASS_NAME = `tracker-${pillar}`;
  const user_id = useSelector(getUserId);
  const dispatch = useDispatch();

  // Date selectors
  const currentDate = useSelector(getSelectedDate);
  const weekStart = useSelector(getWeekStart);
  const weekEnd = useSelector(getWeekEnd);
  const monthStart = useSelector(getMonthStart);
  const monthEnd = useSelector(getMonthEnd);
  const shlokaList = useSelector(getShlokaData)
  const namasmaranList = useSelector(getNamasmaranData)

  const [trackerType, setTrackerType] = useState<"daily" | "weekly" | "monthly" | "custom">("daily");
  const [selectedType, setSelectedType] = useState<string>(SHLOKA); // 🔹 Default to Shloka
  const [selectedDailyTaskRefId, setSelectedDailyTaskRefId] = useState<string>("all");  // Default to all
  const [startDate, setStartDate] = useState(weekStart);
  const [endDate, setEndDate] = useState(weekEnd);
  const [isDatePickerDisabled, setIsDatePickerDisabled] = useState(true);

  const dailyTaskList: DailyTask[] = selectedType === SHLOKA ? shlokaList : namasmaranList;
  
  useEffect(() => {
    if(trackerType === "daily") {
      setStartDate(currentDate);
      setEndDate(currentDate);
      setIsDatePickerDisabled(true);
    } else if (trackerType === "weekly") {
      setStartDate(weekStart);
      setEndDate(weekEnd);
      setIsDatePickerDisabled(true);
    } else if (trackerType === "monthly") {
      setStartDate(monthStart);
      setEndDate(monthEnd);
      setIsDatePickerDisabled(true);
    } else {
      setIsDatePickerDisabled(false);
    }
  }, [trackerType, currentDate, weekStart, weekEnd, monthStart, monthEnd]);

  useEffect(() => {
    dispatch({
      type: FETCH_DAILY_TASK_TRACKER_REQUEST,
      payload: {
        user_id,
        start_date: startDate,
        end_date: endDate,
        type: selectedType, // ✅ Fetch data for selected type
        ref_id: selectedDailyTaskRefId
      },
    });
  }, [startDate, endDate, selectedType, selectedDailyTaskRefId, dispatch, user_id]);

  const shlokaTrackerData = useSelector(getShlokaTrackerData);
  const namasmaranTrackerData = useSelector(getNamasmaranTrackerData);
  
  const trackerData: DailyTaskTracker = selectedType === SHLOKA ? shlokaTrackerData : namasmaranTrackerData;
  const progressData = [
    { name: "Completed", value: trackerData.total_progress },
    { name: "Remaining", value: trackerData.total_target - trackerData.total_progress },
  ];

  const COLORS = ["#4CAF50", "#E6A23C"]; // Green (Completed) | Orange (Remaining)

  return (
    <div className={`${DEFAULT_CLASS_NAME}-container`}>
      <h2 className={`${DEFAULT_CLASS_NAME}-title`}>Spiritual Progress Tracker</h2>

      {/* 🔹 Tracker Type Selection */}
      <div className={`${DEFAULT_CLASS_NAME}-options`}>
        <label>
          <input
            type="radio"
            value="daily"
            checked={trackerType === "daily"}
            onChange={() => setTrackerType("daily")}
          />
          Daily
        </label>
        <label>
          <input
            type="radio"
            value="weekly"
            checked={trackerType === "weekly"}
            onChange={() => setTrackerType("weekly")}
          />
          Weekly
        </label>
        <label>
          <input
            type="radio"
            value="monthly"
            checked={trackerType === "monthly"}
            onChange={() => setTrackerType("monthly")}
          />
          Monthly
        </label>
        <label>
          <input
            type="radio"
            value="custom"
            checked={trackerType === "custom"}
            onChange={() => setTrackerType("custom")}
          />
          Custom
        </label>
      </div>

      <div className={`${DEFAULT_CLASS_NAME}-selector`}> 
        {/* 🔹 Type Selector (Shloka/Namasmaran) */}
        <div className={`${DEFAULT_CLASS_NAME}-type-selector`}>
          <label>Type:</label>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value={SHLOKA}>Shloka</option>
            <option value={NAMASMARAN}>Namasmaran</option>
          </select>
        </div>

        <div className={`${DEFAULT_CLASS_NAME}-daily-task-selector`}>
          <label>{selectedType}:</label>
          <select value={selectedDailyTaskRefId} onChange={(e) => setSelectedDailyTaskRefId(e.target.value)}>
            <option value="all">All</option>
            {
              dailyTaskList.map((dailyTask) => {
                return (
                  <option value={dailyTask.daily_task_ref_id}>{dailyTask.name}</option>
                )
              })
            }
          </select>
        </div>
      </div>

      {/* 🔹 Date Pickers */}
      <div className={`${DEFAULT_CLASS_NAME}-date-picker`}>
        <label>Start Date</label>
        <input type="date" value={startDate} disabled={isDatePickerDisabled} onChange={(e) => setStartDate(e.target.value)} />

        <label>End Date</label>
        <input type="date" value={endDate} disabled={isDatePickerDisabled} onChange={(e) => setEndDate(e.target.value)} />
      </div>

      <PieChartTracker colors={COLORS} data={progressData} title={selectedType} />
    </div>
  );
};

export default SpiritualTracker;
