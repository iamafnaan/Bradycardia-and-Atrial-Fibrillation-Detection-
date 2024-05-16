import React from "react";
import { FaHeartbeat, FaTint, FaTemperatureHigh } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import "./HealthCard.css";

const HealthCard = ({ heartRate, spO2, temperature }) => {
  const navigate = useNavigate();

  const handleTemperatureClick = () => {
    navigate("/temperature"); // Navigate to the Temperature page
  };

  const handleHeartRateClick = () => {
    navigate("/heartrate"); // Navigate to the Heart Rate page
  };

  const handleSpO2Click = () => {
    navigate("/spo2"); // Navigate to the SpO2 page
  };

  return (
    <div className="card">
      <div className="health-item">
        <div className="health-icon">
          <FaHeartbeat />
        </div>
        <div className="health-progress">
          <CircularProgressbar
            value={parseInt(heartRate)}
            text={`${heartRate} BPM`}
            maxValue={150}
            styles={buildStyles({
              textSize: "20px",
              pathColor: "#ffc0cb",
              trailColor: "#f0f0f0",
            })}
          />
        </div>
        <div className="health-label" onClick={handleHeartRateClick}>
          Heart Rate
        </div>
      </div>
      <div className="health-item">
        <div className="health-icon">
          <FaTint />
        </div>
        <div className="health-progress">
          <CircularProgressbar
            value={parseInt(spO2)}
            text={`${spO2}%`}
            maxValue={100}
            styles={buildStyles({
              textSize: "20px",
              pathColor: "#ffc0cb",
              trailColor: "#f0f0f0",
            })}
          />
        </div>
        <div className="health-label" onClick={handleSpO2Click}>
          SpO2
        </div>
      </div>
      <div className="health-item">
        <div className="health-icon">
          <FaTemperatureHigh />
        </div>
        <div className="health-progress">
          <CircularProgressbar
            value={parseInt(temperature)}
            text={`${temperature}°F`}
            maxValue={112}
            styles={buildStyles({
              textSize: "20px",
              pathColor: "#ffc0cb",
              trailColor: "#f0f0f0",
            })}
          />
        </div>
        <div className="health-label" onClick={handleTemperatureClick}>
          Temperature
        </div>
      </div>
    </div>
  );
};

export default HealthCard;
