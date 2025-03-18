import { useState, useEffect } from "react";
import {
  Authenticator,
  Button,
  TextField,
  Heading,
  Flex,
  View,
  Grid,
  Divider,
  SelectField,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
import { FaDumbbell, FaAppleAlt, FaUtensils, FaRunning } from "react-icons/fa";

Amplify.configure(outputs);
const client = generateClient({ authMode: "userPool" });

export default function Home() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    client.models.Food.observeQuery().subscribe({
      next: (data) => setFoods([...data.items]),
    });
  }, []);

  async function createFood(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    await client.models.Food.create({
      name: form.get("name"),
      amount: form.get("amount"),
      unit: form.get("unit"),
    });
    event.target.reset();
  }

  async function deleteFood({ id }) {
    await client.models.Food.delete({ id });
  }

  return (
    <Authenticator>
      {({ signOut }) => (
        <div style={{ display: "flex" }}>
          {/* Bal oldali menüsor */}
          <div
            style={{
              width: "250px",
              height: "95vh",
              backgroundColor: "#1E1E1E",
              color: "white",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "fixed",
              left: "10px",
              top: "10px",
              borderRadius: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Heading level={3} style={{ color: "#EAD196", textTransform: "uppercase" }}>
              Dashboard
            </Heading>
            {/* Recipes link */}
            <a
              href="/recipes"
              style={{
                display: "flex",
                alignItems: "center",
                color: "white",
                textDecoration: "none",
                marginTop: "1rem",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.color = "#EAD196";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.color = "white";
              }}
            >
              <FaUtensils style={{ marginRight: "0.5rem" }} />
              Recipes
            </a>
            {/* Workout Plan link */}
            <a
              href="/workoutplan"
              style={{
                display: "flex",
                alignItems: "center",
                color: "white",
                textDecoration: "none",
                marginTop: "1rem",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.color = "#EAD196";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.color = "white";
              }}
            >
              <FaRunning style={{ marginRight: "0.5rem" }} />
              Workout Plan
            </a>
            <div style={{ flexGrow: 1 }}></div>
            <Button
              onClick={signOut}
              style={{
                backgroundColor: "#BF3131",
                color: "white",
                border: "none",
                padding: "0.6rem 1.2rem",
                borderRadius: "5px",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "background 0.3s ease-in-out",
                marginTop: "2rem",
              }}
            >
              Sign Out
            </Button>
          </div>

          {/* Fő tartalom */}
          <Flex
            justifyContent="center"
            alignItems="center"
            direction="column"
            style={{
                marginLeft: "270px",
                padding: "1rem",
                width: "100%",
            }}
          >
            {/* FitForge fejléc */}
            <div
              style={{
                backgroundColor: "#BF3131",
                color: "white",
                padding: "2rem 15rem",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                fontFamily: "'Anton', sans-serif",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              <Heading level={1} style={{ margin: 1, color: "#EEEEEE" }}>
                <FaDumbbell style={{ marginLeft: "15px", color: "#EAD196" }} />
                FitForge
                <FaDumbbell style={{ marginRight: "15px", color: "#EAD196" }} />
              </Heading>
            </div>

            {/* Étel hozzáadás űrlap */}
            <View as="form" margin="3rem 0" onSubmit={createFood}>
              <Flex direction="column" justifyContent="center" gap="2rem" padding="2rem">
                <TextField name="name" placeholder="Food Name" labelHidden variation="quiet" required />
                <Flex gap="1rem">
                  <TextField name="amount" placeholder="Food Amount" type="number" labelHidden variation="quiet" required />
                  <SelectField name="unit" labelHidden required>
                    <option value="g">Gramm (g)</option>
                    <option value="kg">Kilogramm (kg)</option>
                    <option value="ml">Milliliter (ml)</option>
                    <option value="l">Liter (l)</option>
                    <option value="db">Darab (db)</option>
                  </SelectField>
                </Flex>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#7D0A0A",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "background 0.3s ease-in-out",
                  }}
                >
                  Add
                </Button>
              </Flex>
            </View>

            <Divider />

            {/* Food Tracking */}
            <div
              style={{
                backgroundColor: "#BF3131",
                color: "white",
                padding: "1rem 2rem",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                fontFamily: "'Anton', sans-serif",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginTop: "2rem",
                width: "fit-content",
              }}
            >
              <FaAppleAlt style={{ color: "#7D0A0A", fontSize: "1.5rem" }} />
              <Heading level={2} style={{ margin: 0, color: "#EEEEEE" }}>
                Food Tracking
              </Heading>
              <FaAppleAlt style={{ color: "#7D0A0A", fontSize: "1.5rem" }} />
            </div>

            {/* Ételek listázása */}
            <Grid margin="3rem 0" autoFlow="column" justifyContent="center" gap="2rem" alignContent="center">
              {foods.map((food) => (
                <Flex
                  key={food.id || food.name}
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  gap="2rem"
                  border="1px solid #ccc"
                  padding="2rem"
                  borderRadius="5%"
                  style={{ color: "#333" }}
                >
                  <Heading level="3" style={{ margin: 0 }}>
                    {food.name}
                  </Heading>
                  <p style={{ fontStyle: "italic", margin: 0 }}>
                    {food.amount} {food.unit}
                  </p>
                  <Button
                    style={{
                      backgroundColor: "#7D0A0A",
                      color: "white",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "background 0.3s ease-in-out",
                    }}
                    onClick={() => deleteFood(food)}
                  >
                    Remove
                  </Button>
                </Flex>
              ))}
            </Grid>
          </Flex>
        </div>
      )}
    </Authenticator>
  );
}
