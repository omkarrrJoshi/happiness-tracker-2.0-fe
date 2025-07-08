import { useEffect, useState } from "react";
import WebHeader from "../components/common/webHeader";
import TaskProgress from "../components/internal/pillars/spiritual/taskProgress";
import "./spiritual.css"; // Import CSS
import { useDispatch, useSelector } from "react-redux";
import { getSelectedDate } from "../redux/selectors/dateSelector";
import { getUserId } from "../redux/selectors/userSelector";
import { FETCH_DAILY_TASKS_REQUEST } from "../redux/actions/action_keys";
import { BRAIN_PRACTICES, INSIGHT_READING, INTELLECTUAL, LIFE_MASTERY } from "../constants/constants";
import ShlokaForm from "../components/internal/shloka/shlokaForm";
import { getBrainPracticesData, getBrainPracticesLoading, getInsightReadingData, getInsightReadingLoading, getLifeMasteryData, getLifeMasteryLoading } from "../redux/selectors/dailyTaskSelector";

const Mental: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(getSelectedDate)
  const user_id = useSelector(getUserId)

  const insightReadingData = useSelector(getInsightReadingData);
  const insightReadingLoading = useSelector(getInsightReadingLoading);

  const brainPracticesData = useSelector(getBrainPracticesData);
  const brainPracticesLoading = useSelector(getBrainPracticesLoading);

  const lifeMasteryData = useSelector(getLifeMasteryData);
  const lifeMasteryLoading = useSelector(getLifeMasteryLoading);

  // ✅ Dispatch Redux actions once on mount
  useEffect(() => {
    dispatch({ type: FETCH_DAILY_TASKS_REQUEST, payload: { user_id: user_id, date: selectedDate, type: INSIGHT_READING } });
    dispatch({ type: FETCH_DAILY_TASKS_REQUEST, payload: { user_id: user_id, date: selectedDate, type: BRAIN_PRACTICES } });
    dispatch({ type: FETCH_DAILY_TASKS_REQUEST, payload: { user_id: user_id, date: selectedDate, type: LIFE_MASTERY } });
  }, [dispatch, selectedDate, user_id]);

  const sections = [
    {
      label: "Insight Reading",
      isLoading: insightReadingLoading,
      tasks: insightReadingData,
      pillar: INTELLECTUAL,
      type: INSIGHT_READING,
      FormComponent: ShlokaForm,
      taskType: "daily"
    },
    {
      label: "Brain Practices",
      isLoading: brainPracticesLoading,
      tasks: brainPracticesData,
      pillar: INTELLECTUAL,
      type: BRAIN_PRACTICES,
      FormComponent: ShlokaForm,
      taskType: "daily"
    },
    {
      label: "Life Mastery",
      isLoading: lifeMasteryLoading,
      tasks: lifeMasteryData,
      pillar: INTELLECTUAL,
      type: LIFE_MASTERY,
      FormComponent: ShlokaForm,
      taskType: "daily"
    }
  ];
  
  return (
    <div className="spiritual-container intellectual-theme">
      <WebHeader title="Intellectual" />
      
      {/* Toggle Views */}
      <div className="spiritual-content">
        <TaskProgress sections={sections} />
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
