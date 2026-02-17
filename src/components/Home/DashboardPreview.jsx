import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Utensils, Moon, Calendar, TrendingUp, LayoutDashboard } from 'lucide-react';

const DashboardPreview = () => {
  const features = [
    {
      title: "Activity Tracking",
      description: "Steps, workouts, and calories — all in one view.",
      icon: <Activity className="text-blue-600" size={28} />,
    },
    {
      title: "Nutrition",
      description: "Track your meals, macros, and water intake.",
      icon: <Utensils className="text-green-600" size={28} />,
    },
    {
      title: "Sleep Analysis",
      description: "Understand your sleep patterns and quality.",
      icon: <Moon className="text-indigo-600" size={28} />,
    },
    {
      title: "Appointments",
      description: "Manage sessions with doctors, trainers, and more.",
      icon: <Calendar className="text-purple-600" size={28} />,
    },
    {
      title: "Trend Analysis",
      description: "Visualize progress and correlations over time.",
      icon: <TrendingUp className="text-amber-600" size={28} />,
    },
    {
      title: "Unified Dashboard",
      description: "All your wellness metrics — integrated and real-time.",
      icon: <LayoutDashboard className="text-blue-500" size={28} />,
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Your Complete Wellness Dashboard
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Track, analyze, and optimize all aspects of your health in one
            unified platform.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-x-12">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              className="flex items-start gap-5 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="mt-1 bg-white p-3 rounded-lg shadow-sm">{feature.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
