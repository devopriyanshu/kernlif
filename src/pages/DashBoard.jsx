import React, { useState } from "react";
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
} from "lucide-react";

const WellnessDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

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
    upcomingMeals: [
      {
        id: 1,
        name: "Protein Smoothie",
        time: "8:00 AM",
        calories: 320,
        protein: 24,
        carbs: 45,
        fat: 6,
      },
      {
        id: 2,
        name: "Grilled Chicken Salad",
        time: "12:30 PM",
        calories: 420,
        protein: 35,
        carbs: 25,
        fat: 18,
      },
      {
        id: 3,
        name: "Baked Salmon with Veggies",
        time: "6:30 PM",
        calories: 580,
        protein: 42,
        carbs: 30,
        fat: 28,
      },
    ],
    courses: [
      {
        id: 1,
        name: "Mindful Eating Basics",
        progress: 65,
        nextLesson: "Portion Control Strategies",
      },
      {
        id: 2,
        name: "Stress Management",
        progress: 30,
        nextLesson: "Breathing Techniques",
      },
    ],
    appointments: [
      {
        id: 1,
        expert: "Dr. Sarah Williams",
        type: "Nutritionist",
        date: "Mar 12, 2025",
        time: "10:00 AM",
      },
      {
        id: 2,
        expert: "James Chen",
        type: "Sleep Specialist",
        date: "Mar 15, 2025",
        time: "2:30 PM",
      },
    ],
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Wellness Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <button className="bg-white p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
              <Clock className="w-5 h-5" />
            </button>
            <button className="bg-white p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
              <User className="w-5 h-5" />
            </button>
            <div className="relative">
              <img
                className="h-10 w-10 rounded-full"
                src="/api/placeholder/40/40"
                alt="User avatar"
              />
            </div>
          </div>
        </div>
      </header> */}

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
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
              onClick={() => setActiveTab("courses")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "courses"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Courses
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
                <button className="p-1.5 bg-green-100 rounded-full text-green-600 hover:bg-green-200">
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
                        <p className="text-sm text-gray-500">{meal.time}</p>
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
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Courses
                  </h2>
                  <p className="text-sm text-gray-500">
                    Your enrolled programs
                  </p>
                </div>
                <Book className="h-6 w-6 text-blue-500" />
              </div>

              <div className="space-y-4">
                {userData.courses.map((course) => (
                  <div
                    key={course.id}
                    className="border border-gray-100 rounded-lg p-3"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium text-gray-900">{course.name}</p>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                        {course.progress}%
                      </span>
                    </div>
                    <ProgressBar value={course.progress} max={100} />
                    <p className="mt-2 text-sm text-gray-500">
                      Next: {course.nextLesson}
                    </p>
                  </div>
                ))}
              </div>

              <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
                Browse more courses
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        )}

        {activeTab === "nutrition" && (
          <div className="text-center py-16">
            <Utensils className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Nutrition Dashboard
            </h3>
            <p className="mt-1 text-gray-500">
              Detailed nutrition tracking and meal planning would be shown here.
            </p>
          </div>
        )}

        {activeTab === "sleep" && (
          <div className="text-center py-16">
            <Moon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Sleep Dashboard
            </h3>
            <p className="mt-1 text-gray-500">
              Detailed sleep tracking and analytics would be shown here.
            </p>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="text-center py-16">
            <Book className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Courses Dashboard
            </h3>
            <p className="mt-1 text-gray-500">
              Enrolled courses and learning progress would be shown here.
            </p>
          </div>
        )}

        {activeTab === "appointments" && (
          <div className="text-center py-16">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Appointments Dashboard
            </h3>
            <p className="mt-1 text-gray-500">
              Expert appointments and scheduling would be shown here.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default WellnessDashboard;
