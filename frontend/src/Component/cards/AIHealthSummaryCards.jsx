import React, { useEffect, useState } from "react";
import {
  FaHeartbeat,
  FaExclamationTriangle,
  FaDisease,
  FaWeight,
  FaTint,
  FaVial,
  FaCapsules,
  FaFlask,
  FaAppleAlt,
  FaRunning,
  FaUserMd,
  FaBell,
  FaAmbulance,
} from "react-icons/fa";

import "../../Styles/AI/AIHealthSummaryCard.css";

function AIHealthSummaryCards({ summary }) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (summary) {
      try {
        setData(JSON.parse(summary));
      } catch {
        console.log("Invalid JSON");
      }
    }
  }, [summary]);
  return (
    <div className="ai-summary-container">
      {/* Overall Health */}
      <div className="ai-card overall">
        <div className="icon">
          <FaHeartbeat />
        </div>

        <h3>Overall Health</h3>

        <p>{data.overallHealth}</p>
      </div>

      {/* Risk Level */}
      <div className="ai-card risk">
        <div className="icon">
          <FaExclamationTriangle />
        </div>

        <h3>Risk Level</h3>

        <p>{data.riskLevel}</p>
      </div>

      {/* Diseases */}
      <div className="ai-card disease">
        <div className="icon">
          <FaDisease />
        </div>

        <h3>Diseases</h3>

        <ul>
          {data.diseases?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* BMI */}
      <div className="ai-card bmi">
        <div className="icon">
          <FaWeight />
        </div>

        <h3>BMI Analysis</h3>

        <p>{data.bmiAnalysis}</p>
      </div>

      {/* Blood Pressure */}
      <div className="ai-card bp">
        <div className="icon">
          <FaHeartbeat />
        </div>

        <h3>Blood Pressure</h3>

        <p>{data.bloodPressureStatus}</p>
      </div>

      {/* Sugar */}
      <div className="ai-card sugar">
        <div className="icon">
          <FaTint />
        </div>

        <h3>Sugar Status</h3>

        <p>{data.sugarStatus}</p>
      </div>

      {/* Cholesterol */}
      <div className="ai-card cholesterol">
        <div className="icon">
          <FaVial />
        </div>

        <h3>Cholesterol</h3>

        <p>{data.cholesterolStatus}</p>
      </div>

      {/* Medicines */}
      <div className="ai-card medicine">
        <div className="icon">
          <FaCapsules />
        </div>

        <h3>Medicines</h3>

        <ul>
          {data.medications?.map((med, index) => (
            <li key={index}>{med}</li>
          ))}
        </ul>
      </div>

      {/* Tests */}
      <div className="ai-card tests">
        <div className="icon">
          <FaFlask />
        </div>

        <h3>Recommended Tests</h3>

        <ul>
          {data.recommendedTests?.map((test, index) => (
            <li key={index}>{test}</li>
          ))}
        </ul>
      </div>

      {/* Diet */}
      <div className="ai-card diet">
        <div className="icon">
          <FaAppleAlt />
        </div>

        <h3>Diet Plan</h3>

        <ul>
          {data.dietPlan?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Exercise */}
      <div className="ai-card exercise">
        <div className="icon">
          <FaRunning />
        </div>

        <h3>Exercise Plan</h3>

        <ul>
          {data.exercisePlan?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Doctor Advice */}
      <div className="ai-card advice">
        <div className="icon">
          <FaUserMd />
        </div>

        <h3>Doctor Advice</h3>

        <p>{data.doctorAdvice}</p>
      </div>

      {/* Warning Signs */}
      <div className="ai-card warning">
        <div className="icon">
          <FaBell />
        </div>

        <h3>Warning Signs</h3>

        <ul>
          {data.warningSigns?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Emergency Level */}
      <div className="ai-card emergency">
        <div className="icon">
          <FaAmbulance />
        </div>

        <h3>Emergency Level</h3>

        <p>{data.emergencyLevel}</p>
      </div>
    </div>
  );
}

export default AIHealthSummaryCards;
