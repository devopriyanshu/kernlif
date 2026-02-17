import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useExperts } from '../../hooks/useExpertHooks';

const FeaturedExperts = () => {
  const expertfilters = {
    search: "",
    category: "",
    sortBy: "",
    limit: 8,
  };
  const { data: consultants = [], isLoading } = useExperts(expertfilters);

  return (
    <section className="pb-16 sm:px-6 bg-gradient-to-br from-blue-50 to-indigo-50 lg:px-10 overflow-hidden">
      <div className="relative">
        <div className="flex overflow-x-auto px-4 md:px-20 pb-6 gap-6 scrollbar-hide snap-x snap-mandatory">
          {isLoading ? (
            // Loading Skeletons
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-72 h-80 bg-white rounded-xl shadow-sm animate-pulse flex flex-col items-center justify-center p-6">
                <div className="w-48 h-48 bg-gray-200 rounded-full mb-4"></div>
                <div className="w-32 h-6 bg-gray-200 rounded mb-2"></div>
                <div className="w-24 h-4 bg-gray-200 rounded"></div>
              </div>
            ))
          ) : (
            Array.isArray(consultants) &&
            consultants.map((consultant, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-72 rounded-xl transition-all duration-300 flex flex-col items-center py-6 snap-start"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-52 h-52 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg relative group">
                  {consultant.image ? (
                    <img
                      src={consultant.image}
                      alt={consultant.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-4xl">👨‍⚕️</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-1">
                  {consultant.name}
                </h3>
                <p className="text-blue-600 font-medium text-center bg-blue-50 px-3 py-1 rounded-full text-sm">
                  {consultant.category}
                </p>
              </motion.div>
            ))
          )}

          {/* View All Experts Card */}
          <motion.div 
            className="flex-shrink-0 w-72 flex flex-col items-center justify-center p-8 text-black snap-start"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-center">
              View All Experts
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Explore our complete network of wellness professionals
            </p>
            <Link
              to="/experts"
              className="bg-white text-blue-600 hover:bg-blue-50 border border-blue-200 font-bold py-2 px-6 rounded-lg transition duration-300 inline-flex items-center shadow-sm hover:shadow-md"
            >
              Browse All
              <ChevronRight className="ml-2" size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Hint */}
      <div className="hidden md:flex justify-center mt-2 text-gray-400 text-sm">
        <span>Scroll to see more</span>
      </div>
    </section>
  );
};

export default FeaturedExperts;
