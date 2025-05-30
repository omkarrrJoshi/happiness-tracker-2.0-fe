import { useNavigate } from "react-router-dom";
import './overview.css'
import WebHeader from "../components/common/webHeader";

const pillars = [
  {
    name: "Spiritual साधना",
    description: "Connect with your inner self and spiritual growth.",
    path: "spiritual",
    themeClass: "spiritual-theme"
  },
  {
    name: "Mental साधना",
    description: "Boost your mental clarity and cognitive skills.",
    path: "mental",
    themeClass: "mental-theme"
  },
];

const Overview: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(`/${path}`);
  };

  return (
    <div>
      <WebHeader title="Happiness Tracker" />
      <div className="overview-container">
        {/* <h1 className="overview-title">Choose Your Pillar</h1> */}
        <div className="pillars-list">
          {pillars.map((pillar) => (
            <div
              key={pillar.path}
              className={`pillar-card ${pillar.themeClass}`}
              onClick={() => handleNavigation(pillar.path)}
            >
              <h2>{pillar.name}</h2>
              <p>{pillar.description}</p>
            </div>
          ))}
        </div>
        </div>
    </div>
  );
};

export default Overview;
