import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./PersonalTrainers.css";

const trainers = [
  {
    name: "Emily",
    surname: "Carter",
    image: "/images/emily.jpg",
    moreLink: "/trainers/emily",
  },
  {
    name: "Lisa",
    surname: "Parker",
    image: "/images/lisa.jpg",
    moreLink: "/trainers/lisa",
  },
  {
    name: "John",
    surname: "Davis",
    image: "/images/john.jpg",
    moreLink: "/trainers/john",
  },
  {
    name: "Alex",
    surname: "Turner",
    image: "/images/alex.jpg",
    moreLink: "/trainers/alex",
  },
  {
    name: "Mark",
    surname: "Brown",
    image: "/images/mark.jpg",
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
            <img src={trainer.image} alt={`${trainer.name} ${trainer.surname}`} className="trainer-image" />
            <p className="trainer-name">{trainer.name} {trainer.surname}</p>
            <div className="trainer-overlay" onClick={() => handleTrainerClick(trainer.moreLink)}>
              <div className="overlay-content">MORE <FaSearch style={{ marginLeft: "0.1rem", fontSize: "1.3rem"  }} />
              </div>
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
