import { useParams } from "react-router-dom";
import WebHeader from "../components/common/webHeader"
import DailyTaskDetails from "../components/internal/dailyTaskDetails"
import { useSelector } from "react-redux";
import { AppState } from "../types/stateTypes";
import { getDailyTaskByRefId } from "../redux/selectors/dailyTaskSelector";
import { formatDateForDatePicker } from "../utils/utils";

const DailyTaskDetailsHolder: React.FC = () => {
  const { type, task_ref_id } = useParams();
  const dailyTask = useSelector((state: AppState) => getDailyTaskByRefId(state, task_ref_id, type));

  if (!dailyTask) {
    return <div>Task not found, go back and come again</div>;
  }

  return (
    <div>
      <WebHeader title="Happiness Tracker" />
      <DailyTaskDetails 
      task_ref_id={dailyTask.daily_task_ref_id}
        image_url={dailyTask.image_url}
        name={dailyTask.name}
        description={dailyTask.description}
        daily_target={dailyTask.daily_target}
        daily_progress={dailyTask.daily_progress}
        link={dailyTask.link}
        start_date={formatDateForDatePicker(dailyTask.start_date)}
        end_date={formatDateForDatePicker(dailyTask.end_date)}
        target={dailyTask.target}
        type={dailyTask.type}
      />
    </div>
  )
}

export default DailyTaskDetailsHolder;