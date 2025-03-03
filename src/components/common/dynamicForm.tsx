import { useState } from "react";
import "./dynamicForm.css";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "number" | "url" | "textarea" | "date";
  placeholder?: string;
  required?: boolean;
}

interface DynamicFormProps {
  title: string;
  fields: FormField[];
  initialData?: Record<string, any>;
  onSubmit: (formData: Record<string, any>) => void;
  onClose: () => void;
  enableDailyTarget?: boolean; // ✅ New prop to enable daily target feature
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  title,
  fields,
  initialData = {},
  onSubmit,
  onClose,
  enableDailyTarget = false, // Default is false
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: initialData[field.name] || "" }), {})
  );

  const [isDailyTarget, setIsDailyTarget] = useState(false); // ✅ Toggle between single & daily targets
  const [dailyTargets, setDailyTargets] = useState<(number | "")[]>(Array(7).fill(1)); // ✅ Default to 1 for all days

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDailyTargetChange = (index: number, value: string) => {
    const newTargets = [...dailyTargets];
    newTargets[index] = value === "" ? "" : Number(value) || 1; // ✅ Allows empty input, prevents NaN
    setDailyTargets(newTargets);
  };

  const handleSingleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number(e.target.value) || 1; // ✅ Allow empty input
    setDailyTargets(Array(7).fill(value));
  };
  
  // Ensure empty fields are converted to 1 when submitting
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTargets = dailyTargets.map(target => (target === "" ? 1 : target)); // ✅ Convert empty to 1 only on submit
    const finalData = {
      ...formData,
      target: isDailyTarget ? finalTargets : Array(7).fill(finalTargets[0]),
    };
    onSubmit(finalData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h3>{title}</h3>
        <form onSubmit={handleSubmit}>
          {fields.map(({ name, label, type, placeholder, required }) => (
            <div className="form-group" key={name}>
              <label htmlFor={name} className={required ? "required" : "optional"}>{label}</label>
              <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                required={required}
                onChange={handleChange}
                value={formData[name]}
              />
            </div>
          ))}

          {/* ✅ Optional Daily Target Feature */}
          {enableDailyTarget && (
            <div className="form-group">
              <label className="required">Target</label>

              <button type="button" className="toggle-btn" onClick={() => setIsDailyTarget(!isDailyTarget)}>
                {isDailyTarget ? "Switch to Single Target" : "Switch to Daily Target"}
              </button>
              <p className="target-description">
                {isDailyTarget 
                  ? "Set a different target for each day (Sunday to Saturday)." 
                  : "Set a single target that applies to all days."}
              </p>
              {isDailyTarget ? (
                <div className="daily-target-container">
                  {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, index) => (
                    <div key={day} className="daily-target">
                      <label>{day}</label>
                      <input
                        type="number"
                        min="1"
                        value={dailyTargets[index]}
                        onChange={(e) => handleDailyTargetChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <input
                  type="number"
                  min="1"
                  value={dailyTargets[0]}
                  onChange={handleSingleTargetChange}
                />
              )}
            </div>
          )}

          <button type="submit" className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default DynamicForm;
