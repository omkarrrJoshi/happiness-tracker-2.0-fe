import { useDispatch } from "react-redux";
import DynamicForm, { FormField } from "../../common/dynamicForm";
import { CREATE_DAILY_TASKS_REQUEST } from "../../../redux/actions/action_keys";
import { getSelectedDate } from "../../../redux/selectors/dateSelector";
import { useSelector } from "react-redux";
import { getUserId } from "../../../redux/selectors/userSelector";

interface ShlokaFormProps {
  isOpen: boolean;
  onClose: () => void;
  type: string; // ✅ Accept type as a prop
}

const ShlokaForm: React.FC<ShlokaFormProps> = ({ isOpen, onClose, type }) => {
  const selectedDate = useSelector(getSelectedDate);
  const userId = useSelector(getUserId);
  const dispatch = useDispatch();

  if (!isOpen) return null; // Don't render if modal is closed

  const formTitle = type === "shloka" ? "Add New Shloka" : "Add New Namasmaran"; // ✅ Dynamic title

  const formFields: FormField[] = [
    { name: "name", label: `${type.charAt(0).toUpperCase() + type.slice(1)} Name`, type: "text", placeholder: "Enter name", required: true },
    { name: "link", label: `${type.charAt(0).toUpperCase() + type.slice(1)} Link`, type: "url", placeholder: "Enter link (optional)" },
    { name: "description", label: "Description", type: "textarea", placeholder: "Enter description (optional)" },
    { name: "start_date", label: "Start Date", type: "date", required: true }, // ✅ Added start-date
    { name: "end_date", label: "End Date", type: "date", required: false }, // ✅ Added end-date
  ];

  const handleSubmit = (data: Record<string, any>) => {
    console.log(`${type} Form Submitted:`, data);

    // ✅ Explicitly map form data to `CreateDailyTaskPayload`
    const payloadData = {
      user_id: userId,
      type,
      pillar: "spiritual",
      target: Array.isArray(data.target) ? data.target : Array(7).fill(data.target || 1), // ✅ Ensure target is an array
      name: data.name,
      link: data.link || undefined, // ✅ Optional field
      description: data.description || undefined, // ✅ Optional field
      date: selectedDate,
      start_date: data.start_date,
      end_date: data.end_date || undefined, // ✅ Optional field
    };

    dispatch({ type: CREATE_DAILY_TASKS_REQUEST, payload: payloadData });
    onClose(); // Close modal after submission
  };

  return <DynamicForm title={formTitle} fields={formFields} onSubmit={handleSubmit} onClose={onClose} enableDailyTarget />;
};

export default ShlokaForm;
