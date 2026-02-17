import React from 'react';
import { motion } from 'framer-motion';

const ExpertCategories = () => {
  const categories = [
    {
      name: "Nutritionists",
      icon: "🥗",
      color: "bg-gray-50",
      iconBg: "bg-emerald-200",
    },
    {
      name: "Dieticians",
      icon: "🍎",
      color: "bg-gray-50",
      iconBg: "bg-blue-200",
    },
    {
      name: "Fitness Instructors",
      icon: "💪",
      color: "bg-gray-50",
      iconBg: "bg-amber-200",
    },
    {
      name: "Mental Wellness Coaches",
      icon: "🧠",
      color: "bg-gray-50",
      iconBg: "bg-purple-200",
    },
    {
      name: "Yoga Therapists",
      icon: "🧘",
      color: "bg-gray-50",
      iconBg: "bg-teal-200",
    },
    {
      name: "Holistic Healers",
      icon: "🌿",
      color: "bg-gray-50",
      iconBg: "bg-green-200",
    },
    {
      name: "Sleep Coaches",
      icon: "😴",
      color: "bg-gray-50",
      iconBg: "bg-indigo-200",
    },
    {
      name: "Ayurveda Experts",
      icon: "☯️",
      color: "bg-gray-50",
      iconBg: "bg-orange-200",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-center items-center lg:px-28 flex-col md:flex-row mb-12">
          <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
            <motion.img
              src="/experts.svg"
              alt="Expert Consultation"
              className="rounded-lg w-3/4 md:w-full max-w-sm"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left md:pl-10">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Find Your Perfect Wellness Expert
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Easily connect with certified wellness experts and schedule
              personalized sessions designed to align with your unique mental
              and physical health goals.
            </motion.p>
          </div>
        </div>

        {/* Specialist Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-20 mb-12">
          {categories.map((specialist, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-xl ${specialist.color} text-center shadow-md cursor-pointer border border-transparent hover:border-blue-200`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
            >
              <div
                className={`w-16 h-16 ${specialist.iconBg} rounded-full flex items-center justify-center mx-auto mb-4 text-3xl`}
              >
                {specialist.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {specialist.name}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* CTA + Search Placeholder */}
        <motion.div 
          className="bg-white rounded-2xl p-8 max-w-4xl mx-auto shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="md:flex items-center justify-between gap-8">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Ready to Begin Your Wellness Journey?
              </h3>
              <p className="text-gray-600">
                Book a consultation in just a few clicks
              </p>
            </div>
            <button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Browse All Experts
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertCategories;
