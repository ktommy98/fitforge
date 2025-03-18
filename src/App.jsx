// App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./Home";       // A főoldal
import Recipes from "./Recipes"; // A receptoldal

export default function App() {
  return (
    <Routes>
      {/* Gyökér útvonal: főoldal */}
      <Route path="/" element={<Home />} />

      {/* /recipes útvonal: receptoldal */}
      <Route path="/recipes" element={<Recipes />} />
    </Routes>
  );
}

