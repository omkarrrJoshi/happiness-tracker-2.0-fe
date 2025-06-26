import { useEffect, useState } from "react";
import WebHeader from "../components/common/webHeader";
import TaskProgress from "../components/internal/pillars/spiritual/taskProgress";
import SpiritualTracker from "../components/internal/pillars/spiritual/spiritualTracker";
import "./spiritual.css"; // Import CSS
import { useDispatch, useSelector } from "react-redux";
import { getSelectedDate } from "../redux/selectors/dateSelector";
import { getUserId } from "../redux/selectors/userSelector";
import { FETCH_DAILY_TASKS_REQUEST } from "../redux/actions/action_keys";
import { ACTIVITY, BOOK, MENTAL, MONTHLY_ACTIVITY, PRANAYAMA } from "../constants/constants";
import ShlokaForm from "../components/internal/shloka/shlokaForm";
import { getActivityData, getActivityLoading, getBookData, getBookLoading, getPranayamaData, getPranayamaLoading } from "../redux/selectors/dailyTaskSelector";
import { useFetchMonthlyTasksQuery } from "../redux/api/monthlyTaskApiSlice";

const Mental: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"progress" | "tracker">("progress");

  const dispatch = useDispatch();
  const selectedDate = useSelector(getSelectedDate)
  const user_id = useSelector(getUserId)

  const activitiesData = useSelector(getActivityData);
  const activitiesLoading = useSelector(getActivityLoading);

  const pranayamaData = useSelector(getPranayamaData);
  const pranayamaLoading = useSelector(getPranayamaLoading);

  const booksData = useSelector(getBookData);
  const booksLoading = useSelector(getBookLoading);

  // ✅ Dispatch Redux actions once on mount
  useEffect(() => {
    dispatch({ type: FETCH_DAILY_TASKS_REQUEST, payload: { user_id: user_id, date: selectedDate, type: ACTIVITY } });
    dispatch({ type: FETCH_DAILY_TASKS_REQUEST, payload: { user_id: user_id, date: selectedDate, type: PRANAYAMA } });
    dispatch({ type: FETCH_DAILY_TASKS_REQUEST, payload: { user_id: user_id, date: selectedDate, type: BOOK } });
  }, [dispatch, selectedDate, user_id]);

  // Get current month and year from selectedDate
  const currentDate = new Date(selectedDate);
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11, so add 1
  const currentYear = currentDate.getFullYear();

  const { 
    data: monthlyActivitiesData, 
    isLoading: monthlyActivitiesLoading, 
    error: monthlyActivitiesErrorr 
  } = useFetchMonthlyTasksQuery({
    month: currentMonth,
    year: currentYear,
    type: MONTHLY_ACTIVITY,
    pillar: MENTAL
  }, {
    // Skip the query if user_id is not available
    skip: !user_id
  });

  const sections = [
    {
      label: "Daily Activities",
      isLoading: activitiesLoading,
      tasks: activitiesData,
      pillar: MENTAL,
      type: ACTIVITY,
      FormComponent: ShlokaForm,
      taskType: "daily"
    },
    {
      label: "Monthly Activities",
      isLoading: monthlyActivitiesLoading,
      tasks: monthlyActivitiesData?.data || [],
      pillar: MENTAL,
      type: MONTHLY_ACTIVITY,
      FormComponent: ShlokaForm,
      taskType: "monthly"
    },
    {
      label: "Pranayama",
      isLoading: pranayamaLoading,
      tasks: pranayamaData,
      pillar: MENTAL,
      type: PRANAYAMA,
      FormComponent: ShlokaForm,
      taskType: "daily"
    },
    {
      label: "Book Reading",
      isLoading: booksLoading,
      tasks: booksData,
      pillar: MENTAL,
      type: BOOK,
      FormComponent: ShlokaForm,
      taskType: "daily"
    }
  ];
  
  return (
    <div className="spiritual-container mental-theme">
      <WebHeader title="Mental" />
      
      {/* Toggle Views */}
      <div className="spiritual-content">
        {activeTab === "progress" ? <TaskProgress sections={sections} /> : <SpiritualTracker pillar="mental" />}
      </div>

      {/* Bottom Navigation */}
      {/* <div className="bottom-navigation">
        <button 
          className={activeTab === "progress" ? "active" : ""}
          onClick={() => setActiveTab("progress")}
        >
          Progress
        </button>
        <button 
          className={activeTab === "tracker" ? "active" : ""}
          onClick={() => setActiveTab("tracker")}
        >
          Tracker
        </button>
      </div> */}
    </div>
  );
};

export default Mental;
