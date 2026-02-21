import React, { useState, useEffect } from "react";
import {
  FaStar,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaGlobe,
  FaEnvelope,
  FaClock,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaCheckCircle,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useCenterDetail } from "../../hooks/useCenterHooks";

const WellnessCenterDetails = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("about");
  const { id } = useParams();
  const { data: rawData, isLoading, error } = useCenterDetail(id);
  const apiData = rawData?.data || rawData;

  // Auto-advance carousel
  useEffect(() => {
    if (!apiData || activeTab !== "about") return;
    const timer = setInterval(() => {
      handleNextImage();
    }, 5000);
    return () => clearInterval(timer);
  }, [apiData, activeImageIndex, activeTab]);

  const processWellnessCenterData = (data) => {
    if (!data) return {};

    const images = (data.center_images || []).map((img) => img.image_url);
    if (images.length === 0 && data.centerImage) {
      images.push(data.centerImage);
    } else if (images.length === 0) {
      images.push(
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2920&auto=format&fit=crop"
      );
    }

    return {
      name: data.name || "Wellness Center",
      category: data.category || "Health & Wellness",
      description: data.description || "No description provided.",
      address: data.address || "Location not provided",
      phone: data.phone || "Not provided",
      email: data.email || "Not provided",
      website: data.website?.replace(/^https?:\/\//, "") || "",
      offers: data.offers || "",
      latitude: data.latitude || "",
      longitude: data.longitude || "",
      images,
      amenities: (data.center_amenities || []).map((a) => a.value),
      equipment: (data.center_equipment || []).map((e) => e.value),
      services: (data.center_services || []).map((service) => ({
        name: service.name,
        description: service.description || "No description",
        icon: service.icon || "✨",
      })),
      trainers: (data.center_trainers || []).map((trainer) => ({
        name: trainer.name || "",
        specialty: trainer.specialty || "",
        bio: trainer.bio || "",
        image:
          trainer.image ||
          "https://res.cloudinary.com/drer12ar3/image/upload/v1757876592/1501beba-54fc-46dd-a4c1-541520e924de_wwcw8l.jpg",
      })),
      pricing: (data.center_pricing || []).reduce((acc, curr) => {
        acc[curr.type] = curr.price;
        return acc;
      }, {}),
      schedule: (data.center_schedule || []).map((day) => {
        const formatTime = (isoString) => {
          if (!isoString) return "";
          try {
            const date = new Date(isoString);
            return date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
              timeZone: "UTC", // Backend dates seem to be "1970-01-01T08:00:00.000Z"
            });
          } catch (e) {
            return "";
          }
        };
        return {
          day_of_week: day.day_of_week,
          is_open: day.is_open,
          opening_time: formatTime(day.opening_time),
          closing_time: formatTime(day.closing_time),
        };
      }),
      rating: Number(data.rating) || 5.0,
      reviews: data.totalReviews || 0,
      testimonials: [], // Not yet in backend
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  if (error || !apiData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-600 font-medium">
          Error loading wellness center details. Please try again.
        </div>
      </div>
    );
  }

  const wellnessCenter = processWellnessCenterData(apiData);

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
          className={i <= rating ? "text-yellow-400" : "text-yellow-100"}
        />
      );
    }
    return <div className="flex gap-1">{stars}</div>;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto space-y-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                About the Center
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {wellnessCenter.description}
              </p>
            </div>

            {(wellnessCenter.amenities.length > 0 ||
              wellnessCenter.equipment.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {wellnessCenter.amenities.length > 0 && (
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">
                      Amenities
                    </h3>
                    <ul className="space-y-4">
                      {wellnessCenter.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-start">
                          <FaCheckCircle className="text-slate-900 mt-1 mr-3 shrink-0" />
                          <span className="text-slate-700 font-medium">
                            {amenity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {wellnessCenter.equipment.length > 0 && (
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">
                      Equipment
                    </h3>
                    <ul className="space-y-4">
                      {wellnessCenter.equipment.map((eq, index) => (
                        <li key={index} className="flex items-start">
                          <FaCheckCircle className="text-slate-900 mt-1 mr-3 shrink-0" />
                          <span className="text-slate-700 font-medium">
                            {eq}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "services":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wellnessCenter.services.length > 0 ? (
                wellnessCenter.services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all group"
                  >
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {service.name}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-slate-500 py-12 bg-white rounded-3xl border border-slate-100">
                  No services listed yet.
                </div>
              )}
            </div>
          </div>
        );

      case "trainers":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wellnessCenter.trainers.length > 0 ? (
                wellnessCenter.trainers.map((trainer, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="aspect-[4/5] relative overflow-hidden bg-slate-100">
                      <img
                        src={trainer.image}
                        alt={trainer.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        {trainer.specialty}
                      </p>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {trainer.name}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-3">
                        {trainer.bio}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-slate-500 py-12 bg-white rounded-3xl border border-slate-100">
                  No trainers listed yet.
                </div>
              )}
            </div>
          </div>
        );

      case "pricing":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto space-y-8">
            {wellnessCenter.offers && (
              <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold tracking-wide uppercase mb-4">
                    Special Offer
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {wellnessCenter.offers}
                  </h3>
                  <p className="text-slate-400">
                    Sign up today to take advantage of this limited-time offer!
                  </p>
                </div>
              </div>
            )}

            {Object.keys(wellnessCenter.pricing).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(wellnessCenter.pricing).map(
                  ([type, price], index) => (
                    <div
                      key={index}
                      className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:border-slate-300 transition-all flex justify-between items-center"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">
                          {type}
                        </h3>
                        <p className="text-slate-400 text-sm font-medium">
                          Per Session/Visit
                        </p>
                      </div>
                      <div className="text-3xl font-extrabold text-slate-900">
                        {price.replace("$", "")}
                        <span className="text-lg text-slate-400 font-medium ml-1">
                          $
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="text-center text-slate-500 py-12 bg-white rounded-3xl border border-slate-100">
                No pricing information available.
              </div>
            )}
          </div>
        );

      case "schedule":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                <FaClock className="mr-3 text-slate-400" /> Operating Hours
              </h3>
              {wellnessCenter.schedule.length > 0 ? (
                <div className="space-y-4">
                  {wellnessCenter.schedule.map((day, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0"
                    >
                      <span className="font-bold text-slate-700 capitalize w-32">
                        {day.day_of_week}
                      </span>
                      {day.is_open ? (
                        <div className="flex-1 flex justify-end items-center gap-3">
                          <span className="bg-slate-50 px-4 py-2 rounded-xl text-slate-600 font-medium text-sm border border-slate-100">
                            {day.opening_time}
                          </span>
                          <span className="text-slate-300">-</span>
                          <span className="bg-slate-50 px-4 py-2 rounded-xl text-slate-600 font-medium text-sm border border-slate-100">
                            {day.closing_time}
                          </span>
                        </div>
                      ) : (
                        <div className="flex-1 flex justify-end">
                          <span className="bg-rose-50 text-rose-500 px-4 py-2 rounded-xl text-sm font-bold border border-rose-100">
                            Closed
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-slate-500 text-center py-8">
                  No schedule information available.
                </div>
              )}
            </div>
          </div>
        );

      case "reviews":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between bg-white p-8 rounded-3xl border border-slate-100 shadow-sm mb-8">
              <div className="flex items-center mb-6 md:mb-0">
                <span className="text-5xl font-extrabold text-slate-900 mr-4">
                  {wellnessCenter.rating.toFixed(1)}
                </span>
                <div>
                  <div className="mb-1">
                    {renderStars(Math.round(wellnessCenter.rating))}
                  </div>
                  <span className="text-slate-500 font-medium">
                    Based on {wellnessCenter.reviews} reviews
                  </span>
                </div>
              </div>
              <button className="w-full md:w-auto bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors focus:ring-4 focus:ring-slate-900/20 active:scale-[0.98]">
                Write a Review
              </button>
            </div>

            {wellnessCenter.testimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wellnessCenter.testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative"
                  >
                    <FaQuoteLeft className="absolute top-8 right-8 text-4xl text-slate-100" />
                    <div className="flex mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-slate-700 leading-relaxed mb-6 block relative z-10">
                      "{testimonial.comment}"
                    </p>
                    <h4 className="font-bold text-slate-900">
                      {testimonial.name}
                    </h4>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-slate-500 py-12 bg-white rounded-3xl border border-slate-100">
                No testimonials available yet. Be the first to review!
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-slate-200">
      {/* Cinematic Image Carousel */}
      <div className="relative w-full h-[60vh] md:h-[70vh] bg-slate-900 group">
        {wellnessCenter.images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-black/30 z-10" />
            <img
              src={img}
              alt={`${wellnessCenter.name} - ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Carousel Controls */}
        {wellnessCenter.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
            >
              <FaChevronRight />
            </button>
            <div className="absolute bottom-32 left-0 right-0 z-20 flex justify-center space-x-2">
              {wellnessCenter.images.map((_, index) => (
                <button
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    index === activeImageIndex
                      ? "w-8 bg-white"
                      : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                />
              ))}
            </div>
          </>
        )}

        {/* Hero Header Text */}
        <div className="absolute bottom-0 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-bold tracking-widest uppercase mb-4 shadow-sm border border-white/10">
              {wellnessCenter.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
              {wellnessCenter.name}
            </h1>
            <div className="flex flex-wrap items-center text-white/90 gap-4 md:gap-8 font-medium">
              <div className="flex items-center gap-2">
                {renderStars(wellnessCenter.rating)}
                <span className="font-bold ml-1">
                  {wellnessCenter.rating.toFixed(1)}
                </span>
                <span className="text-white/60">
                  ({wellnessCenter.reviews})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-white/60" />
                {wellnessCenter.address}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-30">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column (Main Tabbed Content) */}
          <div className="flex-1 min-w-0">
            {/* Tabs Navigation */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 mb-8 overflow-x-auto scrollbar-hide">
              <div className="flex space-x-1 min-w-max">
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
                    className={`px-6 py-3 rounded-xl font-bold capitalize transition-all ${
                      activeTab === tab
                        ? "bg-slate-900 text-white shadow-md"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Body */}
            <div className="mb-12">{renderTabContent()}</div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:w-[380px] shrink-0">
            <div className="sticky top-8 space-y-6">
              {/* Quick Contact Card */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Get in Touch
                </h3>
                <div className="space-y-5">
                  <a
                    href={`tel:${wellnessCenter.phone}`}
                    className="flex items-center gap-4 text-slate-700 hover:text-slate-900 font-medium group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <FaPhoneAlt />
                    </div>
                    {wellnessCenter.phone}
                  </a>
                  <a
                    href={`mailto:${wellnessCenter.email}`}
                    className="flex items-center gap-4 text-slate-700 hover:text-slate-900 font-medium group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <FaEnvelope />
                    </div>
                    {wellnessCenter.email}
                  </a>
                  {wellnessCenter.website && (
                    <a
                      href={`https://${wellnessCenter.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-slate-700 hover:text-slate-900 font-medium group wrap-break-word"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-colors shrink-0">
                        <FaGlobe />
                      </div>
                      <span className="line-clamp-1 break-all">
                        {wellnessCenter.website}
                      </span>
                    </a>
                  )}
                </div>

                <div className="mt-8">
                  <button className="w-full bg-slate-900 text-white rounded-xl py-4 font-bold hover:bg-slate-800 transition-colors shadow-sm focus:ring-4 focus:ring-slate-900/20 active:scale-[0.98]">
                    Book a Free Trial
                  </button>
                </div>
              </div>

              {/* Map Card */}
              <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100 overflow-hidden">
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 relative group">
                  {wellnessCenter.latitude && wellnessCenter.longitude ? (
                    <>
                      <iframe
                        src={`https://maps.google.com/maps?q=${wellnessCenter.latitude},${wellnessCenter.longitude}&hl=es;z=14&output=embed`}
                        className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                        allowFullScreen
                        loading="lazy"
                        title="Google Map"
                      ></iframe>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${wellnessCenter.latitude},${wellnessCenter.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-10 hidden group-hover:flex items-center justify-center bg-black/5 backdrop-blur-[2px]"
                      >
                        <span className="bg-white px-4 py-2 rounded-full font-bold text-sm shadow-md flex items-center gap-2">
                          <FaMapMarkerAlt /> Open in Maps
                        </span>
                      </a>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                      <FaMapMarkerAlt className="text-4xl mb-3 text-slate-200" />
                      <p className="font-medium text-sm">
                        Map data not available
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessCenterDetails;
