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
  SelectField,
  Divider,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
import { FaDumbbell, FaAppleAlt, FaUtensils, FaRunning } from "react-icons/fa";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

Amplify.configure(outputs);
const client = generateClient({ authMode: "userPool" });

const CHART_COLORS = ["#BF3131", "#EAD196", "#7D0A0A"];

function calculateTDEE({ gender, age, height, weight, exerciseLevel }) {
  const w = parseFloat(weight);
  const h = parseFloat(height);
  const a = parseFloat(age);
  let BMR = gender === "male" ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
  let activityFactor = 1.2;
  if (exerciseLevel === "intermediate") activityFactor = 1.375;
  if (exerciseLevel === "advanced") activityFactor = 1.55;
  return BMR * activityFactor;
}

function calculateMacros(tdee) {
  const proteinKcal = tdee * 0.3;
  const carbsKcal = tdee * 0.45;
  const fatKcal = tdee * 0.25;
  return {
    tdee: Math.round(tdee),
    proteinGrams: Math.round(proteinKcal / 4),
    carbsGrams: Math.round(carbsKcal / 4),
    fatGrams: Math.round(fatKcal / 9),
  };
}

// Segédfüggvény az étel makróinak kiszámításához
function calculateFoodMacros(amount, unit) {
  let grams = parseFloat(amount);
  if (unit === "kg") grams *= 1000;
  if (unit === "l") grams *= 1000;
  // ml-t tekintjük 1:1 arányban g-nek
  if (unit === "db") grams *= 50; // feltételezzük, hogy egy darab kb. 50 g
  const calories = grams * 2.5;
  const protein = grams * 0.1;
  const carbs = grams * 0.15;
  const fat = grams * 0.05;
  return {
    calories: Math.round(calories),
    protein: Math.round(protein * 10) / 10,
    carbs: Math.round(carbs * 10) / 10,
    fat: Math.round(fat * 10) / 10,
  };
}

export default function Home() {
  const [foods, setFoods] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [macros, setMacros] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("profileData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setProfileData(parsed);
      const tdee = calculateTDEE(parsed);
      setMacros(calculateMacros(tdee));
    }
    client.models.Food.observeQuery().subscribe({
      next: (data) => setFoods([...data.items]),
    });
  }, []);

  // Számoljuk az összes bevitt étel kalóriáit
  const totalFoodCalories = foods.reduce((acc, food) => {
    return acc + calculateFoodMacros(food.amount, food.unit).calories;
  }, 0);

  // Számoljuk a maradék kalóriákat
  const remainingCalories = macros ? macros.tdee - totalFoodCalories : null;

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
      meal: form.get("meal"),
    });
    event.target.reset();
  }

  async function deleteFood({ id }) {
    await client.models.Food.delete({ id });
  }

  // Csoportosítjuk az ételeket a meal alapján
  function groupFoodsByMeal(foods) {
    return foods.reduce((groups, food) => {
      const meal = food.meal || "others";
      if (!groups[meal]) groups[meal] = [];
      groups[meal].push(food);
      return groups;
    }, {});
  }
  const groupedFoods = groupFoodsByMeal(foods);

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
            <div
              style={{
                backgroundColor: "#BF3131",
                color: "white",
                padding: "2rem 15rem",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: "'Anton', sans-serif",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              <FaDumbbell style={{ color: "#EAD196", fontSize: "2rem" }} />
              <Heading level={1} style={{ margin: 1, color: "#EEEEEE" }}>
                FitForge
              </Heading>
              <FaDumbbell style={{ color: "#EAD196", fontSize: "2rem" }} />
            </div>

            {/* Napi kalóriabevitel kiszámítása */}
            {macros && (
              <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <Heading level={3} style={{ marginBottom: "1rem" }}>
                  Remaining Calorie Intake:{" "}
                  <span style={{ color: "#7D0A0A" }}>
                    {macros.tdee - foods.reduce((acc, food) => acc + calculateFoodMacros(food.amount, food.unit).calories, 0)} kcal
                  </span>
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
                      label={({ name }) => name}
                      isAnimationActive={true}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                          stroke="#fff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      wrapperStyle={{
                        fontFamily: "sans-serif",
                        backgroundColor: "#f5f5f5",
                        border: "1px solid #ccc",
                      }}
                      formatter={(value, name) => [`${value} g`, name]}
                    />
                    <Legend
                      verticalAlign="bottom"
                      iconType="circle"
                      wrapperStyle={{ fontFamily: "sans-serif", marginTop: "1rem" }}
                    />
                  </PieChart>
                  <p style={{ marginTop: "0.5rem", fontSize: "1rem" }}>
                    <strong>Macros:</strong> Protein {macros.proteinGrams} g, Carb {macros.carbsGrams} g, Fat {macros.fatGrams} g
                  </p>
                </Flex>
              </div>
            )}

            <hr
              style={{
                width: "80%",
                border: "none",
                borderTop: "2px solid #ccc",
                margin: "2rem auto",
              }}
            />

            {/* Food Tracking szekció */}
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

            {/* Food Tracking űrlap - napszak megadásával */}
            <View as="form" margin="1rem 0" onSubmit={createFood}>
              <Flex direction="column" justifyContent="center" gap="1rem" padding="1rem">
                <TextField name="name" placeholder="Food Name" labelHidden variation="quiet" required />
                <Flex gap="1rem">
                  <TextField name="amount" placeholder="Food Amount" type="number" labelHidden variation="quiet" required />
                  <SelectField name="unit" labelHidden required>
                    <option value="g">Grams (g)</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="ml">Milliliters (ml)</option>
                    <option value="l">Liters (l)</option>
                    <option value="db">Pieces (pcs)</option>
                  </SelectField>
                </Flex>
                {/* SelectField az étkezés megadásához */}
                <SelectField name="meal" labelHidden required defaultValue="breakfast">
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snacks">Snacks</option>
                </SelectField>
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
                  Add Food
                </Button>
              </Flex>
            </View>

            {/* Megjelenítés: Csoportosítva a meal alapján */}
            {Object.keys(groupedFoods).length > 0 &&
              Object.keys(groupedFoods).map((mealType) => (
                <div key={mealType} style={{ width: "100%" }}>
                  <Heading level={3} style={{ marginTop: "2rem", textAlign: "center" }}>
                    {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                  </Heading>
                  <Grid margin="1rem 0" autoFlow="column" justifyContent="center" gap="2rem" alignContent="center">
                    {groupedFoods[mealType].map((food) => {
                      const foodMacros = calculateFoodMacros(food.amount, food.unit);
                      return (
                        <Flex
                          key={food.id || food.name}
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          gap="1rem"
                          border="1px solid #ccc"
                          padding="1.5rem"
                          borderRadius="5%"
                          style={{ color: "#333" }}
                        >
                          <Heading level={3} style={{ margin: 0 }}>
                            {food.name}
                          </Heading>
                          <p style={{ fontStyle: "italic", margin: 0 }}>
                            {food.amount} {food.unit}
                          </p>
                          <p style={{ margin: 0, fontSize: "0.9rem" }}>
                            Calories: {calculateFoodMacros(food.amount, food.unit).calories} kcal
                          </p>
                          <p style={{ margin: 0, fontSize: "0.9rem" }}>
                            Protein: {calculateFoodMacros(food.amount, food.unit).protein} g, Carbs: {calculateFoodMacros(food.amount, food.unit).carbs} g, Fat: {calculateFoodMacros(food.amount, food.unit).fat} g
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
                      );
                    })}
                  </Grid>
                </div>
              ))}
          </Flex>
        </div>
      )}
    </Authenticator>
  );
}

// Csoportosítás a meal alapján
function groupFoodsByMeal(foods) {
  return foods.reduce((acc, food) => {
    const meal = food.meal || "others";
    if (!acc[meal]) acc[meal] = [];
    acc[meal].push(food);
    return acc;
  }, {});
}
