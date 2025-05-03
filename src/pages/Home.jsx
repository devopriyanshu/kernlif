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
  Dumbbell,
  Gauge,
  Building2,
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
    {
      name: "Michael Lee",
      category: "Yoga Instructor",
      experience: "5+ Years Experience",
      specialties: ["Hatha Yoga", "Meditation", "Mindfulness"],
      image: "/api/placeholder/400/400",
    },
    {
      name: "Michael Lee",
      category: "Yoga Instructor",
      experience: "5+ Years Experience",
      specialties: ["Hatha Yoga", "Meditation", "Mindfulness"],
      image: "/api/placeholder/400/400",
    },
    {
      name: "Michael Lee",
      category: "Yoga Instructor",
      experience: "5+ Years Experience",
      specialties: ["Hatha Yoga", "Meditation", "Mindfulness"],
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
      image: "/bg4.jpg",
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

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative  bg-no-repeat bg-[center_top_15%] bg-cover bg-[url('/bg6.png')] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="flex flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0 pt-24">
              <h1
                className="text-5xl text-white  font-bold leading-tight mb-4 text-shadow-lg"
                style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.7)" }}
              >
                Your Path to Complete Wellness
              </h1>
              <p className="text-xl mb-8 text-white">
                WellNest helps you balance your mental and physical health
                through personalized guidance, tracking, and expert support.
              </p>
              <div className="flex flex-wrap  gap-4">
                <Link
                  to="/health-check"
                  className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg font-semibold py-3 px-6 rounded-full transition duration-300 inline-flex items-center"
                >
                  Start Your Wellness Journey
                  <ChevronRight className="ml-2" size={18} />
                </Link>
                <Link
                  to="/about"
                  className="bg-transparent hover:bg-blue-700 border-2 border-white text-white font-semibold py-3 px-6 rounded-full transition duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
            {/* <div>
              <img
                src="/mental2.png"
                alt="Mental and Physical Wellness"
                className="w-full max-w-md mx-auto"
              />
            </div> */}
          </div>
        </div>

        {/* Stats Bar */}
        <div className=" py-6 mt-28 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {wellnessStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center bg-white/30 backdrop-blur-xl py-4 rounded-full"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex text-black justify-center mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl text-black font-bold">
                    {stat.value}
                  </div>
                  <div className="text-base text-black">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="w-full bg-gradient-to-r from-indigo-50 to-blue-50">
        <section className=" pt-20 px-4 sm:px-6 lg:px-56  mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How WellNest Helps You Thrive
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our integrated approach combines mental health tracking, physical
              wellness monitoring, and expert guidance to help you achieve
              balance and wellbeing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
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
      </div>

      {/* Health Check Section */}
      <section className="py-20 px-4 sm:px-6  lg:px-52 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className=" mx-auto">
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
                  <span className="text-lg text-gray-700">
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
                  <span className="text-lg text-gray-700">
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
                  <span className="text-lg text-gray-700">
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
                className="rounded-lg "
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-center items-center lg:px-28 flex-col md:flex-row ">
            <div className="md:w-1/2">
              <motion.img
                src="/experts.svg"
                alt="Health Assessment"
                className="rounded-lg "
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-center mb-12 ">
              <h2 className="text-3xl md:text-4xl pt-6 font-bold text-gray-900 mb-4">
                Find Your Perfect Wellness Expert
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Easily connect with certified wellness experts and schedule
                personalized sessions designed to align with your unique mental
                and physical health goals.
              </p>
            </div>
          </div>

          {/* Specialist Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 px-20 mb-12">
            {[
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
            ].map((specialist, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${specialist.color} text-center shadow-md transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer`}
              >
                <div
                  className={`w-16 h-16 ${specialist.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <span className="text-3xl">{specialist.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {specialist.name}
                </h3>
              </div>
            ))}
          </div>

          {/* CTA + Search */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto ">
            <div className="md:flex items-center justify-between gap-8">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Ready to Begin Your Wellness Journey?
                </h3>
                <p className="text-gray-600">
                  Book a consultation in just a few clicks
                </p>
              </div>
              <button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg">
                Browse All Experts
              </button>
            </div>

            {/* Search Bar */}
          </div>

          {/* Testimonial (Optional) */}
          {/* <div className="mt-16 text-center max-w-3xl mx-auto">
            <blockquote className="text-gray-700 italic mb-4">
              "Finding the right nutritionist transformed my health journey. The
              booking process was seamless and my specialist was incredibly
              knowledgeable."
            </blockquote>
            <p className="font-medium text-indigo-600">
              — Sarah K., Wellness Member Since 2022
            </p>
          </div> */}
        </div>
      </section>

      {/* Expert Consultants Section */}
      <section className="py-16  sm:px-6 bg-gray-200 lg:px-10 ">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Our Wellness Experts
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with certified professionals to guide your wellness journey
          </p>
        </div>

        <div className="relative">
          <div className="flex overflow-x-auto px-20 pb-6 gap-6 scrollbar-hide">
            {consultants.map((consultant, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-72 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="h-48 bg-gray-100 rounded-t-xl overflow-hidden">
                  <img
                    src={consultant.image}
                    alt={consultant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {consultant.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2">
                    {consultant.category}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    {consultant.experience}
                  </p>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {consultant.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="w-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition duration-300">
                    View Profile
                  </button>
                </div>
              </motion.div>
            ))}
            {/* View All Experts Card */}
            <div className="flex-shrink-0 w-72  flex flex-col items-center justify-center p-8 text-white">
              <h3 className="text-2xl font-bold mb-4 text-center">
                View All Experts
              </h3>
              <p className="text-blue-100 text-center mb-6">
                Explore our complete network of wellness professionals
              </p>
              <Link
                to="/all-experts"
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-2 px-6 rounded-lg transition duration-300 inline-flex items-center"
              >
                Browse All
                <ChevronRight className="ml-2" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Centers Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Wellness Centers Near You
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover top-rated facilities for your health and wellbeing
            </p>
          </div>

          <div className="relative">
            <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide">
              {wellnessCenters.map((center, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-80 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 relative"
                  whileHover={{ y: -5 }}
                >
                  <div className="h-56 bg-gray-200">
                    <img
                      src={center.image}
                      alt={center.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <div className="flex items-center mb-1">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="font-medium">{center.rating}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-1">{center.name}</h3>
                      <p className="text-sm text-gray-200 mb-2">
                        {center.type}
                      </p>
                      <p className="text-xs text-gray-300 flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {center.location}
                      </p>
                      <button className="mt-3 bg-white/90 hover:bg-white text-blue-700 text-sm font-medium py-2 px-4 rounded-lg transition duration-300">
                        View Center
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              {/* View All Centers Card */}
              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-green-600 to-teal-700 rounded-xl shadow-md flex flex-col items-center justify-center p-8 text-white">
                <h3 className="text-2xl font-bold mb-4 text-center">
                  View All Centers
                </h3>
                <p className="text-green-100 text-center mb-6">
                  Explore hundreds of wellness destinations in your area
                </p>
                <Link
                  to="/all-centers"
                  className="bg-white text-green-600 hover:bg-green-50 font-bold py-2 px-6 rounded-lg transition duration-300 inline-flex items-center"
                >
                  Browse All
                  <ChevronRight className="ml-2" size={18} />
                </Link>
              </div>
            </div>
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
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
};

export default Home;
