"use client";

import { motion } from "framer-motion";

const Avatar = ({ 
  user, 
  size = "md", 
  className = "", 
  showName = false,
  nameClassName = "",
  ...props 
}) => {
  // Size configurations
  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm", 
    md: "w-12 h-12 text-lg",
    lg: "w-16 h-16 text-xl",
    xl: "w-20 h-20 text-2xl",
    "2xl": "w-32 h-32 text-6xl"
  };

  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return "U";
    
    const nameParts = name.trim().split(" ");
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    // Get first letter of first name and first letter of last name
    const firstInitial = nameParts[0].charAt(0).toUpperCase();
    const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    
    return firstInitial + lastInitial;
  };

  // Generate background color based on name (consistent colors)
  const getBackgroundColor = (name) => {
    if (!name) return "bg-gray-500";
    
    const colors = [
      "bg-red-500",
      "bg-blue-500", 
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-orange-500",
      "bg-cyan-500"
    ];
    
    // Use name to generate consistent color
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const initials = getInitials(user?.name || user?.email);
  const backgroundColor = getBackgroundColor(user?.name || user?.email);
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`flex items-center ${showName ? "space-x-3" : ""} ${className}`} {...props}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${sizeClass} ${backgroundColor} rounded-full flex items-center justify-center text-white font-semibold shadow-lg ring-2 ring-white/20`}
      >
        {user?.avatar ? (
          <img 
            src={user.avatar} 
            alt="Profile" 
            className={`${sizeClass} rounded-full object-cover`}
            onError={(e) => {
              // If image fails to load, show initials instead
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <span 
          className={`${user?.avatar ? "hidden" : "flex"} items-center justify-center w-full h-full`}
        >
          {initials}
        </span>
      </motion.div>
      
      {showName && (
        <span className={`text-foreground font-medium ${nameClassName}`}>
          {user?.name || user?.email || "User"}
        </span>
      )}
    </div>
  );
};

export default Avatar;
