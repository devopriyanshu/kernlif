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
import { useParams } from "react-router-dom";
import { useCenterDetail } from "../../hooks/useCenterHooks";

// Mock hook for demonstration

const WellnessCenterDetails = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("about");
  const { id } = useParams();
  const { data: apiData, isLoading, error } = useCenterDetail(id);
  console.log("data", apiData);

  // Process API data without defaults
  const processWellnessCenterData = (apiData) => {
    if (!apiData) return {};

    // Process amenities
    const amenities =
      apiData.amenities?.length > 0
        ? apiData.amenities.map((item) => item.value)
        : [];

    // Process equipment
    const equipment =
      apiData.equipment?.length > 0
        ? apiData.equipment.map((item) => item.value)
        : [];

    // Process services
    const services = apiData.services?.length > 0 ? apiData.services : [];

    // Process trainers
    const trainers =
      apiData.trainers?.length > 0
        ? apiData.trainers.map((trainer) => ({
            ...trainer,
            image: trainer.image || "/images/trainer-default.jpg",
          }))
        : [];

    // Process pricing
    const pricingObj = {};
    if (apiData.pricing?.length > 0) {
      apiData.pricing.forEach((item) => {
        pricingObj[item.type] = `$${item.price}${
          item.type === "monthly"
            ? "/month"
            : item.type === "annual"
            ? "/year"
            : item.type === "dayPass"
            ? "/day"
            : item.type === "classPackages"
            ? "/10 classes"
            : "/session"
        }`;
      });
    }

    // Process images
    const images =
      apiData.images?.length > 0
        ? apiData.images.map((img) => img.image_url)
        : [];

    return {
      name: apiData.name || "",
      category: apiData.category || "",
      description: apiData.description || "",
      address: apiData.address || "",
      phone: apiData.phone || "",
      email: apiData.email || "",
      website: apiData.website?.replace("https://", "") || "",
      offers: apiData.offers || "",
      center_image: apiData.center_image || "",
      images,
      amenities,
      equipment,
      services,
      trainers,
      pricing: pricingObj,
      schedule: apiData.schedule || [],
      rating: 0, // No rating data in API
      reviews: 0, // No reviews data in API
      testimonials: [], // No testimonials data in API
      upcomingClasses: [], // No upcoming classes data in API
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Loading wellness center details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-600 text-xl">
            Error loading wellness center details
          </p>
          <p className="text-gray-600 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  const wellnessCenter = processWellnessCenterData(apiData);
  console.log("wellnessCenter", wellnessCenter);

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
              {wellnessCenter.description || "No description available."}
            </p>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">
                Amenities
              </h3>
              {wellnessCenter.amenities.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {wellnessCenter.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No amenities information available.
                </p>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">
                Equipment
              </h3>
              {wellnessCenter.equipment.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {wellnessCenter.equipment.map((equipment, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                      <span>{equipment}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No equipment information available.
                </p>
              )}
            </div>
          </div>
        );

      case "services":
        return (
          <div className="grid grid-cols-1 w-3/4 md:grid-cols-2 gap-4 max-w-7xl">
            {wellnessCenter.services.length > 0 ? (
              wellnessCenter.services.map((service, index) => (
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
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No services information available.
              </div>
            )}
          </div>
        );

      case "trainers":
        return (
          <div className="grid grid-cols-1 min-w-3/4 md:grid-cols-3 gap-6 max-w-7xl">
            {wellnessCenter.trainers.length > 0 ? (
              wellnessCenter.trainers.map((trainer, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all w-80"
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
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No trainers information available.
              </div>
            )}
          </div>
        );

      case "pricing":
        return (
          <div className="space-y-6 min-w-3/4 max-w-7xl">
            {wellnessCenter.offers && (
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
            )}

            {Object.keys(wellnessCenter.pricing).length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {wellnessCenter.pricing.monthly && (
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
                  )}

                  {wellnessCenter.pricing.annual && (
                    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:border-blue-300 transition-all">
                      <h3 className="text-xl font-semibold text-blue-700 mb-2">
                        Annual Plan
                      </h3>
                      <p className="text-2xl font-bold">
                        {wellnessCenter.pricing.annual}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Our best value! Save over 15% compared to monthly
                        payments.
                      </p>
                    </div>
                  )}

                  {wellnessCenter.pricing.dayPass && (
                    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:border-blue-300 transition-all">
                      <h3 className="text-xl font-semibold text-blue-700 mb-2">
                        Day Pass
                      </h3>
                      <p className="text-2xl font-bold">
                        {wellnessCenter.pricing.dayPass}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Try our facilities without commitment. Perfect for
                        visitors.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">
                    Additional Options
                  </h3>
                  <ul className="space-y-2">
                    {wellnessCenter.pricing.classPackages && (
                      <li className="flex justify-between">
                        <span>Class Packages:</span>
                        <span className="font-medium">
                          {wellnessCenter.pricing.classPackages}
                        </span>
                      </li>
                    )}
                    {wellnessCenter.pricing.personalTraining && (
                      <li className="flex justify-between">
                        <span>Personal Training:</span>
                        <span className="font-medium">
                          {wellnessCenter.pricing.personalTraining}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500">
                No pricing information available.
              </div>
            )}
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
                {wellnessCenter.schedule &&
                wellnessCenter.schedule.length > 0 ? (
                  <div className="space-y-3">
                    {wellnessCenter.schedule.map((day, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <FaClock className="text-blue-500 mr-2" />
                          <span className="font-medium">
                            {day.day_of_week}:
                          </span>
                        </div>
                        {day.is_open ? (
                          <span>
                            {day.opening_time} - {day.closing_time}
                          </span>
                        ) : (
                          <span className="text-gray-500">Closed</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500">
                    No schedule information available
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "reviews":
        return (
          <div className="space-y-6 min-w-3/4 max-w-7xl">
            {wellnessCenter.rating > 0 ? (
              <div className="flex items-center justify-center">
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
            ) : (
              <div className="text-center text-gray-500">
                No rating information available.
              </div>
            )}

            {wellnessCenter.testimonials.length > 0 ? (
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
            ) : (
              <div className="text-center text-gray-500">
                No testimonials available.
              </div>
            )}

            {wellnessCenter.testimonials.length > 0 && (
              <div className="text-center">
                <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  View All Reviews →
                </button>
              </div>
            )}
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
          Join {wellnessCenter.name} today and experience the perfect balance of
          mind and body wellness.
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
