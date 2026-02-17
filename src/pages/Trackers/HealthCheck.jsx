import React, { useState } from "react";
import {
  CheckCircle,
  Clock,
  Heart,
  HomeIcon,
  Utensils,
  AlertCircle,
  Trophy,
  ArrowRight,
  RotateCcw
} from "lucide-react";
import { motion } from "framer-motion";
import Stepper, { Step } from "../../components/Stepper";
import { Link } from "react-router-dom";

const HealthCheck = () => {
  // Form states
  const [lifestyle, setLifestyle] = useState({
    sleepHours: "",
    exerciseFrequency: "",
    workHours: "",
    screenTime: "",
  });

  const [nutrition, setNutrition] = useState({
    mealsPerDay: "",
    waterIntake: "",
    fruitVeggieServings: "",
    proteinSource: "",
  });

  const [mentalWellbeing, setMentalWellbeing] = useState({
    stressLevel: 5,
    concentration: "",
    moodStability: "",
    overallSatisfaction: "",
  });

  const [fitnessGoals, setFitnessGoals] = useState({
    primaryGoal: "",
    preferredActivities: [],
    timeAvailable: "",
    obstacles: "",
  });

  const [results, setResults] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showErrors, setShowErrors] = useState(false);

  // Validation Logic (Pure Function)
  const getStepErrors = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!lifestyle.sleepHours) newErrors.sleepHours = "Please select sleep hours";
      if (!lifestyle.exerciseFrequency) newErrors.exerciseFrequency = "Please select exercise frequency";
      if (!lifestyle.workHours) newErrors.workHours = "Please select work hours";
      if (!lifestyle.screenTime) newErrors.screenTime = "Please select screen time";
    }

    if (step === 2) {
      if (!nutrition.mealsPerDay) newErrors.mealsPerDay = "Please select meals per day";
      if (!nutrition.waterIntake) newErrors.waterIntake = "Please select water intake";
      if (!nutrition.fruitVeggieServings) newErrors.fruitVeggieServings = "Please select servings";
      if (!nutrition.proteinSource) newErrors.proteinSource = "Please select protein source";
    }

    if (step === 3) {
      if (!mentalWellbeing.concentration) newErrors.concentration = "Please select concentration level";
      if (!mentalWellbeing.moodStability) newErrors.moodStability = "Please select mood stability";
      if (!mentalWellbeing.overallSatisfaction) newErrors.overallSatisfaction = "Please select satisfaction level";
    }

    if (step === 4) {
      if (!fitnessGoals.primaryGoal) newErrors.primaryGoal = "Please select a primary goal";
      if (fitnessGoals.preferredActivities.length === 0) newErrors.preferredActivities = "Select at least one activity";
      if (!fitnessGoals.timeAvailable) newErrors.timeAvailable = "Please select time available";
      if (!fitnessGoals.obstacles) newErrors.obstacles = "Please select main obstacle";
    }

    return newErrors;
  };

  // derived state for errors
  const errors = getStepErrors(currentStep);
  const isStepValid = Object.keys(errors).length === 0;

  const calculateScore = () => {
    let score = 0;
    
    // 1. Lifestyle Scoring (Max 25)
    // Sleep (Max 10)
    if (lifestyle.sleepHours === "7-8") score += 10;
    else if (lifestyle.sleepHours === "9+") score += 8;
    else if (lifestyle.sleepHours === "5-6") score += 5;
    
    // Exercise (Max 10)
    const exerciseMap = { "daily": 10, "regularly": 8, "sometimes": 5, "rarely": 2, "never": 0 };
    score += exerciseMap[lifestyle.exerciseFrequency] || 0;

    // Screen Time (Max 5) - Less is better
    const screenMap = { "less than 1": 5, "1-2": 4, "3-4": 2, "5+": 0 };
    score += screenMap[lifestyle.screenTime] || 0;


    // 2. Nutrition Scoring (Max 25)
    // Water (Max 10)
    const waterMap = { "8+": 10, "6-8": 8, "3-5": 5, "less than 2": 2 };
    score += waterMap[nutrition.waterIntake] || 0;

    // Veggies (Max 10)
    const veggieMap = { "6+": 10, "4-5": 8, "2-3": 5, "0-1": 0 };
    score += veggieMap[nutrition.fruitVeggieServings] || 0;

    // Meals (Max 5) - Consistency matters
    score += (nutrition.mealsPerDay === "3" || nutrition.mealsPerDay === "4-5") ? 5 : 2;


    // 3. Mental Wellbeing Scoring (Max 25)
    // Stress (Max 10) - Inverted: Lower stress is better
    const stress = parseInt(mentalWellbeing.stressLevel);
    if (stress <= 3) score += 10;
    else if (stress <= 6) score += 6;
    else if (stress <= 8) score += 3;
    
    // Satisfaction (Max 10)
    const satisfactionMap = { "very high": 10, "high": 8, "moderate": 5, "low": 2, "very low": 0 };
    score += satisfactionMap[mentalWellbeing.overallSatisfaction] || 0;

    // Mood (Max 5)
    const moodMap = { "very stable": 5, "mostly stable": 4, "moderate": 3 };
    score += moodMap[mentalWellbeing.moodStability] || 0;


    // 4. Fitness/Habits Scoring (Max 25)
    // Time commitment (Max 15)
    const timeMap = { "8+ hours": 15, "5-7 hours": 12, "3-4 hours": 8, "1-2 hours": 5 };
    score += timeMap[fitnessGoals.timeAvailable] || 0;
    
    // Obstacles (Max 10) - "knowledge" or "facilities" are easier to fix than "injuries"
    const obstacleMap = { "knowledge": 10, "facilities": 10, "motivation": 5, "time": 5, "cost": 5, "energy": 2, "injuries": 0 };
    score += obstacleMap[fitnessGoals.obstacles] || 5;

    return Math.min(100, Math.max(0, score));
  };


  const onStepChange = (step) => {
    setCurrentStep(step);
    setShowErrors(false); // Clear errors when step changes successfully
  };
  
  const onFinalStepCompleted = () => {
    const score = calculateScore();
    setResults({
        score,
        date: new Date()
    });
  };

  const handleNextValidation = (step) => {
    const stepErrors = getStepErrors(step);
    if (Object.keys(stepErrors).length === 0) {
        return true;
    } else {
        setShowErrors(true);
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-4xl px-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Health Assessment</h1>
        <p className="text-gray-500">Complete the steps to get your wellness score</p>
      </div>

      <Stepper
        initialStep={1}
        onStepChange={onStepChange}
        onFinalStepCompleted={onFinalStepCompleted}
        onNext={handleNextValidation}
        nextButtonProps={{ 
            // Button is rarely fully disabled now, visual disable is handled by logic? 
            // User requested "show it when user jumps to next". 
            // So we don't disable, but maybe style it?
            // Actually, keep it enabled to allow the click to trigger validation.
            className: `transition-all duration-300 flex items-center justify-center rounded-full font-medium px-8 py-2.5 shadow-lg bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200`
        }}
        renderStepIndicator={({ step, currentStep, onStepClick }) => (
            <div 
                onClick={() => {
                    // Only allow clicking previous steps or current step
                    if (step <= currentStep) onStepClick(step);
                }}
                className={`relative cursor-pointer outline-none group`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-sm shadow-sm z-10 relative transition-all duration-300
                    ${step === currentStep ? 'bg-blue-50 border-2 border-blue-600 text-blue-600 scale-110' : 
                      step < currentStep ? 'bg-blue-600 border-2 border-blue-600 text-white' : 
                      'bg-gray-100 border-2 border-gray-200 text-gray-400'}
                `}
              >
                {step < currentStep ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span className="step-number">{step}</span>
                )}
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {step === 1 && "Lifestyle"}
                {step === 2 && "Nutrition"}
                {step === 3 && "Mental"}
                {step === 4 && "Fitness"}
              </div>
            </div>
        )}
      >
        <Step>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <HomeIcon className="w-8 h-8 text-blue-500" />
                Daily Lifestyle
            </h2>
            <div className="space-y-6">
                <SelectGroup 
                    label="How many hours of sleep do you typically get?"
                    value={lifestyle.sleepHours}
                    onChange={(v) => setLifestyle({...lifestyle, sleepHours: v})}
                    options={[
                        { value: "less than 5", label: "Less than 5 hours (Not enough)" },
                        { value: "5-6", label: "5-6 hours" },
                        { value: "7-8", label: "7-8 hours (Recommended)" },
                        { value: "9+", label: "9+ hours" }
                    ]}
                    error={showErrors ? errors.sleepHours : null}
                />
                <SelectGroup 
                    label="How often do you exercise?"
                    value={lifestyle.exerciseFrequency}
                    onChange={(v) => setLifestyle({...lifestyle, exerciseFrequency: v})}
                    options={[
                        { value: "never", label: "Never" },
                        { value: "rarely", label: "Rarely (few times a month)" },
                        { value: "sometimes", label: "Sometimes (once a week)" },
                        { value: "regularly", label: "Regularly (2-4 times a week)" },
                        { value: "daily", label: "Daily or almost daily" }
                    ]}
                    error={showErrors ? errors.exerciseFrequency : null}
                />
                <SelectGroup 
                    label="Work hours per day?"
                    value={lifestyle.workHours}
                    onChange={(v) => setLifestyle({...lifestyle, workHours: v})}
                    options={[
                        { value: "less than 4", label: "Less than 4 hours" },
                        { value: "4-6", label: "4-6 hours" },
                        { value: "7-8", label: "7-8 hours" },
                        { value: "9-10", label: "9-10 hours" },
                        { value: "more than 10", label: "More than 10 hours" }
                    ]}
                    error={showErrors ? errors.workHours : null}
                />
                 <SelectGroup 
                    label="Daily screen time (outside work)?"
                    value={lifestyle.screenTime}
                    onChange={(v) => setLifestyle({...lifestyle, screenTime: v})}
                    options={[
                        { value: "less than 1", label: "Less than 1 hour" },
                        { value: "1-2", label: "1-2 hours" },
                        { value: "3-4", label: "3-4 hours" },
                        { value: "5+", label: "5+ hours" }
                    ]}
                    error={showErrors ? errors.screenTime : null}
                />
            </div>
        </Step>

        <Step>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Utensils className="w-8 h-8 text-green-500" />
                Nutrition & Habits
            </h2>
             <div className="space-y-6">
                <SelectGroup 
                    label="Meals per day?"
                    value={nutrition.mealsPerDay}
                    onChange={(v) => setNutrition({...nutrition, mealsPerDay: v})}
                    options={[
                        { value: "1-2", label: "1-2 meals" },
                        { value: "3", label: "3 meals" },
                        { value: "4-5", label: "4-5 meals" },
                        { value: "6+", label: "6+ meals" }
                    ]}
                    error={showErrors ? errors.mealsPerDay : null}
                />
                <SelectGroup 
                    label="Water intake?"
                    value={nutrition.waterIntake}
                    onChange={(v) => setNutrition({...nutrition, waterIntake: v})}
                    options={[
                        { value: "less than 2", label: "Less than 2 cups" },
                        { value: "3-5", label: "3-5 cups" },
                        { value: "6-8", label: "6-8 cups" },
                        { value: "8+", label: "8+ cups" }
                    ]}
                    error={showErrors ? errors.waterIntake : null}
                />
                 <SelectGroup 
                    label="Servings of fruits/veggies?"
                    value={nutrition.fruitVeggieServings}
                    onChange={(v) => setNutrition({...nutrition, fruitVeggieServings: v})}
                    options={[
                        { value: "0-1", label: "0-1 servings" },
                        { value: "2-3", label: "2-3 servings" },
                        { value: "4-5", label: "4-5 servings" },
                        { value: "6+", label: "6+ servings" }
                    ]}
                    error={showErrors ? errors.fruitVeggieServings : null}
                />
                 <SelectGroup 
                    label="Primary protein source?"
                    value={nutrition.proteinSource}
                    onChange={(v) => setNutrition({...nutrition, proteinSource: v})}
                    options={[
                        { value: "meat", label: "Meat" },
                        { value: "fish", label: "Fish/Seafood" },
                        { value: "dairy", label: "Dairy/Eggs" },
                        { value: "plant", label: "Plant-based" },
                        { value: "supplements", label: "Supplements" }
                    ]}
                    error={showErrors ? errors.proteinSource : null}
                />
            </div>
        </Step>

        <Step>
             <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Clock className="w-8 h-8 text-purple-500" />
                Mental Wellbeing
            </h2>
             <div className="space-y-6">
                <div>
                     <label className="block text-gray-700 font-medium mb-2">Daily Stress Level (1-10)</label>
                     <input 
                        type="range" 
                        min="1" max="10" 
                        value={mentalWellbeing.stressLevel}
                        onChange={(e) => setMentalWellbeing({...mentalWellbeing, stressLevel: e.target.value})}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                     />
                     <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Low Stress</span>
                        <span className="font-bold text-blue-600 text-lg">{mentalWellbeing.stressLevel}</span>
                        <span>High Stress</span>
                     </div>
                </div>

                <SelectGroup 
                    label="Ability to Focus?"
                    value={mentalWellbeing.concentration}
                    onChange={(v) => setMentalWellbeing({...mentalWellbeing, concentration: v})}
                    options={[
                        { value: "very poor", label: "Very poor" },
                        { value: "poor", label: "Poor" },
                        { value: "moderate", label: "Moderate" },
                        { value: "good", label: "Good" },
                        { value: "excellent", label: "Excellent" }
                    ]}
                    error={showErrors ? errors.concentration : null}
                />
                
                <SelectGroup 
                    label="Mood Stability?"
                    value={mentalWellbeing.moodStability}
                    onChange={(v) => setMentalWellbeing({...mentalWellbeing, moodStability: v})}
                    options={[
                        { value: "very unstable", label: "Very unstable" },
                        { value: "somewhat unstable", label: "Somewhat unstable" },
                        { value: "moderate", label: "Moderate" },
                        { value: "mostly stable", label: "Mostly stable" },
                        { value: "very stable", label: "Very stable" }
                    ]}
                    error={showErrors ? errors.moodStability : null}
                />

                 <SelectGroup 
                    label="Overall Life Satisfaction?"
                    value={mentalWellbeing.overallSatisfaction}
                    onChange={(v) => setMentalWellbeing({...mentalWellbeing, overallSatisfaction: v})}
                    options={[
                        { value: "very low", label: "Very low" },
                        { value: "low", label: "Low" },
                        { value: "moderate", label: "Moderate" },
                        { value: "high", label: "High" },
                        { value: "very high", label: "Very high" }
                    ]}
                    error={showErrors ? errors.overallSatisfaction : null}
                />
             </div>
        </Step>

        <Step>
             <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-500" />
                Fitness Goals
            </h2>
            <div className="space-y-6">
                 <SelectGroup 
                    label="Primary Goal?"
                    value={fitnessGoals.primaryGoal}
                    onChange={(v) => setFitnessGoals({...fitnessGoals, primaryGoal: v})}
                    options={[
                        { value: "weight loss", label: "Weight Loss" },
                        { value: "muscle gain", label: "Muscle Gain" },
                        { value: "endurance", label: "Endurance" },
                        { value: "flexibility", label: "Flexibility" },
                        { value: "stress reduction", label: "Stress Reduction" },
                        { value: "overall health", label: "Overall Health" }
                    ]}
                    error={showErrors ? errors.primaryGoal : null}
                />

                <SelectGroup 
                    label="Time available for exercise?"
                    value={fitnessGoals.timeAvailable}
                    onChange={(v) => setFitnessGoals({...fitnessGoals, timeAvailable: v})}
                    options={[
                        { value: "less than 1 hour", label: "Less than 1 hour/week" },
                        { value: "1-2 hours", label: "1-2 hours/week" },
                        { value: "3-4 hours", label: "3-4 hours/week" },
                        { value: "5-7 hours", label: "5-7 hours/week" },
                        { value: "8+ hours", label: "8+ hours/week" }
                    ]}
                    error={showErrors ? errors.timeAvailable : null}
                />

                 <SelectGroup 
                    label="Biggest Obstacle?"
                    value={fitnessGoals.obstacles}
                    onChange={(v) => setFitnessGoals({...fitnessGoals, obstacles: v})}
                    options={[
                        { value: "time", label: "Lack of Time" },
                        { value: "motivation", label: "Motivation" },
                        { value: "knowledge", label: "Don't know how" },
                        { value: "energy", label: "Low Energy" },
                        { value: "facilities", label: "No Facilities" },
                        { value: "injuries", label: "Injuries" },
                        { value: "cost", label: "Cost" }
                    ]}
                    error={showErrors ? errors.obstacles : null}
                />
                
                <div>
                     <label className="block text-gray-700 font-medium mb-2">Activities you enjoy (Select multiple)</label>
                     <div className="grid grid-cols-2 gap-3">
                        {[
                            "Walking/Hiking", "Running", "Swimming", "Cycling", 
                            "Team Sports", "Weight Training", "Yoga/Pilates", "Dancing"
                        ].map(activity => (
                             <label key={activity} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                                 fitnessGoals.preferredActivities.includes(activity) 
                                 ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                 : 'border-gray-200 hover:border-blue-300'
                             }`}>
                                <input 
                                    type="checkbox"
                                    checked={fitnessGoals.preferredActivities.includes(activity)}
                                    onChange={(e) => {
                                        if (e.target.checked) setFitnessGoals({...fitnessGoals, preferredActivities: [...fitnessGoals.preferredActivities, activity]});
                                        else setFitnessGoals({...fitnessGoals, preferredActivities: fitnessGoals.preferredActivities.filter(a => a !== activity)});
                                    }}
                                    className="hidden"
                                />
                                <span className="text-sm font-medium">{activity}</span>
                                {fitnessGoals.preferredActivities.includes(activity) && <CheckCircle className="w-4 h-4 ml-auto text-blue-600" />}
                             </label>
                        ))}
                     </div>
                     {showErrors && errors.preferredActivities && <p className="text-red-500 text-xs mt-1">{errors.preferredActivities}</p>}
                </div>
            </div>
        </Step>
      </Stepper>

      {/* Result Display Overlay or Replacement */}
      {(results || currentStep > 4) && (
        <ResultsView results={results} onRestart={() => window.location.reload()} />
      )}
    </div>
  );
};

const SelectGroup = ({ label, value, onChange, options, error }) => (
    <div>
        <label className="block text-gray-700 font-medium mb-2">{label}</label>
        <div className="relative">
            <select 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full p-3 bg-white border rounded-lg appearance-none focus:outline-none focus:ring-2 transition-all ${error ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-100 focus:border-blue-400'}`}
            >
                <option value="">Select an option</option>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </div>
        {error && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{error}</p>}
    </div>
);

const ResultsView = ({ results, onRestart }) => {
    // If results aren't ready yet (transitioning), show loading or nothing
    if (!results) return null;

    const { score } = results;
    
    // Determine feedback
    let feedback = { color: 'text-red-500', text: "Needs Improvement", message: "Your customized wellness plan is ready to help you specific areas." };
    if (score > 40) feedback = { color: 'text-orange-500', text: "Fair Start", message: "You have some healthy habits, but there's room to grow." };
    if (score > 60) feedback = { color: 'text-blue-500', text: "Good", message: "You're doing well! Minor adjustments can take you to the next level." };
    if (score > 80) feedback = { color: 'text-green-500', text: "Excellent", message: "Fantastic! You're maintaining a great wellness lifestyle." };

    const circleVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: { 
            pathLength: score / 100, 
            opacity: 1,
            transition: { duration: 2, ease: "easeOut" }
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-4"
        >
             <div className="max-w-xl w-full text-center">
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <Trophy className={`w-16 h-16 mx-auto mb-4 ${feedback.color}`} />
                    <h2 className="text-3xl font-bold text-gray-900">Health Assessment Complete</h2>
                    <p className="text-gray-500">Here is your wellness score</p>
                </motion.div>

                <div className="relative w-64 h-64 mx-auto mb-8">
                     {/* Background Circle */}
                     <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="128"
                            cy="128"
                            r="120"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            className="text-gray-100"
                        />
                         {/* Progress Circle */}
                         <motion.circle
                            cx="128"
                            cy="128"
                            r="120"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            className={feedback.color}
                            variants={circleVariants}
                            initial="hidden"
                            animate="visible"
                            strokeLinecap="round"
                        />
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className={`text-6xl font-bold ${feedback.color}`}
                        >
                            {score}
                        </motion.span>
                        <span className="text-sm text-gray-400 uppercase tracking-widest mt-2">Score</span>
                     </div>
                </div>

                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="space-y-6"
                >
                    <div>
                        <h3 className={`text-2xl font-bold ${feedback.color} mb-2`}>{feedback.text}</h3>
                        <p className="text-gray-600">{feedback.message}</p>
                    </div>

                    <div className="flex justify-center gap-4">
                        <Link to="/dashboard" className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium shadow-lg hover:bg-gray-800 transition-colors">
                            Go to Dashboard
                        </Link>
                        <button 
                            onClick={onRestart}
                            className="px-8 py-3 bg-white border border-gray-200 text-gray-700 rounded-full font-medium shadow-sm hover:bg-gray-50 transition-colors flex items-center"
                        >
                            <RotateCcw className="w-4 h-4 mr-2" /> Retake
                        </button>
                    </div>
                </motion.div>
             </div>
        </motion.div>
    );
};

export default HealthCheck;
