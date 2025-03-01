import React, { useState } from "react";

const PhysicalTracking = () => {
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [intensity, setIntensity] = useState("");
  const [insights, setInsights] = useState("");

  const analyzeWorkout = () => {
    const durationNum = parseInt(duration);
    const calories = parseInt(caloriesBurned);
    const heartRateNum = parseInt(heartRate);
    let message = "";

    // Analyze intensity & duration
    if (durationNum > 90) {
      message += "⚠️ Long workout detected! Ensure you're not overtraining.\n";
    } else if (durationNum < 20) {
      message +=
        "⏳ Consider increasing workout duration for better fitness.\n";
    } else {
      message += "✅ Balanced workout duration!\n";
    }

    // Analyze calories burned
    if (calories < 200) {
      message += "🔥 Low calorie burn. Try increasing workout intensity.\n";
    } else if (calories > 600) {
      message += "💪 Great workout! Your calorie burn is high!\n";
    }

    // Analyze heart rate
    if (heartRateNum > 160) {
      message +=
        "❤️ High heart rate detected. Ensure adequate hydration & rest.\n";
    } else if (heartRateNum < 90) {
      message +=
        "🧘‍♂️ Low intensity detected. Consider higher effort exercises.\n";
    }

    setInsights(message);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Physical Activity & Workout Tracker
      </h2>

      {/* Exercise Name */}
      <div className="mb-4">
        <label className="block text-lg font-medium">Exercise:</label>
        <input
          type="text"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="E.g., Running, Yoga, Strength Training"
        />
      </div>

      {/* Workout Intensity */}
      <div className="mb-4">
        <label className="block text-lg font-medium">Workout Intensity:</label>
        <select
          value={intensity}
          onChange={(e) => setIntensity(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Intensity</option>
          <option value="Low">💙 Low</option>
          <option value="Medium">💛 Medium</option>
          <option value="High">❤️ High</option>
        </select>
      </div>

      {/* Duration */}
      <div className="mb-4">
        <label className="block text-lg font-medium">Duration (Minutes):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="E.g., 45"
        />
      </div>

      {/* Calories Burned */}
      <div className="mb-4">
        <label className="block text-lg font-medium">Calories Burned:</label>
        <input
          type="number"
          value={caloriesBurned}
          onChange={(e) => setCaloriesBurned(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="E.g., 300"
        />
      </div>

      {/* Heart Rate */}
      <div className="mb-4">
        <label className="block text-lg font-medium">
          Average Heart Rate (bpm):
        </label>
        <input
          type="number"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="E.g., 120"
        />
      </div>

      {/* Analyze Button */}
      <button
        onClick={analyzeWorkout}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mt-4"
      >
        Analyze Workout
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

export default PhysicalTracking;
