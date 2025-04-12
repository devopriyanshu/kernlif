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
  Plus,
  List,
  Home,
  BookOpen,
  Bell,
  ClipboardList,
} from "lucide-react";

// Sample client data
const clients = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    joinDate: "2024-01-15",
    lastActive: "2025-03-10",
    status: "active",
    avatar: "AJ",
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria@example.com",
    joinDate: "2024-02-20",
    lastActive: "2025-03-08",
    status: "active",
    avatar: "MG",
  },
  {
    id: 3,
    name: "James Wilson",
    email: "james@example.com",
    joinDate: "2024-03-05",
    lastActive: "2025-03-05",
    status: "active",
    avatar: "JW",
  },
  {
    id: 4,
    name: "Sarah Chen",
    email: "sarah@example.com",
    joinDate: "2023-11-12",
    lastActive: "2025-02-28",
    status: "inactive",
    avatar: "SC",
  },
];

// Sample client details (expanded version of your original userData)
const clientDetails = {
  1: {
    name: "Alex Johnson",
    email: "alex@example.com",
    joinDate: "2024-01-15",
    status: "active",
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
    tasks: [
      {
        id: 1,
        title: "Complete sleep journal",
        dueDate: "2025-03-12",
        completed: false,
        category: "sleep",
      },
      {
        id: 2,
        title: "Submit food log",
        dueDate: "2025-03-15",
        completed: true,
        category: "nutrition",
      },
      {
        id: 3,
        title: "Schedule next check-in",
        dueDate: "2025-03-18",
        completed: false,
        category: "appointment",
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
        ],
      },
    ],
  },
  // Similar structure for other clients...
};

export default function WellnessExpertDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentAction, setAppointmentAction] = useState("");
  const [appointmentNote, setAppointmentNote] = useState("");
  const [view, setView] = useState("clients"); // 'clients' or 'clientDetail'
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [showAddMealModal, setShowAddMealModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: "",
    time: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    category: "breakfast",
  });
  const [newTask, setNewTask] = useState({
    title: "",
    dueDate: "",
    category: "general",
  });

  // Get current client data
  const currentClient = selectedClientId
    ? clientDetails[selectedClientId]
    : null;

  // Calculate averages for current client
  const nutritionAvg = currentClient
    ? {
        calories:
          currentClient.nutritionLogs.reduce(
            (sum, log) => sum + log.calories,
            0
          ) / currentClient.nutritionLogs.length,
        protein:
          currentClient.nutritionLogs.reduce(
            (sum, log) => sum + log.protein,
            0
          ) / currentClient.nutritionLogs.length,
        carbs:
          currentClient.nutritionLogs.reduce((sum, log) => sum + log.carbs, 0) /
          currentClient.nutritionLogs.length,
        fat:
          currentClient.nutritionLogs.reduce((sum, log) => sum + log.fat, 0) /
          currentClient.nutritionLogs.length,
      }
    : null;

  const sleepAvg = currentClient
    ? {
        hours:
          currentClient.sleepLogs.reduce((sum, log) => sum + log.hours, 0) /
          currentClient.sleepLogs.length,
        quality:
          currentClient.sleepLogs.reduce((sum, log) => sum + log.quality, 0) /
          currentClient.sleepLogs.length,
      }
    : null;

  const handleAddMeal = () => {
    // In a real app, this would submit to a backend
    alert(`Meal added: ${newMeal.name}`);
    setShowAddMealModal(false);
    setNewMeal({
      name: "",
      time: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      category: "breakfast",
    });
  };

  const handleAddTask = () => {
    // In a real app, this would submit to a backend
    alert(`Task added: ${newTask.title}`);
    setShowAddTaskModal(false);
    setNewTask({
      title: "",
      dueDate: "",
      category: "general",
    });
  };

  const handleClientSelect = (clientId) => {
    setSelectedClientId(clientId);
    setView("clientDetail");
    setActiveTab("overview");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Wellness Expert Dashboard</h1>
            <div className="flex items-center space-x-4">
              {view === "clientDetail" && (
                <button
                  onClick={() => setView("clients")}
                  className="flex items-center text-white hover:bg-blue-700 px-3 py-1 rounded"
                >
                  <ChevronRight
                    className="transform rotate-180 mr-1"
                    size={16}
                  />
                  Back to Clients
                </button>
              )}
              <div className="bg-blue-500 p-2 rounded-full">
                <User size={20} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-6">
        {view === "clients" ? (
          <ClientListView
            clients={clients}
            onSelectClient={handleClientSelect}
          />
        ) : (
          <>
            {/* Client Header */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">
                    {currentClient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{currentClient.name}</h2>
                    <p className="text-gray-600">{currentClient.email}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAddMealModal(true)}
                    className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Meal
                  </button>
                  <button
                    onClick={() => setShowAddTaskModal(true)}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Task
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="bg-white shadow mb-6">
              <div className="flex space-x-6 p-4">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-3 py-2 rounded-md flex items-center ${
                    activeTab === "overview"
                      ? "bg-blue-100 text-blue-600 font-medium"
                      : "text-gray-600"
                  }`}
                >
                  <Home size={16} className="mr-1" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("nutrition")}
                  className={`px-3 py-2 rounded-md flex items-center ${
                    activeTab === "nutrition"
                      ? "bg-blue-100 text-blue-600 font-medium"
                      : "text-gray-600"
                  }`}
                >
                  <Apple size={16} className="mr-1" />
                  Nutrition
                </button>
                <button
                  onClick={() => setActiveTab("sleep")}
                  className={`px-3 py-2 rounded-md flex items-center ${
                    activeTab === "sleep"
                      ? "bg-blue-100 text-blue-600 font-medium"
                      : "text-gray-600"
                  }`}
                >
                  <Moon size={16} className="mr-1" />
                  Sleep
                </button>
                <button
                  onClick={() => setActiveTab("tasks")}
                  className={`px-3 py-2 rounded-md flex items-center ${
                    activeTab === "tasks"
                      ? "bg-blue-100 text-blue-600 font-medium"
                      : "text-gray-600"
                  }`}
                >
                  <ClipboardList size={16} className="mr-1" />
                  Tasks
                </button>
                <button
                  onClick={() => setActiveTab("appointments")}
                  className={`px-3 py-2 rounded-md flex items-center ${
                    activeTab === "appointments"
                      ? "bg-blue-100 text-blue-600 font-medium"
                      : "text-gray-600"
                  }`}
                >
                  <Calendar size={16} className="mr-1" />
                  Appointments
                </button>
                <button
                  onClick={() => setActiveTab("courses")}
                  className={`px-3 py-2 rounded-md flex items-center ${
                    activeTab === "courses"
                      ? "bg-blue-100 text-blue-600 font-medium"
                      : "text-gray-600"
                  }`}
                >
                  <BookOpen size={16} className="mr-1" />
                  Courses
                </button>
              </div>
            </nav>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <OverviewTab
                client={currentClient}
                nutritionAvg={nutritionAvg}
                sleepAvg={sleepAvg}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === "nutrition" && (
              <NutritionTab
                client={currentClient}
                nutritionAvg={nutritionAvg}
              />
            )}

            {activeTab === "sleep" && (
              <SleepTab client={currentClient} sleepAvg={sleepAvg} />
            )}

            {activeTab === "tasks" && <TasksTab tasks={currentClient.tasks} />}

            {activeTab === "appointments" && (
              <AppointmentsTab
                appointments={currentClient.appointments}
                selectedAppointment={selectedAppointment}
                appointmentAction={appointmentAction}
                appointmentNote={appointmentNote}
                onAppointmentSelect={handleAppointmentSelect}
                onAppointmentAction={handleAppointmentAction}
                setAppointmentAction={setAppointmentAction}
                setAppointmentNote={setAppointmentNote}
                setSelectedAppointment={setSelectedAppointment}
              />
            )}

            {activeTab === "courses" && (
              <CoursesTab courses={currentClient.courses} />
            )}
          </>
        )}
      </main>

      {/* Modals */}
      {showAddMealModal && (
        <AddMealModal
          newMeal={newMeal}
          setNewMeal={setNewMeal}
          onClose={() => setShowAddMealModal(false)}
          onSubmit={handleAddMeal}
        />
      )}

      {showAddTaskModal && (
        <AddTaskModal
          newTask={newTask}
          setNewTask={setNewTask}
          onClose={() => setShowAddTaskModal(false)}
          onSubmit={handleAddTask}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center text-sm">
          <p>Wellness Expert Dashboard &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

// Component for client list view
function ClientListView({ clients, onSelectClient }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Your Clients</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-medium">
                      {client.avatar}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {client.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.lastActive}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      client.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onSelectClient(client.id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Component for Overview Tab
function OverviewTab({ client, nutritionAvg, sleepAvg, setActiveTab }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Client Summary Card */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <User className="mr-2 text-blue-500" />
          Client Summary
        </h2>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Member Since</p>
            <p className="font-medium">{client.joinDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium capitalize">{client.status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Goals</p>
            <ul className="list-disc list-inside mt-1">
              <li>Calories: {client.caloriesGoal} kcal/day</li>
              <li>Protein: {client.protein}g/day</li>
              <li>Sleep: 8 hours/night</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Nutrition Summary Card */}
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
                {Math.round(nutritionAvg.calories)} / {client.caloriesGoal}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: `${Math.min(
                    100,
                    (nutritionAvg.calories / client.caloriesGoal) * 100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Protein</p>
              <p className="font-bold">{Math.round(nutritionAvg.protein)}g</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Carbs</p>
              <p className="font-bold">{Math.round(nutritionAvg.carbs)}g</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Fat</p>
              <p className="font-bold">{Math.round(nutritionAvg.fat)}g</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab("nutrition")}
            className="text-blue-500 text-sm flex items-center mt-2"
          >
            View detailed nutrition
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Sleep Summary Card */}
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
          <button
            onClick={() => setActiveTab("sleep")}
            className="text-blue-500 text-sm flex items-center mt-2"
          >
            View detailed sleep data
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Upcoming Meals Card */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Coffee className="mr-2 text-yellow-500" />
          Today's Meals
        </h2>
        <div className="space-y-3">
          {client.upcomingMeals.slice(0, 3).map((meal) => (
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
          <button
            onClick={() => setActiveTab("nutrition")}
            className="text-blue-500 text-sm flex items-center mt-2"
          >
            View all meals
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Tasks Card */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <ClipboardList className="mr-2 text-purple-500" />
          Recent Tasks
        </h2>
        <div className="space-y-3">
          {client.tasks.slice(0, 3).map((task) => (
            <div key={task.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  readOnly
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span
                  className={`ml-2 ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </span>
              </div>
              <span className="text-sm text-gray-500">{task.dueDate}</span>
            </div>
          ))}
          <button
            onClick={() => setActiveTab("tasks")}
            className="text-blue-500 text-sm flex items-center mt-2"
          >
            View all tasks
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Recommendations Card */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <AlertCircle className="mr-2 text-red-500" />
          Recommendations
        </h2>
        <div className="space-y-3">
          <div className="p-3 bg-yellow-50 rounded-md">
            <p className="font-medium">Calorie Deficit</p>
            <p className="text-sm mt-1">
              Client is consistently under their calorie goal by ~350 calories.
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-md">
            <p className="font-medium">Sleep Quality</p>
            <p className="text-sm mt-1">
              Suggest reducing screen time before bed to improve sleep quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for Nutrition Tab
function NutritionTab({ client, nutritionAvg }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Nutrition Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-500">Daily Goal</p>
            <p className="text-2xl font-bold">{client.caloriesGoal} cal</p>
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
              {Math.round(nutritionAvg.calories - client.caloriesGoal)} cal
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-500">Compliance</p>
            <p className="text-2xl font-bold">
              {Math.round((nutritionAvg.calories / client.caloriesGoal) * 100)}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Macronutrient Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium mb-2">Protein</h3>
            <div className="flex justify-between mb-1">
              <span className="text-sm">
                {Math.round(nutritionAvg.protein)}g
              </span>
              <span className="text-sm text-gray-500">
                {client.protein}g goal
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{
                  width: `${Math.min(
                    100,
                    (nutritionAvg.protein / client.protein) * 100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Carbohydrates</h3>
            <div className="flex justify-between mb-1">
              <span className="text-sm">{Math.round(nutritionAvg.carbs)}g</span>
              <span className="text-sm text-gray-500">
                {client.carbs}g goal
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{
                  width: `${Math.min(
                    100,
                    (nutritionAvg.carbs / client.carbs) * 100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Fat</h3>
            <div className="flex justify-between mb-1">
              <span className="text-sm">{Math.round(nutritionAvg.fat)}g</span>
              <span className="text-sm text-gray-500">{client.fat}g goal</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: `${Math.min(
                    100,
                    (nutritionAvg.fat / client.fat) * 100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Meal Plan</h2>
        <div className="space-y-4">
          {["breakfast", "lunch", "dinner", "snacks"].map((category) => {
            const meals = client.upcomingMeals.filter(
              (meal) => meal.category === category
            );
            if (meals.length === 0) return null;

            return (
              <div
                key={category}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h3 className="font-bold text-lg capitalize mb-3">
                  {category}
                </h3>
                <div className="space-y-3">
                  {meals.map((meal) => (
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
            );
          })}
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
              {client.nutritionLogs.map((log) => (
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
    </div>
  );
}

// Component for Sleep Tab
function SleepTab({ client, sleepAvg }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Sleep Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-gray-500">Average Hours</p>
            <p className="text-2xl font-bold">{sleepAvg.hours.toFixed(1)}</p>
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
              {client.sleepLogs.map((log) => (
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
              Client's sleep schedule varies by more than 2 hours on average.
              Recommend establishing a more consistent bedtime routine.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium mb-2">Sleep Environment</h3>
            <p className="text-sm">
              Based on quality metrics, suggest reducing screen time before bed
              and maintaining a cooler bedroom temperature.
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
  );
}

// Component for Tasks Tab
function TasksTab({ tasks }) {
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tasks</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-md ${
                filter === "all" ? "bg-blue-100 text-blue-600" : "bg-gray-100"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-3 py-1 rounded-md ${
                filter === "pending"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-3 py-1 rounded-md ${
                filter === "completed"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100"
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No tasks found</p>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <div className="ml-3">
                    <p
                      className={`font-medium ${
                        task.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">
                      {task.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{task.dueDate}</span>
                  <button className="text-blue-500 hover:text-blue-700">
                    Edit
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Component for Appointments Tab
function AppointmentsTab({
  appointments,
  selectedAppointment,
  appointmentAction,
  appointmentNote,
  onAppointmentSelect,
  onAppointmentAction,
  setAppointmentAction,
  setAppointmentNote,
  setSelectedAppointment,
}) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => onAppointmentSelect(appointment)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{appointment.expert}</h3>
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
              <h3 className="text-xl font-bold mb-2">Manage Appointment</h3>
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
                  onClick={onAppointmentAction}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Component for Courses Tab
function CoursesTab({ courses }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Active Courses</h2>
        <div className="space-y-4">
          {courses.map((course) => (
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
                  <p className="font-medium">{course.progress}% Complete</p>
                  <p className="text-sm text-gray-500">
                    {course.completedLessons}/{course.totalLessons} lessons
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
              Learn the importance of proper hydration and how to track your
              water intake.
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
  );
}

// Component for Add Meal Modal
function AddMealModal({ newMeal, setNewMeal, onClose, onSubmit }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Add New Meal</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meal Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newMeal.name}
                onChange={(e) =>
                  setNewMeal({ ...newMeal, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newMeal.time}
                onChange={(e) =>
                  setNewMeal({ ...newMeal, time: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newMeal.category}
                onChange={(e) =>
                  setNewMeal({ ...newMeal, category: e.target.value })
                }
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calories
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newMeal.calories}
                  onChange={(e) =>
                    setNewMeal({ ...newMeal, calories: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Protein (g)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newMeal.protein}
                  onChange={(e) =>
                    setNewMeal({ ...newMeal, protein: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Carbs (g)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newMeal.carbs}
                  onChange={(e) =>
                    setNewMeal({ ...newMeal, carbs: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fat (g)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newMeal.fat}
                  onChange={(e) =>
                    setNewMeal({ ...newMeal, fat: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={onSubmit}
            >
              Add Meal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for Add Task Modal
function AddTaskModal({ newTask, setNewTask, onClose, onSubmit }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Add New Task</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Title
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask({ ...newTask, dueDate: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newTask.category}
                onChange={(e) =>
                  setNewTask({ ...newTask, category: e.target.value })
                }
              >
                <option value="general">General</option>
                <option value="nutrition">Nutrition</option>
                <option value="sleep">Sleep</option>
                <option value="exercise">Exercise</option>
                <option value="appointment">Appointment</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={onSubmit}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
