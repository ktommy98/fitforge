// Home.jsx
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

// ---- RECHARTS IMPORTOK ----
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

Amplify.configure(outputs);
const client = generateClient({ authMode: "userPool" });

// Alapszínek a chart-hoz, illeszkedve a pirosas, bordós designhoz
const CHART_COLORS = ["#BF3131", "#EAD196", "#7D0A0A"];

// Számítás segédfüggvény (Mifflin-St Jeor)
function calculateTDEE({ gender, age, height, weight, exerciseLevel }) {
  const w = parseFloat(weight);
  const h = parseFloat(height);
  const a = parseFloat(age);

  let BMR = 0;
  if (gender === "male") {
    BMR = 10 * w + 6.25 * h - 5 * a + 5;
  } else {
    // female
    BMR = 10 * w + 6.25 * h - 5 * a - 161;
  }

  let activityFactor = 1.2; // beginner
  if (exerciseLevel === "intermediate") activityFactor = 1.375;
  if (exerciseLevel === "advanced") activityFactor = 1.55;

  return BMR * activityFactor;
}

// Makrók kiszámítása (30% fehérje, 45% szénhidrát, 25% zsír)
function calculateMacros(tdee) {
  const proteinKcal = tdee * 0.3;
  const carbsKcal = tdee * 0.45;
  const fatKcal = tdee * 0.25;

  const proteinGrams = proteinKcal / 4;
  const carbsGrams = carbsKcal / 4;
  const fatGrams = fatKcal / 9;

  return {
    tdee: Math.round(tdee),
    proteinGrams: Math.round(proteinGrams),
    carbsGrams: Math.round(carbsGrams),
    fatGrams: Math.round(fatGrams),
  };
}

export default function Home() {
  const [foods, setFoods] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [macros, setMacros] = useState(null);

  useEffect(() => {
    // Profile adatok betöltése localStorage-ból
    const stored = localStorage.getItem("profileData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setProfileData(parsed);

      // Kiszámítjuk a TDEE-t és a makrókat
      const tdee = calculateTDEE(parsed);
      const macroRes = calculateMacros(tdee);
      setMacros(macroRes);
    }

    // Food adatok betöltése
    client.models.Food.observeQuery().subscribe({
      next: (data) => setFoods([...data.items]),
    });
  }, []);

  // Recharts donut chart data
  const chartData = macros
    ? [
        { name: "Protein", value: macros.proteinGrams },
        { name: "Carbs", value: macros.carbsGrams },
        { name: "Fat", value: macros.fatGrams },
      ]
    : [];

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
              onClick={() => {
                signOut();
                localStorage.removeItem("profileCompleted");
              }}
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

            {/* Napi kalóriaszükséglet + donut chart */}
            {macros && (
              <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <Heading level={3} style={{ marginBottom: "1rem" }}>
                  Napi kalóriaszükséglet: <span style={{ color: "#7D0A0A" }}>{macros.tdee} kcal</span>
                </Heading>
                <Flex direction="column" alignItems="center" justifyContent="center">
                  <PieChart width={350} height={350}>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      fill="#8884d8"
                      paddingAngle={3}
                      dataKey="value"
                      labelLine={false}
                      label={({ name }) => name} // Egyszerű címke, csak a makró nevét írja
                      isAnimationActive={true}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                          stroke="#fff" // Fehér körvonal
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      wrapperStyle={{ fontFamily: "sans-serif", backgroundColor: "#f5f5f5", border: "1px solid #ccc" }}
                      formatter={(value, name) => [`${value} g`, name]}
                    />
                    <Legend
                      verticalAlign="bottom"
                      iconType="circle"
                      wrapperStyle={{ fontFamily: "sans-serif", marginTop: "1rem" }}
                    />
                  </PieChart>
                  <p style={{ marginTop: "0.5rem", fontSize: "1rem" }}>
                    <strong>Makrók:</strong> Fehérje {macros.proteinGrams} g, Szénhidrát {macros.carbsGrams} g, Zsír {macros.fatGrams} g
                  </p>
                </Flex>
              </div>
            )}

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
