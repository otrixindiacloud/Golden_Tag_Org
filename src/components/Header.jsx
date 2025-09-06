"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import CartButton from "./CartButton";
import NotificationButton from "./NotificationButton";

import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10); // Hide header when scrolling more than 10px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show a loading state until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <header className="bg-background border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-2 pl-1">
          <div className="flex items-center h-20">
            {/* Logo placeholder */}
            <div className="flex-shrink-0">
              <div className="h-20 w-64 bg-gray-200 animate-pulse rounded"></div>
            </div>
            {/* Search bar placeholder */}
            <div className="hidden sm:flex flex-1 max-w-4xl mx-auto px-4">
              <div className="w-full h-10 bg-gray-200 animate-pulse rounded-xl"></div>
            </div>
            {/* Right side placeholder */}
            <div className="flex items-center ml-auto space-x-3">
              <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
              <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
              <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
              <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isScrolled ? -100 : 0, opacity: isScrolled ? 0 : 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-background border-b border-border shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-2" >
        {/* Main Header Content */}
        <motion.div 
          className="flex items-center h-20"
        >
          {/* Logo - Left Corner */}
          <motion.div 
            className="flex-shrink-0"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className="flex items-center" style={{ marginLeft: '-105px'}}>
                <Image
                  src="/WhatsApp_Image_2025-09-02_at_13__1_-removebg-preview.png"
                  alt="Golden Tag Corporate Gifts"
                  width={300}
                  height={120}
                  className="h-20 w-auto dark:invert"
                  priority
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>



          {/* Search Bar - Hidden on mobile, shown on larger screens */}
          <motion.div 
            className="hidden sm:flex flex-1 max-w-4xl mx-auto px-4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div 
              className="relative w-full"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="text"
                placeholder="Search gifts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-bold transition-all duration-200 shadow-sm hover:shadow-md placeholder:font-medium"
              />
              <motion.div 
                className="absolute inset-y-0 right-0 flex items-center pr-4"
                animate={{ 
                  scale: searchQuery ? 1.1 : 1,
                  transition: { duration: 0.2 }
                }}
              >
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Icons */}
          <motion.div 
            className="flex items-center ml-auto"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {/* Social Media Icons - Hidden on mobile */}
            <motion.div 
              className="hidden sm:flex items-center space-x-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 1.0 }}
            >
              {/* Facebook Icon */}
              <motion.a 
                href="https://www.facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors group"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                title="Follow us on Facebook"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </motion.a>
              
              {/* Instagram Icon */}
              <motion.a 
                href="https://www.instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 transition-all group"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                title="Follow us on Instagram"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.a>
            </motion.div>
            

            
            <motion.div
              className="ml-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 1.1 }}
            >
              <ThemeToggle />
            </motion.div>
            {/* Cart Button */}
            <motion.div
              className="ml-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 1.2 }}
            >
              <CartButton />
            </motion.div>
            
            {/* Notification Button - Only show when user is logged in */}
            {mounted && user && (
              <motion.div
                className="ml-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 1.3 }}
              >
                <NotificationButton />
              </motion.div>
            )}
            
            <AnimatePresence mode="wait">
              {mounted && user ? (
                <motion.div 
                  key="user-buttons"
                  className="hidden sm:flex items-center space-x-3 ml-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/account" className="w-10 h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center" title="Profile" style={{marginRight:-90}} >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-10 h-10 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
                      title="Logout" style={{ marginRight:-300,marginLeft:40}}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="login-button"
                  className="ml-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/login" className="hidden sm:inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200 font-medium text-sm mr-2">
                    Sign In
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {/* Mobile Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search gifts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base font-bold placeholder:font-bold"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Mobile Navigation - Moved to SecondaryHeader */}

            

            {/* Mobile Social Media Icons */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center mb-4">
                {/* Facebook Icon */}
                <motion.a 
                  href="https://www.facebook.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Follow us on Facebook"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </motion.a>
                
                {/* Instagram Icon */}
                <motion.a 
                  href="https://www.instagram.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Follow us on Instagram"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </motion.a>
              </div>
            </div>

            {/* Mobile User Actions */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              {mounted && user ? (
                <div>
                  <Link 
                    href="/notifications" 
                    className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 font-medium w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.5 19.5h15a2 2 0 002-2v-6.5a7.5 7.5 0 00-15 0v6.5a2 2 0 002 2z" />
                    </svg>
                    Notifications
                  </Link>
                  <Link 
                    href="/account" 
                    className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium"
                  >
                    Logout
                </button>
                </div>
              ) : (
                <div>
                  <Link 
                    href="/login" 
                    className="block w-full text-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200 font-medium mb-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="block w-full text-center px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-md hover:from-orange-600 hover:to-yellow-600 transition-colors duration-200 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.header>
  );
}
