import React, { useState } from "react";

const SleepLogs = () => {
  const [sleepDuration, setSleepDuration] = useState("");
  const [sleepQuality, setSleepQuality] = useState("");

  const handleSubmit = () => {
    console.log({ sleepDuration, sleepQuality });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-semibold text-yellow-600 mb-4">
        Log Your Sleep
      </h2>
      <div className="w-full max-w-md space-y-6">
        <div>
          <label className="block text-gray-700">Sleep Duration (hours)</label>
          <input
            type="number"
            min="1"
            value={sleepDuration}
            onChange={(e) => setSleepDuration(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>

        <div>
          <label className="block text-gray-700">Sleep Quality</label>
          <select
            value={sleepQuality}
            onChange={(e) => setSleepQuality(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          >
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-500 text-white py-2 rounded-full mt-4"
        >
          Submit Sleep Log
        </button>
      </div>
    </div>
  );
};

export default SleepLogs;
