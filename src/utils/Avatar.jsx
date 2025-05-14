import React from "react";

const Avatar = ({ name, width = 36, height = 36, className = "" }) => {
  // Extract initials from the name
  const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    return words
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div
      className={`relative flex items-center justify-center bg-gray-100 dark:bg-[#C7EAC9] overflow-hidden rounded-full ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <span className="font-normal text-2xl text-gray-600 dark:text-black uppercase">
        {getInitials(name)}
      </span>
    </div>
  );
};

export default Avatar;
