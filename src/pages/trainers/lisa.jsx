import React from "react";
import { useNavigate } from "react-router-dom";
import "./TrainerDetails.css";

export default function Lisa() {
  const navigate = useNavigate();

  return (
    <div className="trainer-details-page">
      <div className="trainer-details-container">
        <img src="/images/lisa.jpg" alt="Lisa" className="trainer-details-image" />
        <div className="trainer-details-info">
          <h2>Lisa Parker</h2>
          <p>
            Hello, I'm Lisa! I specialize in functional training and everyday strength development. My sessions focus on core stability, posture, and real-life movements that help you become stronger in daily activities.
          </p>
          <p>
            I believe that training should be fun, practical, and transformative. My goal is to empower you to overcome everyday challenges through effective fitness routines.
          </p>
          <p className="quote">
            "The only bad workout is the one that didn't happen."
          </p>
          <p>Contact: lisa@example.com</p>
          <button className="back-button" onClick={() => navigate("/personaltrainers")}>
            Back to Personal Trainers
          </button>
        </div>
      </div>
    </div>
  );
}
