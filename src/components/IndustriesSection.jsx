"use client";

import { useRef, useEffect, useState } from "react";

export default function IndustriesSection() {
  const scrollContainerRef = useRef(null);
  const [currentScrollIndex, setCurrentScrollIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const autoScrollIntervalRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current && !isScrolling) {
      setIsScrolling(true);
      const newIndex = Math.max(0, currentScrollIndex - 1);
      setCurrentScrollIndex(newIndex);
      
      scrollContainerRef.current.scrollBy({ 
        left: -300, 
        behavior: 'smooth' 
      });
      
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current && !isScrolling) {
      setIsScrolling(true);
      const newIndex = Math.min(industries.length - 1, currentScrollIndex + 1);
      setCurrentScrollIndex(newIndex);
      
      scrollContainerRef.current.scrollBy({ 
        left: 300, 
        behavior: 'smooth' 
      });
      
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  // Auto-scroll functionality
  const startAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    
    autoScrollIntervalRef.current = setInterval(() => {
      if (!isHovered && scrollContainerRef.current && !isScrolling) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (container.scrollLeft >= maxScroll - 10) {
          // Reset to beginning for infinite loop
          container.scrollTo({ left: 0, behavior: 'smooth' });
          setCurrentScrollIndex(0);
        } else {
          // Continue scrolling right
          container.scrollBy({ left: 300, behavior: 'smooth' });
          setCurrentScrollIndex(prev => Math.min(prev + 1, industries.length - 1));
        }
      }
    }, 2500); // Auto-scroll every 2.5 seconds
  };

  const stopAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  };

  // Update scroll index based on scroll position
  const updateScrollIndex = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const cardWidth = 300; // Approximate card width + gap
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentScrollIndex(Math.max(0, Math.min(newIndex, industries.length - 1)));
    }
  };

  // Stop any ongoing smooth scrolling when component unmounts
  const stopScrolling = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft,
        behavior: 'auto'
      });
    }
  };

  // Add event listeners and auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    
    if (scrollContainer) {
      const handleScroll = () => {
        updateScrollIndex();
        // Stop any ongoing smooth scrolling when user manually scrolls
        scrollContainer.style.scrollBehavior = 'auto';
      };

      const handleWheel = () => {
        // Stop smooth scrolling on wheel events
        scrollContainer.style.scrollBehavior = 'auto';
      };

      scrollContainer.addEventListener('scroll', handleScroll);
      scrollContainer.addEventListener('wheel', handleWheel);

      // Start auto-scroll when component mounts
      if (isAutoScrolling) {
        startAutoScroll();
      }

      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        scrollContainer.removeEventListener('wheel', handleWheel);
        stopAutoScroll();
      };
    }
  }, [isAutoScrolling]);

  // Handle auto-scroll state changes
  useEffect(() => {
    if (isAutoScrolling && !isHovered) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }
    
    return () => stopAutoScroll();
  }, [isAutoScrolling, isHovered]);

  const industries = [
    {
      id: 1,
      name: "ELECTRONIC DEVICES",
      icon: (
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center border-2 border-blue-300 group-hover:border-blue-400 transition-all duration-500 shadow-lg group-hover:shadow-xl">
          <svg className="w-10 h-10 text-blue-600 group-hover:text-blue-700 transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 6h16v2H4zm0 5h16v6H4z"/>
          </svg>
        </div>
      ),
      description: "Devices and accessories"
    },
    {
      id: 2,
      name: "HOME & OFFICE ACCESSORIES",
      icon: (
        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center border-2 border-gray-300 group-hover:border-gray-400 transition-all duration-500 shadow-lg group-hover:shadow-xl">
          <svg className="w-10 h-10 text-gray-600 group-hover:text-gray-700 transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
          </svg>
        </div>
      ),
      description: "Essential accessories for work and home"
    },
    {
      id: 3,
      name: "WRITING INSTRUMENTS",
      icon: (
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center border-2 border-yellow-300 group-hover:border-yellow-400 transition-all duration-500 shadow-lg group-hover:shadow-xl">
          <svg className="w-10 h-10 text-yellow-600 group-hover:text-yellow-700 transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </div>
      ),
      description: "Premium pens and writing accessories"
    },
    {
      id: 4,
      name: "TECHNOLOGY GADGETS",
      icon: (
        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center border-2 border-purple-300 group-hover:border-purple-400 transition-all duration-500 shadow-lg group-hover:shadow-xl">
          <svg className="w-10 h-10 text-purple-600 group-hover:text-purple-700 transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
      ),
      description: "Smart tech solutions for modern needs"
    },
    {
      id: 5,
      name: "FASHION ACCESSORIES",
      icon: (
        <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center border-2 border-pink-300 group-hover:border-pink-400 transition-all duration-500 shadow-lg group-hover:shadow-xl">
          <svg className="w-10 h-10 text-pink-600 group-hover:text-pink-700 transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      ),
      description: "Stylish accessories"
    },
    {
      id: 6,
      name: "BAGS & WALLETS",
      icon: (
        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center border-2 border-green-300 group-hover:border-green-400 transition-all duration-500 shadow-lg group-hover:shadow-xl">
          <svg className="w-10 h-10 text-green-600 group-hover:text-green-700 transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 7h-8v6h8V7zm-2 4h-4V9h4v2zm4-12H3C1.9 1 1 1.9 1 3v18c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H3V5h18v14z"/>
          </svg>
        </div>
      ),
      description: "Premium bags and wallets"
    },
    {
      id: 7,
      name: "DRINKWARE",
      icon: (
        <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center border-2 border-orange-300 group-hover:border-orange-400 transition-all duration-500 shadow-lg group-hover:shadow-xl">
          <svg className="w-10 h-10 text-orange-600 group-hover:text-orange-700 transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
      ),
      description: "Elegant drinkware solutions"
    },
    {
      id: 8,
      name: "WELLNESS PRODUCTS",
      icon: (
        <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center border-2 border-teal-300 group-hover:border-teal-400 transition-all duration-500 shadow-lg group-hover:shadow-xl">
          <svg className="w-10 h-10 text-teal-600 group-hover:text-teal-700 transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      ),
      description: "Health and wellness essentials"
    }
  ];

  return (
    <section className="golden-tag-section bg-muted">
      <div className="golden-tag-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="text-2xl font-bold text-amber-600 tracking-wider">
              STORE
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            BROWSE BY INDUSTRIES
          </h2>
          <p className="text-amber-600 font-medium text-lg">
            Our Premium Product Categories
          </p>
        </div>

        {/* Horizontal Scrolling Industries */}
        <div className="relative">


          {/* Enhanced Navigation Arrows */}
          <button
            onClick={scrollLeft}
            disabled={isScrolling || currentScrollIndex === 0}
            className={`absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 z-10 p-3 sm:p-4 rounded-full shadow-xl border-2 transition-all duration-500 transform hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center ${
              currentScrollIndex === 0 
                ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-50 border-border' 
                : 'bg-background hover:bg-muted text-foreground border-border hover:border-border/80 hover:-translate-x-1 shadow-lg hover:shadow-xl'
            } ${isScrolling ? 'animate-pulse' : ''}`}
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={scrollRight}
            disabled={isScrolling || currentScrollIndex === industries.length - 1}
            className={`absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 z-10 p-3 sm:p-4 rounded-full shadow-xl border-2 transition-all duration-500 transform hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center ${
              currentScrollIndex === industries.length - 1 
                ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-50 border-border' 
                : 'bg-background hover:bg-muted text-foreground border-border hover:border-border/80 hover:translate-x-1 shadow-lg hover:shadow-xl'
            } ${isScrolling ? 'animate-pulse' : ''}`}
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scroll Container */}
          <div 
            ref={scrollContainerRef}
            className={`flex gap-4 sm:gap-8 overflow-x-auto pb-6 scrollbar-hide px-4 sm:px-8 transition-all duration-300 ${
              isAutoScrolling && !isHovered ? 'ring-2 ring-yellow-200 ring-opacity-30' : ''
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {industries.map((industry, index) => (
              <div 
                key={industry.id} 
                className={`text-center group p-4 sm:p-6 rounded-xl transition-all duration-500 flex-shrink-0 min-w-[280px] sm:min-w-[300px] transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl border cursor-pointer relative overflow-hidden ${
                  index === 2 ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 dark:from-yellow-900/20 dark:to-yellow-800/20 dark:border-yellow-700' : 'bg-background border-border hover:border-border/80'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideInFromBottom 0.6s ease-out forwards'
                }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-20 h-20 bg-current rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-current rounded-full"></div>
                </div>
                
                <div className="mb-4 sm:mb-6 flex justify-center relative z-10">
                  {industry.icon}
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                    GT
                  </div>
                </div>
                
                <h3 className={`text-base sm:text-lg font-bold mb-2 sm:mb-3 transition-all duration-500 transform group-hover:scale-105 ${
                  index === 2 ? 'text-yellow-800 dark:text-yellow-200' : 'text-foreground group-hover:text-foreground'
                }`}>
                  {industry.name}
                </h3>
                
                <p className={`text-xs sm:text-sm transition-colors duration-500 ${
                  index === 2 ? 'text-yellow-700 dark:text-yellow-300' : 'text-muted-foreground group-hover:text-foreground'
                }`}>
                  {industry.description}
                </p>
                
                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                  index === 2 ? 'bg-gradient-to-br from-yellow-200/10 to-yellow-300/10 dark:from-yellow-800/20 dark:to-yellow-700/20' : 'bg-gradient-to-br from-muted/20 to-muted/30'
                }`}></div>
                
                {/* Bottom Accent Line */}
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-full transition-all duration-500 ${
                  index === 2 ? 'bg-yellow-500 dark:bg-yellow-400' : 'bg-transparent group-hover:bg-muted-foreground'
                }`}></div>
              </div>
            ))}
          </div>
          
          {/* Dynamic Scroll Indicators */}
          <div className="flex justify-center mt-10 space-x-4">
            {industries.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const cardWidth = 300;
                    scrollContainerRef.current.scrollTo({
                      left: index * cardWidth,
                      behavior: 'smooth'
                    });
                    setCurrentScrollIndex(index);
                  }
                }}
                className={`w-4 h-4 rounded-full transition-all duration-500 transform hover:scale-125 border-2 ${
                  index === currentScrollIndex 
                    ? 'bg-yellow-400 scale-125 shadow-lg shadow-yellow-400/50 border-yellow-500 dark:bg-yellow-500 dark:border-yellow-400' 
                    : 'bg-muted hover:bg-muted-foreground border-border hover:border-border/80'
                }`}
                aria-label={`Go to category ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-fade-in-delay {
          animation: fadeIn 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
