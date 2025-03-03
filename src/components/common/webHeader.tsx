import React from "react";
import './webHeader.css'
import CustomDatePicker from "./datePicker";

interface WebHeaderProps {
  title: string; // ✅ Title to display in the center
}

const WebHeader: React.FC<WebHeaderProps> = ({ title }) => {
  return (
    <header className="web-header">
      {/* Left side - Menu Button (Will open the sidebar later) */}
      <button className="menu-button">☰</button>

      {/* Center - Title (Configurable) */}
      <h1 className="header-title">{title}</h1>

      {/* Right Side - Placeholder for Date Selector */}
      <div className="date-selector">
        <CustomDatePicker/>
      </div>
    </header>
  );
};

export default WebHeader;
