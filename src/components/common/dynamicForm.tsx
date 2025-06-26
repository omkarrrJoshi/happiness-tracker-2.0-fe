import { useState, useEffect } from "react";
import "./dynamicForm.css";
import Loader from "./loader";

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
  onSubmit: (formData: Record<string, any>) => Promise<void>;
  onClose: () => void;
  enableDailyTarget?: boolean;
  enableImageUpload?: boolean;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  title,
  fields,
  initialData = {},
  onSubmit,
  onClose,
  enableDailyTarget = false,
  enableImageUpload = false,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: initialData[field.name] || "" }), {})
  );
  
  const [isDailyTarget, setIsDailyTarget] = useState(Array.isArray(initialData.target));
  const [dailyTargets, setDailyTargets] = useState<(number | "")[]>(
    Array.isArray(initialData.target) ? initialData.target : Array(7).fill(initialData.target || 1)
  );
  
  const [imagePreview, setImagePreview] = useState<string | null>(initialData.image_url || null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);


  useEffect(() => {
    if (Array.isArray(initialData.target)) {
      setDailyTargets(initialData.target);
      setIsDailyTarget(true);
    } else {
      setDailyTargets(Array(7).fill(initialData.target || 1));
      setIsDailyTarget(false);
    }
  }, [initialData.target]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDailyTargetChange = (index: number, value: string) => {
    const newTargets = [...dailyTargets];
    newTargets[index] = value === "" ? "" : Number(value) || 1;
    setDailyTargets(newTargets);
  };

  const handleSingleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number(e.target.value) || 1;
    setDailyTargets(Array(7).fill(value));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = initialData.image_url || "";
    
    if (selectedImage) {
      setIsUploading(true); 
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("upload_preset", "daily_task_unsigned_images"); // Change this to your Cloudinary preset
      
      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/daiqdj7oo/image/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        imageUrl = data.secure_url;
      } catch (error) {
        console.error("Image upload failed", error);
      } finally {
        setIsUploading(false); // Hide loader once upload completes
      }
    }
    
    const finalTargets = dailyTargets.map(target => (target === "" ? 1 : target));
    const finalData = {
      ...formData,
      target: isDailyTarget ? finalTargets : Array(7).fill(finalTargets[0]),
      image_url: imageUrl,
    };
    
    try {
      await onSubmit(finalData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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

          {enableImageUpload && (
            <div className="form-group">
              <label>Upload Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
              {isUploading && <Loader />}
            </div>
          )}

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
