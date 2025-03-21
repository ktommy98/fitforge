import React, { useState } from "react";
import { Flex, Heading, TextField, SelectField, Button } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

export default function ProfileSetup({ onProfileComplete }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    height: "",
    weight: "",
    targetWeight: "",
    exerciseLevel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Adatok mentése localStorage-ba:
    localStorage.setItem("profileData", JSON.stringify(formData));

    // Ezzel jelezzük a szülő komponensnek, hogy a profil kitöltött
    onProfileComplete();

    // Navigálás a főoldalra
    navigate("/");
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      padding="2rem"
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
      }}
    >
      <Flex
        direction="column"
        padding="2rem"
        backgroundColor="white"
        borderRadius="10px"
        boxShadow="0 4px 10px rgba(0, 0, 0, 0.1)"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <Heading
          level={1}
          style={{
            marginBottom: "1.5rem",
            color: "#BF3131",
            textAlign: "center",
            fontFamily: "'Anton', sans-serif",
          }}
        >
          Profile Setup
        </Heading>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <SelectField
            name="gender"
            label="Gender"
            placeholder="Select Gender"
            required
            onChange={handleChange}
            value={formData.gender}
            style={{ marginBottom: "1rem" }}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </SelectField>

          <TextField
            name="age"
            label="Age"
            type="number"
            placeholder="Enter your age"
            required
            onChange={handleChange}
            value={formData.age}
            style={{ marginBottom: "1rem" }}
            min="0"
            max="100"
          />

          <TextField
            name="height"
            label="Height (cm)"
            type="number"
            placeholder="Enter your height in cm"
            required
            onChange={handleChange}
            value={formData.height}
            style={{ marginBottom: "1rem" }}
            min="0"
            max="251"
          />

          <TextField
            name="weight"
            label="Weight (kg)"
            type="number"
            placeholder="Enter your weight in kg"
            required
            onChange={handleChange}
            value={formData.weight}
            style={{ marginBottom: "1rem" }}
            min="0"
            max="300"
          />

          <TextField
            name="targetWeight"
            label="Target Weight (kg)"
            type="number"
            placeholder="Enter your target weight in kg"
            required
            onChange={handleChange}
            value={formData.targetWeight}
            style={{ marginBottom: "1rem" }}
            min="0"
            max="300"
          />

          <SelectField
            name="exerciseLevel"
            label="Exercise Level"
            placeholder="Select your exercise level"
            required
            onChange={handleChange}
            value={formData.exerciseLevel}
            style={{ marginBottom: "1.5rem" }}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </SelectField>

          <Button
            type="submit"
            variation="primary"
            style={{
              backgroundColor: "#7D0A0A",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "5px",
              fontWeight: "bold",
              transition: "background 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#BF3131")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#7D0A0A")}
          >
            Submit
          </Button>
        </form>
      </Flex>
    </Flex>
  );
}
