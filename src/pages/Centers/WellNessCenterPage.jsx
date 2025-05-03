import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Star,
  Filter,
  ArrowUpDown,
  Calendar,
  Clock,
  Heart,
  ChevronDown,
  Zap,
} from "lucide-react";
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

// Sample Wellness Center Data
const centersData = [
  {
    id: 1,
    name: "ZenFit Wellness Hub",
    category: "Gym & Yoga Center",
    rating: 4.8,
    reviewCount: 156,
    location: "Los Angeles, CA",
    distance: 1.2,
    image: "/api/placeholder/600/400",
    description:
      "A holistic wellness center offering premium fitness equipment, yoga classes, and meditation sessions.",
    amenities: [
      "24/7 Access",
      "Personal Training",
      "Meditation Room",
      "Spa Services",
    ],
    prices: "$$$",
    openHours: "6:00 AM - 10:00 PM",
  },
  {
    id: 2,
    name: "Tranquil Meditation Center",
    category: "Meditation & Relaxation",
    rating: 4.9,
    reviewCount: 203,
    location: "San Francisco, CA",
    distance: 0.8,
    image: "/api/placeholder/600/400",
    description:
      "Find your inner peace with guided meditation sessions and relaxation therapies in our serene environment.",
    amenities: ["Guided Sessions", "Sound Healing", "Aromatherapy", "Tea Room"],
    prices: "$$",
    openHours: "7:00 AM - 9:00 PM",
  },
  {
    id: 3,
    name: "Pure Fitness Club",
    category: "Gym & Personal Training",
    rating: 4.7,
    reviewCount: 189,
    location: "New York, NY",
    distance: 2.5,
    image: "/api/placeholder/600/400",
    description:
      "State-of-the-art fitness facility with certified trainers and customized workout programs.",
    amenities: [
      "Modern Equipment",
      "Group Classes",
      "Nutrition Coaching",
      "Recovery Zone",
    ],
    prices: "$$$",
    openHours: "5:00 AM - 11:00 PM",
  },
  {
    id: 4,
    name: "Harmony Yoga Studio",
    category: "Yoga & Wellness",
    rating: 4.6,
    reviewCount: 142,
    location: "Austin, TX",
    distance: 1.5,
    image: "/api/placeholder/600/400",
    description:
      "Authentic yoga practices in a peaceful setting with experienced instructors for all levels.",
    amenities: ["Hot Yoga", "Aerial Yoga", "Beginners Classes", "Workshops"],
    prices: "$$",
    openHours: "6:30 AM - 8:30 PM",
  },
  {
    id: 5,
    name: "Mindful Health Collective",
    category: "Holistic Wellness",
    rating: 4.5,
    reviewCount: 98,
    location: "Portland, OR",
    distance: 3.1,
    image: "/api/placeholder/600/400",
    description:
      "A community-focused wellness center offering holistic health services and classes.",
    amenities: [
      "Acupuncture",
      "Nutrition Counseling",
      "Tai Chi",
      "Community Events",
    ],
    prices: "$$",
    openHours: "8:00 AM - 7:00 PM",
  },
  {
    id: 6,
    name: "Elevate Health Club",
    category: "Gym & Personal Training",
    rating: 4.8,
    reviewCount: 176,
    location: "Chicago, IL",
    distance: 2.8,
    image: "/api/placeholder/600/400",
    description:
      "Elevate your fitness journey with high-intensity training and premium facilities.",
    amenities: ["HIIT Classes", "Boxing", "Indoor Pool", "Sauna"],
    prices: "$$$",
    openHours: "5:30 AM - 10:00 PM",
  },
];

// List of categories for filtering
const categories = [
  "All Categories",
  "Gym & Yoga Center",
  "Meditation & Relaxation",
  "Gym & Personal Training",
  "Yoga & Wellness",
  "Holistic Wellness",
];

// List of locations for filtering
const locations = [
  "All Locations",
  "Los Angeles, CA",
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX",
  "Portland, OR",
  "Chicago, IL",
];

const WellnessCenters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [sortBy, setSortBy] = useState("rating");
  const [favorites, setFavorites] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredCenters, setFilteredCenters] = useState(centersData);
  const [userLocation, setUserLocation] = useState(null);
  const [filter, setFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Simulate getting user's location
  useEffect(() => {
    // In a real app, you would use the Geolocation API
    setTimeout(() => {
      setUserLocation({
        latitude: 34.0522,
        longitude: -118.2437,
        city: "Los Angeles",
      });
    }, 1000);
  }, []);

  // Handle filtering and sorting
  useEffect(() => {
    let results = centersData.filter((center) => {
      const matchesSearch =
        center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        center.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        center.amenities.some((amenity) =>
          amenity.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All Categories" ||
        center.category === selectedCategory;

      const matchesLocation =
        selectedLocation === "All Locations" ||
        center.location === selectedLocation;

      return matchesSearch && matchesCategory && matchesLocation;
    });

    // Sort results
    if (sortBy === "rating") {
      results = results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "distance") {
      results = results.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === "name") {
      results = results.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredCenters(results);
  }, [searchTerm, selectedCategory, selectedLocation, sortBy]);

  // Toggle favorite
  const toggleFavorite = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className=" mx-auto  bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className=" text-center bg-gradient-to-r from-blue-500 to-teal-400 p-6 md:p-10 mb-8 text-white relative  overflow-hidden">
        <div className="absolute  inset-0 bg-black opacity-20"></div>
        <div className="relative  z-10">
          <h1 className="text-3xl md:text-4xl font-bold mt-20 mb-4">
            Find Your Perfect Wellness Center
          </h1>
          <p className="text-lg text-center mx-auto  opacity-90 mb-6 max-w-2xl">
            Discover top-rated gyms, yoga studios, meditation centers, and
            wellness hubs near {userLocation?.city || "you"}. Your journey to
            wellness starts here.
          </p>

          {/* Main Search Bar */}
        </div>
      </div>

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

      {/* Centers Grid/List */}
      {filteredCenters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {filteredCenters.map((center) => (
            <Link
              to={`/wellness-center`}
              key={center.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={center.image}
                  alt={center.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <button
                  onClick={(e) => toggleFavorite(e, center.id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md"
                >
                  <Heart
                    size={18}
                    className={
                      favorites.includes(center.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }
                  />
                </button>
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full h-16 opacity-70"></div>
                <div className="absolute bottom-3 left-3 flex items-center">
                  <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                    {center.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition">
                    {center.name}
                  </h2>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star
                      size={16}
                      className="text-yellow-500 mr-1"
                      fill="currentColor"
                    />
                    <span className="text-sm font-medium text-gray-800">
                      {center.rating}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({center.reviewCount})
                    </span>
                  </div>
                </div>

                <p className="mt-2 text-gray-600 line-clamp-2 text-sm">
                  {center.description}
                </p>

                <div className="mt-3 flex items-center text-gray-500">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{center.location}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm">{center.distance} miles away</span>
                </div>

                <div className="mt-3 flex items-center text-gray-500">
                  <Clock size={16} className="mr-1" />
                  <span className="text-sm">{center.openHours}</span>
                </div>

                {/* Amenities Preview */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {center.amenities.slice(0, 2).map((amenity, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                  {center.amenities.length > 2 && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      +{center.amenities.length - 2} more
                    </span>
                  )}
                </div>

                {/* Call to Action */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-gray-500 text-sm">
                    Price: <span className="font-medium">{center.prices}</span>
                  </span>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition flex items-center ">
                    View Details
                    <ChevronDown
                      size={16}
                      className="ml-1 transform rotate-270"
                    />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-10 text-center shadow-md">
          <div className="flex justify-center mb-4">
            <Search size={48} className="text-gray-300" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700">
            No wellness centers found
          </h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All Categories");
              setSelectedLocation("All Locations");
            }}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Feature Highlights Section */}
      <div className="mt-16 pb-14 p-6 ">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Why Use Our Wellness Finder?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-indigo-100 rounded-full">
                <Zap size={24} className="text-indigo-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Personalized Recommendations
            </h3>
            <p className="text-gray-600">
              Find the perfect wellness centers based on your preferences and
              location.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-indigo-100 rounded-full">
                <Star size={24} className="text-indigo-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Verified Reviews</h3>
            <p className="text-gray-600">
              All centers are rated by real users to help you make informed
              decisions.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-indigo-100 rounded-full">
                <Calendar size={24} className="text-indigo-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Booking</h3>
            <p className="text-gray-600">
              Book classes, sessions, or trials directly through our platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessCenters;
