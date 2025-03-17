import { useState } from "react";
import WebHeader from "../components/common/webHeader";
import SpiritualProgress from "../components/internal/pillars/spiritual/spiritualProgress";
import SpiritualTracker from "../components/internal/pillars/spiritual/spiritualTracker";
import "./spiritual.css"; // Import CSS

const Spiritual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"progress" | "tracker">("progress");

  return (
    <div className="spiritual-container">
      <WebHeader title="Happiness Tracker" />
      
      {/* Toggle Views */}
      <div className="spiritual-content">
        {activeTab === "progress" ? <SpiritualProgress /> : <SpiritualTracker pillar="spiritual" />}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-navigation">
        <button 
          className={activeTab === "progress" ? "active" : ""}
          onClick={() => setActiveTab("progress")}
        >
          Progress
        </button>
        <button 
          className={activeTab === "tracker" ? "active" : ""}
          onClick={() => setActiveTab("tracker")}
        >
          Tracker
        </button>
      </div>
    </div>
  );
};

export default Spiritual;
