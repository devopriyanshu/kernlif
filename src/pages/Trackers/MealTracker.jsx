import React, { useState } from "react";

const MealTracker = () => {
  const [mealType, setMealType] = useState("");
  const [mealItems, setMealItems] = useState("");
  const [calories, setCalories] = useState("");
  const [macros, setMacros] = useState({ protein: "", carbs: "", fats: "" });
  const [beforeMealSugar, setBeforeMealSugar] = useState("");
  const [afterMealSugar, setAfterMealSugar] = useState("");
  const [insights, setInsights] = useState("");

  const analyzeMeal = () => {
    const before = parseFloat(beforeMealSugar);
    const after = parseFloat(afterMealSugar);
    const calorieIntake = parseInt(calories);
    let message = "";

    // Analyze sugar spikes
    if (after - before > 30) {
      message +=
        "⚠️ High sugar spike detected! Reduce carbs & processed sugars.\n";
    } else if (after - before > 10) {
      message +=
        "🟡 Moderate sugar increase. Try adding more fiber & protein.\n";
    } else {
      message += "✅ Blood sugar is stable. Good balance in meals!\n";
    }

    // Analyze calorie intake
    if (calorieIntake > 800) {
      message += "🔥 High-calorie meal! Try balancing portion sizes.\n";
    } else if (calorieIntake < 300) {
      message +=
        "⚠️ Low-calorie meal! Consider adding protein & healthy fats.\n";
    } else {
      message += "✅ Balanced calorie intake for this meal!\n";
    }

    setInsights(message);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Meal, Calories & Sugar Tracker
      </h2>

      {/* Meal Type */}
      <div className="mb-4">
        <label className="block text-lg font-medium">Meal Type:</label>
        <select
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Meal</option>
          <option value="Breakfast">🍳 Breakfast</option>
          <option value="Lunch">🍛 Lunch</option>
          <option value="Dinner">🥗 Dinner</option>
          <option value="Snack">🍪 Snack</option>
        </select>
      </div>

      {/* Meal Items */}
      <div className="mb-4">
        <label className="block text-lg font-medium">Meal Items:</label>
        <input
          type="text"
          value={mealItems}
          onChange={(e) => setMealItems(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="E.g., Rice, Chicken, Salad"
        />
      </div>

      {/* Calories */}
      <div className="mb-4">
        <label className="block text-lg font-medium">Calories (kcal):</label>
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="E.g., 500"
        />
      </div>

      {/* Macronutrients */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-lg font-medium">Protein (g):</label>
          <input
            type="number"
            value={macros.protein}
            onChange={(e) => setMacros({ ...macros, protein: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="E.g., 30"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Carbs (g):</label>
          <input
            type="number"
            value={macros.carbs}
            onChange={(e) => setMacros({ ...macros, carbs: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="E.g., 60"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Fats (g):</label>
          <input
            type="number"
            value={macros.fats}
            onChange={(e) => setMacros({ ...macros, fats: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="E.g., 10"
          />
        </div>
      </div>

      {/* Blood Sugar Before Meal */}
      <div className="mb-4">
        <label className="block text-lg font-medium">
          Blood Sugar Before Meal (mg/dL):
        </label>
        <input
          type="number"
          value={beforeMealSugar}
          onChange={(e) => setBeforeMealSugar(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="E.g., 90"
        />
      </div>

      {/* Blood Sugar After Meal */}
      <div className="mb-4">
        <label className="block text-lg font-medium">
          Blood Sugar After Meal (mg/dL):
        </label>
        <input
          type="number"
          value={afterMealSugar}
          onChange={(e) => setAfterMealSugar(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="E.g., 130"
        />
      </div>

      {/* Analyze Button */}
      <button
        onClick={analyzeMeal}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mt-4"
      >
        Analyze Meal & Sugar Spike
      </button>

      {/* AI-Based Insights */}
      {insights && (
        <div className="mt-6 p-4 bg-gray-100 border-l-4 border-blue-500">
          <p className="text-lg font-semibold whitespace-pre-line">
            {insights}
          </p>
        </div>
      )}
    </div>
  );
};

export default MealTracker;
