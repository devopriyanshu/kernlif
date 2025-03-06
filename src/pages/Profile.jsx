import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Edit,
  Save,
  Camera,
  MapPin,
  Phone,
  Mail,
  Calendar,
  X,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Get user from local storage
  const storedUser = JSON.parse(localStorage.getItem("user")) || null;

  const [user, setUser] = useState(
    storedUser || {
      fullName: "",
      email: "",
      profilePicture: "",
      dateOfBirth: "",
      gender: "",
      phoneNumber: "",
      emergencyContact: {
        name: "",
        relationship: "",
        phoneNumber: "",
      },
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      healthMetrics: {
        height: "",
        weight: "",
        bloodType: "",
      },
      fitnessGoals: [],
      dietaryRestrictions: [],
      medicalConditions: [],
      medications: [],
    }
  );

  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState({ ...user });

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

  // Handle array field changes (fitness goals, dietary restrictions, etc.)
  const handleArrayChange = (index, value, field) => {
    const updatedArray = [...tempUser[field]];
    updatedArray[index] = value;
    setTempUser({ ...tempUser, [field]: updatedArray });
  };

  // Add new item to array fields
  const addArrayItem = (field) => {
    setTempUser({ ...tempUser, [field]: [...tempUser[field], ""] });
  };

  // Remove item from array fields
  const removeArrayItem = (index, field) => {
    const updatedArray = tempUser[field].filter((_, i) => i !== index);
    setTempUser({ ...tempUser, [field]: updatedArray });
  };

  // Save profile changes
  const saveProfile = () => {
    setUser(tempUser);
    localStorage.setItem("user", JSON.stringify(tempUser));
    setEditMode(false);
  };

  // Cancel editing
  const cancelEdit = () => {
    setTempUser({ ...user });
    setEditMode(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
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

  // if (!storedUser) {
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  //       <h2 className="text-2xl font-semibold text-gray-700 mb-4">
  //         Please log in to view your profile
  //       </h2>
  //       <Link
  //         to="/login"
  //         className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
  //       >
  //         Go to Login
  //       </Link>
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      {/* Header with profile image and name */}
      <div className="relative">
        <div className="w-full h-40 bg-gradient-to-r from-blue-400 to-teal-500 rounded-t-lg"></div>
        <div className="absolute -bottom-16 left-8">
          <div className="relative group">
            <img
              src={
                editMode
                  ? tempUser.profilePicture
                  : user.profilePicture || "/images/default-profile.png"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white"
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
        </div>

        <div className="flex justify-end p-4">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              <Edit size={16} className="mr-2" /> Edit Profile
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={cancelEdit}
                className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                <X size={16} className="mr-2" /> Cancel
              </button>
              <button
                onClick={saveProfile}
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                <Save size={16} className="mr-2" /> Save
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile content */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic Information */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {editMode ? (
              <input
                type="text"
                value={tempUser.fullName}
                onChange={(e) => handleChange(e, null, "fullName")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            ) : (
              user.fullName
            )}
          </h2>

          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <Mail size={18} className="mr-2 text-blue-500" />
              {editMode ? (
                <input
                  type="email"
                  value={tempUser.email}
                  onChange={(e) => handleChange(e, null, "email")}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                user.email
              )}
            </div>

            <div className="flex items-center text-gray-600">
              <Phone size={18} className="mr-2 text-blue-500" />
              {editMode ? (
                <input
                  type="tel"
                  value={tempUser.phoneNumber}
                  onChange={(e) => handleChange(e, null, "phoneNumber")}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Phone Number"
                />
              ) : (
                user.phoneNumber || "No phone number added"
              )}
            </div>

            <div className="flex items-center text-gray-600">
              <Calendar size={18} className="mr-2 text-blue-500" />
              {editMode ? (
                <input
                  type="date"
                  value={tempUser.dateOfBirth}
                  onChange={(e) => handleChange(e, null, "dateOfBirth")}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <span>
                  {user.dateOfBirth ? (
                    <>
                      {new Date(user.dateOfBirth).toLocaleDateString()} (Age:{" "}
                      {calculateAge(user.dateOfBirth)})
                    </>
                  ) : (
                    "No birth date added"
                  )}
                </span>
              )}
            </div>

            <div className="flex items-start text-gray-600">
              <MapPin size={18} className="mr-2 mt-1 text-blue-500" />
              {editMode ? (
                <div className="w-full space-y-2">
                  <input
                    type="text"
                    value={tempUser.address.street}
                    onChange={(e) => handleChange(e, "address", "street")}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Street Address"
                  />
                  <div className="grid grid-cols-2 gap-2">
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
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={tempUser.address.zipCode}
                      onChange={(e) => handleChange(e, "address", "zipCode")}
                      className="p-2 border border-gray-300 rounded"
                      placeholder="ZIP/Postal Code"
                    />
                    <input
                      type="text"
                      value={tempUser.address.country}
                      onChange={(e) => handleChange(e, "address", "country")}
                      className="p-2 border border-gray-300 rounded"
                      placeholder="Country"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  {user.address &&
                  (user.address.street || user.address.city) ? (
                    <>
                      {user.address.street && <div>{user.address.street}</div>}
                      {user.address.city && user.address.state && (
                        <div>
                          {user.address.city}, {user.address.state}{" "}
                          {user.address.zipCode}
                        </div>
                      )}
                      {user.address.country && (
                        <div>{user.address.country}</div>
                      )}
                    </>
                  ) : (
                    "No address added"
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Emergency Contact
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
              {editMode ? (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={tempUser.emergencyContact.name}
                      onChange={(e) =>
                        handleChange(e, "emergencyContact", "name")
                      }
                      className="p-2 border border-gray-300 rounded"
                      placeholder="Contact Name"
                    />
                    <input
                      type="text"
                      value={tempUser.emergencyContact.relationship}
                      onChange={(e) =>
                        handleChange(e, "emergencyContact", "relationship")
                      }
                      className="p-2 border border-gray-300 rounded"
                      placeholder="Relationship"
                    />
                  </div>
                  <input
                    type="tel"
                    value={tempUser.emergencyContact.phoneNumber}
                    onChange={(e) =>
                      handleChange(e, "emergencyContact", "phoneNumber")
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Emergency Contact Phone"
                  />
                </>
              ) : (
                <>
                  {user.emergencyContact && user.emergencyContact.name ? (
                    <>
                      <div className="font-medium">
                        {user.emergencyContact.name}
                      </div>
                      {user.emergencyContact.relationship && (
                        <div className="text-sm text-gray-500">
                          {user.emergencyContact.relationship}
                        </div>
                      )}
                      {user.emergencyContact.phoneNumber && (
                        <div className="flex items-center">
                          <Phone size={16} className="mr-2 text-blue-500" />
                          {user.emergencyContact.phoneNumber}
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-500">No emergency contact added</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Health Information */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Health Details
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                {editMode ? (
                  <select
                    value={tempUser.gender}
                    onChange={(e) => handleChange(e, null, "gender")}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                ) : (
                  <p className="font-medium">
                    {user.gender || "Not specified"}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-500">Height</p>
                  {editMode ? (
                    <input
                      type="text"
                      value={tempUser.healthMetrics.height}
                      onChange={(e) =>
                        handleChange(e, "healthMetrics", "height")
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Height"
                    />
                  ) : (
                    <p className="font-medium">
                      {user.healthMetrics?.height || "Not specified"}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Weight</p>
                  {editMode ? (
                    <input
                      type="text"
                      value={tempUser.healthMetrics.weight}
                      onChange={(e) =>
                        handleChange(e, "healthMetrics", "weight")
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Weight"
                    />
                  ) : (
                    <p className="font-medium">
                      {user.healthMetrics?.weight || "Not specified"}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Blood Type</p>
                {editMode ? (
                  <select
                    value={tempUser.healthMetrics.bloodType}
                    onChange={(e) =>
                      handleChange(e, "healthMetrics", "bloodType")
                    }
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
                  <p className="font-medium">
                    {user.healthMetrics?.bloodType || "Not specified"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Health Information */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fitness Goals */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Fitness Goals
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            {editMode ? (
              <div className="space-y-2">
                {tempUser.fitnessGoals.map((goal, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={goal}
                      onChange={(e) =>
                        handleArrayChange(index, e.target.value, "fitnessGoals")
                      }
                      className="flex-grow p-2 border border-gray-300 rounded"
                    />
                    <button
                      onClick={() => removeArrayItem(index, "fitnessGoals")}
                      className="ml-2 p-1 text-red-500 hover:bg-red-100 rounded"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem("fitnessGoals")}
                  className="w-full mt-2 p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                >
                  + Add Goal
                </button>
              </div>
            ) : (
              <>
                {user.fitnessGoals && user.fitnessGoals.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {user.fitnessGoals.map((goal, index) => (
                      <li key={index}>{goal}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No fitness goals added</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Dietary Restrictions */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Dietary Restrictions
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            {editMode ? (
              <div className="space-y-2">
                {tempUser.dietaryRestrictions.map((restriction, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={restriction}
                      onChange={(e) =>
                        handleArrayChange(
                          index,
                          e.target.value,
                          "dietaryRestrictions"
                        )
                      }
                      className="flex-grow p-2 border border-gray-300 rounded"
                    />
                    <button
                      onClick={() =>
                        removeArrayItem(index, "dietaryRestrictions")
                      }
                      className="ml-2 p-1 text-red-500 hover:bg-red-100 rounded"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem("dietaryRestrictions")}
                  className="w-full mt-2 p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                >
                  + Add Restriction
                </button>
              </div>
            ) : (
              <>
                {user.dietaryRestrictions &&
                user.dietaryRestrictions.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {user.dietaryRestrictions.map((restriction, index) => (
                      <li key={index}>{restriction}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No dietary restrictions added</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Medical Information */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Medical Conditions */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Medical Conditions
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            {editMode ? (
              <div className="space-y-2">
                {tempUser.medicalConditions.map((condition, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={condition}
                      onChange={(e) =>
                        handleArrayChange(
                          index,
                          e.target.value,
                          "medicalConditions"
                        )
                      }
                      className="flex-grow p-2 border border-gray-300 rounded"
                    />
                    <button
                      onClick={() =>
                        removeArrayItem(index, "medicalConditions")
                      }
                      className="ml-2 p-1 text-red-500 hover:bg-red-100 rounded"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem("medicalConditions")}
                  className="w-full mt-2 p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                >
                  + Add Condition
                </button>
              </div>
            ) : (
              <>
                {user.medicalConditions && user.medicalConditions.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {user.medicalConditions.map((condition, index) => (
                      <li key={index}>{condition}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No medical conditions added</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Medications */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Medications
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            {editMode ? (
              <div className="space-y-2">
                {tempUser.medications.map((medication, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={medication}
                      onChange={(e) =>
                        handleArrayChange(index, e.target.value, "medications")
                      }
                      className="flex-grow p-2 border border-gray-300 rounded"
                    />
                    <button
                      onClick={() => removeArrayItem(index, "medications")}
                      className="ml-2 p-1 text-red-500 hover:bg-red-100 rounded"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem("medications")}
                  className="w-full mt-2 p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                >
                  + Add Medication
                </button>
              </div>
            ) : (
              <>
                {user.medications && user.medications.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {user.medications.map((medication, index) => (
                      <li key={index}>{medication}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No medications added</p>
                )}
              </>
            )}
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
