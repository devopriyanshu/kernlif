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
    <div className=" mx-auto  bg-gray-50 min-h-screen">
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
          <div className="flex flex-col md:flex-row gap-3">
            <div className="bg-white rounded-lg flex items-center px-4 py-2 flex-grow shadow-lg">
              <Search size={20} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search by name, amenities, or description..."
                className="w-full focus:outline-none text-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              className="md:px-6 py-2 bg-white text-indigo-700 rounded-lg font-semibold flex items-center justify-center shadow-lg hover:bg-indigo-50 transition"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={18} className="mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Filter Panel */}
      {isFilterOpen && (
        <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Highest Rated</option>
                <option value="distance">Nearest First</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-200 transition">
              Open Now
            </button>
            <button className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-200 transition">
              Top Rated
            </button>
            <button className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-200 transition">
              Under 2 miles
            </button>
            <button className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-200 transition">
              Free Trial
            </button>
          </div>
        </div>
      )}

      {/* Results Count & Sort Controls */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Showing{" "}
          <span className="font-semibold">{filteredCenters.length}</span>{" "}
          wellness centers
        </p>

        <div className="flex items-center text-sm">
          <span className="mr-2 text-gray-600 hidden md:inline">Sort:</span>
          <select
            className="border-0 bg-transparent focus:ring-0 text-gray-800 font-medium cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="rating">Highest Rated</option>
            <option value="distance">Nearest First</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Centers Grid/List */}
      {filteredCenters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCenters.map((center) => (
            <Link
              to={`/wellness-center`}
              key={center.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
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
              <div className="p-5">
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
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition flex items-center">
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
      <div className="mt-16  p-6 ">
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
