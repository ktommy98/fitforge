import React from "react";
import { useNavigate } from "react-router-dom";
import "./TrainerDetails.css";

export default function Alex() {
  const navigate = useNavigate();

  return (
    <div className="trainer-details-page">
      <div className="trainer-details-container">
        <img src="/images/alex.jpg" alt="Alex" className="trainer-details-image" />
        <div className="trainer-details-info">
          <h2>Alex Turner</h2>
          <p>
            Hi, I'm Alex! My passion is high-intensity interval training and endurance workouts to boost cardiovascular health.
          </p>
          <p>
            I design workouts that challenge your limits and help you achieve peak performance. Whether you're training for endurance or speed, my programs are tailored for explosive results.
          </p>
          <p className="quote">
            "Push yourself because no one else is going to do it for you."
          </p>
          <p>Contact: alex@example.com</p>
          <button className="back-button" onClick={() => navigate("/personaltrainers")}>
            Back to Personal Trainers
          </button>
        </div>
      </div>
    </div>
  );
}
