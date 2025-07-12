import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Edit,
  Save,
  Camera,
  MapPin,
  Phone,
  Mail,
  Calendar,
  X,
  Heart,
  User,
  Loader2,
} from "lucide-react";
import {
  useGetUserProfile,
  useUpdateUserProfile,
} from "../hooks/useProfileHooks";

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Use React Query hooks
  const { user, isLoading, isError, error, refetch } = useGetUserProfile();
  const {
    updateProfile,
    isLoading: isUpdating,
    isError: isUpdateError,
    error: updateError,
    isSuccess: isUpdateSuccess,
  } = useUpdateUserProfile();

  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState({});
  const [bmi, setBmi] = useState("--");

  // Initialize tempUser when user data is loaded
  useEffect(() => {
    if (user) {
      console.log("[Profile] User fetched from backend:", user);
      const [city = "", state = "", country = ""] = user.address
        ? user.address.split(",").map((part) => part.trim())
        : [];
      setTempUser({
        fullName: user.full_name || "",
        email: user.email || "",
        profilePicture: user.profile_picture || "",
        dateOfBirth: user.dob || "",
        gender: user.gender || "",
        phoneNumber: user.phone_number || "",
        emergencyContact: {
          name: user.emergency_contact?.name || "",
          relationship: user.emergency_contact?.relationship || "",
          phoneNumber: user.emergency_contact?.phone_number || "",
        },
        address: {
          city,
          state,
          country,
        },
        height: user.height || "",
        weight: user.weight || "",
        bloodType: user.blood_type || "",
      });
    }
  }, [user]);

  // Calculate BMI when height or weight changes
  useEffect(() => {
    if (user?.height && user?.weight) {
      const heightInMeters = parseFloat(user.height) / 100;
      const weightInKg = parseFloat(user.weight);

      if (heightInMeters > 0 && weightInKg > 0) {
        const calculatedBmi = (
          weightInKg /
          (heightInMeters * heightInMeters)
        ).toFixed(1);
        setBmi(calculatedBmi);
      }
    }
  }, [user?.height, user?.weight]);

  // Handle successful update
  useEffect(() => {
    if (isUpdateSuccess) {
      setEditMode(false);
      // Refetch user data to get updated information
      refetch();
    }
  }, [isUpdateSuccess, refetch]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempUser({ ...tempUser, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form input changes
  const handleChange = (e, section, field) => {
    if (section) {
      setTempUser({
        ...tempUser,
        [section]: {
          ...tempUser[section],
          [field]: e.target.value,
        },
      });
    } else {
      setTempUser({ ...tempUser, [field]: e.target.value });
    }
  };

  // Save profile changes
  const saveProfile = () => {
    const { city, state, country } = tempUser.address;
    const fullAddress = [city, state, country].filter(Boolean).join(", ");

    const updateData = {
      full_name: tempUser.fullName,
      email: tempUser.email,
      profile_picture: tempUser.profilePicture,
      dob: tempUser.dateOfBirth,
      gender: tempUser.gender,
      phone_number: tempUser.phoneNumber,
      height: tempUser.height,
      weight: tempUser.weight,
      blood_type: tempUser.bloodType,
      address: fullAddress,
      emergency_contact: {
        name: tempUser.emergencyContact.name,
        relationship: tempUser.emergencyContact.relationship,
        phone_number: tempUser.emergencyContact.phoneNumber,
      },
    };
    console.log("[Profile] Saving profile with data:", updateData);
    updateProfile(updateData);
  };

  // Cancel editing
  const cancelEdit = () => {
    if (user) {
      const [city = "", state = "", country = ""] = user.address
        ? user.address.split(",").map((s) => s.trim())
        : ["", "", ""];

      setTempUser({
        fullName: user.full_name || "",
        email: user.email || "",
        profilePicture: user.profile_picture || "",
        dateOfBirth: user.dob || "",
        gender: user.gender || "",
        phoneNumber: user.phone_number || "",
        emergencyContact: {
          name: user.emergency_contact?.name || "",
          relationship: user.emergency_contact?.relationship || "",
          phoneNumber: user.emergency_contact?.phone_number || "",
        },
        address: {
          city,
          state,
          country,
        },
        height: user.height || "",
        weight: user.weight || "",
        bloodType: user.blood_type || "",
      });
    }
    setEditMode(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "N/A";
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Format display for a field
  const formatField = (value, placeholder = "Not specified") => {
    return value ? value : placeholder;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full mx-auto my-8 p-6 pt-20 bg-white rounded-lg flex items-center justify-center">
        <Loader2 className="animate-spin mr-2" size={24} />
        <span>Loading profile...</span>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="w-full mx-auto my-8 p-6 pt-20 bg-white rounded-lg">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            Error loading profile: {error?.message}
          </p>
          <button
            onClick={() => refetch()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No user data
  if (!user) {
    return (
      <div className="w-full mx-auto my-8 p-6 pt-20 bg-white rounded-lg">
        <div className="text-center">
          <p className="text-gray-500">No user data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto my-8 p-6 pt-20 bg-white rounded-lg">
      {/* Header with actions */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Profile Information
        </h1>
        <div>
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              <Edit size={16} className="mr-2" /> Edit
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={cancelEdit}
                className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                disabled={isUpdating}
              >
                <X size={16} className="mr-2" /> Cancel
              </button>
              <button
                onClick={saveProfile}
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                ) : (
                  <Save size={16} className="mr-2" />
                )}
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Update Error Message */}
      {isUpdateError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">
            Error updating profile: {updateError?.message}
          </p>
        </div>
      )}

      {/* Update Success Message */}
      {isUpdateSuccess && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-600">Profile updated successfully!</p>
        </div>
      )}

      {/* Profile content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column - Photo and basic info */}
        <div className="md:col-span-1 flex flex-col items-center">
          <div className="relative mb-4 w-40 h-40">
            <img
              src={
                editMode
                  ? tempUser.profilePicture
                  : user.profile_picture || "/images/default-profile.png"
              }
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-200 bg-gray-100"
            />
            {editMode && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              >
                <Camera className="text-white" size={24} />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            )}
          </div>

          <h2 className="text-xl font-bold text-center mb-2">
            {editMode ? (
              <input
                type="text"
                value={tempUser.fullName}
                onChange={(e) => handleChange(e, null, "fullName")}
                className="w-full p-2 border border-gray-300 rounded text-center"
                placeholder="Full Name"
              />
            ) : (
              formatField(user.full_name, "User Name")
            )}
          </h2>

          <div className="bg-blue-50 p-4 rounded-lg w-full mt-4">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
              <User size={16} className="mr-2" /> Personal Info
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500">Gender: </span>
                {editMode ? (
                  <select
                    value={tempUser.gender}
                    onChange={(e) => handleChange(e, null, "gender")}
                    className="p-1 border border-gray-300 rounded w-full mt-1"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                ) : (
                  <span>{formatField(user.gender)}</span>
                )}
              </div>
              <div>
                <span className="text-gray-500">Date of Birth: </span>
                {editMode ? (
                  <input
                    type="date"
                    value={tempUser.dateOfBirth}
                    onChange={(e) => handleChange(e, null, "dateOfBirth")}
                    className="p-1 border border-gray-300 rounded w-full mt-1"
                  />
                ) : (
                  <span>
                    {user.dob ? (
                      <>
                        {new Date(user.dob).toLocaleDateString()}
                        <br />
                        <span className="text-gray-500">
                          (Age: {calculateAge(user.dob)})
                        </span>
                      </>
                    ) : (
                      "Not specified"
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Middle & right columns - Contact & Health info */}
        <div className="md:col-span-2">
          {/* Contact information */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Mail size={18} className="mr-2 text-blue-500" /> Contact
              Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Email
                </label>
                {editMode ? (
                  <input
                    type="email"
                    value={tempUser.email}
                    onChange={(e) => handleChange(e, null, "email")}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Email"
                  />
                ) : (
                  <div className="font-medium">{formatField(user.email)}</div>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Phone
                </label>
                {editMode ? (
                  <input
                    type="tel"
                    value={tempUser.phoneNumber}
                    onChange={(e) => handleChange(e, null, "phoneNumber")}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Phone Number"
                  />
                ) : (
                  <div className="font-medium">
                    {formatField(user.phone_number)}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm text-gray-500 mb-1">
                Address
              </label>
              {editMode ? (
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={tempUser.address.city}
                    onChange={(e) => handleChange(e, "address", "city")}
                    className="p-2 border border-gray-300 rounded"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    value={tempUser.address.state}
                    onChange={(e) => handleChange(e, "address", "state")}
                    className="p-2 border border-gray-300 rounded"
                    placeholder="State/Province"
                  />
                  <input
                    type="text"
                    value={tempUser.address.country}
                    onChange={(e) => handleChange(e, "address", "country")}
                    className="p-2 border border-gray-300 rounded"
                    placeholder="Country"
                  />
                </div>
              ) : (
                <div className="font-medium">{formatField(user.address)}</div>
              )}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-6">
            <h3 className="font-semibold text-red-800 mb-3 flex items-center">
              <Phone size={18} className="mr-2 text-red-500" /> Emergency
              Contact
            </h3>
            {editMode ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={tempUser.emergencyContact.name}
                    onChange={(e) =>
                      handleChange(e, "emergencyContact", "name")
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Contact Name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={tempUser.emergencyContact.phoneNumber}
                    onChange={(e) =>
                      handleChange(e, "emergencyContact", "phoneNumber")
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Phone Number"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Relationship
                  </label>
                  <input
                    type="text"
                    value={tempUser.emergencyContact.relationship}
                    onChange={(e) =>
                      handleChange(e, "emergencyContact", "relationship")
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Relationship"
                  />
                </div>
              </div>
            ) : (
              <div className="font-medium">
                {user.emergency_contact && user.emergency_contact.name ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Name</div>
                      {user.emergency_contact.name}
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      {formatField(user.emergency_contact.phone_number)}
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Relationship</div>
                      {formatField(user.emergency_contact.relationship)}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No emergency contact added</p>
                )}
              </div>
            )}
          </div>

          {/* Health Information */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center">
              <Heart size={18} className="mr-2 text-green-500" /> Health
              Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Height (cm)
                </label>
                {editMode ? (
                  <input
                    type="number"
                    value={tempUser.height}
                    onChange={(e) => handleChange(e, null, "height")}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Height in cm"
                  />
                ) : (
                  <div className="font-medium">
                    {formatField(user.height)}
                    {user.height && " cm"}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Weight (kg)
                </label>
                {editMode ? (
                  <input
                    type="number"
                    value={tempUser.weight}
                    onChange={(e) => handleChange(e, null, "weight")}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Weight in kg"
                  />
                ) : (
                  <div className="font-medium">
                    {formatField(user.weight)}
                    {user.weight && " kg"}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">BMI</label>
                <div className="font-medium">
                  {bmi !== "--" ? bmi : "Not available"}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Blood Type
                </label>
                {editMode ? (
                  <select
                    value={tempUser.bloodType}
                    onChange={(e) => handleChange(e, null, "bloodType")}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select blood type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                ) : (
                  <div className="font-medium">
                    {formatField(user.blood_type)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
