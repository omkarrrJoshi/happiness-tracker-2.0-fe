import { useEffect, useState } from "react";
import WebHeader from "../components/common/webHeader";
import TaskProgress from "../components/internal/pillars/spiritual/taskProgress";
import SpiritualTracker from "../components/internal/pillars/spiritual/spiritualTracker";
import "./spiritual.css"; // Import CSS
import { useDispatch, useSelector } from "react-redux";
import { getSelectedDate } from "../redux/selectors/dateSelector";
import { getUserId } from "../redux/selectors/userSelector";
import { FETCH_DAILY_TASKS_REQUEST } from "../redux/actions/action_keys";
import { ACTIVITY, MENTAL } from "../constants/constants";
import ShlokaForm from "../components/internal/shloka/shlokaForm";
import { getActivityData, getActivityLoading } from "../redux/selectors/dailyTaskSelector";

const Mental: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"progress" | "tracker">("progress");

  const dispatch = useDispatch();
  const selectedDate = useSelector(getSelectedDate)
  const user_id = useSelector(getUserId)

  const activitiesData = useSelector(getActivityData);
  const activitiesLoading = useSelector(getActivityLoading);

  // ✅ Dispatch Redux actions once on mount
  useEffect(() => {
    dispatch({ type: FETCH_DAILY_TASKS_REQUEST, payload: { user_id: user_id, date: selectedDate, type: ACTIVITY } });
  }, [dispatch, selectedDate, user_id]);

  const sections = [
    {
      label: "Activities",
      isLoading: activitiesLoading,
      tasks: activitiesData,
      pillar: MENTAL,
      type: ACTIVITY,
      FormComponent: ShlokaForm
    }
  ];
  
  return (
    <div className="spiritual-container">
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
