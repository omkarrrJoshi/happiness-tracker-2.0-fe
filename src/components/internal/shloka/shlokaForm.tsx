import { useDispatch } from "react-redux";
import DynamicForm, { FormField } from "../../common/dynamicForm";
import { CREATE_DAILY_TASKS_REQUEST, UPDATE_DAILY_TASK_REF_REQUEST } from "../../../redux/actions/action_keys";
import { getSelectedDate } from "../../../redux/selectors/dateSelector";
import { useSelector } from "react-redux";
import { getUserId } from "../../../redux/selectors/userSelector";
import { useCreateMonthlyTaskMutation } from "../../../redux/api/monthlyTaskApiSlice";
import { showNotification } from "../../../utils/notification";


interface ShlokaFormProps {
  isOpen: boolean;
  onClose: () => void;
  type: string; // ✅ Accept type as a prop
  initialData?: Record<string, any>; // ✅ Optional initialData for update
  pillar: string;
  taskType: string; // ✅ Add taskType prop
}

const ShlokaForm: React.FC<ShlokaFormProps> = ({ isOpen, onClose, type, initialData, pillar, taskType }) => {
  const selectedDate = useSelector(getSelectedDate);
  const userId = useSelector(getUserId);
  const dispatch = useDispatch();

  // RTK Query mutation for monthly tasks
  const [createMonthlyTask, { isLoading: isCreatingMonthlyTask }] = useCreateMonthlyTaskMutation();

  if (!isOpen) return null; // Don't render if modal is closed

  const isUpdateMode = Boolean(initialData); // ✅ Check if it's an update operation
  const formTitle = isUpdateMode ? `Update ${type.charAt(0).toUpperCase() + type.slice(1)}` : `Add New ${type.charAt(0).toUpperCase() + type.slice(1)}`;

  // Define form fields based on task type
  const getFormFields = (): FormField[] => {
    const baseFields: FormField[] = [
      { name: "name", label: `${type.charAt(0).toUpperCase() + type.slice(1)} Name`, type: "text", placeholder: "Enter name", required: true },
      { name: "link", label: `${type.charAt(0).toUpperCase() + type.slice(1)} Link`, type: "url", placeholder: "Enter link (optional)" },
      { name: "description", label: "Description", type: "textarea", placeholder: "Enter description (optional)" },
    ];

    if (taskType === "daily") {
      return [
        ...baseFields,
        { name: "start_date", label: "Start Date", type: "date", required: true },
        { name: "end_date", label: "End Date", type: "date", required: false },
      ];
    } else {
      // Monthly task fields
      return [
        ...baseFields,
        { name: "monthly_target", label: "Monthly Target", type: "number", placeholder: "Enter target", required: true },
        { name: "start_month", label: "Start Month (1-12)", type: "number", placeholder: "1-12", required: true },
        { name: "start_year", label: "Start Year", type: "number", placeholder: "example: 2024", required: true },
        { name: "end_month", label: "End Month (1-12)", type: "number", placeholder: "1-12 (optional)", required: false },
        { name: "end_year", label: "End Year", type: "number", placeholder: "example: 2024 (optional)", required: false },
      ];
    }
  };

  const formFields = getFormFields();

  const handleSubmit = async (data: Record<string, any>) => {
    console.log("data", data);
    console.log("taskType", taskType);
    if (taskType === "daily") {
      // Daily task payload
      const payloadData = {
        user_id: userId,
        type,
        pillar: pillar,
        target: Array.isArray(data.target) ? data.target : Array(7).fill(data.target || 1), // ✅ Ensure target is an array
        name: data.name.trim(),
        link: data.link || undefined,
        description: data.description || undefined,
        date: selectedDate,
        start_date: data.start_date,
        end_date: data.end_date || undefined,
        image_url: data.image_url || undefined,
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
          image_url: data.image_url || undefined,
        }
      };

      if (isUpdateMode) {
        dispatch({ type: UPDATE_DAILY_TASK_REF_REQUEST, payload: { ...updatePayloadData, id: initialData?.id } }); // ✅ Update existing task
      } else {
        dispatch({ type: CREATE_DAILY_TASKS_REQUEST, payload: payloadData }); // ✅ Create new task
      }
    } else {
      // Monthly task payload
      const payloadData = {
        user_id: userId,
        type,
        pillar: pillar,
        target: data.monthly_target,  // Single target value for monthly tasks
        name: data.name.trim(),
        link: data.link || undefined,
        description: data.description || undefined,
        start_month: data.start_month,
        start_year: data.start_year,
        end_month: data.end_month || undefined,
        end_year: data.end_year || undefined,
      };

      try {
        if (isUpdateMode) {
          // TODO: Add monthly task update mutation when implemented
          console.log("Monthly task update payload:", payloadData);
        } else {
          await createMonthlyTask(payloadData).unwrap();
        }
        onClose(); // Close modal after successful submission
      } catch (error: any) {
        let errorMessage = "Error creating monthly task";
        if (error?.data?.message) {
          errorMessage = error.data.message;
        }
        showNotification(errorMessage, 'error');
        // Do NOT call onClose() here, so the modal stays open
        // Optionally, return early
        return;
      }
    }
  };

  return (
    <DynamicForm
      title={formTitle}
      fields={formFields}
      initialData={initialData} // ✅ Pre-fill fields if updating
      onSubmit={handleSubmit}
      onClose={onClose}
      enableDailyTarget={taskType === "daily"} // Only enable daily target for daily tasks
      enableImageUpload
    />
  );
};

export default ShlokaForm;
