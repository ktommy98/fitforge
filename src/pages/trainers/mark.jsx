import React from "react";
import { useNavigate } from "react-router-dom";
import "./TrainerDetails.css";

export default function Mark() {
  const navigate = useNavigate();

  return (
    <div className="trainer-details-page">
      <div className="trainer-details-container">
        <img src="/images/mark.jpg" alt="Mark" className="trainer-details-image" />
        <div className="trainer-details-info">
          <h2>Mark Brown</h2>
          <p>
            I'm Mark, and I specialize in flexibility and recovery workouts. Mobility is key to preventing injuries and improving overall performance.
          </p>
          <p>
            My sessions focus on stretching, foam rolling, and active recovery techniques to keep you moving comfortably and pain-free.
          </p>
          <p className="quote">
            "Flexibility is the key to stability. Embrace your body's ability to move."
          </p>
          <p>Contact: mark@example.com</p>
          <button className="back-button" onClick={() => navigate("/personaltrainers")}>
            Back to Personal Trainers
          </button>
        </div>
      </div>
    </div>
  );
}
