// App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./Home";       // A főoldal
import Recipes from "./Recipes"; // A receptoldal
import Workoutplan from "./pages/Workoutplan";
import Ebook1 from "./pages/Ebook1";
import Ebook2 from "./pages/Ebook2";

export default function App() {
  return (
    <Routes>
      {/* Gyökér útvonal: főoldal */}
      <Route path="/" element={<Home />} />

      {/* /recipes útvonal: receptoldal */}
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/workoutplan" element={<Workoutplan />} />
      <Route path="/ebook1" element={<Ebook1 />} />
      <Route path="/ebook2" element={<Ebook2 />} />
    </Routes>
  );
}
