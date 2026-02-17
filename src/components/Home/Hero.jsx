import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Activity, Brain, Map, Calendar } from 'lucide-react';

const Hero = () => {
  const wellnessStats = [
    { label: "Active Users", value: "50K+", icon: <Activity size={24} /> },
    { label: "Expert Consultants", value: "200+", icon: <Brain size={24} /> },
    { label: "Wellness Centers", value: "500+", icon: <Map size={24} /> },
    { label: "Daily Sessions", value: "1,000+", icon: <Calendar size={24} /> },
  ];

  return (
    <section className="relative bg-no-repeat bg-[center_top_15%] bg-cover bg-[url('/bg6.png')] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 relative z-10">
        <div className="flex flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 pt-24">
            <motion.h1
              className="text-5xl text-white font-bold leading-tight mb-4 text-shadow-lg"
              style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.7)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Your Path to Complete Wellness
            </motion.h1>
            <motion.p
              className="text-xl mb-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              WellNest helps you balance your mental and physical health
              through personalized guidance, tracking, and expert support.
            </motion.p>
            <div className="flex flex-wrap gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link
                  to="/login"
                  className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg font-semibold py-3 px-6 rounded-full transition duration-300 inline-flex items-center"
                >
                  Start Your Wellness Journey
                  <ChevronRight className="ml-2" size={18} />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link
                  to="/"
                  className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-semibold py-3 px-6 rounded-full transition duration-300"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="py-6 mt-28 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {wellnessStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center bg-white/30 backdrop-blur-xl py-4 rounded-full border border-white/20 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex text-white justify-center mb-2 drop-shadow-md">
                  {stat.icon}
                </div>
                <div className="text-2xl text-white font-bold drop-shadow-md">
                  {stat.value}
                </div>
                <div className="text-base text-white font-medium drop-shadow-md">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Optional Overlay for better text readability if bg is too bright/busy */}
      {/* <div className="absolute inset-0 bg-black/20 z-0"></div> */}
    </section>
  );
};

export default Hero;
