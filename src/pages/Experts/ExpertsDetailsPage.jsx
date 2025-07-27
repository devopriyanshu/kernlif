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
import { Link, useParams } from "react-router-dom";
import { useExpertDetail } from "../../hooks/useExpertHooks";

// Default expert data structure
const defaultExpert = {
  id: 0,
  name: "Expert",
  profilePic: "https://via.placeholder.com/400",
  backgroundImage: "https://via.placeholder.com/1600x400",
  category: "Professional",
  experience: "Not specified",
  bio: "No biography available",
  qualifications: [],
  specialties: [],
  languages: [],
  services: [
    {
      id: 1,
      name: "Consultation",
      format: "In-person/Online",
      duration: "60 mins",
      price: "$0",
    },
  ],
  availability: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    time: "9:00 AM - 5:00 PM",
    nextAvailable: "Not available",
  },
  contact: {
    phone: "Not provided",
    email: "Not provided",
    website: "example.com",
    location: "Location not provided",
    googleMaps: "https://www.google.com/maps",
  },
  socialProof: {
    clientsHelped: 0,
    yearsOfPractice: 0,
    certificationsCount: 0,
  },
  rating: 0,
  reviewCount: 0,
  reviews: [],
  faq: [],
};

const WellnessExpertDetails = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const { id } = useParams();
  const { data: expertdata, isLoading, isError } = useExpertDetail(id);

  // Merge API data with defaults
  const expert = {
    ...defaultExpert,
    id: expertdata?.id || defaultExpert.id,
    name: expertdata?.name || defaultExpert.name,
    profilePic: expertdata?.profile_image || defaultExpert.profilePic,
    backgroundImage: expertdata?.bg_image || defaultExpert.backgroundImage,
    category: expertdata?.category || defaultExpert.category,
    experience: expertdata?.experience || defaultExpert.experience,
    bio: expertdata?.bio || defaultExpert.bio,
    qualifications: expertdata?.qualifications?.length
      ? expertdata.qualifications
      : defaultExpert.qualifications,
    specialties: expertdata?.specialties?.length
      ? expertdata.specialties
      : defaultExpert.specialties,
    languages: expertdata?.languages?.length
      ? expertdata.languages
      : defaultExpert.languages,
    contact: {
      ...defaultExpert.contact,
      phone: expertdata?.phone || defaultExpert.contact.phone,
      email: expertdata?.email || defaultExpert.contact.email,
      website: expertdata?.website || defaultExpert.contact.website,
      location: expertdata?.location || defaultExpert.contact.location,
    },
    faq: expertdata?.faq?.length ? expertdata.faq : defaultExpert.faq,
  };

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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        Loading expert details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        Error loading expert details
      </div>
    );
  }

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
                {expert.qualifications.length > 0 ? (
                  <ul className="space-y-2 mb-6">
                    {expert.qualifications.map((qual, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{qual}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No qualifications listed</p>
                )}

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                  Areas of Expertise
                </h2>
                {expert.specialties.length > 0 ? (
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
                ) : (
                  <p className="text-gray-500">No specialties listed</p>
                )}
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

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Frequently Asked Questions
                </h2>
                {expert.faq.length > 0 ? (
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
                ) : (
                  <p className="text-gray-500">No FAQs available</p>
                )}
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
                  {expert.contact.website && (
                    <p className="flex items-center text-gray-700">
                      <FaGlobe className="mr-3 text-purple-500" />
                      <a
                        href={`https://${expert.contact.website}`}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {expert.contact.website}
                      </a>
                    </p>
                  )}
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
