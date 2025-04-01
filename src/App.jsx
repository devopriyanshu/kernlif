import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";
import WellnessDashboard from "./pages/DashBoard";
import MentalHealthTracking from "./pages/Trackers/HealthCheck";
import PhysicalTracking from "./pages/Trackers/PhysicalHealthTracker";
import MealTracker from "./pages/Trackers/MealTracker";
import WellnessCenters from "./pages/Centers/WellNessCenterPage";
import WellnessCenterDetails from "./pages/Centers/WellNessCenterDeatilsPage";
import WellnessExperts from "./pages/Experts/ExpertsPage";
import WellnessExpertDetails from "./pages/Experts/ExpertsDetailsPage";
import Profile from "./pages/Profile";
import ExpertRegistrationPage from "./register/ExpertRegistrationPage";
import WellnessCenterRegistration from "./register/CenterRegistrationPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./utils/ProtectedRoutes";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginSignup />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<WellnessDashboard />} />
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
              <Route
                path="/expert_register"
                element={<ExpertRegistrationPage />}
              />
              <Route
                path="/center_register"
                element={<WellnessCenterRegistration />}
              />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
