import React, { useState } from "react";
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
  Star,
  MapPin,
  ArrowRight,
  Compass,
  Utensils,
  Moon,
  TrendingUp,
  LayoutDashboard,
  ChevronDown,
  CheckCircle,
  DumbbellIcon,
  CreditCard,
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

  const [activeFeature, setActiveFeature] = useState(0);

  const dashboardfeatures = [
    {
      icon: Activity,
      color: "bg-blue-600",
      title: "Activity Tracking",
      description:
        "Monitor steps, workouts, and active minutes with detailed analytics and progress trends",
      tags: ["Steps", "Workouts", "Calories Burned"],
      tagColor: "bg-blue-50 text-blue-700",
    },
    {
      icon: Utensils,
      color: "bg-green-600",
      title: "Nutrition Tracking",
      description:
        "Log meals, track macros, and monitor calorie intake with our comprehensive food database",
      tags: ["Calories", "Macros", "Water"],
      tagColor: "bg-green-50 text-green-700",
    },
    {
      icon: Moon,
      color: "bg-indigo-600",
      title: "Sleep Analysis",
      description:
        "Track sleep duration, quality, and patterns with personalized recommendations",
      tags: ["Duration", "Quality", "Trends"],
      tagColor: "bg-indigo-50 text-indigo-700",
    },
    {
      icon: Calendar,
      color: "bg-purple-600",
      title: "Appointments",
      description:
        "Manage all wellness appointments in one place with reminders and scheduling",
      tags: ["Doctors", "Trainers", "Therapists"],
      tagColor: "bg-purple-50 text-purple-700",
    },
    {
      icon: TrendingUp,
      color: "bg-amber-600",
      title: "Trend Analysis",
      description:
        "Visualize your progress with customizable charts and historical data comparisons",
      tags: ["Progress", "Correlations", "Insights"],
      tagColor: "bg-amber-50 text-amber-700",
    },
    {
      icon: LayoutDashboard,
      color: "bg-gradient-to-r from-blue-500 to-purple-600",
      title: "Unified Dashboard",
      description:
        "See all your health metrics in one beautifully designed, customizable interface",
      tags: ["Customizable", "Integrated", "Real-time"],
      tagColor: "bg-blue-50 text-blue-700",
    },
  ];
  const ActiveIcon = dashboardfeatures[activeFeature].icon;

  const faqs = [
    {
      question: "What is this wellness platform about?",
      answer:
        "Our platform helps you manage your mental and physical well-being by connecting you to verified health experts, wellness centers, and providing a comprehensive dashboard to track your health metrics.",
    },
    {
      question: "How can I connect with a health expert?",
      answer:
        "You can browse and filter through a list of certified doctors, therapists, and trainers. Book appointments directly through their profiles based on availability.",
    },
    {
      question: "Can I find wellness centers near me?",
      answer:
        "Yes, use our 'Find Centers' feature to locate wellness centers by location, services, amenities, and user ratings.",
    },
    {
      question: "What features does the wellness dashboard offer?",
      answer:
        "The dashboard allows you to track activities, nutrition, sleep, appointments, and trends — all in one sleek, personalized interface.",
    },
    {
      question: "Is my personal health data secure?",
      answer:
        "Absolutely. We use industry-standard encryption and do not share your data with any third parties without your consent.",
    },
    {
      question: "Do I need a subscription to use the platform?",
      answer:
        "Core features are free. For advanced analytics, unlimited expert access, and premium content, you can upgrade to a subscription plan anytime.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
                  to="/"
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
          <div className=" bg-white rounded-2xl  p-8 max-w-4xl mx-auto ">
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
      <section className="pb-16  sm:px-6 bg-gradient-to-br from-blue-50 to-indigo-50 lg:px-10 ">
        <div className="relative">
          <div className="flex overflow-x-auto px-20 pb-6 gap-6 scrollbar-hide">
            {consultants.map((consultant, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-72  rounded-xl   transition-shadow duration-300 flex flex-col items-center py-6"
                whileHover={{ y: -5 }}
              >
                <div className="w-50 h-50 rounded-full overflow-hidden mb-4 border-4 border-blue-100">
                  {consultant.image ? (
                    <img
                      src={consultant.image}
                      alt={consultant.name}
                      className="w-72 h-72 rounded-full object-cover"
                    />
                  ) : (
                    <Skeleton circle={true} height={96} width={96} />
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-1">
                  {consultant.name}
                </h3>
                <p className="text-blue-600 font-medium text-center">
                  {consultant.category}
                </p>
              </motion.div>
            ))}

            {/* View All Experts Card */}
            <div className="flex-shrink-0 w-72  flex flex-col items-center justify-center p-8 text-black">
              <h3 className="text-2xl font-bold mb-4 text-center">
                View All Experts
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Explore our complete network of wellness professionals
              </p>
              <Link
                to="/all-experts"
                className="bg-white text-blue-600 hover:bg-blue-300 font-bold py-2 px-6 rounded-lg transition duration-300 inline-flex items-center"
              >
                Browse All
                <ChevronRight className="ml-2" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Centers Section */}
      <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
        <div className=" mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Find & Manage Wellness Centers with Ease
          </h2>
          <p className="text-gray-600 text-lg mb-12">
            Explore nearby gyms, yoga studios, and wellness centers and manage
            your subscriptions from one dashboard.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
              <div className="flex justify-center mb-4">
                <MapPin className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Nearby Health Centers
              </h3>
              <p className="text-gray-600 text-sm">
                Discover top-rated gyms and wellness hubs close to your location
                using smart filters and maps.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
              <div className="flex justify-center mb-4">
                <CreditCard className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Manage Subscriptions
              </h3>
              <p className="text-gray-600 text-sm">
                Easily view, renew, or cancel your memberships and class
                packages directly from your dashboard.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
              <div className="flex justify-center mb-4">
                <Dumbbell className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Center Details & Reviews
              </h3>
              <p className="text-gray-600 text-sm">
                Read expert and user reviews, view photos, amenities, pricing,
                and classes before joining.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Book Classes & Sessions
              </h3>
              <p className="text-gray-600 text-sm">
                Schedule classes or 1-on-1 sessions with trainers, therapists,
                or yoga instructors in one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className=" mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
              Featured Wellness Centers
            </h2>
          </div>

          <div className="relative">
            {/* Scrollable container */}
            <div className="flex overflow-x-auto pb-8 -mx-4 px-4 gap-8 scrollbar-hide snap-x snap-mandatory">
              {wellnessCenters.map((center, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-[600px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative snap-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {/* Image with gradient overlay */}
                  <div className="h-[400px] bg-gray-200 relative">
                    <img
                      src={center.image}
                      alt={center.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                        {center.category}
                      </span>
                    </div>
                  </div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none"></div>

                  {/* Card content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-3">
                        <Star
                          className="fill-yellow-400 text-yellow-400"
                          size={18}
                        />
                        <span className="font-bold ml-1">{center.rating}</span>
                      </div>
                      <span className="text-sm text-gray-200">
                        ({center.reviewCount} reviews)
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-2">{center.name}</h3>

                    <div className="flex items-center mb-4">
                      <MapPin className="text-gray-300 mr-2" size={16} />
                      <span className="text-gray-300">{center.location}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-300">
                        {center.distance} miles
                      </span>
                    </div>

                    <p className="text-gray-200 mb-5 line-clamp-2">
                      {center.description}
                    </p>

                    <button className="pointer-events-auto bg-white/90 hover:bg-white text-indigo-700 font-semibold py-2.5 px-5 rounded-lg transition duration-300 flex items-center">
                      View Center
                      <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* View All Card */}
              <div className="flex-shrink-0 w-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                <div className="h-full bg-gradient-to-br from-indigo-600 to-purple-600 p-8 flex flex-col items-center justify-center text-center text-white">
                  <div className="bg-white/10 p-5 rounded-full mb-6">
                    <Compass className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">
                    Explore All Centers
                  </h3>
                  <p className="text-indigo-100 mb-6 max-w-xs">
                    Discover hundreds of premium wellness destinations near you
                  </p>
                  <Link
                    to="/all-centers"
                    className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-300 inline-flex items-center"
                  >
                    Browse All
                    <ChevronRight className="ml-2" size={18} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Scroll hint for mobile */}
            <div className="lg:hidden text-center mt-4 text-gray-500 text-sm">
              <span className="inline-block animate-bounce">← Scroll →</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              Your Complete Wellness Dashboard
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Track, analyze, and optimize all aspects of your health in one
              unified platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-x-12">
            {[
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
                description:
                  "Manage sessions with doctors, trainers, and more.",
                icon: <Calendar className="text-purple-600" size={28} />,
              },
              {
                title: "Trend Analysis",
                description: "Visualize progress and correlations over time.",
                icon: <TrendingUp className="text-amber-600" size={28} />,
              },
              {
                title: "Unified Dashboard",
                description:
                  "All your wellness metrics — integrated and real-time.",
                icon: <LayoutDashboard className="text-blue-500" size={28} />,
              },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="mt-1">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 font-medium focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-600 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}

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
