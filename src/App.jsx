import { Routes, Route, useLocation } from "react-router-dom"; // ❌ removed BrowserRouter here
import Home from "./pages/Home";
import UserAuth from "./pages/auth/UserAuth";
import PartnerAuth from "./pages/auth/PartnerAuth";
import VerifyEmail from "./pages/auth/VerifyEmail";
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
import WellnessExpertDashboard from "./register/Dashboards/ExpertDashboard";
import ProductsPage from "./pages/Products/ProuductsPage";

const App = () => {
  const location = useLocation();

  // Routes where Header & Footer should be hidden
  const hideLayoutRoutes = ["/expert_register", "/center_register", "/register/expert", "/register/center", "/verify-email"];

  const hideLayout = hideLayoutRoutes.includes(location.pathname);
  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Header />}
      <main className="flex-grow ">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<UserAuth />} />
          <Route path="/partner-login" element={<PartnerAuth />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/dashboard" element={<WellnessDashboard />} />
          <Route path="/experts" element={<WellnessExperts />} />
          
          {/* Registration Routes */}
          <Route path="/register/expert" element={<ExpertRegistrationPage />} />
          <Route path="/register/center" element={<WellnessCenterRegistration />} />
          
          {/* Legacy Routes (keep for backward compatibility) */}
          <Route path="/expert_register" element={<ExpertRegistrationPage />} />
          <Route path="/expert_dashboard" element={<WellnessExpertDashboard />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route
            path="/center_register"
            element={<WellnessCenterRegistration />}
          />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/health-check" element={<MentalHealthTracking />} />
            <Route path="/physical-tracker" element={<PhysicalTracking />} />
            <Route path="/track-meal" element={<MealTracker />} />
            <Route path="/centers" element={<WellnessCenters />} />
            <Route path="/centers/:id" element={<WellnessCenterDetails />} />

            <Route path="/experts/:id" element={<WellnessExpertDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};

export default App;
