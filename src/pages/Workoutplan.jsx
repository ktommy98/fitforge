// WorkoutPlan.jsx
import React, { useState } from "react";
import { Flex, Heading, Button, TextField, Image, Text } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

export default function WorkoutPlan() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [imagesToShow, setImagesToShow] = useState([]);

  const handleSearch = () => {
    const query = inputText.toLowerCase();
    if (query === "chest") {
      setImagesToShow([
        { src: "/src/pages/media/chest1.gif", title: "Flat Dumbbell Press" },
        { src: "/src/pages/media/chest2.webp", title: "Incline Dumbbell Press" },
        { src: "/src/pages/media/chest3.gif", title: "Bench Press" },
        { src: "/src/pages/media/chest4.gif", title: "Chest Fly" },
      ]);
    } else if (query === "triceps") {
      setImagesToShow([
        { src: "/src/pages/media/triceps1.gif", title: "Triceps Kickbacks" },
        { src: "/src/pages/media/triceps2.gif", title: "Dips" },
        { src: "/src/pages/media/triceps3.gif", title: "Triceps Pushdowns" },
        { src: "/src/pages/media/triceps4.gif", title: "Rope Pushovers" },
      ]);
    } else if (query === "shoulders") {
      setImagesToShow([
        { src: "/src/pages/media/shoulder1.gif", title: "Dumbbel Cuban Press" },
        { src: "/src/pages/media/shoulder2.gif", title: "Front Delts Raises" },
        { src: "/src/pages/media/shoulder3.gif", title: "Dumbbell Seated Front Raise" },
      ]);
    } else if (query === "back") {
      setImagesToShow([
        { src: "/src/pages/media/back1.webp", title: "Deadlift" },
        { src: "/src/pages/media/back2.webp", title: "Dumbbell Row" },
        { src: "/src/pages/media/back3.webp", title: "T-Bar Row" },
      ]);
    } else if (query === "biceps") {
      setImagesToShow([
        { src: "/src/pages/media/biceps1.gif", title: "Curls" },
        { src: "/src/pages/media/biceps2.gif", title: "Rope Hammer Curls" },
        { src: "/src/pages/media/biceps3.gif", title: "Straight Bar Curls" },
        { src: "/src/pages/media/biceps4.gif", title: "Alternating Hammer Curls" },
        { src: "/src/pages/media/biceps5.gif", title: "Machine Curls" },
      ]);
    } else if (query === "abs") {
      setImagesToShow([
        { src: "/src/pages/media/abs1.webp", title: "Abs" },
        { src: "/src/pages/media/abs2.gif", title: "Situps" },
        { src: "/src/pages/media/abs3.gif", title: "Decline Situps" },
        { src: "/src/pages/media/abs4.webp", title: "Decline Situps with Weight" },
      ]);
    } else if (query === "legs") {
      setImagesToShow([
        { src: "/src/pages/media/legs6.gif", title: "Front Squats" },
        { src: "/src/pages/media/legs1.gif", title: "Squats" },
        { src: "/src/pages/media/legs2.gif", title: "Lunges" },
        { src: "/src/pages/media/legs3.jfif", title: "Seated Calf Raises" },
        { src: "/src/pages/media/legs4.webp", title: "Standing Calf Raises" },
        { src: "/src/pages/media/legs5.gif", title: "Standing Calf Raises with Dumbbells" },
      ]);
    } else {
      setImagesToShow([]);
    }
  };

  return (
    <Flex direction="column" alignItems="center" padding="2rem" style={{ width: "100%" }}>
      <Heading level={1} style={{ marginBottom: "1rem" }}>
        Find the Best Exercise for You!
      </Heading>

      {/* Beviteli mező */}
      <TextField
        placeholder="Enter your workout goal... (chest, biceps, legs, etc.)"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        width="100%"
        maxWidth="500px"
        marginTop="1rem"
      />

      {/* Search gomb - piros alapszínnel, hover esetén sötétebb piros */}
      <Button
        onClick={handleSearch}
        variation="primary"
        style={{
          marginTop: "1rem",
          backgroundColor: "#7D0A0A",
          color: "white",
          transition: "background 0.3s ease-in-out",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#BF3131")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#7D0A0A")}
      >
        Search
      </Button>

      {/* Keresési eredmények - képek */}
      {imagesToShow.length > 0 && (
        <Flex
          direction="row"
          justifyContent="center"
          alignItems="center"
          wrap="wrap"
          marginTop="2rem"
          gap="2rem"
        >
          {imagesToShow.map((image, index) => (
            <Flex key={index} direction="column" alignItems="center">
              <Image
                src={image.src}
                alt={image.title}
                width="300px"
                borderRadius="10px"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
              />
              <Text fontSize="1.5rem" fontWeight="bold" marginTop="1rem">
                {image.title}
              </Text>
            </Flex>
          ))}
        </Flex>
      )}

      {/* Vissza a főoldalra gomb - piros alapszínnel */}
      <Button
        onClick={() => navigate("/")}
        variation="primary"
        style={{
          marginTop: "2rem",
          backgroundColor: "#7D0A0A",
          color: "white",
          transition: "background 0.3s ease-in-out",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#BF3131")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#7D0A0A")}
      >
        Back to Main Page
      </Button>

      {/* E-book ajánlás belső navigációval - linkek, de NEM lilák */}
      <Text fontSize="1.2rem" fontWeight="bold" marginTop="2rem" textAlign="center">
        If you want to learn from the best, try one of our ebooks:
      </Text>
      <Flex direction="column" alignItems="center" marginTop="1rem" gap="0.5rem">
        <Button
          onClick={() => navigate("/Ebook1")}
          variation="link"
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            textDecoration: "none",
            color: "#7D0A0A",
          }}
          onMouseOver={(e) => (e.target.style.color = "#BF3131")}
          onMouseOut={(e) => (e.target.style.color = "#7D0A0A")}
        >
          Jay Cutler Get Shredded EXTREME Edition
        </Button>
        <Button
          onClick={() => navigate("/Ebook2")}
          variation="link"
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            textDecoration: "none",
            color: "#7D0A0A",
          }}
          onMouseOver={(e) => (e.target.style.color = "#BF3131")}
          onMouseOut={(e) => (e.target.style.color = "#7D0A0A")}
        >
          Jay Cutler Mass-Ter Plan
        </Button>
      </Flex>
    </Flex>
  );
}
