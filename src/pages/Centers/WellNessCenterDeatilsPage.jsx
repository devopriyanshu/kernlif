import React, { useState } from "react";
import {
  FaStar,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaGlobe,
  FaEnvelope,
  FaClock,
  FaDollarSign,
  FaCalendarAlt,
  FaUsers,
  FaDumbbell,
  FaInfoCircle,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
} from "react-icons/fa";

const WellnessCenterDetails = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("about");

  const wellnessCenter = {
    name: "ZenFit Wellness Hub",
    category: "Gym & Yoga Center",
    rating: 4.8,
    reviews: 256,
    description:
      "A holistic wellness center offering gym, yoga, meditation, and personal training. Our mission is to help you achieve balance in body and mind through our comprehensive wellness programs and state-of-the-art facilities.",
    images: [
      "/images/wellness1.jpg",
      "/images/wellness2.jpg",
      "/images/wellness3.jpg",
      "/images/wellness4.jpg",
    ],
    address: "123 Wellness Street, Los Angeles, CA 90001",
    phone: "+1 (123) 456-7890",
    email: "info@zenfit.com",
    website: "www.zenfit.com",
    services: [
      {
        name: "Personal Training",
        icon: "💪",
        description: "One-on-one sessions with certified trainers",
      },
      {
        name: "Yoga Classes",
        icon: "🧘",
        description: "Various styles for all levels",
      },
      {
        name: "Sauna & Steam",
        icon: "🔥",
        description: "Relaxation and recovery facilities",
      },
      {
        name: "Meditation Rooms",
        icon: "🧠",
        description: "Guided and self-directed sessions",
      },
      {
        name: "Strength Training",
        icon: "🏋️",
        description: "Full equipment for resistance training",
      },
      {
        name: "Diet Consultation",
        icon: "🥗",
        description: "Personalized nutrition planning",
      },
      {
        name: "Group Fitness",
        icon: "👯",
        description: "Energetic classes for community building",
      },
      {
        name: "Recovery Zone",
        icon: "🔄",
        description: "Massage and physical therapy",
      },
    ],
    equipment: [
      "Treadmills",
      "Ellipticals",
      "Rowing Machines",
      "Free Weights",
      "Dumbbells",
      "Yoga Mats",
      "Resistance Bands",
      "Smith Machines",
      "Cable Machines",
    ],
    trainers: [
      {
        name: "John Doe",
        specialty: "Strength & Conditioning",
        bio: "Certified trainer with 10+ years experience in bodybuilding and functional fitness.",
        image: "/images/trainer1.jpg",
      },
      {
        name: "Emily Smith",
        specialty: "Yoga & Meditation",
        bio: "RYT-500 certified instructor specializing in Vinyasa and Yin yoga practices.",
        image: "/images/trainer2.jpg",
      },
      {
        name: "Michael Rodriguez",
        specialty: "Nutrition & Weight Management",
        bio: "Nutritionist with expertise in creating sustainable eating plans for fitness goals.",
        image: "/images/trainer3.jpg",
      },
    ],
    pricing: {
      monthly: "$49/month",
      annual: "$499/year",
      dayPass: "$10/day",
      classPackages: "$120/10 classes",
      personalTraining: "$65/session",
    },
    offers: "First Month Free for New Members",
    amenities: [
      "Towel Service",
      "Locker Rooms",
      "Showers",
      "Filtered Water Stations",
      "Juice Bar",
      "Free WiFi",
      "Parking",
    ],
    openingHours: {
      weekdays: "6 AM - 10 PM",
      weekends: "8 AM - 8 PM",
      special: "Ladies-only Hours: 12 PM - 3 PM (Tuesdays & Thursdays)",
    },
    googleMapsEmbed:
      "https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=123+Wellness+Street,Los+Angeles,CA",
    testimonials: [
      {
        name: "Sarah J.",
        comment:
          "ZenFit completely transformed my approach to fitness. The trainers are knowledgeable and supportive!",
        rating: 5,
      },
      {
        name: "Mark T.",
        comment:
          "Great facilities and a welcoming atmosphere. The yoga classes are exceptional.",
        rating: 4,
      },
      {
        name: "Priya M.",
        comment:
          "I love the variety of equipment and classes. Definitely worth the membership fee.",
        rating: 5,
      },
    ],
    upcomingClasses: [
      {
        name: "Morning Vinyasa",
        time: "7:00 AM",
        trainer: "Emily Smith",
        duration: "60 min",
      },
      {
        name: "HIIT Circuit",
        time: "12:00 PM",
        trainer: "John Doe",
        duration: "45 min",
      },
      {
        name: "Meditation Session",
        time: "5:30 PM",
        trainer: "Emily Smith",
        duration: "30 min",
      },
      {
        name: "Strength Basics",
        time: "6:30 PM",
        trainer: "Michael Rodriguez",
        duration: "60 min",
      },
    ],
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === 0 ? wellnessCenter.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === wellnessCenter.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= rating ? "text-yellow-500" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <div className=" space-y-4 min-w-3/4  max-w-7xl">
            <p className="text-gray-700 leading-relaxed">
              {wellnessCenter.description}
            </p>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">
                Amenities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {wellnessCenter.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">
                Equipment
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {wellnessCenter.equipment.map((equipment, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    <span>{equipment}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "services":
        return (
          <div className="grid grid-cols-1 w-3/4 md:grid-cols-2 gap-4 max-w-7xl">
            {wellnessCenter.services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md border border-blue-100 hover:border-blue-300 transition-all"
              >
                <div className="flex items-start">
                  <span className="text-2xl mr-3">{service.icon}</span>
                  <div>
                    <h3 className="font-semibold text-blue-700">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "trainers":
        return (
          <div className="grid grid-cols-1 min-w-3/4 md:grid-cols-3 gap-6 max-w-7xl">
            {wellnessCenter.trainers.map((trainer, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="h-48 bg-gray-200 relative">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-blue-700">
                    {trainer.name}
                  </h3>
                  <p className="text-sm font-medium text-blue-500">
                    {trainer.specialty}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{trainer.bio}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case "pricing":
        return (
          <div className="space-y-6 min-w-3/4 max-w-7xl">
            <div className="bg-blue-50 p-5 rounded-lg shadow-md border border-blue-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-blue-700">
                  Current Offer
                </h3>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  Active
                </span>
              </div>
              <p className="text-lg font-medium">{wellnessCenter.offers}</p>
              <p className="text-sm text-gray-600 mt-2">
                Sign up today to take advantage of this limited-time offer!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:border-blue-300 transition-all">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  Monthly Plan
                </h3>
                <p className="text-2xl font-bold">
                  {wellnessCenter.pricing.monthly}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Flexible month-to-month membership with no long-term
                  commitment.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:border-blue-300 transition-all">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  Annual Plan
                </h3>
                <p className="text-2xl font-bold">
                  {wellnessCenter.pricing.annual}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Our best value! Save over 15% compared to monthly payments.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:border-blue-300 transition-all">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  Day Pass
                </h3>
                <p className="text-2xl font-bold">
                  {wellnessCenter.pricing.dayPass}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Try our facilities without commitment. Perfect for visitors.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                Additional Options
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Class Packages:</span>
                  <span className="font-medium">
                    {wellnessCenter.pricing.classPackages}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Personal Training:</span>
                  <span className="font-medium">
                    {wellnessCenter.pricing.personalTraining}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        );

      case "schedule":
        return (
          <div className="space-y-6 w-3/4 max-w-7xl">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-3">
                Operating Hours
              </h3>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center mb-2">
                  <FaClock className="text-blue-500 mr-2" />
                  <span className="font-medium">Weekdays:</span>
                  <span className="ml-2">
                    {wellnessCenter.openingHours.weekdays}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <FaClock className="text-blue-500 mr-2" />
                  <span className="font-medium">Weekends:</span>
                  <span className="ml-2">
                    {wellnessCenter.openingHours.weekends}
                  </span>
                </div>
                <div className="flex items-center text-blue-700">
                  <FaInfoCircle className="mr-2" />
                  <span>{wellnessCenter.openingHours.special}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-3">
                Upcoming Classes Today
              </h3>
              <div className="space-y-3">
                {wellnessCenter.upcomingClasses.map((cls, index) => (
                  <div
                    key={index}
                    className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-medium">{cls.name}</h4>
                      <p className="text-sm text-gray-600">
                        with {cls.trainer} • {cls.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-blue-600">{cls.time}</p>
                      <button className="text-xs text-white bg-green-500 px-2 py-1 rounded mt-1 hover:bg-green-600 transition-colors">
                        Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "reviews":
        return (
          <div className="space-y-6 min-w-3/4 max-w-7xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-blue-700 mr-2">
                  {wellnessCenter.rating}
                </span>
                <div className="flex mr-2">
                  {renderStars(Math.round(wellnessCenter.rating))}
                </div>
                <span className="text-gray-500">
                  ({wellnessCenter.reviews} reviews)
                </span>
              </div>
              <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors">
                Write a Review
              </button>
            </div>

            <div className="space-y-4">
              {wellnessCenter.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <div className="flex">
                    <FaQuoteLeft className="text-gray-300 text-xl mr-2 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{testimonial.comment}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                View All Reviews →
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className=" mx-auto p-4 lg:pt-24 md:p-6 md:pt-12 bg-gray-100">
      {/* Header Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-700">
              {wellnessCenter.name}
            </h1>
            <p className="text-gray-600 text-lg">{wellnessCenter.category}</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col md:items-end">
            <div className="flex items-center">
              <div className="flex mr-2">
                {renderStars(Math.round(wellnessCenter.rating))}
              </div>
              <span className="text-lg font-semibold">
                {wellnessCenter.rating}
              </span>
              <span className="text-gray-500 ml-1">
                ({wellnessCenter.reviews})
              </span>
            </div>
            <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm md:text-base font-medium">
              Book a Free Trial
            </button>
          </div>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="w-full my-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="relative h-64 md:h-[500px] overflow-hidden rounded-lg">
              <img
                src={wellnessCenter.images[activeImageIndex]}
                alt="Wellness Center"
                className="w-full h-full object-cover"
              />
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full flex items-center justify-center"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full flex items-center justify-center"
              >
                <FaChevronRight />
              </button>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {wellnessCenter.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === activeImageIndex
                        ? "bg-white"
                        : "bg-white bg-opacity-50"
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  ></button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact & Map Container */}
          <div className="grid grid-cols-1 gap-6 h-full">
            {/* Contact Details Card */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-blue-700 mb-3">
                Contact Details
              </h2>
              <div className="space-y-3">
                <p className="flex items-center text-gray-700">
                  <FaMapMarkerAlt className="mr-3 text-blue-500" />
                  {wellnessCenter.address}
                </p>
                <p className="flex items-center text-gray-700">
                  <FaPhoneAlt className="mr-3 text-green-500" />
                  {wellnessCenter.phone}
                </p>
                <p className="flex items-center text-gray-700">
                  <FaEnvelope className="mr-3 text-red-500" />
                  {wellnessCenter.email}
                </p>
                <p className="flex items-center text-gray-700">
                  <FaGlobe className="mr-3 text-purple-500" />
                  <a
                    href={`https://${wellnessCenter.website}`}
                    className="text-blue-500 hover:underline"
                  >
                    {wellnessCenter.website}
                  </a>
                </p>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-white p-0 rounded-lg shadow-md h-full">
              <iframe
                src={wellnessCenter.googleMapsEmbed}
                className="w-full h-64 md:h-[calc(500px-6rem)] rounded-lg"
                allowFullScreen
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className=" bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex justify-around overflow-x-auto scrollbar-hide border-b">
          {[
            "about",
            "services",
            "trainers",
            "pricing",
            "schedule",
            "reviews",
          ].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-3 font-medium whitespace-nowrap ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex p-6 justify-center">{renderTabContent()}</div>
      </div>

      {/* CTA Section */}
      <div className="mt-8 bg-blue-600 text-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-2">
          Ready to Start Your Wellness Journey?
        </h2>
        <p className="mb-4">
          Join ZenFit today and experience the perfect balance of mind and body
          wellness.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
            Book a Free Trial
          </button>
          <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            View Membership Options
          </button>
        </div>
      </div>
    </div>
  );
};

export default WellnessCenterDetails;
