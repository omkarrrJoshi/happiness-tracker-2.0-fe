import { useDispatch } from "react-redux";
import DynamicForm, { FormField } from "../../common/dynamicForm";
import { CREATE_DAILY_TASKS_REQUEST, UPDATE_DAILY_TASK_REF_REQUEST } from "../../../redux/actions/action_keys";
import { getSelectedDate } from "../../../redux/selectors/dateSelector";
import { useSelector } from "react-redux";
import { getUserId } from "../../../redux/selectors/userSelector";


interface ShlokaFormProps {
  isOpen: boolean;
  onClose: () => void;
  type: string; // ✅ Accept type as a prop
  initialData?: Record<string, any>; // ✅ Optional initialData for update
}

const ShlokaForm: React.FC<ShlokaFormProps> = ({ isOpen, onClose, type, initialData }) => {
  const selectedDate = useSelector(getSelectedDate);
  const userId = useSelector(getUserId);
  const dispatch = useDispatch();

  if (!isOpen) return null; // Don't render if modal is closed

  const isUpdateMode = Boolean(initialData); // ✅ Check if it's an update operation
  const formTitle = isUpdateMode ? `Update ${type.charAt(0).toUpperCase() + type.slice(1)}` : `Add New ${type.charAt(0).toUpperCase() + type.slice(1)}`;

  const formFields:  FormField[] = [
    { name: "name", label: `${type.charAt(0).toUpperCase() + type.slice(1)} Name`, type: "text", placeholder: "Enter name", required: true },
    { name: "link", label: `${type.charAt(0).toUpperCase() + type.slice(1)} Link`, type: "url", placeholder: "Enter link (optional)" },
    { name: "description", label: "Description", type: "textarea", placeholder: "Enter description (optional)" },
    { name: "start_date", label: "Start Date", type: "date", required: true },
    { name: "end_date", label: "End Date", type: "date", required: false },
  ];

  const handleSubmit = (data: Record<string, any>) => {
    const payloadData = {
      user_id: userId,
      type,
      pillar: "spiritual",
      target: Array.isArray(data.target) ? data.target : Array(7).fill(data.target || 1), // ✅ Ensure target is an array
      name: data.name,
      link: data.link || undefined,
      description: data.description || undefined,
      date: selectedDate,
      start_date: data.start_date,
      end_date: data.end_date || undefined,
    };

    const updatePayloadData = {
      type,
      body: {
        name: data.name,
        target: Array.isArray(data.target) ? data.target : Array(7).fill(data.target || 1),
        start_date: data.start_date,
        end_date: data.end_date || undefined,
        link: data.link || undefined,
        description: data.description || undefined,
      }
    }
    console.log("initialData?.id:", initialData?.id);
    if (isUpdateMode) {
      dispatch({ type: UPDATE_DAILY_TASK_REF_REQUEST, payload: { ...updatePayloadData, id: initialData?.id } }); // ✅ Update existing task
    } else {
      dispatch({ type: CREATE_DAILY_TASKS_REQUEST, payload: payloadData }); // ✅ Create new task
    }

    onClose(); // Close modal after submission
  };

  return (
    <DynamicForm
      title={formTitle}
      fields={formFields}
      initialData={initialData} // ✅ Pre-fill fields if updating
      onSubmit={handleSubmit}
      onClose={onClose}
      enableDailyTarget
    />
  );
};

export default ShlokaForm;
