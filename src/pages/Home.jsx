import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Activity,
  Heart,
  Brain,
  Map,
  Calendar,
} from "lucide-react";
import { assessmentImage } from "../utils/constant";

const Home = () => {
  const consultants = [
    {
      name: "Dr. Sarah Johnson",
      category: "Psychologist",
      experience: "10+ Years Experience",
      specialties: ["Anxiety", "Depression", "Stress Management"],
      image: "/doctor1.jpg",
    },
    {
      name: "Dr. Alex Carter",
      category: "Dietitian",
      experience: "8+ Years Experience",
      specialties: [
        "Nutrition Planning",
        "Weight Management",
        "Sports Nutrition",
      ],
      image: "/api/placeholder/400/400",
    },
    {
      name: "Dr. Emily Brown",
      category: "Nutritionist",
      experience: "7+ Years Experience",
      specialties: ["Holistic Nutrition", "Diet Planning", "Gut Health"],
      image: "/api/placeholder/400/400",
    },
    {
      name: "Michael Lee",
      category: "Yoga Instructor",
      experience: "5+ Years Experience",
      specialties: ["Hatha Yoga", "Meditation", "Mindfulness"],
      image: "/api/placeholder/400/400",
    },
  ];

  const wellnessCenters = [
    {
      name: "Zen Yoga Studio",
      type: "Yoga & Meditation",
      location: "Downtown, New York",
      rating: 4.8,
      image: "/api/placeholder/600/400",
    },
    {
      name: "Muscle Factory Gym",
      type: "Fitness & Gym",
      location: "Brooklyn, NY",
      rating: 4.6,
      image: "/api/placeholder/600/400",
    },
    {
      name: "Peaceful Retreat",
      type: "Relaxation & Meditation",
      location: "Central Park, NY",
      rating: 4.9,
      image: "/api/placeholder/600/400",
    },
  ];

  const wellnessStats = [
    { label: "Active Users", value: "50K+", icon: <Activity size={24} /> },
    { label: "Expert Consultants", value: "200+", icon: <Brain size={24} /> },
    { label: "Wellness Centers", value: "500+", icon: <Map size={24} /> },
    { label: "Daily Sessions", value: "1,000+", icon: <Calendar size={24} /> },
  ];

  const features = [
    {
      title: "Personalized Wellness Journey",
      description:
        "Get customized recommendations based on your health profile, goals, and preferences to create a holistic wellness plan that works for you.",
      icon: <Heart className="text-rose-500" size={32} />,
    },
    {
      title: "Track Your Mental Health",
      description:
        "Monitor your mood patterns, stress levels, and emotional well-being with interactive tools and visualizations.",
      icon: <Brain className="text-indigo-500" size={32} />,
    },
    {
      title: "Expert Guidance",
      description:
        "Connect with certified mental health professionals, nutritionists, fitness trainers, and wellness coaches for personalized support.",
      icon: <Activity className="text-emerald-500" size={32} />,
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative  bg-no-repeat bg-center bg-[url('/bg4.jpg')] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-5xl font-bold leading-tight mb-4">
                Your Path to Complete Wellness
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                WellNest helps you balance your mental and physical health
                through personalized guidance, tracking, and expert support.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/health-check"
                  className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-6 rounded-full transition duration-300 inline-flex items-center"
                >
                  Start Your Wellness Journey
                  <ChevronRight className="ml-2" size={18} />
                </Link>
                <Link
                  to="/about"
                  className="bg-transparent hover:bg-blue-700 border border-white text-white font-semibold py-3 px-6 rounded-full transition duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-white/10 backdrop-blur-lg py-6 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {wellnessStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How WellNest Helps You Thrive
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our integrated approach combines mental health tracking, physical
            wellness monitoring, and expert guidance to help you achieve balance
            and wellbeing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Health Check Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="md:w-1/2 mr-3 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Understand Your Wellbeing Score
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our comprehensive assessment evaluates your mental, physical,
                and emotional health to create a personalized wellness profile.
                Get insights into your strengths and areas for improvement.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
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
                  <span className="text-gray-700">
                    5-minute assessment based on clinical research
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
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
                  <span className="text-gray-700">
                    Personalized recommendations based on your results
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
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
                  <span className="text-gray-700">
                    Track your progress with regular reassessments
                  </span>
                </li>
              </ul>
              <Link
                to="/health-check"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 inline-flex items-center"
              >
                Take the Health Check
                <ChevronRight className="ml-2" size={18} />
              </Link>
            </div>
            <div className="md:w-1/2">
              <motion.img
                src={assessmentImage}
                alt="Health Assessment"
                className="rounded-lg shadow-xl"
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Expert Consultants Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Meet Our Wellness Experts
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our network of certified professionals is ready to guide you on your
            wellness journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {consultants.map((consultant, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={consultant.image}
                alt={consultant.name}
                className="w-full h-48 object-contain"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {consultant.name}
                </h3>
                <p className="text-blue-600 font-medium">
                  {consultant.category}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  {consultant.experience}
                </p>
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {consultant.specialties.map((specialty, i) => (
                      <span
                        key={i}
                        className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  to="/expert-details"
                  className="block text-center bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-full transition duration-300"
                >
                  View Profile
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/all-experts"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            View All Wellness Experts
            <ChevronRight className="ml-1" size={18} />
          </Link>
        </div>
      </section>

      {/* Wellness Centers Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Discover Wellness Centers Near You
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find the perfect fitness centers, yoga studios, meditation spaces,
              and relaxation spots in your area.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {wellnessCenters.map((center, index) => (
              <motion.div
                key={index}
                className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={center.image}
                  alt={center.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="absolute bottom-0 p-6 text-white">
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span>{center.rating}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{center.name}</h3>
                    <p className="text-sm text-gray-200 mb-1">{center.type}</p>
                    <p className="text-xs text-gray-300 mb-4">
                      {center.location}
                    </p>
                    <Link
                      to="/center-details"
                      className="bg-white/90 hover:bg-white text-blue-700 text-sm font-medium py-2 px-4 rounded-full transition duration-300 inline-block"
                    >
                      View Center
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              to="/find-gym"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
            >
              Find a Gym
            </Link>
            <Link
              to="/find-yoga"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
            >
              Find Yoga Classes
            </Link>
            <Link
              to="/find-meditation"
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
            >
              Meditation Centers
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join thousands of people who have transformed their well-being with
            WellNest.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center mb-6">
              <div className="text-yellow-400 flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              "WellNest has completely changed how I approach my mental health.
              The daily check-ins and guided sessions have helped me manage my
              anxiety in ways I never thought possible."
            </p>
            <div className="flex items-center">
              <img
                src="/api/placeholder/50/50"
                alt="User"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium text-gray-900">Jessica K.</p>
                <p className="text-sm text-gray-500">Member for 8 months</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center mb-6">
              <div className="text-yellow-400 flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              "The expert consultations have been incredible. Being able to talk
              to a nutritionist and fitness coach through the app has made
              achieving my health goals so much easier."
            </p>
            <div className="flex items-center">
              <img
                src="/api/placeholder/50/50"
                alt="User"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium text-gray-900">Mark T.</p>
                <p className="text-sm text-gray-500">Member for 1 year</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center mb-6">
              <div className="text-yellow-400 flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              "I've tried many wellness apps, but WellNest is the first one that
              addresses both mental and physical health together. The integrated
              approach really works."
            </p>
            <div className="flex items-center">
              <img
                src="/api/placeholder/50/50"
                alt="User"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium text-gray-900">Sarah L.</p>
                <p className="text-sm text-gray-500">Member for 6 months</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Begin Your Wellness Journey Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Start with a simple health check and discover personalized
            recommendations for your mind and body.
          </p>
          <Link
            to="/health-check"
            className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full transition duration-300 inline-flex items-center text-lg"
          >
            Get Started Now
            <ChevronRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
