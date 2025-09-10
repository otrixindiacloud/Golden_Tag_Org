"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import CartButton from "./CartButton";
import NotificationButton from "./NotificationButton";
import Avatar from "./Avatar";

import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "../contexts/TranslationContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();
  const { theme } = useTheme();
  const { t } = useTranslation();

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
      <header className={`bg-background border-b border-border shadow-sm transition-colors duration-200 ${theme === 'dark' ? 'dark' : ''}`}>
        <div className="w-full px-4">
          <div className="flex items-center h-16">
            {/* Logo placeholder */}
            <div className="flex-shrink-0">
              <div className="w-40 h-14 bg-muted animate-pulse rounded"></div>
            </div>
            {/* Search bar placeholder */}
            <div className="hidden sm:flex flex-1 max-w-7xl mx-auto px-4 justify-center">
              <div className="w-full h-10 bg-muted animate-pulse rounded-xl"></div>
            </div>
            {/* Right side placeholder */}
            <div className="flex items-center ml-auto space-x-3">
              <div className="w-8 h-8 bg-muted animate-pulse rounded-full"></div>
              <div className="w-8 h-8 bg-muted animate-pulse rounded-full"></div>
              <div className="w-20 h-8 bg-muted animate-pulse rounded"></div>
              <div className="w-20 h-8 bg-muted animate-pulse rounded"></div>
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
      className={`bg-background border-b border-border shadow-sm transition-colors duration-200 overflow-visible ${theme === 'dark' ? 'dark' : ''}`}
    >

        <div className="w-full px-4 bg-transparent overflow-visible">
        {/* Main Header Content */}
        <motion.div 
          className="flex items-center h-16"
        >
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/" className="flex items-justify-between">
              <Image
                src="/Golden Tag.png"
                alt="Golden Tag Corporate Gifts"
                width={180}
                height={90}
                className="h-12 sm:h-14 w-auto object-contain"
                fontSize="200px"
                priority
              />
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>



          {/* Search Bar with Right Buttons - Hidden on mobile, shown on larger screens */}
          <motion.div 
            className="hidden sm:flex flex-1 max-w-none px-4 justify-center bg-transparent"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center w-full space-x-6">
              {/* Search Input */}
              <motion.div 
                className="relative flex-1 min-w-0"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="text"
                  placeholder={t("searchGifts") || "Search gifts..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border border-input rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg placeholder:font-medium bg-background text-foreground placeholder:text-muted-foreground"
                />
                <motion.div 
                  className="absolute inset-y-0 right-0 flex items-center pr-4"
                  animate={{ 
                    scale: searchQuery ? 1.1 : 1,
                    transition: { duration: 0.2 }
                  }}
                >
                  <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </motion.div>
              </motion.div>

              {/* Right Buttons in Search Bar Area */}
              <div className="flex items-center space-x-3 bg-transparent overflow-visible">
                {/* Cart Button */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.2 }}
                  className="bg-transparent"
                >
                  <CartButton />
                </motion.div>
                
                {/* Notification Button - Only show when user is logged in */}
                {mounted && user && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.3 }}
                    className="bg-transparent"
                  >
                    <NotificationButton />
                  </motion.div>
                )}


                {/* User Profile or Login Button */}
                <AnimatePresence mode="wait">
                  {mounted && user ? (
                    <motion.div 
                      key="user-profile"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-transparent"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-transparent"
                      >
                        <Link href="/account" className="flex items-center group bg-transparent" title="Profile">
                          <Avatar 
                            user={user} 
                            size="sm" 
                            showName={true}
                            nameClassName="text-sm font-semibold text-foreground whitespace-nowrap max-w-[12rem] truncate ml-2"
                          />
                        </Link>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="login-button"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-transparent"
                    >
                      <Link href="/login" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200 font-medium text-sm">
                        Sign In
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-border py-4">
            {/* Mobile Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t("searchGifts") || "Search gifts..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2.5 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base font-medium placeholder:font-medium bg-background text-foreground placeholder:text-muted-foreground min-h-[40px]"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Mobile Navigation - Moved to SecondaryHeader */}

            

            {/* Mobile Social icons removed as requested */}



            {/* Mobile User Actions */}
            <div className="mt-6 pt-6 border-t border-border space-y-3">
              {mounted && user ? (
                <div className="space-y-3">
                  <Link 
                    href="/notifications" 
                    className="flex items-center justify-center px-4 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200 font-medium w-full min-h-[44px]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.5 19.5h15a2 2 0 002-2v-6.5a7.5 7.5 0 00-15 0v6.5a2 2 0 002 2z" />
                    </svg>
                    Notifications
                  </Link>
                  <Link 
                    href="/account" 
                    className="flex items-center justify-center px-4 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors duration-200 font-medium w-full min-h-[44px]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  
                </div>
              ) : (
                <div className="space-y-3">
                  <Link 
                    href="/login" 
                    className="block w-full text-center px-4 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200 font-medium min-h-[44px] flex items-center justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className="block w-full text-center px-4 py-3 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors duration-200 font-medium min-h-[44px] flex items-center justify-center"
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
