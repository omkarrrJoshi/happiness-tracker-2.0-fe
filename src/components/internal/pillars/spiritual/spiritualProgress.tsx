import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { 
  getNamasmaranData, 
  getNamasmaranLoading, 
  getShlokaData, 
  getShlokaLoading 
} from "../../../../redux/selectors/dailyTaskSelector";
import { FETCH_DAILY_TASKS_REQUEST } from "../../../../redux/actions/action_keys";
import TaskSection from "../../../../components/common/taskSection";
import { NAMASMARAN, SHLOKA, SPIRITUAL } from "../../../../constants/constants";
import ShlokaForm from "../../../../components/internal/shloka/shlokaForm";
import { getSelectedDate } from "../../../../redux/selectors/dateSelector";
import { getUserId } from "../../../../redux/selectors/userSelector";

const SpiritualProgress: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(getSelectedDate)
  const user_id = useSelector(getUserId)

  const shlokasData = useSelector(getShlokaData);
  const shlokasLoading = useSelector(getShlokaLoading);
  const namasmaranData = useSelector(getNamasmaranData);
  const namasmaranLoading = useSelector(getNamasmaranLoading);

  // ✅ Dispatch Redux actions once on mount
  useEffect(() => {
    dispatch({ type: FETCH_DAILY_TASKS_REQUEST, payload: { user_id: user_id, date: selectedDate, type: NAMASMARAN } });
    dispatch({ type: FETCH_DAILY_TASKS_REQUEST, payload: { user_id: user_id, date: selectedDate, type: SHLOKA } });
  }, [dispatch, selectedDate, user_id]);

  return (
    <div>
      <TaskSection label="Shlokas" isLoading={shlokasLoading} tasks={shlokasData} pillar={SPIRITUAL} type={SHLOKA} FormComponent={ShlokaForm}/>
      <TaskSection label="Namasmaran" isLoading={namasmaranLoading} tasks={namasmaranData} pillar={SPIRITUAL} type={NAMASMARAN} FormComponent={ShlokaForm} />
    </div>
  );
};

export default SpiritualProgress;
