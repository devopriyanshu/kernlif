import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Gauge, Building2 } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Find the Best Fitness Experts",
      description:
        "Discover top-rated, certified fitness professionals tailored to your needs, from personal trainers to specialized coaches.",
      icon: <Dumbbell className="text-rose-500" size={32} />,
    },
    {
      title: "Track Your Wellness Journey",
      description:
        "Use your personalized dashboard to monitor meals, physical activities, and sleep patterns all in one place.",
      icon: <Gauge className="text-indigo-500" size={32} />,
    },
    {
      title: "Verified Wellness Centers",
      description:
        "Explore and connect with trusted wellness centers offering services and facilities to support your health and fitness goals.",
      icon: <Building2 className="text-emerald-500" size={32} />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-indigo-50 to-blue-50">
      <section className="pt-20 px-4 sm:px-6 lg:px-56 mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How WellNest Helps You Thrive
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our integrated approach combines mental health tracking, physical
            wellness monitoring, and expert guidance to help you achieve
            balance and wellbeing.
          </motion.p>
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="mb-5 bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Features;
