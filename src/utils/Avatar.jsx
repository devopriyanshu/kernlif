import React from "react";

const Avatar = ({ name, width = 36, height = 36, className = "" }) => {
  // Extract initials from the name
  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "";

    // Trim and clean the name
    const cleanedName = name.trim();
    if (!cleanedName) return "";

    // Split into words and filter out empty strings
    const words = cleanedName.split(/\s+/).filter((word) => word.length > 0);

    // Handle different cases
    if (words.length === 0) return "";
    if (words.length === 1) return words[0][0].toUpperCase(); // Single name
    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase(); // First and last initial
  };

  const initials = getInitials(name);

  return (
    <div
      className={`relative flex items-center justify-center bg-gray-100 dark:bg-[#C7EAC9] overflow-hidden rounded-full ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        fontSize: `${Math.min(width, height) * 0.5}px`, // Dynamic font size
      }}
    >
      <span className="font-normal text-gray-600 dark:text-black uppercase">
        {initials}
      </span>
    </div>
  );
};

export default Avatar;
