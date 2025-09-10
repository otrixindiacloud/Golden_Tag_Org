"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import ProtectedRoute from "../../components/ProtectedRoute";
import Avatar from "../../components/Avatar";
import { motion, AnimatePresence } from "framer-motion";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    bio: string;
    company: string;
    position: string;
    [key: string]: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    bio: "",
    company: "",
    position: ""
  });

  // Initialize profile data from authenticated user
  useEffect(() => {
    if (user) {
      // Split user name into first and last name
      const nameParts = (user.name || "").split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      
      setProfileData({
        firstName: firstName,
        lastName: lastName,
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        zipCode: user.zipCode || "",
        bio: user.bio || "",
        company: user.company || "",
        position: user.position || ""
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    
    // Update the user profile through authentication context
    const updatedUserData = {
      name: `${profileData.firstName} ${profileData.lastName}`.trim(),
      email: profileData.email,
      phone: profileData.phone,
      address: profileData.address,
      city: profileData.city,
      state: profileData.state,
      zipCode: profileData.zipCode,
      bio: profileData.bio,
      company: profileData.company,
      position: profileData.position
    };
    
    updateProfile(updatedUserData);
    alert("Profile updated successfully!");
  };

  if (!user) {
    return null;
  }

  return (
    <ProtectedRoute>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50"
      >
        {/* Breadcrumb */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white border-b shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors duration-200 font-medium">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="text-gray-400 mx-2">/</span>
                    <span className="text-gray-900 font-semibold">Profile</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg border-0 p-8 mb-8 overflow-hidden relative"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full translate-y-12 -translate-x-12 opacity-20"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Picture */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex-shrink-0"
              >
                <Avatar 
                  user={user} 
                  size="2xl" 
                  className="shadow-xl ring-4 ring-white"
                />
                <AnimatePresence>
                  {isEditing && (
                    <motion.button 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 w-full px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium shadow-sm"
                    >
                      Change Photo
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Profile Info */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex-1 text-center md:text-left"
              >
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-5xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent tracking-tight"
                >
                  {profileData.firstName} {profileData.lastName}
                </motion.h1>
                <AnimatePresence>
                  {profileData.position && profileData.company && (
                                    <motion.p 
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-2xl text-gray-600 mb-4 font-semibold text-gradient-primary"
                >
                  {profileData.position} at {profileData.company}
                </motion.p>
                  )}
                  {profileData.bio && (
                    <motion.p 
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="text-gray-600 mb-4 max-w-2xl leading-relaxed"
                    >
                      {profileData.bio}
                    </motion.p>
                  )}
                </AnimatePresence>
                <motion.div 
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex flex-wrap gap-2 justify-center md:justify-start"
                >
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200"
                  >
                    {user?.provider === 'google' && 'Google Account'}
                    {user?.provider === 'facebook' && 'Facebook Account'}
                    {user?.provider === 'phone' && 'Phone Account'}
                  </motion.span>
                  {profileData.company && (
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200"
                    >
                      {profileData.company}
                    </motion.span>
                  )}
                </motion.div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="flex-shrink-0"
              >
                <AnimatePresence mode="wait">
                  {!isEditing ? (
                    <motion.button
                      key="edit"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setIsEditing(true)}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform"
                    >
                      Edit Profile
                    </motion.button>
                  ) : (
                    <motion.div 
                      key="actions"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="space-y-3"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleSaveProfile}
                        className="w-full px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform"
                      >
                        Save Changes
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsEditing(false)}
                        className="w-full px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold shadow-sm"
                      >
                        Cancel
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>

          {/* Profile Form */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border-0 p-8 overflow-hidden relative"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 opacity-30"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full -translate-y-10 translate-x-10 opacity-20"></div>
            
            <div className="relative z-10">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-3xl font-bold text-gray-900 mb-8 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent"
              >
                Profile Details
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="space-y-6"
                >
                  <motion.h3 
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-xl font-bold text-gray-900 border-b-2 border-blue-200 pb-3"
                  >
                    Personal Information
                  </motion.h3>
                  
                  {[
                    { name: "firstName", label: "First Name", type: "text" },
                    { name: "lastName", label: "Last Name", type: "text" },
                    { name: "email", label: "Email", type: "email" },
                    { name: "phone", label: "Phone", type: "tel" }
                  ].map((field, index) => (
                    <motion.div
                      key={field.name}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        type={field.type}
                        name={field.name}
                        value={profileData[field.name]}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:border-gray-100 transition-all duration-200 font-medium shadow-sm"
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Professional Information */}
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="space-y-6"
                >
                  <motion.h3 
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="text-xl font-bold text-gray-900 border-b-2 border-indigo-200 pb-3"
                  >
                    Professional Information
                  </motion.h3>
                  
                  {[
                    { name: "company", label: "Company", type: "text" },
                    { name: "position", label: "Position", type: "text" }
                  ].map((field, index) => (
                    <motion.div
                      key={field.name}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        type={field.type}
                        name={field.name}
                        value={profileData[field.name]}
   