import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WellnessCenterDetails from "./pages/Centers/WellNessCenterDeatilsPage";
import WellnessExpertDetails from "./pages/Experts/ExpertsDetailsPage";
import MentalHealthTracking from "./pages/Trackers/HealthCheck";
import MealTracker from "./pages/Trackers/MealTracker";
import PhysicalTracking from "./pages/Trackers/PhysicalHealthTracker";
import WellnessExperts from "./pages/Experts/ExpertsPage";
import WellnessCenters from "./pages/Centers/WellNessCenterPage";
import Profile from "./pages/Profile";
import LoginSignup from "./pages/LoginSignup";
import WellnessDashboard from "./pages/DashBoard";
import ExpertRegistrationPage from "./register/ExpertRegistrationPage";
import WellnessCenterRegistration from "./register/CenterRegistrationPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/health-check" element={<MentalHealthTracking />} />
            <Route path="/physical-tracker" element={<PhysicalTracking />} />
            <Route path="/track-meal" element={<MealTracker />} />
            <Route path="/centers" element={<WellnessCenters />} />
            <Route
              path="/wellness-center"
              element={<WellnessCenterDetails />}
            />
            <Route path="/experts" element={<WellnessExperts />} />
            <Route path="/expert" element={<WellnessExpertDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/dashboard" element={<WellnessDashboard />} />
            <Route
              path="/expert_register"
              element={<ExpertRegistrationPage />}
            />
            <Route
              path="/center_register"
              element={<WellnessCenterRegistration />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
