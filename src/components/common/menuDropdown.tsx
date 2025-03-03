import React from "react";
import "./menuDropdown.css";

interface MenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  options: { label: string; action: () => void }[];
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ isOpen, onClose, options }) => {
  if (!isOpen) return null;

  return (
    <div className="menu-dropdown">
      {options.map((option, index) => (
        <button key={index} onClick={() => { option.action(); onClose(); }}>
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default MenuDropdown;
