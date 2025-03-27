import React from "react";
import { useNavigate } from "react-router-dom";
import "./Emily.css";

export default function Emily() {
  const navigate = useNavigate();

  return (
    <div className="emily-page">
      <div className="emily-container">
        <img src="/src/images/emily.jfif" alt="Emily" className="emily-image" />
        <div className="emily-info">
          <h2>Emily</h2>
          <p>
            Hello, I'm Emily! I'm specialized in cardio and weight loss programs.
            I help clients achieve their goals with structured HIIT sessions, 
            balanced nutrition guidance, and ongoing support.
          </p>
          <p>
            If you want to transform your lifestyle, boost your endurance, and
            burn calories effectively, I'm here to guide you every step of the way.
          </p>
          <p>
            Contact: emily@example.com
          </p>
          <button className="back-button" onClick={() => navigate("/personaltrainers")}>
            Back to Personal Trainers
          </button>
        </div>
      </div>
    </div>
  );
}
