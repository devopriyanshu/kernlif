import React, { useState, useMemo } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
  FaStar,
  FaRegStar,
  FaRegClock,
  FaEnvelope,
  FaVideo,
  FaUser,
  FaLanguage,
  FaCheckCircle,
  FaArrowLeft,
  FaShare,
  FaHeart,
  FaRegHeart,
  FaChevronDown,
  FaChevronUp,
  FaCalendarCheck,
  FaTimesCircle,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useExpertDetail } from "../../hooks/useExpertHooks";
import { useCreateAppointment, useUserAppointments } from "../../hooks/useAppointmentHooks";
import { format, parse, isSameSecond, parseISO } from "date-fns";

const WellnessExpertDetails = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingResult, setBookingResult] = useState(null); // null | { success, appointment, error }
  const [isBooking, setIsBooking] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  // Decode current user's ID from JWT stored in localStorage
  const currentUserId = useMemo(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id || null;
    } catch {
      return null;
    }
  }, []);

  const { data: rawData, isLoading, isError } = useExpertDetail(id);
  const expertdata = rawData?.data || rawData;

  const createAppointmentMutation = useCreateAppointment();

  // Fetch the current user's own appointments to check for duplicates
  const { data: userAppointmentsRaw } = useUserAppointments(currentUserId);
  const userAppointments = useMemo(() => {
    const arr = userAppointmentsRaw?.data || userAppointmentsRaw || [];
    return Array.isArray(arr) ? arr : [];
  }, [userAppointmentsRaw]);

  // Check if user already has an active (non-cancelled) booking with this expert
  const hasActiveBooking = useMemo(
    () =>
      userAppointments.some(
        (a) =>
          String(a.expertId) === String(id) && a.status !== "cancelled"
      ),
    [userAppointments, id]
  );

  // Get the active booking details for display
  const activeBooking = useMemo(
    () =>
      userAppointments.find(
        (a) =>
          String(a.expertId) === String(id) && a.status !== "cancelled"
      ),
    [userAppointments, id]
  );

  // Set of booked ISO timestamps for this expert (to disable slots already taken)
  const bookedTimestamps = useMemo(
    () =>
      new Set(
        userAppointments
          .filter((a) => a.status !== "cancelled")
          .map((a) => new Date(a.appointmentDate).toISOString())
      ),
    [userAppointments]
  );

  const handleBookAppointment = async () => {
    if (!selectedService || !selectedDate || selectedTimeSlot === null) return;
    setIsBooking(true);
    try {
      const selectedServiceObj = expertdata?.expert_services?.find(
        (s) => s.id === parseInt(selectedService)
      );

      // Fix: locale format is "9:00 AM" → parse format must be "h:mm a" not "hh:mm a"
      const combined = parse(
        `${selectedDate.fullDate} ${timeSlots[selectedTimeSlot].time}`,
        "yyyy-MM-dd h:mm a",
        new Date()
      );

      if (isNaN(combined.getTime())) {
        throw new Error("Invalid date/time combination. Please reselect a slot.");
      }

      const timestamp = format(combined, "yyyy-MM-dd HH:mm:ss");

      const result = await createAppointmentMutation.mutateAsync({
        expert_id: parseInt(id),
        appointment_date: timestamp,
        type: selectedServiceObj?.name || "Consultation",
        notes: `Service: ${selectedServiceObj?.name || "Selected Service"}`,
      });

      setBookingResult({
        success: true,
        appointment: result?.data || result,
        service: selectedServiceObj,
        date: selectedDate,
        slot: timeSlots[selectedTimeSlot],
      });

      setSelectedDate(null);
      setSelectedTimeSlot(null);
      setSelectedService(null);
    } catch (error) {
      console.error("Error booking appointment:", error);
      const msg =
        typeof error === "string"
          ? error
          : error?.response?.data?.message || error?.message || "Failed to book. Please try again.";
      setBookingResult({ success: false, error: msg });
    } finally {
      setIsBooking(false);
    }
  };

  const generateTimeSlots = (startTime, endTime) => {
    const slots = [];
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const lunchStart = new Date(`2000-01-01T12:00:00`);
    const lunchEnd = new Date(`2000-01-01T14:00:00`);

    let current = new Date(start);

    while (current < end) {
      const timeString = current.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      const isLunchTime = current >= lunchStart && current < lunchEnd;

      if (!isLunchTime) {
        slots.push({
          time: timeString,
          available: true,
          value: current.toTimeString().slice(0, 5),
        });
      }

      current.setMinutes(current.getMinutes() + 30);
    }

    return slots;
  };

  const getNextWeekDates = () => {
    const dates = [];
    const today = new Date();
    const dayNames = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const shortDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayName = dayNames[date.getDay()];
      const schedule = expertdata?.availability?.find(
        (s) => s.day.toLowerCase() === dayName.toLowerCase()
      );

      dates.push({
        day: shortDayNames[date.getDay()],
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        fullDate: format(date, "yyyy-MM-dd"),
        available: schedule?.selected || false,
        schedule: schedule,
      });
    }

    return dates;
  };

  const getTimeSlotsForDate = (dateData) => {
    if (!dateData?.schedule?.selected) return [];

    const extractTime = (timeValue) => {
      if (!timeValue) return null;
      if (typeof timeValue === "string" && /^\d{2}:\d{2}$/.test(timeValue)) {
        return timeValue;
      }
      try {
        const date = new Date(timeValue);
        const hours = date.getUTCHours().toString().padStart(2, "0");
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      } catch (e) {
        return null;
      }
    };

    const startTime = extractTime(dateData.schedule.startTime);
    const endTime = extractTime(dateData.schedule.endTime);

    if (!startTime || !endTime) return [];

    const slots = generateTimeSlots(startTime, endTime);

    // Mark already-booked slots using bookedTimestamps
    return slots.map((slot) => {
      // Build the ISO string for this slot on the selected date
      const slotDate = parse(
        `${dateData.fullDate} ${slot.time}`,
        "yyyy-MM-dd h:mm a",
        new Date()
      );
      const slotISO = isNaN(slotDate.getTime()) ? null : slotDate.toISOString();
      const isBooked = slotISO ? bookedTimestamps.has(slotISO) : false;
      return { ...slot, available: !isBooked, booked: isBooked };
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-300" />);
      }
    }
    return <div className="flex gap-1">{stars}</div>;
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  if (isError || !expertdata) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-600 font-medium">
          Expert profile wrapped up right now. Try again later.
        </div>
      </div>
    );
  }

  const expert = {
    id: expertdata.id,
    name: expertdata.name || "Unknown Expert",
    profilePic:
      expertdata.profile_image ||
      "https://res.cloudinary.com/drer12ar3/image/upload/v1757876592/1501beba-54fc-46dd-a4c1-541520e924de_wwcw8l.jpg",
    backgroundImage:
      expertdata.bg_image ||
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2920&auto=format&fit=crop",
    category: expertdata.category || "Health Professional",
    experience: expertdata.experience || "Experience not specified",
    bio: expertdata.bio || "No biography provided.",
    qualifications: (expertdata.expert_qualifications || []).map(
      (q) => q.value
    ),
    specialties: (expertdata.expert_specialties || []).map((s) => s.value),
    languages: expertdata.languages || [],
    services: (expertdata.expert_services || []).map((service) => ({
      id: service.id,
      name: service.name,
      format: service.format || "In-person/Online",
      duration: `${service.duration} mins`,
      price: `$${service.price}`,
    })),
    availability: {
      days: (expertdata.availability || [])
        .filter((s) => s.selected)
        .map((s) => s.day.charAt(0).toUpperCase() + s.day.slice(1)),
      schedules: expertdata.availability || [],
    },
    contact: {
      phone: expertdata.phone || "Not provided",
      email: expertdata.email || "Not provided",
      website: expertdata.website || "",
      location: expertdata.location || "Location not provided",
      googleMaps: expertdata.location
        ? `https://www.google.com/maps/search/${encodeURIComponent(
            expertdata.location
          )}`
        : "https://www.google.com/maps",
    },
    socialProof: {
      clientsHelped: 120, // Mock metric
      yearsOfPractice: expertdata.experience
        ? parseInt(expertdata.experience) || 0
        : 0,
      certificationsCount: (expertdata.expert_qualifications || []).length,
    },
    rating: Number(expertdata.rating) || 5.0,
    reviewCount: expertdata.totalReviews || 0,
    faq: (expertdata.expert_faqs || []).map((f) => ({
      question: f.question,
      answer: f.answer,
    })),
  };

  const nextWeekDates = getNextWeekDates();
  const timeSlots = selectedDate ? getTimeSlotsForDate(selectedDate) : [];

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans text-slate-800 selection:bg-slate-200">
      {/* Hero Header */}
      <div className="relative h-[400px] md:h-[480px] w-full group">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${expert.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-black/20" />

        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12">
          <Link
            to="/experts"
            className="absolute top-8 left-4 lg:left-8 bg-white/10 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/20 transition-all shadow-sm"
          >
            <FaArrowLeft size={18} />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Column (Content) */}
        <div className="flex-1 space-y-8">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none" />
            <img
              src={expert.profilePic}
              alt={expert.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover shadow-md z-10 shrink-0 border border-slate-100 ring-4 ring-white"
            />
            <div className="flex-1 z-10 w-full">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
                    {expert.name}
                  </h1>
                  <p className="text-lg text-slate-500 font-medium">
                    {expert.category}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-3 rounded-full backdrop-blur-sm transition-all ${
                      isFavorite
                        ? "bg-rose-50 text-rose-500 hover:bg-rose-100"
                        : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                    }`}
                  >
                    {isFavorite ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                  </button>
                  <button className="p-3 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 transition-all">
                    <FaShare size={18} />
                  </button>
                </div>
              </div>

              <div className="flex items-center mt-4 gap-4">
                <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100">
                  {renderStars(expert.rating)}
                  <span className="font-bold text-yellow-700 text-sm ml-1">
                    {expert.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-slate-500 text-sm font-medium">
                  {expert.reviewCount} reviews
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-slate-50 text-slate-600 border border-slate-100">
                  <FaRegClock className="mr-2 text-slate-400" />{" "}
                  {expert.experience}
                </span>
                {expert.languages.map((lang, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold bg-slate-50 text-slate-600 border border-slate-100"
                  >
                    <FaLanguage className="mr-2 text-slate-400" /> {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
              <p className="text-3xl font-extrabold text-slate-900 mb-1">
                {expert.socialProof.clientsHelped}+
              </p>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                Clients Helped
              </p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
              <p className="text-3xl font-extrabold text-slate-900 mb-1">
                {expert.socialProof.yearsOfPractice}
              </p>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                Years Practice
              </p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
              <p className="text-3xl font-extrabold text-slate-900 mb-1">
                {expert.socialProof.certificationsCount}
              </p>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                Certifications
              </p>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">About</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              {expert.bio}
            </p>
          </div>

          {/* Qualifications & Specialties */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Qualifications
              </h2>
              {expert.qualifications.length > 0 ? (
                <ul className="space-y-4">
                  {expert.qualifications.map((qual, index) => (
                    <li key={index} className="flex items-start text-slate-700">
                      <FaCheckCircle className="text-slate-900 mt-1 mr-3 shrink-0" />
                      <span className="font-medium">{qual}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 italic">
                  No qualifications listed.
                </p>
              )}
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Specialties
              </h2>
              {expert.specialties.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {expert.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-slate-50 text-slate-700 border border-slate-100 rounded-xl text-sm font-semibold"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic">No specialties listed.</p>
              )}
            </div>
          </div>

          {/* FAQ Section */}
          {expert.faq.length > 0 && (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {expert.faq.map((item, index) => (
                  <div
                    key={index}
                    className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50 transition-all"
                  >
                    <button
                      className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-slate-100"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className="font-semibold text-slate-800">
                        {item.question}
                      </span>
                      {expandedFaq === index ? (
                        <FaChevronUp className="text-slate-400" />
                      ) : (
                        <FaChevronDown className="text-slate-400" />
                      )}
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        expandedFaq === index
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Widget) */}
        <div className="lg:w-[420px] shrink-0">
          <div className="sticky top-8 space-y-6">
            {/* Booking Widget */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Book a Session
              </h2>

              {/* State 1: Not logged in */}
              {!isLoggedIn && (
                <div className="flex flex-col items-center text-center gap-4 py-6">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                    <FaUser className="text-slate-400 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">Login Required</h3>
                    <p className="text-slate-500 text-sm">Sign in to your account to book a session with this expert.</p>
                  </div>
                  <Link
                    to="/login"
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-colors text-center"
                  >
                    Login to Book
                  </Link>
                </div>
              )}

              {/* State 2: Logged in, already has active booking */}
              {isLoggedIn && hasActiveBooking && (
                <div className="flex flex-col items-center text-center gap-4 py-2">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                    <FaCalendarCheck className="text-emerald-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">Already Booked</h3>
                    <p className="text-slate-500 text-sm">You have an active appointment with this expert.</p>
                    {activeBooking && (
                      <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-left">
                        <p className="text-xs text-slate-500 uppercase tracking-wide font-bold mb-1">Your Appointment</p>
                        <p className="text-sm font-semibold text-slate-800">{activeBooking.type || "Session"}</p>
                        <p className="text-sm text-slate-500 mt-0.5">
                          {new Date(activeBooking.appointmentDate).toLocaleString("en-US", {
                            weekday: "short", month: "short", day: "numeric",
                            hour: "numeric", minute: "2-digit",
                          })}
                        </p>
                        <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-bold uppercase ${
                          activeBooking.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}>
                          {activeBooking.status}
                        </span>
                      </div>
                    )}
                  </div>
                  <Link
                    to="/dashboard"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-colors text-center"
                  >
                    View in Dashboard →
                  </Link>
                </div>
              )}

              {/* State 3: Logged in, no active booking — show the form */}
              {isLoggedIn && !hasActiveBooking && (
                <>
                  {/* Services */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">Service</label>
                    <div className="space-y-2">
                      {expert.services.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => setSelectedService(service.id)}
                          className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                            selectedService === service.id
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-slate-100 bg-white hover:border-slate-300 text-slate-800"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold">{service.name}</span>
                            <span className={`font-semibold ${selectedService === service.id ? "text-slate-300" : "text-slate-500"}`}>
                              {service.price}
                            </span>
                          </div>
                          <div className={`text-sm flex items-center gap-3 ${selectedService === service.id ? "text-slate-400" : "text-slate-500"}`}>
                            <span className="flex items-center gap-1"><FaRegClock /> {service.duration}</span>
                            <span className="flex items-center gap-1">
                              {service.format.toLowerCase().includes("online") ? <FaVideo /> : <FaUser />}
                              {service.format}
                            </span>
                          </div>
                        </button>
                      ))}
                      {expert.services.length === 0 && (
                        <p className="text-sm text-slate-500">No services available.</p>
                      )}
                    </div>
                  </div>

                  {/* Date */}
                  {expert.services.length > 0 && (
                    <div className="mb-6">
                      <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">Date</label>
                      <div className="grid grid-cols-7 gap-2">
                        {nextWeekDates.map((date, index) => (
                          <button
                            key={index}
                            disabled={!date.available}
                            onClick={() => setSelectedDate(date)}
                            className={`aspect-square flex flex-col items-center justify-center rounded-2xl border transition-all ${
                              !date.available
                                ? "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
                                : selectedDate?.fullDate === date.fullDate
                                ? "bg-slate-900 border-slate-900 text-white shadow-md"
                                : "bg-white border-slate-200 text-slate-700 hover:border-slate-400"
                            }`}
                          >
                            <span className="text-[10px] uppercase font-bold tracking-wider mb-1">{date.day}</span>
                            <span className="text-lg font-bold">{date.date.split(" ")[1]}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Time Slots */}
                  {selectedDate && (
                    <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
                      <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">Time</label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot, index) => (
                          <button
                            key={index}
                            disabled={!slot.available}
                            onClick={() => setSelectedTimeSlot(index)}
                            className={`py-3 rounded-2xl text-sm font-semibold border transition-all ${
                              !slot.available
                                ? "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
                                : selectedTimeSlot === index
                                ? "bg-slate-900 border-slate-900 text-white"
                                : "bg-white border-slate-200 text-slate-700 hover:border-slate-400"
                            }`}
                          >
                            {slot.time.replace(/ AM| PM/, "")}
                            <span className="text-[10px] ml-1 uppercase">{slot.time.slice(-2)}</span>
                          </button>
                        ))}
                        {timeSlots.length === 0 && (
                          <div className="col-span-3 text-sm text-slate-500 text-center py-4 bg-slate-50 rounded-2xl border border-slate-100">
                            No slots available for this date.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Booking Result */}
                  {bookingResult && (
                    <div className={`mt-4 rounded-2xl border p-6 ${bookingResult.success ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"}`}>
                      {bookingResult.success ? (
                        <div className="flex flex-col items-center text-center gap-4">
                          <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center">
                            <FaCalendarCheck className="text-white text-2xl" />
                          </div>
                          <div>
                            <h3 className="text-xl font-extrabold text-emerald-800 mb-1">Booking Confirmed!</h3>
                            <p className="text-emerald-700 text-sm font-medium">
                              {bookingResult.service?.name} &mdash; {bookingResult.date?.date} at {bookingResult.slot?.time}
                            </p>
                            <p className="text-emerald-600 text-xs mt-1">
                              Status: <span className="font-bold uppercase">{bookingResult.appointment?.status || "confirmed"}</span>
                            </p>
                          </div>
                          <Link
                            to="/dashboard"
                            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-colors text-center"
                          >
                            View in Dashboard →
                          </Link>
                        </div>
                      ) : bookingResult.error?.toLowerCase().includes("already have an active") ? (
                          <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
                              <FaCalendarCheck className="text-emerald-600 text-2xl" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-slate-800 mb-1">Already Booked</h3>
                              <p className="text-slate-500 text-sm">
                                You already have an active appointment with this expert. View or manage it from your dashboard.
                              </p>
                            </div>
                            <Link
                              to="/dashboard"
                              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-colors text-center"
                            >
                              View in Dashboard →
                            </Link>
                          </div>
                        ) : (
                        <div className="flex flex-col items-center text-center gap-3">
                          <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center">
                            <FaTimesCircle className="text-rose-500 text-2xl" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-rose-800 mb-1">Booking Failed</h3>
                            <p className="text-rose-600 text-sm">{bookingResult.error}</p>
                          </div>
                          <button
                            onClick={() => setBookingResult(null)}
                            className="w-full py-3 bg-rose-600 text-white rounded-xl font-bold text-sm hover:bg-rose-700 transition-colors"
                          >
                            Try Again
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Confirm Button */}
                  {!bookingResult && (
                    <button
                      className={`w-full py-4 rounded-2xl font-bold text-lg shadow-sm transition-all focus:ring-4 focus:ring-slate-900/20 active:scale-[0.98] ${
                        selectedService !== null && selectedDate !== null && selectedTimeSlot !== null && !isBooking
                          ? "bg-slate-900 hover:bg-slate-800 text-white"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                      disabled={selectedService === null || selectedDate === null || selectedTimeSlot === null || isBooking}
                      onClick={handleBookAppointment}
                    >
                      {isBooking ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Booking...
                        </span>
                      ) : "Confirm Booking"}
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Contact</h2>
              <div className="space-y-4 text-slate-600 font-medium">
                {expert.contact.location !== "Location not provided" && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg shrink-0">
                      <FaMapMarkerAlt className="text-slate-900" />
                    </div>
                    <p className="mt-1">{expert.contact.location}</p>
                  </div>
                )}
                {expert.contact.phone !== "Not provided" && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg shrink-0">
                      <FaPhone className="text-slate-900" />
                    </div>
                    <p className="mt-1">{expert.contact.phone}</p>
                  </div>
                )}
                {expert.contact.email !== "Not provided" && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg shrink-0">
                      <FaEnvelope className="text-slate-900" />
                    </div>
                    <p className="mt-1 break-all">{expert.contact.email}</p>
                  </div>
                )}
                {expert.contact.website && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg shrink-0">
                      <FaGlobe className="text-slate-900" />
                    </div>
                    <a
                      href={`https://${expert.contact.website.replace(
                        /^https?:\/\//,
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-slate-900 hover:underline break-all"
                    >
                      {expert.contact.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessExpertDetails;
