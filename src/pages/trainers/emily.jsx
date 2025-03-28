import React from "react";
import { useNavigate } from "react-router-dom";
import "./TrainerDetails.css";

export default function Emily() {
  const navigate = useNavigate();

  return (
    <div className="trainer-details-page">
      <div className="trainer-details-container">
        <img src="/images/emily.jpg" alt="Emily" className="trainer-details-image" />
        <div className="trainer-details-info">
          <h2>Emily Carter</h2>
          <p>
            Hello, I'm Emily! I'm specialized in cardio and weight loss programs. I help clients achieve their goals with structured HIIT sessions, balanced nutrition guidance, and ongoing support.
          </p>
          <p>
            My training approach is holistic, combining effective workouts with sustainable lifestyle changes. I believe in empowering you to make healthier choices every day.
          </p>
          <p className="quote">
            "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle."
          </p>
          <p>Contact: emily@example.com</p>
          <button className="back-button" onClick={() => navigate("/personaltrainers")}>
            Back to Personal Trainers
          </button>
        </div>
      </div>
    </div>
  );
}
