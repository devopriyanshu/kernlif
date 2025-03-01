import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
  FaStar,
  FaRegStar,
  FaRegClock,
  FaCalendarAlt,
  FaEnvelope,
  FaVideo,
  FaUserFriends,
  FaUser,
  FaLanguage,
  FaCheckCircle,
  FaArrowLeft,
  FaShare,
  FaHeart,
  FaRegHeart,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Sample expert data (enhanced)
const expert = {
  id: 1,
  name: "Dr. Sophia Carter",
  profilePic: "https://via.placeholder.com/400",
  backgroundImage: "https://via.placeholder.com/1600x400",
  category: "Psychologist",
  experience: "10+ years",
  bio: "Dr. Sophia Carter is a licensed clinical psychologist with over a decade of experience helping individuals overcome anxiety, depression, and stress-related issues. She specializes in cognitive behavioral therapy and mindfulness-based approaches to mental wellness.",
  qualifications: [
    "Ph.D. in Clinical Psychology, Stanford University",
    "M.A. in Psychology, Columbia University",
    "Certified Cognitive Behavioral Therapist",
    "Licensed Clinical Psychologist (NY State)",
  ],
  specialties: [
    "Anxiety & Panic Disorders",
    "Depression & Mood Disorders",
    "Stress Management",
    "Trauma Recovery",
    "Mindfulness Therapy",
    "Work-Life Balance",
  ],
  languages: ["English", "Spanish"],
  services: [
    {
      id: 1,
      name: "Initial Consultation",
      format: "In-person/Online",
      duration: "60 mins",
      price: "$90",
    },
    {
      id: 2,
      name: "Individual Therapy Session",
      format: "In-person/Online",
      duration: "50 mins",
      price: "$80",
    },
    {
      id: 3,
      name: "Group Therapy",
      format: "In-person",
      duration: "90 mins",
      price: "$60 per person",
    },
    {
      id: 4,
      name: "Crisis Intervention",
      format: "Online",
      duration: "30 mins",
      price: "$65",
    },
    {
      id: 5,
      name: "Couples Counseling",
      format: "In-person/Online",
      duration: "75 mins",
      price: "$120",
    },
  ],
  availability: {
    days: ["Monday", "Tuesday", "Wednesday", "Friday"],
    time: "9:00 AM - 6:00 PM",
    nextAvailable: "Tomorrow, 11:30 AM",
  },
  contact: {
    phone: "+1 987 654 3210",
    email: "sophia.carter@wellness.com",
    website: "www.drsophiacarter.com",
    location: "Serenity Wellness Center, 123 Healing St., New York, NY",
    googleMaps: "https://www.google.com/maps", // Replace with actual location link
  },
  socialProof: {
    clientsHelped: 500,
    yearsOfPractice: 10,
    certificationsCount: 8,
  },
  rating: 4.8,
  reviewCount: 124,
  reviews: [
    {
      id: 1,
      user: "Emily Johnson",
      userImage: "https://via.placeholder.com/50",
      date: "October 15, 2024",
      rating: 5,
      text: "Dr. Carter completely transformed my approach to anxiety. After struggling with panic attacks for years, her mindfulness techniques have given me the tools to manage my symptoms effectively. She's empathetic, professional, and truly invested in her clients' well-being.",
    },
    {
      id: 2,
      user: "Michael Smith",
      userImage: "https://via.placeholder.com/50",
      date: "September 28, 2024",
      rating: 5,
      text: "Professional, attentive, and incredibly knowledgeable. Dr. Carter helped me work through some difficult trauma in a safe and supportive environment. I've seen multiple therapists over the years, but she's the first one who really helped me make progress.",
    },
    {
      id: 3,
      user: "Aisha Patel",
      userImage: "https://via.placeholder.com/50",
      date: "October 2, 2024",
      rating: 4,
      text: "Dr. Carter is a compassionate listener who provides practical strategies for managing stress. Her cognitive behavioral approach has been very effective for me. The only reason for 4 stars instead of 5 is occasional scheduling difficulties.",
    },
  ],
  faq: [
    {
      question: "What should I expect from our first session?",
      answer:
        "The initial consultation is focused on understanding your concerns, history, and goals for therapy. We'll discuss your background, current challenges, and what you hope to achieve. This session helps me tailor my approach to your specific needs.",
    },
    {
      question: "Do you accept insurance?",
      answer:
        "I am an out-of-network provider for most insurance plans. I can provide you with a detailed receipt that you can submit to your insurance for potential reimbursement. I recommend checking with your insurance provider about their policies for mental health services.",
    },
    {
      question: "How often will we meet?",
      answer:
        "The frequency of sessions depends on your individual needs. Typically, I recommend weekly sessions when starting therapy. As you progress, we might transition to biweekly or monthly sessions. We'll regularly assess your progress and adjust accordingly.",
    },
  ],
};

const WellnessExpertDetails = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-300" />);
      }
    }
    return <div className="flex">{stars}</div>;
  };

  // Sample dates for booking calendar
  const nextWeekDates = [
    { day: "Mon", date: "Mar 3", available: true },
    { day: "Tue", date: "Mar 4", available: true },
    { day: "Wed", date: "Mar 5", available: true },
    { day: "Thu", date: "Mar 6", available: false },
    { day: "Fri", date: "Mar 7", available: true },
    { day: "Sat", date: "Mar 8", available: false },
    { day: "Sun", date: "Mar 9", available: false },
  ];

  // Sample time slots
  const timeSlots = [
    { time: "9:00 AM", available: false },
    { time: "10:00 AM", available: true },
    { time: "11:30 AM", available: true },
    { time: "1:00 PM", available: false },
    { time: "2:30 PM", available: true },
    { time: "4:00 PM", available: true },
    { time: "5:30 PM", available: false },
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Background */}
      <div
        className="relative h-64 md:h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${expert.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
        <div className="container mx-auto px-4 relative h-full flex items-end pb-8">
          <Link
            to="/experts"
            className="absolute top-6 left-6 bg-white bg-opacity-80 p-2 rounded-full text-blue-600 hover:bg-opacity-100 transition-all"
          >
            <FaArrowLeft size={20} />
          </Link>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 -mt-20 relative z-10 mb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Expert Profile */}
          <div className="lg:w-3/5">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <img
                    src={expert.profilePic}
                    alt={expert.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-md object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                          {expert.name}
                        </h1>
                        <p className="text-blue-600 font-medium text-lg">
                          {expert.category}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsFavorite(!isFavorite)}
                          className={`p-2 rounded-full ${
                            isFavorite
                              ? "bg-red-50 text-red-500"
                              : "bg-gray-100 text-gray-500"
                          } hover:bg-opacity-90`}
                        >
                          {isFavorite ? <FaHeart /> : <FaRegHeart />}
                        </button>
                        <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-opacity-90">
                          <FaShare />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center mt-2">
                      <div className="flex text-yellow-400 mr-2">
                        {renderStars(expert.rating)}
                      </div>
                      <p className="text-gray-700 font-medium">
                        {expert.rating}
                      </p>
                      <span className="mx-2 text-gray-400">•</span>
                      <p className="text-gray-600">
                        {expert.reviewCount} reviews
                      </p>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                        <FaRegClock className="mr-1" /> {expert.experience}
                      </span>
                      {expert.languages.map((lang, index) => (
                        <span
                          key={index}
                          className="bg-purple-50 text-purple-700 text-xs font-medium px-2 py-1 rounded-full flex items-center"
                        >
                          <FaLanguage className="mr-1" /> {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    About
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{expert.bio}</p>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {expert.socialProof.clientsHelped}+
                    </p>
                    <p className="text-gray-600 text-sm">Clients Helped</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {expert.socialProof.yearsOfPractice}
                    </p>
                    <p className="text-gray-600 text-sm">Years of Practice</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {expert.socialProof.certificationsCount}
                    </p>
                    <p className="text-gray-600 text-sm">Certifications</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Qualifications & Specialties */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Qualifications
                </h2>
                <ul className="space-y-2 mb-6">
                  {expert.qualifications.map((qual, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{qual}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                  Areas of Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {expert.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Services Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Services Offered
                </h2>
                <div className="space-y-3">
                  {expert.services.map((service, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedService === service.id
                          ? "bg-blue-50 border-blue-300"
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <div className="flex justify-between">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {service.name}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {service.format === "In-person/Online" ? (
                              <span className="flex items-center gap-1">
                                <FaUser className="text-green-500" size={12} />
                                <FaVideo className="text-blue-500" size={12} />
                                <span className="ml-1">
                                  In-person or Online
                                </span>
                              </span>
                            ) : service.format === "In-person" ? (
                              <span className="flex items-center">
                                <FaUser
                                  className="text-green-500 mr-1"
                                  size={12}
                                />
                                <span>In-person only</span>
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <FaVideo
                                  className="text-blue-500 mr-1"
                                  size={12}
                                />
                                <span>Online only</span>
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="flex items-center">
                              <FaRegClock className="mr-1" size={12} />
                              {service.duration}
                            </span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-blue-600 font-bold">
                            {service.price}
                          </p>
                          {service.name.includes("Group") && (
                            <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full mt-1">
                              <FaUserFriends className="mr-1" size={10} />
                              Group
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Reviews & Ratings
                  </h2>
                  <div className="flex items-center">
                    <div className="text-yellow-400 mr-2">
                      {renderStars(expert.rating)}
                    </div>
                    <p className="text-gray-700 font-medium">{expert.rating}</p>
                    <span className="mx-1 text-gray-400">•</span>
                    <p className="text-gray-600">
                      {expert.reviewCount} reviews
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {(showAllReviews
                    ? expert.reviews
                    : expert.reviews.slice(0, 2)
                  ).map((review, index) => (
                    <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <img
                            src={review.userImage}
                            alt={review.user}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <p className="font-semibold text-gray-800">
                              {review.user}
                            </p>
                            <p className="text-xs text-gray-500">
                              {review.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-yellow-400">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-gray-600">{review.text}</p>
                    </div>
                  ))}

                  {expert.reviews.length > 2 && (
                    <button
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      {showAllReviews
                        ? "Show Less"
                        : `View All ${expert.reviews.length} Reviews`}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {expert.faq.map((item, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
                        onClick={() => toggleFaq(index)}
                      >
                        <span className="font-medium text-gray-800">
                          {item.question}
                        </span>
                        {expandedFaq === index ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <div className="p-4 pt-0 border-t border-gray-200 bg-gray-50">
                          <p className="text-gray-600">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Contact & Location
                </h2>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-700">
                    <FaMapMarkerAlt className="mr-3 text-red-500" />{" "}
                    {expert.contact.location}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <FaPhone className="mr-3 text-green-500" />{" "}
                    {expert.contact.phone}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <FaEnvelope className="mr-3 text-blue-500" />{" "}
                    {expert.contact.email}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <FaGlobe className="mr-3 text-purple-500" />
                    <a
                      href={`https://${expert.contact.website}`}
                      className="text-blue-600 hover:underline"
                    >
                      {expert.contact.website}
                    </a>
                  </p>
                </div>
                <div className="mt-4 bg-gray-100 rounded-lg overflow-hidden h-56">
                  <iframe
                    src={expert.contact.googleMaps}
                    className="w-full h-full"
                    title="Google Maps"
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:w-2/5">
            <div className="sticky top-6">
              {/* Booking Widget */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    Book a Session
                  </h2>
                  <p className="text-gray-600 mb-4">
                    <FaCalendarAlt className="inline mr-2 text-blue-500" />
                    Next available: {expert.availability.nextAvailable}
                  </p>

                  {/* Service Selection */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Select a Service
                    </label>
                    <select
                      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) =>
                        setSelectedService(parseInt(e.target.value))
                      }
                      value={selectedService || ""}
                    >
                      <option value="" disabled>
                        Choose a service
                      </option>
                      {expert.services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name} ({service.duration} - {service.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date Selection */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Select a Date
                    </label>
                    <div className="grid grid-cols-7 gap-1">
                      {nextWeekDates.map((date, index) => (
                        <button
                          key={index}
                          className={`p-2 rounded-lg text-center transition-colors ${
                            !date.available
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : selectedDate === index
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          }`}
                          onClick={() =>
                            date.available && setSelectedDate(index)
                          }
                          disabled={!date.available}
                        >
                          <div className="text-xs font-medium">{date.day}</div>
                          <div className="text-sm font-bold">{date.date}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  {selectedDate !== null && (
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Select a Time
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot, index) => (
                          <button
                            key={index}
                            className={`p-2 rounded-lg text-center transition-colors ${
                              !slot.available
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : selectedTimeSlot === index
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                            onClick={() =>
                              slot.available && setSelectedTimeSlot(index)
                            }
                            disabled={!slot.available}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Format Selection */}
                  {selectedTimeSlot !== null && selectedService !== null && (
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">
                        Session Format
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="flex items-center justify-center gap-2 p-3 bg-blue-50 text-blue-700 font-medium rounded-lg border-2 border-blue-200 hover:bg-blue-100 transition-colors">
                          <FaVideo /> Online Session
                        </button>
                        <button className="flex items-center justify-center gap-2 p-3 bg-gray-50 text-gray-700 font-medium rounded-lg border-2 border-gray-200 hover:bg-gray-100 transition-colors">
                          <FaUser /> In-person
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                      selectedService !== null &&
                      selectedDate !== null &&
                      selectedTimeSlot !== null
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={
                      selectedService === null ||
                      selectedDate === null ||
                      selectedTimeSlot === null
                    }
                  >
                    Book Appointment
                  </button>

                  <p className="text-center text-gray-500 text-sm mt-3">
                    No payment required until after your session
                  </p>
                </div>
              </div>

              {/* Availability Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Regular Availability
                  </h2>
                  <div className="space-y-2">
                    {expert.availability.days.map((day, index) => (
                      <div
                        key={index}
                        className="flex items-center text-gray-700"
                      >
                        <div className="w-1 h-6 bg-green-500 rounded-full mr-3"></div>
                        <p>
                          <span className="font-medium">{day}:</span>{" "}
                          {expert.availability.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
                    <p className="flex items-start">
                      <FaRegClock className="mr-2 mt-1 flex-shrink-0" />
                      Appointments should be booked at least 24 hours in
                      advance. For urgent matters, please contact directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessExpertDetails;
