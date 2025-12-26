import { useEffect, useState } from "react";
import WebHeader from "../components/common/webHeader";
import TaskProgress from "../components/internal/pillars/spiritual/taskProgress";
import SpiritualTracker from "../components/internal/pillars/spiritual/spiritualTracker";
import "./spiritual.css"; // Import CSS
import { useDispatch, useSelector } from "react-redux";
import { getSelectedDate } from "../redux/selectors/dateSelector";
import { getUserId } from "../redux/selectors/userSelector";
import { getNamasmaranData, getNamasmaranLoading, getShlokaData, getShlokaLoading } from "../redux/selectors/dailyTaskSelector";
import { FETCH_DAILY_TASKS_REQUEST } from "../redux/actions/action_keys";
import { NAMASMARAN, PARAYANAS, SHLOKA, SPIRITUAL } from "../constants/constants";
import ShlokaForm from "../components/internal/shloka/shlokaForm";
import { useFetchMonthlyTasksQuery } from "../redux/api/monthlyTaskApiSlice";

const Spiritual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"progress" | "tracker">("progress");

  const dispatch = useDispatch();
  const selectedDate = useSelector(getSelectedDate)
  const user_id = useSelector(getUserId)

  const shlokasData = useSelector(getShlokaData);
  const shlokasLoading = useSelector(getShlokaLoading);
  const namasmaranData = useSelector(getNamasmaranData);
  const namasmaranLoading = useSelector(getNamasmaranLoading);

  // Get current month and year from selectedDate
  const currentDate = new Date(selectedDate);
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11, so add 1
  const currentYear = currentDate.getFullYear();

  // Fetch monthly parayana tasks
  const { 
    data: parayanaData, 
    isLoading: parayanaLoading, 
    error: parayanaError 
  } = useFetchMonthlyTasksQuery({
    month: currentMonth,
    year: currentYear,
    type: PARAYANAS,
    pillar: SPIRITUAL
  }, {
    // Skip the query if user_id is not available
    skip: !user_id
  });

  // ✅ Dispatch Redux actions once on mount
  useEffect(() => {
    dispatch({ type: FETCH_DAILY_TASKS_REQUEST, payload: { user_id: user_id, date: selectedDate, type: NAMASMARAN } });
    dispatch({ type: FETCH_DAILY_TASKS_REQUEST, payload: { user_id: user_id, date: selectedDate, type: SHLOKA } });
  }, [dispatch, selectedDate, user_id]);

  // Handle parayana error
  if (parayanaError) {
    console.error("Error fetching parayana tasks:", parayanaError);
  }

  const sections = [
    // daily task shloka
    {
      label: "Nitya Upasana",
      isLoading: shlokasLoading,
      tasks: shlokasData,
      pillar: SPIRITUAL,
      type: SHLOKA,
      FormComponent: ShlokaForm,
      taskType: "daily"
    },
    // daily task namasmaran
    {
      label: "Namasmaran",
      isLoading: namasmaranLoading,
      tasks: namasmaranData,
      pillar: SPIRITUAL,
      type: NAMASMARAN,
      FormComponent: ShlokaForm,
      taskType: "daily"
    },
    // monthly task parayanas
    {
      label: "Parayanas",
      isLoading: parayanaLoading,
      tasks: parayanaData?.data || [], // Extract data from API response
      pillar: SPIRITUAL,
      type: PARAYANAS,
      FormComponent: ShlokaForm,
      taskType: "monthly"
    }
  ];
  
  return (
    <div className="spiritual-container spiritual-theme">
      <WebHeader title="Spiritual" />
      
      {/* Toggle Views */}
      <div className="spiritual-content">
        {activeTab === "progress" ? <TaskProgress sections={sections} /> : <SpiritualTracker pillar="spiritual" />}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-navigation">
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
      </div>
    </div>
  );
};

export default Spiritual;
