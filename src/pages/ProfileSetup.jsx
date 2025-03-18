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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Itt mentheted el az adatokat pl. backendbe vagy context-be.
    // Most csak navigálunk a főoldalra.
    onProfileComplete();
    navigate("/");
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      padding="2rem"
      style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
    >
      <Heading level={1} style={{ marginBottom: "1rem", color: "#BF3131" }}>
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
          <option value="other">Other</option>
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
        />

        <SelectField
          name="exerciseLevel"
          label="Exercise Level"
          placeholder="Select your exercise level"
          required
          onChange={handleChange}
          value={formData.exerciseLevel}
          style={{ marginBottom: "1rem" }}
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
            padding: "0.5rem 1rem",
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
  );
}
