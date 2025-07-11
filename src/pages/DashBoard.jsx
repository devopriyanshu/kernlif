import React, { useContext, useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Utensils,
  Moon,
  Book,
  Award,
  PieChart,
  ChevronRight,
  Plus,
  ArrowLeft,
  ArrowRight,
  Save,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/userAtom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WellnessDashboard = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddMealForm, setShowAddMealForm] = useState(false);
  const [showAddSleepForm, setShowAddSleepForm] = useState(false);
  const [showAddAppointmentForm, setShowAddAppointmentForm] = useState(false);
  const [showAddActivityForm, setShowAddActivityForm] = useState(false);

  const [user] = useAtom(userAtom);
  console.log("user at dashboard", user);

  // Form states
  const [newMeal, setNewMeal] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    time: "",
    category: "breakfast", // Default category
  });

  const [newSleep, setNewSleep] = useState({
    date: new Date().toISOString().split("T")[0],
    hours: "",
    quality: "",
    notes: "",
  });

  const [newAppointment, setNewAppointment] = useState({
    expert: "",
    type: "",
    date: "",
    time: "",
  });
  const [newActivity, setNewActivity] = useState({
    activity: "",
    date: "",
    duration: "",
    calories: "",
    notes: "",
  });

  console.log(user);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      alert("Unauthorized! Please log in.");
      navigate("/");
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Navigate between dates
  const changeDate = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  // Sample data
  const userData = {
    name: "Alex Johnson",
    dailyCalories: 1850,
    caloriesGoal: 2200,
    protein: 85,
    carbs: 210,
    fat: 62,
    sleepHours: 7.5,
    sleepQuality: 85,
    physicalActivityLogs: [
      {
        id: 1,
        date: "2025-04-12",
        activity: "Running",
        duration: 45, // in minutes
        calories: 350,
        notes: "Felt great!",
      },
    ],
    upcomingMeals: [
      {
        id: 1,
        name: "Protein Smoothie",
        time: "8:00 AM",
        calories: 320,
        protein: 24,
        carbs: 45,
        fat: 6,
        category: "breakfast",
      },
      {
        id: 2,
        name: "Grilled Chicken Salad",
        time: "12:30 PM",
        calories: 420,
        protein: 35,
        carbs: 25,
        fat: 18,
        category: "lunch",
      },
      {
        id: 3,
        name: "Baked Salmon with Veggies",
        time: "6:30 PM",
        calories: 580,
        protein: 42,
        carbs: 30,
        fat: 28,
        category: "dinner",
      },
    ],
    courses: [
      {
        id: 1,
        name: "Mindful Eating Basics",
        progress: 65,
        nextLesson: "Portion Control Strategies",
        description:
          "Learn how to be present and mindful during meals for better digestion and satisfaction.",
        totalLessons: 8,
        completedLessons: 5,
      },
      {
        id: 2,
        name: "Stress Management",
        progress: 30,
        nextLesson: "Breathing Techniques",
        description:
          "Discover techniques to manage stress and prevent stress-related eating.",
        totalLessons: 10,
        completedLessons: 3,
      },
      {
        id: 3,
        name: "Nutritional Fundamentals",
        progress: 15,
        nextLesson: "Understanding Macronutrients",
        description:
          "Master the basics of nutrition science and how to apply it to your daily life.",
        totalLessons: 12,
        completedLessons: 2,
      },
    ],
    appointments: [
      {
        id: 1,
        expert: "Dr. Sarah Williams",
        type: "Nutritionist",
        date: "Mar 12, 2025",
        time: "10:00 AM",
        location: "Virtual",
        notes: "Discuss meal plan adjustments",
      },
      {
        id: 2,
        expert: "James Chen",
        type: "Sleep Specialist",
        date: "Mar 15, 2025",
        time: "2:30 PM",
        location: "Sleep Center",
        notes: "Follow-up on sleep tracking data",
      },
      {
        id: 3,
        expert: "Dr. Maria Rodriguez",
        type: "Wellness Coach",
        date: "Mar 18, 2025",
        time: "11:15 AM",
        location: "Virtual",
        notes: "Monthly progress check-in",
      },
    ],
    sleepLogs: [
      {
        id: 1,
        date: "2025-03-01",
        hours: 8.2,
        quality: 90,
        notes: "Felt well-rested",
      },
      {
        id: 2,
        date: "2025-03-02",
        hours: 7.5,
        quality: 85,
        notes: "Woke up once",
      },
      {
        id: 3,
        date: "2025-03-03",
        hours: 6.8,
        quality: 75,
        notes: "Trouble falling asleep",
      },
      {
        id: 4,
        date: "2025-03-04",
        hours: 7.9,
        quality: 88,
        notes: "Used sleep meditation",
      },
    ],
    nutritionLogs: [
      {
        id: 1,
        date: "2025-03-01",
        calories: 2100,
        protein: 95,
        carbs: 225,
        fat: 70,
        meals: [
          {
            name: "Oatmeal with Berries",
            category: "breakfast",
            calories: 350,
          },
          { name: "Turkey Wrap", category: "lunch", calories: 450 },
          { name: "Stir Fry", category: "dinner", calories: 580 },
        ],
      },
      {
        id: 2,
        date: "2025-03-02",
        calories: 1950,
        protein: 88,
        carbs: 210,
        fat: 65,
        meals: [
          { name: "Greek Yogurt", category: "breakfast", calories: 280 },
          { name: "Quinoa Bowl", category: "lunch", calories: 420 },
          { name: "Grilled Fish", category: "dinner", calories: 520 },
        ],
      },
      {
        id: 3,
        date: "2025-03-03",
        calories: 2050,
        protein: 92,
        carbs: 230,
        fat: 68,
        meals: [
          { name: "Protein Shake", category: "breakfast", calories: 310 },
          { name: "Chicken Salad", category: "lunch", calories: 440 },
          { name: "Pasta with Veggies", category: "dinner", calories: 550 },
        ],
      },
    ],
  };

  // Get current date's data or default
  const getCurrentNutritionLog = () => {
    const formattedSelectedDate = selectedDate
      .toISOString()
      .split("T")[0]
      .substring(0, 10);
    return (
      userData.nutritionLogs.find(
        (log) => log.date === formattedSelectedDate
      ) || {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        meals: [],
      }
    );
  };

  const getCurrentSleepLog = () => {
    const formattedSelectedDate = selectedDate
      .toISOString()
      .split("T")[0]
      .substring(0, 10);
    return (
      userData.sleepLogs.find((log) => log.date === formattedSelectedDate) || {
        hours: 0,
        quality: 0,
        notes: "No data",
      }
    );
  };

  // Form handlers
  const handleMealChange = (e) => {
    const { name, value } = e.target;
    setNewMeal({
      ...newMeal,
      [name]:
        name === "calories" ||
        name === "protein" ||
        name === "carbs" ||
        name === "fat"
          ? parseInt(value) || ""
          : value,
    });
  };

  const handleSleepChange = (e) => {
    const { name, value } = e.target;
    setNewSleep({
      ...newSleep,
      [name]:
        name === "hours"
          ? parseFloat(value) || ""
          : name === "quality"
          ? parseInt(value) || ""
          : value,
    });
  };

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({
      ...newAppointment,
      [name]: value,
    });
  };

  const handleAddMeal = (e) => {
    e.preventDefault();
    // Here you would normally send this to an API
    console.log("Adding new meal:", newMeal);
    alert("Meal added successfully!");
    setShowAddMealForm(false);
    setNewMeal({
      name: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      time: "",
      category: "breakfast",
    });
  };

  const handleAddSleep = (e) => {
    e.preventDefault();
    // Here you would normally send this to an API
    console.log("Adding new sleep log:", newSleep);
    alert("Sleep log added successfully!");
    setShowAddSleepForm(false);
    setNewSleep({
      date: new Date().toISOString().split("T")[0],
      hours: "",
      quality: "",
      notes: "",
    });
  };
  const handleActivityChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddActivity = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("New Activity:", newActivity);
    setShowAddActivityForm(false);
    setNewActivity({
      activity: "",
      date: "",
      duration: "",
      calories: "",
      notes: "",
    });
  };

  // Progress bar component
  const ProgressBar = ({ value, max, colorClass = "bg-blue-500" }) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${colorClass} h-2.5 rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  // Macronutrient display component
  const MacroChart = ({ protein, carbs, fat }) => {
    return (
      <div className="flex h-12">
        <div
          className="bg-blue-500 h-full"
          style={{ width: `${protein}px` }}
        ></div>
        <div
          className="bg-green-500 h-full"
          style={{ width: `${carbs}px` }}
        ></div>
        <div
          className="bg-yellow-500 h-full"
          style={{ width: `${fat}px` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen  bg-gray-100">
      {/* Main content */}
      <main className="max-w-7xl mx-auto  px-4 py-6 sm:px-6 lg:px-8 pt-24 ">
        {/* Navigation Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "activity"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Activity
            </button>
            <button
              onClick={() => setActiveTab("nutrition")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "nutrition"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Nutrition
            </button>
            <button
              onClick={() => setActiveTab("sleep")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "sleep"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Sleep
            </button>

            <button
              onClick={() => setActiveTab("appointments")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "appointments"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Appointments
            </button>
          </nav>
        </div>

        {/* Dashboard Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Calories & Nutrition Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Daily Nutrition
                  </h2>
                  <p className="text-sm text-gray-500">Today's summary</p>
                </div>
                <Utensils className="h-6 w-6 text-blue-500" />
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Calories
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {userData.dailyCalories} / {userData.caloriesGoal}
                  </span>
                </div>
                <ProgressBar
                  value={userData.dailyCalories}
                  max={userData.caloriesGoal}
                  colorClass="bg-green-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Protein</span>
                  <span className="text-sm font-medium text-gray-700">
                    {userData.protein}g
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Carbs</span>
                  <span className="text-sm font-medium text-gray-700">
                    {userData.carbs}g
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Fat</span>
                  <span className="text-sm font-medium text-gray-700">
                    {userData.fat}g
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <MacroChart
                  protein={userData.protein}
                  carbs={userData.carbs}
                  fat={userData.fat}
                />
                <div className="flex text-xs mt-1 text-gray-500 justify-between">
                  <span>Protein</span>
                  <span>Carbs</span>
                  <span>Fat</span>
                </div>
              </div>
            </div>

            {/* Sleep Tracker */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Sleep</h2>
                  <p className="text-sm text-gray-500">Last night</p>
                </div>
                <Moon className="h-6 w-6 text-indigo-500" />
              </div>

              <div className="flex items-end space-x-2 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  {userData.sleepHours}
                </span>
                <span className="text-lg font-medium text-gray-500 pb-1">
                  hours
                </span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Quality
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {userData.sleepQuality}%
                  </span>
                </div>
                <ProgressBar
                  value={userData.sleepQuality}
                  max={100}
                  colorClass="bg-indigo-500"
                />
              </div>

              <button className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                View sleep details
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>

            {/* Upcoming */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Upcoming
                  </h2>
                  <p className="text-sm text-gray-500">Next events</p>
                </div>
                <Calendar className="h-6 w-6 text-purple-500" />
              </div>

              <div className="space-y-4">
                {userData.appointments.length > 0 && (
                  <div className="border-l-4 border-purple-500 pl-3 py-1">
                    <p className="text-sm font-medium text-gray-900">
                      {userData.appointments[0].expert}
                    </p>
                    <p className="text-xs text-gray-500">
                      {userData.appointments[0].type} •{" "}
                      {userData.appointments[0].date},{" "}
                      {userData.appointments[0].time}
                    </p>
                  </div>
                )}

                {userData.upcomingMeals.length > 0 && (
                  <div className="border-l-4 border-green-500 pl-3 py-1">
                    <p className="text-sm font-medium text-gray-900">
                      {userData.upcomingMeals[0].name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Meal • {userData.upcomingMeals[0].time} •{" "}
                      {userData.upcomingMeals[0].calories} cal
                    </p>
                  </div>
                )}

                {userData.courses.length > 0 && (
                  <div className="border-l-4 border-blue-500 pl-3 py-1">
                    <p className="text-sm font-medium text-gray-900">
                      {userData.courses[0].nextLesson}
                    </p>
                    <p className="text-xs text-gray-500">
                      {userData.courses[0].name} • Next lesson
                    </p>
                  </div>
                )}
              </div>

              <button className="mt-6 text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center">
                View all upcoming
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>

            {/* Meal Plan for Today */}
            <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Today's Meal Plan
                  </h2>
                  <p className="text-sm text-gray-500">Your meals for today</p>
                </div>
                <button
                  className="p-1.5 bg-green-100 rounded-full text-green-600 hover:bg-green-200"
                  onClick={() => setShowAddMealForm(true)}
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                {userData.upcomingMeals.map((meal) => (
                  <div
                    key={meal.id}
                    className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Utensils className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{meal.name}</p>
                        <p className="text-sm text-gray-500">
                          {meal.category.charAt(0).toUpperCase() +
                            meal.category.slice(1)}{" "}
                          • {meal.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {meal.calories} cal
                      </p>
                      <p className="text-xs text-gray-500">
                        {meal.protein}g P • {meal.carbs}g C • {meal.fat}g F
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enrolled Courses */}
          </div>
        )}

        {activeTab === "activity" && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Physical Activity Tracker
                </h2>
                <p className="text-sm text-gray-500">
                  Track your workouts and burned calories
                </p>
              </div>
              <button
                onClick={() => setShowAddActivityForm(true)}
                className="flex items-center bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded text-sm"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Activity
              </button>
            </div>

            {/* Chart for Calories Burned Over Time */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">
                Calories Burned Over Time
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={userData.physicalActivityLogs.slice(-7)}>
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} />
                  <YAxis
                    domain={[0, "dataMax + 100"]}
                    label={{
                      value: "Calories",
                      angle: -90,
                      position: "insideLeft",
                      style: { textAnchor: "middle" },
                    }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="calories"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Calories Burned"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Activity Log Table */}
            <h3 className="text-lg font-medium mb-4">Daily Activity Log</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration (min)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Calories
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userData.physicalActivityLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {log.activity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.calories}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.notes || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "nutrition" && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Nutrition Tracker
                </h2>
                <p className="text-sm text-gray-500">
                  Log and monitor your daily nutrition
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => changeDate(-1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-500" />
                </button>
                <span className="font-medium">{formatDate(selectedDate)}</span>
                <button
                  onClick={() => changeDate(1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <ArrowRight className="h-5 w-5 text-gray-500" />
                </button>
                <button
                  onClick={() => setShowAddMealForm(true)}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Meal
                </button>
              </div>
            </div>

            {/* Nutrition summary for selected date */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Calories</p>
                <p className="text-2xl font-bold">
                  {getCurrentNutritionLog().calories}
                </p>
                <p className="text-xs text-gray-500">
                  Goal: {userData.caloriesGoal}
                </p>
                <ProgressBar
                  value={getCurrentNutritionLog().calories}
                  max={userData.caloriesGoal}
                  colorClass="bg-green-500"
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Protein</p>
                <p className="text-2xl font-bold">
                  {getCurrentNutritionLog().protein}g
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Carbs</p>
                <p className="text-2xl font-bold">
                  {getCurrentNutritionLog().carbs}g
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Fat</p>
                <p className="text-2xl font-bold">
                  {getCurrentNutritionLog().fat}g
                </p>
              </div>
            </div>

            {/* Meals for the day */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Meals</h3>

              {getCurrentNutritionLog().meals &&
              getCurrentNutritionLog().meals.length > 0 ? (
                <div className="space-y-3">
                  {getCurrentNutritionLog().meals.map((meal, index) => (
                    <div
                      key={index}
                      className="flex justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div>
                        <p className="font-medium">{meal.name}</p>
                        <p className="text-sm text-gray-500">{meal.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{meal.calories} cal</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <Utensils className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-gray-500">
                    No meals logged for this day
                  </p>
                  <button
                    onClick={() => setShowAddMealForm(true)}
                    className="mt-3 text-blue-500 font-medium text-sm"
                  >
                    Add your first meal
                  </button>
                </div>
              )}
            </div>

            {/* Nutrition History */}
            <div>
              <h3 className="text-lg font-medium mb-4">Nutrition History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Calories
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Protein
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Carbs
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fat
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userData.nutritionLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {log.calories}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.protein}g
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.carbs}g
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.fat}g
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "sleep" && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Sleep Tracker
                </h2>
                <p className="text-sm text-gray-500">
                  Monitor your sleep patterns and quality
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowAddSleepForm(true)}
                  className="flex items-center bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded text-sm"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Sleep Log
                </button>
              </div>
            </div>

            {/* Sleep summary for selected date */}

            {/* Sleep Trend Chart */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Sleep Trends</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={userData.sleepLogs}>
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} />

                  {/* Left Y Axis for Hours */}
                  <YAxis
                    yAxisId="left"
                    domain={[0, 12]}
                    stroke="#4F46E5"
                    tick={{ fontSize: 12 }}
                    label={{
                      value: "Hours",
                      angle: -90,
                      position: "insideLeft",
                      style: { textAnchor: "middle" },
                    }}
                  />

                  {/* Right Y Axis for Quality */}
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 100]}
                    stroke="#10B981"
                    tick={{ fontSize: 12 }}
                    label={{
                      value: "Quality (%)",
                      angle: -90,
                      position: "insideRight",
                      style: { textAnchor: "middle" },
                    }}
                  />

                  <Tooltip />

                  {/* Line for Hours */}
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="hours"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Hours Slept"
                  />

                  {/* Line for Quality */}
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="quality"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Sleep Quality (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Sleep History Table */}
            <div>
              <h3 className="text-lg font-medium mb-4">Daily Sleep Logs</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hours
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quality
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userData.sleepLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {log.hours}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.quality}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.notes || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "appointments" && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Appointments
                </h2>
                <p className="text-sm text-gray-500">
                  Schedule and manage your wellness sessions
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-medium">Upcoming Appointments</h3>
              {userData.appointments.length > 0 ? (
                userData.appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {appointment.expert}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.type}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {appointment.date}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.time} • {appointment.location}
                        </p>
                      </div>
                    </div>
                    {appointment.notes && (
                      <div className="mt-3 p-2 bg-gray-50 rounded">
                        <p className="text-sm text-gray-700">
                          {appointment.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <User className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-gray-500">No upcoming appointments</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Past Appointments</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Expert
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userData.appointments
                      .slice()
                      .reverse()
                      .map((appointment) => (
                        <tr key={appointment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {appointment.date} {appointment.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {appointment.expert}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {appointment.type}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {appointment.notes}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Add Meal Form Modal */}
        {showAddActivityForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b p-4">
                <h3 className="text-lg font-semibold">Add New Activity</h3>
                <button
                  onClick={() => setShowAddActivityForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleAddActivity} className="p-4 space-y-4">
                {/* Activity Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Activity Name
                  </label>
                  <input
                    type="text"
                    name="activity"
                    value={newActivity.activity}
                    onChange={handleActivityChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={newActivity.date}
                    onChange={handleActivityChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={newActivity.duration}
                    onChange={handleActivityChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Calories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calories Burned
                  </label>
                  <input
                    type="number"
                    name="calories"
                    value={newActivity.calories}
                    onChange={handleActivityChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (optional)
                  </label>
                  <textarea
                    name="notes"
                    value={newActivity.notes}
                    onChange={handleActivityChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddActivityForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Activity
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAddMealForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b p-4">
                <h3 className="text-lg font-semibold">Add New Meal</h3>
                <button
                  onClick={() => setShowAddMealForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleAddMeal} className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meal Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newMeal.name}
                    onChange={handleMealChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={newMeal.category}
                    onChange={handleMealChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={newMeal.time}
                    onChange={handleMealChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Calories
                    </label>
                    <input
                      type="number"
                      name="calories"
                      value={newMeal.calories}
                      onChange={handleMealChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Protein (g)
                    </label>
                    <input
                      type="number"
                      name="protein"
                      value={newMeal.protein}
                      onChange={handleMealChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Carbs (g)
                    </label>
                    <input
                      type="number"
                      name="carbs"
                      value={newMeal.carbs}
                      onChange={handleMealChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fat (g)
                    </label>
                    <input
                      type="number"
                      name="fat"
                      value={newMeal.fat}
                      onChange={handleMealChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddMealForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Meal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Sleep Form Modal */}
        {showAddSleepForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b p-4">
                <h3 className="text-lg font-semibold">Add Sleep Log</h3>
                <button
                  onClick={() => setShowAddSleepForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleAddSleep} className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={newSleep.date}
                    onChange={handleSleepChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hours Slept
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="hours"
                    value={newSleep.hours}
                    onChange={handleSleepChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sleep Quality (1-100)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    name="quality"
                    value={newSleep.quality}
                    onChange={handleSleepChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={newSleep.notes}
                    onChange={handleSleepChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddSleepForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Sleep Log
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Appointment Form Modal */}
      </main>
    </div>
  );
};

export default WellnessDashboard;
