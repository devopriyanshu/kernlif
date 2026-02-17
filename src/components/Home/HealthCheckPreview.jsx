import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { assessmentImage } from '../../utils/constant';

const HealthCheckPreview = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-52 bg-gradient-to-r from-indigo-50 to-blue-50">
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <div className="md:w-1/2">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Understand Your Wellbeing Score
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Our comprehensive assessment evaluates your mental, physical,
              and emotional health to create a personalized wellness profile.
              Get insights into your strengths and areas for improvement.
            </motion.p>
            <ul className="space-y-4 mb-8">
              {[
                "5-minute assessment based on clinical research",
                "Personalized recommendations based on your results",
                "Track your progress with regular reassessments"
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                >
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/health-check"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 inline-flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Take the Health Check
                <ChevronRight className="ml-2" size={18} />
              </Link>
            </motion.div>
          </div>
          <div className="md:w-1/2">
            <motion.img
              src={assessmentImage}
              alt="Health Assessment"
              className="rounded-2xl shadow-xl w-full object-cover h-80 md:h-96"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthCheckPreview;
