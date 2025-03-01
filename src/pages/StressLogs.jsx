import React, { useState } from "react";

const StressLogs = () => {
  const [stressLevel, setStressLevel] = useState("");
  const [stressors, setStressors] = useState("");

  const handleSubmit = () => {
    console.log({ stressLevel, stressors });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-semibold text-green-600 mb-4">
        Log Your Stress Level
      </h2>
      <div className="w-full max-w-md space-y-6">
        <div>
          <label className="block text-gray-700">Stress Level (1-10)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={stressLevel}
            onChange={(e) => setStressLevel(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>

        <div>
          <label className="block text-gray-700">Stressors</label>
          <textarea
            value={stressors}
            onChange={(e) => setStressors(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            rows="4"
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white py-2 rounded-full mt-4"
        >
          Submit Stress Log
        </button>
      </div>
    </div>
  );
};

export default StressLogs;
