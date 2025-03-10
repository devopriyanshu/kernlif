import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Heart,
  HomeIcon,
  Utensils,
} from "lucide-react";

const WellnessAssessment = () => {
  const [currentTab, setCurrentTab] = useState("lifestyle");
  const [progress, setProgress] = useState(20);
  const [results, setResults] = useState(null);

  // Form states
  const [lifestyle, setLifestyle] = useState({
    sleepHours: "",
    exerciseFrequency: "",
    workHours: "",
    screenTime: "",
    relaxationTime: "",
  });

  const [nutrition, setNutrition] = useState({
    mealsPerDay: "",
    waterIntake: "",
    fruitVeggieServings: "",
    proteinSource: "",
    dietaryRestrictions: [],
  });

  const [mentalWellbeing, setMentalWellbeing] = useState({
    stressLevel: 5,
    anxietyFrequency: "",
    moodStability: "",
    concentration: "",
    overallSatisfaction: "",
  });

  const [fitnessGoals, setFitnessGoals] = useState({
    primaryGoal: "",
    preferredActivities: [],
    timeAvailable: "",
    supportNeeded: "",
    obstacles: "",
  });

  const handleTabChange = (value) => {
    setCurrentTab(value);
    // Update progress based on tab
    const progressMap = {
      lifestyle: 20,
      nutrition: 40,
      mentalWellbeing: 60,
      fitnessGoals: 80,
      results: 100,
    };
    setProgress(progressMap[value]);
  };

  const handleSubmit = () => {
    // Calculate results based on inputs
    const results = {
      wellnessScore: calculateWellnessScore(),
      recommendations: generateRecommendations(),
    };
    setResults(results);
    handleTabChange("results");
  };

  const calculateWellnessScore = () => {
    // Simple scoring algorithm - in a real app, this would be more sophisticated
    let score = 0;

    // Sleep score (0-20)
    const sleepHours = parseInt(lifestyle.sleepHours) || 0;
    score += sleepHours >= 7 && sleepHours <= 9 ? 20 : sleepHours >= 6 ? 10 : 5;

    // Exercise score (0-20)
    const exerciseMap = {
      never: 0,
      rarely: 5,
      sometimes: 10,
      regularly: 15,
      daily: 20,
    };
    score += exerciseMap[lifestyle.exerciseFrequency] || 0;

    // Nutrition score (0-20)
    const fruitsVeggies = parseInt(nutrition.fruitVeggieServings) || 0;
    score += fruitsVeggies >= 5 ? 20 : fruitsVeggies >= 3 ? 10 : 5;

    // Stress score (0-20)
    const stressScore = 20 - (parseInt(mentalWellbeing.stressLevel) || 5) * 2;
    score += stressScore;

    // Satisfaction score (0-20)
    const satisfactionMap = {
      "very low": 0,
      low: 5,
      moderate: 10,
      high: 15,
      "very high": 20,
    };
    score += satisfactionMap[mentalWellbeing.overallSatisfaction] || 10;

    return Math.min(Math.max(Math.round(score / 5), 0), 100); // Get score as 0-100
  };

  const generateRecommendations = () => {
    const recommendations = [];

    // Lifestyle recommendations
    if (parseInt(lifestyle.sleepHours) < 7) {
      recommendations.push({
        type: "sleep",
        title: "Sleep Consultation",
        description:
          "Our sleep specialists can help you develop healthier sleep patterns",
      });
    }

    // Exercise recommendations
    if (
      lifestyle.exerciseFrequency === "never" ||
      lifestyle.exerciseFrequency === "rarely"
    ) {
      recommendations.push({
        type: "fitness",
        title: "Personal Training Sessions",
        description:
          "Our trainers can create a beginner-friendly fitness plan for your needs",
      });
    }

    // Nutrition recommendations
    if (parseInt(nutrition.fruitVeggieServings) < 3) {
      recommendations.push({
        type: "nutrition",
        title: "Nutrition Counseling",
        description:
          "Learn how to integrate more nutritious foods into your daily meals",
      });
    }

    // Mental wellbeing recommendations
    if (parseInt(mentalWellbeing.stressLevel) > 7) {
      recommendations.push({
        type: "mental",
        title: "Stress Management Program",
        description:
          "Our 6-week program helps you develop effective coping mechanisms",
      });
    }

    // Add general wellness recommendation if few specific ones
    if (recommendations.length < 2) {
      recommendations.push({
        type: "general",
        title: "Wellness Membership",
        description:
          "Access to all our facilities and experts to maintain your healthy lifestyle",
      });
    }

    return recommendations;
  };

  return (
    <div className=" py-6">
      <div className="border-0 rounded-lg">
        {/* Header */}
        <div className=" bg-gradient-to-r from-blue-500 to-teal-400 ">
          <div className="max-w-7xl mx-auto text-white rounded-t-lg p-6">
            <h1 className="text-3xl font-bold">Complete Wellness Assessment</h1>
            <p className="text-white text-lg opacity-90 mt-2">
              Discover your wellness profile and personalized recommendations
            </p>
            <div className="h-2 mt-4 bg-white/20 rounded-full">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto ">
          <div className="grid grid-cols-5  w-full rounded-none border-b place-items-center">
            {[
              { value: "lifestyle", icon: HomeIcon, label: "Lifestyle" },
              { value: "nutrition", icon: Utensils, label: "Nutrition" },
              { value: "mentalWellbeing", icon: Clock, label: "Mental" },
              { value: "fitnessGoals", icon: Heart, label: "Fitness" },
              { value: "results", icon: CheckCircle, label: "Results" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleTabChange(tab.value)}
                disabled={currentTab === "results" && tab.value !== "results"}
                className={`flex flex-col items-center justify-center p-4 ${
                  currentTab === tab.value
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
              >
                <tab.icon className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Lifestyle Tab */}
            {currentTab === "lifestyle" && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Daily Lifestyle
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      How many hours of sleep do you typically get each night?
                    </label>
                    <select
                      value={lifestyle.sleepHours}
                      onChange={(e) =>
                        setLifestyle({
                          ...lifestyle,
                          sleepHours: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="less than 5">Less than 5 hours</option>
                      <option value="5-6">5-6 hours</option>
                      <option value="7-8">7-8 hours</option>
                      <option value="9+">9+ hours</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      How often do you engage in physical exercise?
                    </label>
                    <select
                      value={lifestyle.exerciseFrequency}
                      onChange={(e) =>
                        setLifestyle({
                          ...lifestyle,
                          exerciseFrequency: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="never">Never</option>
                      <option value="rarely">Rarely (few times a month)</option>
                      <option value="sometimes">Sometimes (once a week)</option>
                      <option value="regularly">
                        Regularly (2-4 times a week)
                      </option>
                      <option value="daily">Daily or almost daily</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      How many hours do you work in a typical day?
                    </label>
                    <select
                      value={lifestyle.workHours}
                      onChange={(e) =>
                        setLifestyle({
                          ...lifestyle,
                          workHours: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="less than 4">Less than 4 hours</option>
                      <option value="4-6">4-6 hours</option>
                      <option value="7-8">7-8 hours</option>
                      <option value="9-10">9-10 hours</option>
                      <option value="more than 10">More than 10 hours</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      How much daily screen time do you have (outside of work)?
                    </label>
                    <select
                      value={lifestyle.screenTime}
                      onChange={(e) =>
                        setLifestyle({
                          ...lifestyle,
                          screenTime: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="less than 1">Less than 1 hour</option>
                      <option value="1-2">1-2 hours</option>
                      <option value="3-4">3-4 hours</option>
                      <option value="5+">5+ hours</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => handleTabChange("nutrition")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md flex items-center"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Nutrition Tab */}
            {currentTab === "nutrition" && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Nutrition & Dietary Habits
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      How many meals do you typically eat per day?
                    </label>
                    <select
                      value={nutrition.mealsPerDay}
                      onChange={(e) =>
                        setNutrition({
                          ...nutrition,
                          mealsPerDay: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="1-2">1-2 meals</option>
                      <option value="3">3 meals</option>
                      <option value="4-5">4-5 meals (including snacks)</option>
                      <option value="6+">6+ meals/snacks</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      How many servings of fruits and vegetables do you eat
                      daily?
                    </label>
                    <select
                      value={nutrition.fruitVeggieServings}
                      onChange={(e) =>
                        setNutrition({
                          ...nutrition,
                          fruitVeggieServings: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="0-1">0-1 servings</option>
                      <option value="2-3">2-3 servings</option>
                      <option value="4-5">4-5 servings</option>
                      <option value="6+">6+ servings</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      What is your primary source of protein?
                    </label>
                    <select
                      value={nutrition.proteinSource}
                      onChange={(e) =>
                        setNutrition({
                          ...nutrition,
                          proteinSource: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="meat">Meat (beef, poultry, pork)</option>
                      <option value="fish">Fish and seafood</option>
                      <option value="dairy">Dairy and eggs</option>
                      <option value="plant">
                        Plant-based (beans, tofu, etc.)
                      </option>
                      <option value="supplements">Protein supplements</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      How much water do you typically drink daily?
                    </label>
                    <select
                      value={nutrition.waterIntake}
                      onChange={(e) =>
                        setNutrition({
                          ...nutrition,
                          waterIntake: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="less than 2">Less than 2 cups</option>
                      <option value="3-5">3-5 cups</option>
                      <option value="6-8">6-8 cups</option>
                      <option value="8+">8+ cups</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => handleTabChange("lifestyle")}
                    className="border border-gray-300 hover:bg-gray-100 px-6 py-2 rounded-md"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => handleTabChange("mentalWellbeing")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md flex items-center"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Mental Wellbeing Tab */}
            {currentTab === "mentalWellbeing" && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Mental Wellbeing
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      On a scale of 1-10, what is your average daily stress
                      level?
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={mentalWellbeing.stressLevel}
                      onChange={(e) =>
                        setMentalWellbeing({
                          ...mentalWellbeing,
                          stressLevel: e.target.value,
                        })
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Low stress (1)</span>
                      <span>High stress (10)</span>
                    </div>
                    <p className="text-center text-blue-600 font-semibold mt-2">
                      {mentalWellbeing.stressLevel}/10
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      How would you rate your ability to focus and concentrate?
                    </label>
                    <select
                      value={mentalWellbeing.concentration}
                      onChange={(e) =>
                        setMentalWellbeing({
                          ...mentalWellbeing,
                          concentration: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="very poor">
                        Very poor - I'm easily distracted
                      </option>
                      <option value="poor">Poor - I often lose focus</option>
                      <option value="moderate">
                        Moderate - Sometimes focused, sometimes not
                      </option>
                      <option value="good">
                        Good - Usually able to focus well
                      </option>
                      <option value="excellent">
                        Excellent - Rarely lose concentration
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      How would you describe your mood stability?
                    </label>
                    <select
                      value={mentalWellbeing.moodStability}
                      onChange={(e) =>
                        setMentalWellbeing({
                          ...mentalWellbeing,
                          moodStability: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="very unstable">
                        Very unstable - significant mood swings
                      </option>
                      <option value="somewhat unstable">
                        Somewhat unstable - occasional mood swings
                      </option>
                      <option value="moderate">
                        Moderate - some ups and downs
                      </option>
                      <option value="mostly stable">
                        Mostly stable - occasional variations
                      </option>
                      <option value="very stable">
                        Very stable - consistent mood
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      What is your overall level of life satisfaction?
                    </label>
                    <select
                      value={mentalWellbeing.overallSatisfaction}
                      onChange={(e) =>
                        setMentalWellbeing({
                          ...mentalWellbeing,
                          overallSatisfaction: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="very low">Very low</option>
                      <option value="low">Low</option>
                      <option value="moderate">Moderate</option>
                      <option value="high">High</option>
                      <option value="very high">Very high</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => handleTabChange("nutrition")}
                    className="border border-gray-300 hover:bg-gray-100 px-6 py-2 rounded-md"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => handleTabChange("fitnessGoals")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md flex items-center"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Fitness Goals Tab */}
            {currentTab === "fitnessGoals" && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Fitness Goals
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      What is your primary fitness or wellness goal?
                    </label>
                    <select
                      value={fitnessGoals.primaryGoal}
                      onChange={(e) =>
                        setFitnessGoals({
                          ...fitnessGoals,
                          primaryGoal: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="weight loss">Weight loss</option>
                      <option value="muscle gain">Building muscle</option>
                      <option value="endurance">Improving endurance</option>
                      <option value="flexibility">
                        Increasing flexibility
                      </option>
                      <option value="stress reduction">Reducing stress</option>
                      <option value="overall health">
                        Improving overall health
                      </option>
                      <option value="specific sport">
                        Training for a specific sport/event
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      What types of physical activities do you enjoy? (Select
                      all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Walking/Hiking",
                        "Running",
                        "Swimming",
                        "Cycling",
                        "Team Sports",
                        "Weight Training",
                        "Yoga/Pilates",
                        "Dancing",
                      ].map((activity) => (
                        <label
                          key={activity}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={fitnessGoals.preferredActivities.includes(
                              activity
                            )}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFitnessGoals({
                                  ...fitnessGoals,
                                  preferredActivities: [
                                    ...fitnessGoals.preferredActivities,
                                    activity,
                                  ],
                                });
                              } else {
                                setFitnessGoals({
                                  ...fitnessGoals,
                                  preferredActivities:
                                    fitnessGoals.preferredActivities.filter(
                                      (a) => a !== activity
                                    ),
                                });
                              }
                            }}
                            className="rounded text-blue-500 focus:ring-blue-500"
                          />
                          <span>{activity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      How much time can you realistically commit to exercise
                      each week?
                    </label>
                    <select
                      value={fitnessGoals.timeAvailable}
                      onChange={(e) =>
                        setFitnessGoals({
                          ...fitnessGoals,
                          timeAvailable: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="less than 1 hour">Less than 1 hour</option>
                      <option value="1-2 hours">1-2 hours</option>
                      <option value="3-4 hours">3-4 hours</option>
                      <option value="5-7 hours">5-7 hours</option>
                      <option value="8+ hours">8+ hours</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      What's your biggest obstacle to maintaining a fitness
                      routine?
                    </label>
                    <select
                      value={fitnessGoals.obstacles}
                      onChange={(e) =>
                        setFitnessGoals({
                          ...fitnessGoals,
                          obstacles: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="time">Lack of time</option>
                      <option value="motivation">Lack of motivation</option>
                      <option value="knowledge">Not sure what to do</option>
                      <option value="energy">Too tired/low energy</option>
                      <option value="facilities">
                        Limited access to facilities
                      </option>
                      <option value="injuries">
                        Injuries or health limitations
                      </option>
                      <option value="cost">Cost concerns</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => handleTabChange("mentalWellbeing")}
                    className="border border-gray-300 hover:bg-gray-100 px-6 py-2 rounded-md"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md flex items-center"
                  >
                    Generate Results <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Results Tab */}
            {currentTab === "results" && results && (
              <div className="space-y-6">
                <div className="text-center py-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Your Wellness Score
                  </h3>
                  <div className="relative w-48 h-48 mx-auto">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl font-bold text-blue-600">
                        {results.wellnessScore}
                      </span>
                    </div>
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="10"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="10"
                        strokeDasharray={`${
                          (2 * Math.PI * 45 * results.wellnessScore) / 100
                        } ${
                          (2 * Math.PI * 45 * (100 - results.wellnessScore)) /
                          100
                        }`}
                        strokeDashoffset={(2 * Math.PI * 45 * 25) / 100}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600 mt-4 max-w-lg mx-auto">
                    {results.wellnessScore >= 80
                      ? "Excellent! You're maintaining healthy habits in most areas of your life."
                      : results.wellnessScore >= 60
                      ? "Good job! You have established some healthy habits, with room for improvement in certain areas."
                      : results.wellnessScore >= 40
                      ? "You're on your way! There are several areas where our wellness experts could help enhance your wellbeing."
                      : "Your wellness journey is just beginning. Our team can help you build healthier habits step by step."}
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Personalized Recommendations
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {results.recommendations.map((rec, index) => (
                      <div
                        key={index}
                        className="overflow-hidden rounded-lg shadow"
                      >
                        <div
                          className={`h-2 ${
                            rec.type === "fitness"
                              ? "bg-blue-500"
                              : rec.type === "nutrition"
                              ? "bg-green-500"
                              : rec.type === "mental"
                              ? "bg-purple-500"
                              : rec.type === "sleep"
                              ? "bg-indigo-500"
                              : "bg-teal-500"
                          }`}
                        ></div>
                        <div className="p-4">
                          <h4 className="font-bold text-lg">{rec.title}</h4>
                          <p className="text-gray-600 mb-4">
                            {rec.description}
                          </p>
                          <button className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                            Learn more <ArrowRight className="ml-1 h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg mt-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">
                    Ready to take the next step?
                  </h3>
                  <p className="text-blue-700 mb-4">
                    Schedule a consultation with one of our wellness experts to
                    create a personalized plan tailored to your needs.
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center">
                    Book Consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessAssessment;
