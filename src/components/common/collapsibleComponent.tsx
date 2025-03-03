import { useState } from "react";
import { motion } from "framer-motion";

import "./collapsibleComponent.css";

interface ExpandableComponentProps {
  label: string;
  children: React.ReactNode;
  FormComponent: React.FC<{ isOpen: boolean; onClose: () => void; type: string }>; // Pass any form component
  type: string;
}

const ExpandableComponent: React.FC<ExpandableComponentProps> = ({
  label,
  children,
  FormComponent,
  type
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleCollapse = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent collapsing when clicking +
    setIsFormOpen(true);
  };

  const DEFAULT_CLASS_NAME = "collapsible-component";

  return (
    <div className={DEFAULT_CLASS_NAME}>
      {/* Collapsible Header */}
      <div className={`${DEFAULT_CLASS_NAME}-header`} onClick={toggleCollapse}>
        <span className="col-2">
          <img
            src={isExpanded ? "/svg-icons/collapsible-down-arrow.svg" : "/svg-icons/collapsible-right-arrow.svg"}
            alt="expand"
          />
        </span>
        <span className={`${DEFAULT_CLASS_NAME}-label col-8`}>{label}</span>
        <span className="col-2" onClick={handleAddClick}>
          <img src="/svg-icons/add-circle.svg" alt={`add ${label}`} />
        </span>
      </div>

      {/* Expanded Content */}
      <motion.div
        className={`${DEFAULT_CLASS_NAME}-content`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? "auto" : 0 }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isExpanded && <div className="collapsible-inner-content">{children}</div>}
      </motion.div>

      {/* Render Form if Open */}
      {isFormOpen && <FormComponent isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} type={type} />}
    </div>
  );
};

export default ExpandableComponent;
