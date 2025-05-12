import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaSort,
  FaStar,
  FaRegStar,
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

// Sample Expert Data (enhanced with more fields)
const expertsData = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    specialty: "Psychologist",
    experience: "10 years",
    rating: 4.9,
    reviews: 124,
    availability: "Mon-Fri",
    location: "Online & In-person",
    languages: ["English", "Hindi"],
    specialFocus: ["Anxiety", "Depression", "Stress Management"],
    profilePic: "/images/psychologist.jpg",
    featured: true,
  },
  {
    id: 2,
    name: "Rahul Verma",
    specialty: "Gym Trainer",
    experience: "6 years",
    rating: 4.8,
    reviews: 98,
    availability: "Mon-Sat",
    location: "In-person only",
    languages: ["English", "Hindi", "Punjabi"],
    specialFocus: ["Weight Training", "HIIT", "Sports Conditioning"],
    profilePic: "/images/trainer.jpg",
  },
  {
    id: 3,
    name: "Anjali Gupta",
    specialty: "Dietitian",
    experience: "8 years",
    rating: 4.7,
    reviews: 112,
    availability: "Tue-Sun",
    location: "Online & In-person",
    languages: ["English", "Hindi", "Gujarati"],
    specialFocus: ["Weight Management", "Sports Nutrition", "Diabetes Care"],
    profilePic: "/images/dietitian.jpg",
    featured: true,
  },
  {
    id: 4,
    name: "Vikram Singh",
    specialty: "Yoga Instructor",
    experience: "12 years",
    rating: 4.9,
    reviews: 156,
    availability: "Mon-Sun",
    location: "Online only",
    languages: ["English", "Hindi", "Sanskrit"],
    specialFocus: ["Hatha Yoga", "Meditation", "Breathing Techniques"],
    profilePic: "/images/yoga.jpg",
  },
  {
    id: 5,
    name: "Vikram Singh",
    specialty: "Yoga Instructor",
    experience: "12 years",
    rating: 4.9,
    reviews: 156,
    availability: "Mon-Sun",
    location: "Online only",
    languages: ["English", "Hindi", "Sanskrit"],
    specialFocus: ["Hatha Yoga", "Meditation", "Breathing Techniques"],
    profilePic: "/images/yoga.jpg",
  },
];

const WellnessExperts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [locationFilter, setLocationFilter] = useState("All");
  const [experts, setExperts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Simulate data loading
  useEffect(() => {
    setIsLoading(true);
    // Simulating API fetch delay
    setTimeout(() => {
      setExperts(expertsData);
      setIsLoading(false);
    }, 800);
  }, []);

  // Handle filtering and sorting
  const filteredExperts = experts
    .filter((expert) => {
      const matchesSearch =
        expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.specialFocus.some((focus) =>
          focus.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory = filter === "All" || expert.specialty === filter;
      const matchesLocation =
        locationFilter === "All" || expert.location.includes(locationFilter);
      const matchesFeatured = !showFeaturedOnly || expert.featured;

      return (
        matchesSearch && matchesCategory && matchesLocation && matchesFeatured
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "experience":
          return parseInt(b.experience) - parseInt(a.experience);
        case "reviews":
          return b.reviews - a.reviews;
        default:
          return b.rating - a.rating;
      }
    });

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-300" />);
      }
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="w-full mx-auto  bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col bg-gradient-to-r text-center items-center align-center  from-blue-500 to-teal-400 shadow-lg p-8 pt-28 mb-10 text-white">
        <h1 className="text-4xl font-bold mb-4 leading-tight">
          Your Journey to Wellness Begins with Expert Guidance
        </h1>
        <p className="text-xl opacity-90 mb-6 max-w-3xl">
          Connect with our carefully selected professionals who specialize in
          mental, physical, and nutritional well-being. Get personalized support
          on your path to a healthier, more balanced life.
        </p>
        {/* <div className="flex text-center flex-wrap gap-4">
          <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-md">
            Book a Consultation
          </button>
          <button className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition">
            Learn How It Works
          </button>
        </div> */}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 mb-10">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-3xl font-bold text-blue-600">30+</div>
          <div className="text-gray-600">Certified Experts</div>
        </div>
        <div className="bg-white  p-4 rounded-lg shadow text-center">
          <div className="text-3xl font-bold text-blue-600">4.8</div>
          <div className="text-gray-600">Average Rating</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-3xl font-bold text-blue-600">5,000+</div>
          <div className="text-gray-600">Sessions Completed</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-3xl font-bold text-blue-600">92%</div>
          <div className="text-gray-600">Client Satisfaction</div>
        </div>
      </div>

      {/* Search, Filter & Sort */}
      <div className="bg-white rounded-xl shadow-md p-6 mx-6 mb-8">
        <h2 className="text-2xl font-semibold  text-gray-800 mb-4">
          Find Your Perfect Wellness Match
        </h2>

        <div className="flex flex-col md:flex-row items-stretch gap-4 mb-4">
          {/* Search Bar */}
          <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg p-3 flex-grow">
            <FaSearch className="text-blue-500 mr-2" />
            <input
              type="text"
              placeholder="Search by name, specialty, or expertise..."
              className="w-full bg-transparent focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg p-3">
            <FaFilter className="text-blue-500 mr-2" />
            <select
              className="bg-transparent focus:outline-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Psychologist">Psychologists</option>
              <option value="Dietitian">Dietitians</option>
              <option value="Yoga Instructor">Yoga Instructors</option>
              <option value="Gym Trainer">Gym Trainers</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg p-3">
            <FaSort className="text-blue-500 mr-2" />
            <select
              className="bg-transparent focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Sort by Rating</option>
              <option value="experience">Sort by Experience</option>
              <option value="reviews">Sort by Number of Reviews</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          {/* Location Filter */}
          <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg p-3">
            <FaMapMarkerAlt className="text-blue-500 mr-2" />
            <select
              className="bg-transparent focus:outline-none"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="All">All Locations</option>
              <option value="Online">Online Available</option>
              <option value="In-person">In-person Available</option>
            </select>
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center ml-2">
            <input
              type="checkbox"
              id="featured"
              checked={showFeaturedOnly}
              onChange={(e) => setShowFeaturedOnly(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 text-gray-700">
              Featured Experts Only
            </label>
          </div>
        </div>
      </div>

      {/* Experts List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredExperts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 mx-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No experts match your search criteria
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or search term
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setFilter("All");
              setLocationFilter("All");
              setShowFeaturedOnly(false);
            }}
            className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mx-6 gap-6">
          {filteredExperts.map((expert) => (
            <Link
              to={`/expert`}
              key={expert.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 relative w-[350px]"
            >
              {expert.featured && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full text-gray-800 z-10">
                  FEATURED
                </div>
              )}
              <div className="relative">
                <img
                  src={expert.profilePic}
                  alt={expert.name}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent h-24"></div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {expert.name}
                </h2>
                <p className="text-blue-600 font-medium">{expert.specialty}</p>

                <div className="flex items-center mt-2 mb-3">
                  {renderStars(expert.rating)}
                  <span className="ml-2 text-gray-600">
                    ({expert.rating}) • {expert.reviews} reviews
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {expert.specialFocus.slice(0, 3).map((focus, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {focus}
                    </span>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <FaClock className="mr-2 text-blue-500" />
                    <span>{expert.experience} Experience</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-blue-500" />
                    <span>{expert.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    <span>Available: {expert.availability}</span>
                  </div>
                </div>

                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition">
                  View Profile
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Call to Action */}
      <div className=" py-20 p-8  text-center">
        <h2 className="text-2xl font-bold ">
          Not Sure Which Expert Is Right For You?
        </h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Take our quick assessment to get personalized recommendations based on
          your wellness goals and preferences.
        </p>
        <button className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition shadow-md">
          Start Wellness Assessment
        </button>
      </div>
    </div>
  );
};

export default WellnessExperts;
