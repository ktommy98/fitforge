import React from "react";
import { useNavigate } from "react-router-dom";
import "./TrainerDetails.css";

export default function John() {
  const navigate = useNavigate();

  return (
    <div className="trainer-details-page">
      <div className="trainer-details-container">
        <img src="/images/john.jpg" alt="John" className="trainer-details-image" />
        <div className="trainer-details-info">
          <h2>John Davis</h2>
          <p>
            I'm John, an experienced strength coach focusing on muscle mass and power training. I provide tailored workout plans and nutritional guidance to help you reach peak performance.
          </p>
          <p>
            My philosophy is centered on consistency, hard work, and smart training strategies to build strength and resilience.
          </p>
          <p className="quote">
            "Strength does not come from winning. Your struggles develop your strengths."
          </p>
          <p>Contact: john@example.com</p>
          <button className="back-button" onClick={() => navigate("/personaltrainers")}>
            Back to Personal Trainers
          </button>
        </div>
      </div>
    </div>
  );
}
