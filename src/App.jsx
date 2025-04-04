import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import Home from "./Home";
import WorkoutPlan from "./pages/Workoutplan";
import Ebook1 from "./pages/Ebook1";
import Ebook2 from "./pages/Ebook2";
import ProfileSetup from "./pages/ProfileSetup";
import Recipes from "./pages/Recipes";
import PersonalTrainers from "./pages/PersonalTrainers";
import Emily from "./pages/trainers/emily";
import Lisa from "./pages/trainers/lisa";
import John from "./pages/trainers/john";
import Alex from "./pages/trainers/alex";
import Mark from "./pages/trainers/mark";
import Forum from "./pages/Forum";
import { ForumProvider } from "./pages/ForumContext";

function AppRoutes() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const [profileCompleted, setProfileCompleted] = useState(() => {
    return localStorage.getItem("profileCompleted") === "true";
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === "authenticated" && !profileCompleted) {
      navigate("/profile-setup");
    }
  }, [authStatus, profileCompleted, navigate]);

  return (
    <Routes>
      <Route
        path="/profile-setup"
        element={
          <ProfileSetup
            onProfileComplete={() => {
              setProfileCompleted(true);
              localStorage.setItem("profileCompleted", "true");
            }}
          />
        }
      />
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/workoutplan" element={<WorkoutPlan />} />
      <Route path="/ebook1" element={<Ebook1 />} />
      <Route path="/ebook2" element={<Ebook2 />} />
      <Route path="/personaltrainers" element={<PersonalTrainers />} />
      <Route path="/trainers/emily" element={<Emily />} />
      <Route path="/trainers/lisa" element={<Lisa />} />
      <Route path="/trainers/john" element={<John />} />
      <Route path="/trainers/alex" element={<Alex />} />
      <Route path="/trainers/mark" element={<Mark />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Authenticator>
      <ForumProvider>
        <AppRoutes />
      </ForumProvider>
    </Authenticator>
  );
}
