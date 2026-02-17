import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, ArrowRight, Compass, ChevronRight } from 'lucide-react';
import { useCenters } from '../../hooks/useCenterHooks';

const FeaturedCenters = () => {
    const centerfilters = {
        search: "",
        category: "",
        sortBy: "",
        limit: 5,
    };
    const { data: wellnessCenters = [], isLoading } = useCenters(centerfilters);

    return (
        <section className="pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="mx-auto max-w-[90rem]">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
                        Featured Wellness Centers
                    </h2>
                </div>

                <div className="relative">
                    {/* Scrollable container */}
                    <div className="flex overflow-x-auto pb-8 -mx-4 px-4 gap-6 scrollbar-hide snap-x snap-mandatory">
                        {isLoading ? (
                             Array(3).fill(0).map((_, index) => (
                                <div key={index} className="flex-shrink-0 w-[450px] h-[300px] bg-gray-200 rounded-2xl animate-pulse" />
                             ))
                        ) : (
                            Array.isArray(wellnessCenters) &&
                            wellnessCenters.map((center, index) => (
                                <motion.div
                                    key={index}
                                    className="flex-shrink-0 w-[85vw] md:w-[600px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative snap-center group cursor-pointer"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                >
                                    {/* Image with gradient overlay */}
                                    <div className="h-[350px] md:h-[400px] bg-gray-200 relative">
                                        <img
                                            src={center.image}
                                            alt={center.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/95 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                                                {center.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>

                                    {/* Card content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                                        <div className="flex items-center mb-3">
                                            <div className="flex items-center mr-4 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
                                                <Star
                                                    className="fill-yellow-400 text-yellow-400"
                                                    size={16}
                                                />
                                                <span className="font-bold ml-1.5 text-sm">
                                                    {center.rating}
                                                </span>
                                            </div>
                                            <span className="text-sm text-gray-200 font-medium">
                                                ({center.reviewCount || 0} reviews)
                                            </span>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-tight text-white group-hover:text-indigo-200 transition-colors">
                                            {center.name}
                                        </h3>

                                        <div className="flex items-center mb-6">
                                            <MapPin className="text-gray-300 mr-2 flex-shrink-0" size={18} />
                                            <span className="text-gray-300 truncate max-w-[200px] md:max-w-xs">{center.location}</span>
                                            <span className="mx-2 text-gray-500">•</span>
                                            <span className="text-gray-300">
                                                {center.distance || "2.4"} miles
                                            </span>
                                        </div>

                                        <button className="pointer-events-auto bg-white hover:bg-indigo-50 text-indigo-700 font-bold py-3 px-6 rounded-xl transition duration-300 flex items-center shadow-lg transform group-hover:-translate-y-1">
                                            View Center
                                            <ArrowRight className="ml-2" size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}

                        {/* View All Card */}
                        <motion.div 
                            className="flex-shrink-0 w-80 md:w-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 snap-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="h-full bg-gradient-to-br from-indigo-600 to-purple-700 p-8 flex flex-col items-center justify-center text-center text-white">
                                <div className="bg-white/10 p-5 rounded-full mb-6 ring-4 ring-white/5">
                                    <Compass className="text-white" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">
                                    Explore All Centers
                                </h3>
                                <p className="text-indigo-100 mb-8 max-w-xs leading-relaxed">
                                    Discover hundreds of premium wellness destinations near you
                                </p>
                                <Link
                                    to="/centers"
                                    className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold py-3 px-8 rounded-xl transition duration-300 inline-flex items-center shadow-md"
                                >
                                    Browse All
                                    <ChevronRight className="ml-2" size={18} />
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Scroll hint for mobile */}
                    <div className="lg:hidden text-center mt-6 text-gray-400 text-sm animate-pulse">
                        Scroll right to explore →
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCenters;
