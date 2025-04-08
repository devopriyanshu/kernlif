import { useState } from "react";
import {
  Calendar,
  Clock,
  AlertCircle,
  User,
  Coffee,
  Utensils,
  Apple,
  Moon,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

export default function WellnessExpertDashboard() {
  // Sample data from your provided dataset
  const userData = {
    name: "Alex Johnson",
    dailyCalories: 1850,
    caloriesGoal: 2200,
    protein: 85,
    carbs: 210,
    fat: 62,
    sleepHours: 7.5,
    sleepQuality: 85,
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

  // State for active tab in dashboard
  const [activeTab, setActiveTab] = useState("overview");

  // State for appointment management
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentAction, setAppointmentAction] = useState("");
  const [appointmentNote, setAppointmentNote] = useState("");

  // Calculate nutrition and sleep averages
  const nutritionAvg = {
    calories:
      userData.nutritionLogs.reduce((sum, log) => sum + log.calories, 0) /
      userData.nutritionLogs.length,
    protein:
      userData.nutritionLogs.reduce((sum, log) => sum + log.protein, 0) /
      userData.nutritionLogs.length,
    carbs:
      userData.nutritionLogs.reduce((sum, log) => sum + log.carbs, 0) /
      userData.nutritionLogs.length,
    fat:
      userData.nutritionLogs.reduce((sum, log) => sum + log.fat, 0) /
      userData.nutritionLogs.length,
  };

  const sleepAvg = {
    hours:
      userData.sleepLogs.reduce((sum, log) => sum + log.hours, 0) /
      userData.sleepLogs.length,
    quality:
      userData.sleepLogs.reduce((sum, log) => sum + log.quality, 0) /
      userData.sleepLogs.length,
  };

  // Handle appointment selection
  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment);
    setAppointmentNote("");
    setAppointmentAction("");
  };

  // Handle submitting appointment action
  const handleAppointmentAction = () => {
    // In a real app, this would submit to a backend
    alert(
      `Action "${appointmentAction}" submitted for appointment with ${selectedAppointment.expert}`
    );
    setSelectedAppointment(null);
    setAppointmentAction("");
    setAppointmentNote("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Wellness Expert Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="font-medium">
                Expert View: Client {userData.name}
              </span>
              <div className="bg-blue-500 p-2 rounded-full">
                <User size={20} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="container mx-auto">
          <div className="flex space-x-6 p-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-3 py-2 rounded-md ${
                activeTab === "overview"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("nutrition")}
              className={`px-3 py-2 rounded-md ${
                activeTab === "nutrition"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600"
              }`}
            >
              Nutrition
            </button>
            <button
              onClick={() => setActiveTab("sleep")}
              className={`px-3 py-2 rounded-md ${
                activeTab === "sleep"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600"
              }`}
            >
              Sleep
            </button>
            <button
              onClick={() => setActiveTab("appointments")}
              className={`px-3 py-2 rounded-md ${
                activeTab === "appointments"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600"
              }`}
            >
              Appointments
            </button>
            <button
              onClick={() => setActiveTab("courses")}
              className={`px-3 py-2 rounded-md ${
                activeTab === "courses"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600"
              }`}
            >
              Courses
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <User className="mr-2 text-blue-500" />
                Client Information
              </h2>
              <p className="font-bold text-2xl">{userData.name}</p>
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 p-3 rounded-md">
                    <p className="text-sm text-gray-500">Daily Cal Goal</p>
                    <p className="font-bold">{userData.caloriesGoal}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <p className="text-sm text-gray-500">Current Intake</p>
                    <p className="font-bold">{userData.dailyCalories}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <p className="text-sm text-gray-500">Sleep Goal</p>
                    <p className="font-bold">8 hours</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <p className="text-sm text-gray-500">Current Sleep</p>
                    <p className="font-bold">{userData.sleepHours} hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Utensils className="mr-2 text-green-500" />
                Nutrition Summary
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Calories</span>
                    <span className="text-sm text-gray-500">
                      {Math.round(nutritionAvg.calories)} /{" "}
                      {userData.caloriesGoal}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (nutritionAvg.calories / userData.caloriesGoal) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Protein</p>
                    <p className="font-bold">
                      {Math.round(nutritionAvg.protein)}g
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Carbs</p>
                    <p className="font-bold">
                      {Math.round(nutritionAvg.carbs)}g
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Fat</p>
                    <p className="font-bold">{Math.round(nutritionAvg.fat)}g</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Moon className="mr-2 text-indigo-500" />
                Sleep Summary
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Hours</span>
                    <span className="text-sm text-gray-500">
                      {sleepAvg.hours.toFixed(1)} / 8.0
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(100, (sleepAvg.hours / 8) * 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Quality</span>
                    <span className="text-sm text-gray-500">
                      {Math.round(sleepAvg.quality)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{ width: `${sleepAvg.quality}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Calendar className="mr-2 text-red-500" />
                Upcoming Appointments
              </h2>
              <div className="space-y-3">
                {userData.appointments.slice(0, 2).map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border-l-4 border-red-400 pl-3 py-2"
                  >
                    <p className="font-medium">{appointment.expert}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      {appointment.date}, {appointment.time}
                    </div>
                    <p className="text-sm mt-1">{appointment.notes}</p>
                  </div>
                ))}
                <button
                  onClick={() => setActiveTab("appointments")}
                  className="text-blue-500 text-sm flex items-center mt-2"
                >
                  View all appointments
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Coffee className="mr-2 text-yellow-500" />
                Today's Meals
              </h2>
              <div className="space-y-3">
                {userData.upcomingMeals.map((meal) => (
                  <div
                    key={meal.id}
                    className="flex justify-between border-b border-gray-100 pb-3"
                  >
                    <div>
                      <p className="font-medium">{meal.name}</p>
                      <p className="text-sm text-gray-500">{meal.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{meal.calories} cal</p>
                      <p className="text-xs text-gray-500">
                        P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <AlertCircle className="mr-2 text-purple-500" />
                Recommendations
              </h2>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-md">
                  <p className="font-medium">Calorie Deficit</p>
                  <p className="text-sm mt-1">
                    Client is consistently under their calorie goal by ~350
                    calories.
                  </p>
                </div>
                <div className="p-3 bg-red-50 rounded-md">
                  <p className="font-medium">Sleep Quality</p>
                  <p className="text-sm mt-1">
                    Sleep quality dipped on Mar 3rd. Consider discussing stress
                    factors.
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-md">
                  <p className="font-medium">Protein Intake</p>
                  <p className="text-sm mt-1">
                    Protein intake is on target. Great progress!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nutrition Tab */}
        {activeTab === "nutrition" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Nutrition Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-500">Daily Goal</p>
                  <p className="text-2xl font-bold">
                    {userData.caloriesGoal} cal
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-500">Current Avg</p>
                  <p className="text-2xl font-bold">
                    {Math.round(nutritionAvg.calories)} cal
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-500">Deficit/Surplus</p>
                  <p className="text-2xl font-bold">
                    {Math.round(nutritionAvg.calories - userData.caloriesGoal)}{" "}
                    cal
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-500">Compliance</p>
                  <p className="text-2xl font-bold">
                    {Math.round(
                      (nutritionAvg.calories / userData.caloriesGoal) * 100
                    )}
                    %
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">
                Macronutrient Breakdown
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Protein</h3>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">
                      {Math.round(nutritionAvg.protein)}g
                    </span>
                    <span className="text-sm text-gray-500">
                      {userData.protein}g goal
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (nutritionAvg.protein / userData.protein) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Carbohydrates</h3>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">
                      {Math.round(nutritionAvg.carbs)}g
                    </span>
                    <span className="text-sm text-gray-500">
                      {userData.carbs}g goal
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (nutritionAvg.carbs / userData.carbs) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Fat</h3>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">
                      {Math.round(nutritionAvg.fat)}g
                    </span>
                    <span className="text-sm text-gray-500">
                      {userData.fat}g goal
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (nutritionAvg.fat / userData.fat) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Nutrition Log</h2>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Meals
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userData.nutritionLogs.map((log) => (
                      <tr key={log.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {log.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {log.meals.map((meal, idx) => (
                            <div key={idx} className="mb-1">
                              <span className="font-medium">{meal.name}</span> -{" "}
                              {meal.calories} cal
                            </div>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">
                Expert Notes & Recommendations
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Nutrition Note
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Enter your observations and recommendations..."
                ></textarea>
              </div>
              <div className="flex justify-between">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Save Note
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Update Nutrition Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sleep Tab */}
        {activeTab === "sleep" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Sleep Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <p className="text-sm text-gray-500">Average Hours</p>
                  <p className="text-2xl font-bold">
                    {sleepAvg.hours.toFixed(1)}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-500">Goal Hours</p>
                  <p className="text-2xl font-bold">8.0</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-500">Quality</p>
                  <p className="text-2xl font-bold">
                    {Math.round(sleepAvg.quality)}%
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-500">Trend</p>
                  <p className="text-2xl font-bold">Stable</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Sleep Log</h2>
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
                      <tr key={log.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {log.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.hours}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-2 max-w-xs">
                              <div
                                className={`h-2 rounded-full ${
                                  log.quality >= 85
                                    ? "bg-green-500"
                                    : log.quality >= 70
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${log.quality}%` }}
                              ></div>
                            </div>
                            <span>{log.quality}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Sleep Trends</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">
                  Sleep trend chart visualization would appear here
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Expert Recommendations</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium mb-2">Sleep Consistency</h3>
                  <p className="text-sm">
                    Client's sleep schedule varies by more than 2 hours on
                    average. Recommend establishing a more consistent bedtime
                    routine.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium mb-2">Sleep Environment</h3>
                  <p className="text-sm">
                    Based on quality metrics, suggest reducing screen time
                    before bed and maintaining a cooler bedroom temperature.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Sleep Note
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Enter your sleep recommendations..."
                ></textarea>
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Save Recommendations
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
              <div className="space-y-4">
                {userData.appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleAppointmentSelect(appointment)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">
                          {appointment.expert}
                        </h3>
                        <p className="text-gray-600">{appointment.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{appointment.date}</p>
                        <p className="text-gray-600">{appointment.time}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Location:</span>{" "}
                        {appointment.location}
                      </p>
                      <p className="text-sm mt-1">
                        <span className="font-medium">Notes:</span>{" "}
                        {appointment.notes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Appointment Management Modal */}
            {selectedAppointment && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      Manage Appointment
                    </h3>
                    <p className="mb-4">
                      <span className="font-medium">With:</span>{" "}
                      {selectedAppointment.expert}
                      <br />
                      <span className="font-medium">When:</span>{" "}
                      {selectedAppointment.date} at {selectedAppointment.time}
                    </p>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Action
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={appointmentAction}
                        onChange={(e) => setAppointmentAction(e.target.value)}
                      >
                        <option value="">Select action</option>
                        <option value="confirm">Confirm Appointment</option>
                        <option value="reschedule">Request Reschedule</option>
                        <option value="cancel">Cancel Appointment</option>
                        <option value="completed">Mark as Completed</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notes
                      </label>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows="3"
                        placeholder="Add any notes or instructions..."
                        value={appointmentNote}
                        onChange={(e) => setAppointmentNote(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        className="px-4 py-2 border border-gray-300 rounded-md"
                        onClick={() => setSelectedAppointment(null)}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={handleAppointmentAction}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Active Courses</h2>
              <div className="space-y-4">
                {userData.courses.map((course) => (
                  <div
                    key={course.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{course.name}</h3>
                        <p className="text-gray-600">{course.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {course.progress}% Complete
                        </p>
                        <p className="text-sm text-gray-500">
                          {course.completedLessons}/{course.totalLessons}{" "}
                          lessons
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm">
                        <span className="font-medium">Next Lesson:</span>{" "}
                        {course.nextLesson}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm">
                        View Details
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-600 rounded-md text-sm">
                        Send Reminder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Course Recommendations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold">Hydration Fundamentals</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Learn the importance of proper hydration and how to track
                    your water intake.
                  </p>
                  <button className="mt-3 px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
                    Assign Course
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold">Mindful Movement</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Gentle exercises to improve mobility and reduce stress.
                  </p>
                  <button className="mt-3 px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
                    Assign Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center text-sm">
          <p>Wellness Expert Dashboard &copy; {new Date().getFullYear()}</p>
          <p className="mt-1">For client: {userData.name}</p>
        </div>
      </footer>
    </div>
  );
}
