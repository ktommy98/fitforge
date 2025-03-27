import React from "react";
import { useNavigate } from "react-router-dom";
import "./PersonalTrainers.css";

const trainers = [
  {
    name: "Emily",
    image: "/src/images/emily.jfif",
    moreLink: "/trainers/emily", // Ha ide kattint, a /trainers/emily oldalra megy
  },
  {
    name: "Lisa",
    image: "/src/images/lisa.jfif",
    moreLink: "/trainers/lisa",
  },
  {
    name: "John",
    image: "/src/images/john.jfif",
    moreLink: "/trainers/john",
  },
  {
    name: "Alex",
    image: "/src/images/alex.jfif",
    moreLink: "/trainers/alex",
  },
  {
    name: "Mark",
    image: "/src/images/mark.jfif",
    moreLink: "/trainers/mark",
  },
];

export default function PersonalTrainers() {
  const navigate = useNavigate();

  const handleTrainerClick = (link) => {
    navigate(link);
  };

  return (
    <div className="trainers-page">
      <div className="trainers-header">
        <h1 className="trainers-title">Personal Training</h1>
      </div>

      <div className="trainer-grid">
        {trainers.map((trainer, index) => (
          <div className="trainer-card" key={index}>
            <img src={trainer.image} alt={trainer.name} className="trainer-image" />
            <p className="trainer-name">{trainer.name}</p>
            <div className="trainer-overlay" onClick={() => handleTrainerClick(trainer.moreLink)}>
              <div className="overlay-content">MORE</div>
            </div>
          </div>
        ))}
      </div>

      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate("/")}>
          Back to Main Page
        </button>
      </div>
    </div>
  );
}
