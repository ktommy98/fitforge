import React, { useState } from "react";
import { Flex, Heading, Text, Button, Image } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

const recipes = [
  {
    title: "French Toast",
    image: "/images/french_toast.jpg",
    serving: "1",
    ingredients: [
      "250g egg whites (about 7-8 medium eggs)",
      "50 ml sugar-free almond milk",
      "2 pipettes vanilla FlavDrops / vanilla flavor",
      "2 tsp ground cinnamon",
      "4 slices of bread (about 150g - max 250 kcal/100g)",
      "Cooking spray",
      "Toppings: zero-calorie syrup / powdered peanut butter / light yogurt / fruits",
    ],
    preparation:
      "Put the egg whites, almond milk, flavoring, and sweetener into a bowl and mix well. Cook the bread slices in a pan, then serve with toppings to taste.",
    nutrition: {
      calories: "500 Kcal",
      protein: "37.5g",
      carbs: "79g",
      fat: "3g",
    },
  },
  {
    title: "Strawberry-Flavored Oat Cookie",
    image: "/images/strawberry_cookie.jpg",
    serving: "8 pieces",
    ingredients: [
      "75g oats",
      "20g strawberry-flavored soy protein isolate (Myprotein)",
      "120g banana",
      "20g unsweetened almond milk",
      "10g raspberry-flavored dark chocolate",
    ],
    preparation:
      "Mix the oats, protein powder, mashed banana, and almond milk. Shape the mixture into 8 balls. Place them on a baking sheet lined with parchment paper, press them down, and sprinkle chocolate pieces on top. Bake at 180°C (356°F) for about 25-30 minutes.",
    nutrition: {
      calories: "63 Kcal / piece",
      protein: "3.6g",
      carbs: "9.1g",
      fat: "1.3g",
    },
  },
  {
    title: "Cheese Omelet with Sweet Potato",
    image: "/images/sweet_potato_omlette.jpg",
    serving: "1",
    ingredients: [
      "300g sweet potato",
      "200g egg whites",
      "1 whole egg",
      "25g light cheese",
    ],
    preparation:
      "Mix the egg whites and whole egg, season to taste. Cook in a pan. Cook the sweet potato in the microwave for 7 minutes or bake in the oven.",
    nutrition: {
      calories: "490 Kcal",
      protein: "40g",
      carbs: "63g",
      fat: "7.5g",
    },
  },
  {
    title: "Apple Protein Pancake",
    image: "/images/apple_protein_pancake.jpg",
    serving: "1",
    ingredients: [
      "200g egg whites",
      "30g oats",
      "200g apple",
      "60g low-fat quark cheese",
      "20g Myprotein VitaFiber",
      "5g baking powder",
    ],
    preparation:
      "Blend all ingredients. Optionally chill the batter for 3-4 hours or cook immediately. Cook in a pan for about 1-2 minutes on each side.",
    nutrition: {
      calories: "400 Kcal",
      protein: "32.5g",
      carbs: "60g",
      fat: "2.5g",
    },
  },
  {
    title: "Jelly Mousse",
    image: "/images/high-protein-jello-mousse.jpg",
    serving: "1",
    ingredients: [
      "250g low-fat quark cheese (Aldi - New Lifestyle 66 kcal/100g)",
      "10g protein powder (vanilla Myprotein Impact Whey or vegan protein powder)",
      "10g gelatin",
      "100g blueberries/strawberries/raspberries",
      "Sweetener, FlavDrops",
    ],
    preparation:
      "Put the quark cheese in a bowl and add just enough water to achieve a creamy texture, then add the protein powder and sweeten to taste. If desired, blend some of the fruit into the cream for color. Dissolve the gelatin in a little hot water; once fully dissolved, gradually stir it into the cheese mixture and then fold in the fruit. Chill in the fridge for 3-4 hours until set.",
    nutrition: {
      calories: "315 Kcal",
      protein: "48g",
      carbs: "25g",
      fat: "1.5g",
    },
  },
  {
    title: "Thai Chicken Rice Noodles",
    image: "/images/thai_noodles.jpg",
    serving: "2",
    ingredients: [
      "120g rice noodles",
      "200g chicken breast",
      "300g button mushrooms",
      "100g onion",
      "100g baby carrots",
      "100g green beans",
      "100g wok mix vegetables",
      "50ml soy sauce (Chin-Su brand)",
      "3ml olive oil",
      "2g sesame seeds",
      "Seasonings: salt, pepper, garlic powder, Thai spices, Sriracha/chili sauce",
    ],
    preparation:
      "Cook the rice noodles according to the package instructions. In a pan with olive oil, sauté the onion, then add the chicken cut into small cubes. Next, add the mushrooms and vegetables, and cook until the chicken and mushrooms release their liquid. Season to taste, then stir in the rice noodles and soy sauce, and fry for 1 minute. Optionally, add some Sriracha sauce. Finally, sprinkle with sesame seeds.",
    nutrition: {
      calories: "483 Kcal (1 serving)",
      protein: "44.4g",
      carbs: "68.2g",
      fat: "4g",
    },
  },
  {
    title: "Garlic Broccoli Cream",
    image: "/images/broccoli_cream_soup.jpg",
    serving: "4",
    ingredients: [
      "600g broccoli",
      "3 cloves garlic",
      "115g rice cream (Alpro)",
      "20g Natur Vegeta (seasoning)",
      "Salt, pepper to taste"
    ],
    preparation:
      "Bring water to a boil in a pot. Meanwhile, rinse and cut the broccoli into florets. Boil or steam the broccoli for about 15-20 minutes, until tender. Separately, sauté the garlic in a small amount of oil, then add the rice cream and seasoning. Once the broccoli is cooked, drain it, then add it to the sauce. Stir well and season with salt and pepper to taste. You can blend it if you prefer a creamy texture.",
    nutrition: {
      calories: "86 Kcal (1 serving)",
      fat: "29g",
      carbs: "8g",
      protein: "49g",
    },
  },
  {
    title: "Curry Chicken with Beans",
    image: "/images/chicken_bean_curry.jpg",
    serving: "3",
    ingredients: [
      "350g chicken breast fillet",
      "3 onions (~350-400g)",
      "1 can (255g drained) red beans",
      "10ml olive oil",
      "Curry powder, turmeric, cayenne pepper, ground ginger",
    ],
    preparation:
      "Cut the chicken breast into small pieces and slice the onions. Sauté them in olive oil with the spices. Then add the drained red beans. Cook for about 10-15 minutes, until the chicken is thoroughly cooked. Season to taste.",
    nutrition: {
      calories: "310 Kcal (1 serving)",
      carbs: "8.9g",
      fat: "5.1g",
      protein: "21g",
    },
  },
  {
    title: "Fritatta",
    image: "/images/fritatta.jpg",
    serving: "1",
    ingredients: [
      "1 medium potato (150-180g)",
      "2 whole eggs",
      "5 egg whites (about 170g)",
      "1 slice of lean ham",
      "Veggies (tomato, peppers, mushrooms, spinach) - optional",
    ],
    preparation:
      "Preheat your oven to 180°C (356°F). Slice the potato and bake it until soft (about 15-20 minutes). Meanwhile, prepare your veggies. Once the potato is almost done, crack the eggs and egg whites on top, add the ham and vegetables, and season as you like. Continue baking for another 10-15 minutes or until the eggs are fully cooked. Enjoy warm!",
    nutrition: {
      calories: "350 Kcal",
      carbs: "37g",
      protein: "24g",
      fat: "11g",
    },
  },
  {
    title: "Chicken Tortilla Wrap",
    image: "/images/chicken_wrap.jpg",
    serving: "1",
    ingredients: [
      "1 tortilla (62g)",
      "20g light sandwich spread (e.g., cream cheese)",
      "Lettuce leaves, tomatoes, peppers, onions (optional)",
      "70g chicken or turkey ham",
    ],
    preparation:
      "Spread the tortilla with the light sandwich spread, then add lettuce, vegetables (tomatoes, peppers, onions) to taste, and the chicken/turkey ham. Roll it up and enjoy it cold or warm. You can also toast it lightly for a warm sandwich effect.",
    nutrition: {
      calories: "315 Kcal",
      carbs: "39g",
      fat: "7g",
      protein: "24g",
    },
  },
  
];

export default function Recipes() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const recipesPerPage = 2;

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % Math.ceil(recipes.length / recipesPerPage));
  };

  const prevPage = () => {
    setCurrentPage((prev) =>
      prev === 0 ? Math.ceil(recipes.length / recipesPerPage) - 1 : prev - 1
    );
  };

  const buttonStyle = {
    backgroundColor: "#7D0A0A",
    color: "white",
    border: "none",
    padding: "0.6rem 1.2rem",
    borderRadius: "5px",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.3s ease-in-out",
  };

  return (
    <Flex direction="column" alignItems="center" style={{ padding: "2rem" }}>
      {/* Header */}
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
          marginBottom: "2rem",
        }}
      >
        <Heading level={1} style={{ margin: 0, color: "#EEEEEE" }}>
          Recipes
        </Heading>
      </div>

      <Flex
        direction="row"
        wrap="wrap"
        justifyContent="center"
        gap="2rem"
        width="100%"
      >
        {recipes
          .slice(currentPage * recipesPerPage, currentPage * recipesPerPage + recipesPerPage)
          .map((recipe, index) => (
            <Flex
              key={index}
              direction="column"
              alignItems="center"
              style={{
                backgroundColor: "#f9f9f9",
                color: "#333",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                padding: "1.5rem",
                flexBasis: "calc(50% - 2rem)",
                maxWidth: "600px",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Heading level={2} style={{ color: "#7D0A0A", marginBottom: "0.5rem" }}>
                {recipe.title}
              </Heading>
              <Image
                src={recipe.image}
                alt={recipe.title}
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  borderRadius: "10px",
                  marginBottom: "1rem",
                }}
              />
              <Text style={{ marginBottom: "1rem" }}>
                <strong>Servings:</strong> {recipe.serving}
              </Text>
              <Text>
                <strong>Ingredients:</strong>
              </Text>
              <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
                {recipe.ingredients.map((ingredient, idx) => (
                  <li key={idx}>{ingredient}</li>
                ))}
              </ul>
              <Text style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                <strong>Preparation:</strong> {recipe.preparation}
              </Text>
              <Text>
                <strong>Nutrition:</strong>
                <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
                  <li>Calories: {recipe.nutrition.calories}</li>
                  <li>Protein: {recipe.nutrition.protein}</li>
                  <li>Carbs: {recipe.nutrition.carbs}</li>
                  <li>Fat: {recipe.nutrition.fat}</li>
                </ul>
              </Text>
            </Flex>
          ))}
      </Flex>

      <Flex direction="row" gap="1rem" marginTop="2rem">
        <Button
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#BF3131")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#7D0A0A")}
          onClick={prevPage}
        >
          Last
        </Button>
        <Button
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#BF3131")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#7D0A0A")}
          onClick={nextPage}
        >
          Next
        </Button>
      </Flex>

      <Button
        style={{
          ...buttonStyle,
          marginTop: "2rem",
          backgroundColor: "#7D0A0A",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#BF3131")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#7D0A0A")}
        onClick={() => navigate("/")}
      >
        Back to Main Page
      </Button>
    </Flex>
  );
}
