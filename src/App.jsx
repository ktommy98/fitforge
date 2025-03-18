// App.jsx
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import Home from "./Home";
import WorkoutPlan from "./pages/WorkoutPlan";
import Ebook1 from "./pages/Ebook1";
import Ebook2 from "./pages/Ebook2";
import ProfileSetup from "./pages/ProfileSetup";
import Recipes from "./Recipes";

function AppRoutes() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === "authenticated" && !profileCompleted) {
      navigate("/profile-setup");
    }
  }, [authStatus, profileCompleted]);

  return (
    <Routes>
      <Route path="/profile-setup" element={
        <ProfileSetup onProfileComplete={() => setProfileCompleted(true)} />
      } />
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/workoutplan" element={<WorkoutPlan />} />
      <Route path="/ebook1" element={<Ebook1 />} />
      <Route path="/ebook2" element={<Ebook2 />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Authenticator>
      <AppRoutes />
    </Authenticator>
  );
}
