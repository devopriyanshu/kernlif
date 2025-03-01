import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const MentalHealthTracking = () => {
  const [mood, setMood] = useState("");
  const [journal, setJournal] = useState("");
  const [stressLevel, setStressLevel] = useState(5);
  const [sleepTime, setSleepTime] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [sleepQuality, setSleepQuality] = useState("");

  const handleSubmit = () => {
    console.log("Mood:", mood);
    console.log("Journal Entry:", journal);
    console.log("Stress Level:", stressLevel);
    console.log("Sleep Time:", sleepTime);
    console.log("Wake Time:", wakeTime);
    console.log("Sleep Quality:", sleepQuality);

    alert("Your mental health log has been submitted!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Mental Health Tracker
      </h2>

      {/* Mood Tracker */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          How do you feel today?
        </h3>
        <div className="flex space-x-4">
          {["😞 Sad", "😐 Neutral", "🙂 Happy", "😃 Excited"].map((m) => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`p-3 text-2xl rounded-lg border ${
                mood === m ? "border-blue-500 bg-blue-100" : "border-gray-300"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Mood Journal */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Write a short journal entry about your feelings:
        </h3>
        <textarea
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          rows="3"
          placeholder="Write your thoughts..."
        />
      </div>

      {/* Stress Level */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          How stressed have you felt today? (1-10)
        </h3>
        <input
          type="range"
          min="1"
          max="10"
          value={stressLevel}
          onChange={(e) => setStressLevel(e.target.value)}
          className="w-full"
        />
        <p className="text-center text-blue-600 font-semibold">
          {stressLevel}/10
        </p>
      </div>

      {/* Sleep Tracking */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Sleep Pattern
        </h3>
        <div className="flex space-x-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Bedtime:</label>
            <input
              type="time"
              value={sleepTime}
              onChange={(e) => setSleepTime(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Wake-up Time:</label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            How was your sleep quality?
          </h3>
          <select
            value={sleepQuality}
            onChange={(e) => setSleepQuality(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select...</option>
            <option value="Poor">😞 Poor</option>
            <option value="Fair">😐 Fair</option>
            <option value="Good">🙂 Good</option>
            <option value="Excellent">😴 Excellent</option>
          </select>
        </div>
      </div>

      {/* AI-Powered Mental Health Assessment */}
      <div className="text-center mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Want an AI-powered mental health assessment?
        </h3>
        <p className="text-gray-600 mb-4">
          Get personalized insights based on your inputs.
        </p>
        <a
          href="/health-check"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full inline-flex items-center"
        >
          Take the Assessment
          <FaArrowRight className="ml-2" />
        </a>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
      >
        Submit Log
      </button>
    </div>
  );
};

export default MentalHealthTracking;
