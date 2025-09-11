"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "../contexts/TranslationContext";



export default function StoreBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === 'dark';
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const providedImages = [
    "/1.jpg",
    "/2.jpg",
    "/4.jpg",
    "/5.jpg",
    "/6.jpg",
    "/7.jpg",
    "/8.jpg"
  ];

  const bannerSlides = [
    {
      id: 1,
      title: t("requestYourCatalog") || "Request Your Catalog",
      subtitle: t("getPersonalizedCatalog") || "Get a personalized catalog tailored to your corporate gift needs",
      description: t("discoverComprehensiveCollection") || "Discover our comprehensive collection of premium corporate gifts and promotional items. Request your personalized catalog today and explore our curated selection designed for your business needs.",
      background: "linear-gradient(135deg, #0b0b0b 0%, #111111 35%, #1a1a1a 70%, #0b0b0b 100%)",
      backgroundDark: "linear-gradient(135deg, #0b0b0b 0%, #0f0f0f 35%, #111827 70%, #0b0b0b 100%)",
      accent: "from-yellow-400 via-amber-400 to-yellow-500",
      accentDark: "from-amber-400 via-yellow-500 to-amber-300",
      cta: t("requestCatalog") || "Request Catalog",
      image: "/1.jpg"
    },
    {
      id: 2,
      title: t("premiumCorporateGifts") || "Premium Corporate Gifts",
      subtitle: t("excellenceSince2015") || "Excellence Since 2015",
      description: t("servingLeadingCompanies") || "Serving leading multinational companies in Bahrain with premium quality gifts that make lasting impressions on your clients and employees.",
      background: "linear-gradient(135deg, #0a0a0a 0%, #141414 30%, #1f1f1f 60%, #0a0a0a 100%)",
      backgroundDark: "linear-gradient(135deg, #000000 0%, #0b0b0b 30%, #111827 60%, #000000 100%)",
      accent: "from-neutral-900 via-yellow-400 to-neutral-800",
      accentDark: "from-yellow-500 via-amber-400 to-yellow-300",
      cta: t("viewProducts") || "View Products",
      image: "/2.jpg"
    },
    {
      id: 3,
      title: t("customBrandingSolutions") || "Custom Branding Solutions",
      subtitle: t("yourBrandOurExpertise") || "Your Brand, Our Expertise",
      description: t("professionalLogoEmbossing") || "Professional logo embossing, custom color schemes, and personalized messaging for your corporate identity. Get your personalized catalog to see our full range.",
      background: "linear-gradient(135deg, #0b0b0b 0%, #161616 35%, #1f1f1f 70%, #0b0b0b 100%)",
      backgroundDark: "linear-gradient(135deg, #0b0b0b 0%, #111111 35%, #1f2937 70%, #0b0b0b 100%)",
      accent: "from-amber-300 via-yellow-400 to-amber-500",
      accentDark: "from-amber-400 via-yellow-500 to-amber-300",
      cta: t("getCatalog") || "Get Catalog",
      image: "/3.jpg"
    },
    {
      id: 4,
      title: t("luxuryGiftCollections") || "Luxury Gift Collections",
      subtitle: t("premiumQualityService") || "Premium Quality, Exceptional Service",
      description: t("exploreExclusiveRange") || "Explore our exclusive range of luxury corporate gifts designed to impress your most valued clients and partners. From elegant accessories to sophisticated office essentials.",
      background: "linear-gradient(135deg, #0a0a0a 0%, #101010 25%, #1a1a1a 60%, #0a0a0a 100%)",
      backgroundDark: "linear-gradient(135deg, #080808 0%, #0f172a 25%, #111827 60%, #080808 100%)",
      accent: "from-neutral-800 via-amber-400 to-neutral-900",
      accentDark: "from-slate-800 via-amber-500 to-slate-900",
      cta: t("exploreCollection") || "Explore Collection",
      image: "/4.jpg"
    },
    {
      id: 5,
      title: t("seasonalSpecials") || "Seasonal Specials",
      subtitle: t("limitedTimeOffers") || "Limited Time Offers",
      description: t("discoverSeasonalCollection") || "Discover our seasonal collection of corporate gifts perfect for holidays, celebrations, and special occasions. Limited quantities available.",
      background: "linear-gradient(135deg, #0b0b0b 0%, #131313 30%, #1c1c1c 70%, #0b0b0b 100%)",
      backgroundDark: "linear-gradient(135deg, #0b1120 0%, #0b0b0b 30%, #111827 70%, #0b0b0b 100%)",
      accent: "from-yellow-400 via-amber-300 to-yellow-500",
      accentDark: "from-amber-400 via-yellow-500 to-amber-300",
      cta: t("shopNow") || "Shop Now",
      image: "/5.jpg"
    },
    {
      id: 6,
      title: t("corporatePartnerships") || "Corporate Partnerships",
      subtitle: t("buildingLastingRelationships") || "Building Lasting Relationships",
      description: t("partnerWithUs") || "Partner with us for your corporate gifting needs. We offer customized solutions, bulk discounts, and dedicated account management for your business.",
      background: "linear-gradient(135deg, #0b0b0b 0%, #141414 35%, #1a1a1a 70%, #0b0b0b 100%)",
      backgroundDark: "linear-gradient(135deg, #0b0b0b 0%, #1f2937 25%, #111111 70%, #0b0b0b 100%)",
      accent: "from-amber-500 via-yellow-400 to-amber-600",
      accentDark: "from-yellow-500 via-amber-400 to-yellow-300",
      cta: t("partnerWithUsCTA") || "Partner With Us",
      image: "/6.jpg"
    },
    {
      id: 7,
      title: t("smartDeskEssentials") || "Smart Desk Essentials",
      subtitle: t("curatedWorkspaceKits") || "Curated workspace kits",
      description: t("thoughtfullyDesignedDeskSets") || "Thoughtfully designed desk sets and accessories that elevate everyday productivity.",
      background: "linear-gradient(135deg, #0b0b0b 0%, #131313 30%, #1c1c1c 70%, #0b0b0b 100%)",
      backgroundDark: "linear-gradient(135deg, #000000 0%, #0b0b0b 30%, #111827 70%, #000000 100%)",
      accent: "from-amber-400 via-yellow-500 to-amber-300",
      accentDark: "from-yellow-500 via-amber-400 to-yellow-300",
      cta: t("viewKits") || "View Kits",
      image: "/7.jpg"
    },
    {
      id: 8,
      title: t("brandedMerchandise") || "Branded Merchandise",
      subtitle: t("madeForYourBrand") || "Made for your brand",
      description: t("highQualityBrandedGoods") || "High-quality branded goods for events, onboarding, and client gifting.",
      background: "linear-gradient(135deg, #0a0a0a 0%, #141414 30%, #1f1f1f 60%, #0a0a0a 100%)",
      backgroundDark: "linear-gradient(135deg, #080808 0%, #0f172a 25%, #111827 60%, #080808 100%)",
      accent: "from-neutral-800 via-amber-400 to-neutral-900",
      accentDark: "from-slate-800 via-amber-500 to-slate-900",
      cta: t("browse") || "Browse",
      image: "/8.jpg"
    }
  ];

  const getBackground = (slide) => (isDark && slide.backgroundDark ? slide.backgroundDark : slide.background);
  const getBackgroundStyle = (slide) => {
    const selectedImage = providedImages[currentSlide % providedImages.length] || slide?.image;
    if (selectedImage) {
      const overlay = isDark
        ? "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55))"
        : "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25))";
      return {
        backgroundImage: `${overlay}, url(${selectedImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      };
    }
    return { background: getBackground(slide) };
  };
  const getAccent = (slide) => (isDark && slide.accentDark ? slide.accentDark : slide.accent);

  // Manual navigation and autoplay (2s per slide)
  useEffect(() => {
    if (isPaused || isTransitioning) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 10; // 10% every 200ms = 2s per slide
        if (next >= 100) {
          setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
          return 0;
        }
        return next;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isPaused, isTransitioning, bannerSlides.length]);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
      setProgress(0);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
      setProgress(0);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  return (
    <motion.div 
      className="relative w-full h-80 sm:h-96 md:h-[32rem] lg:h-[36rem] overflow-hidden mb-8 sm:mb-10 md:mb-16 lg:mb-20"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides with Advanced Animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ 
            opacity: 0, 
            scale: 1,
            x: 100,
            rotateY: 15
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: 0,
            rotateY: 0
          }}
          exit={{ 
            opacity: 0, 
            scale: 1,
            x: -100,
            rotateY: -15
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
          className="absolute inset-0"
        >
          {/* Background with Pattern */}
          <motion.div 
            className="absolute inset-0"
            style={getBackgroundStyle(bannerSlides[currentSlide])}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          >
            {/* Geometric Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-black/60 dark:to-transparent"></div>
            </div>
            
            {/* Accent Gradient */}
            <motion.div 
              className={`absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l ${getAccent(bannerSlides[currentSlide])} opacity-25`}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 0.25 }}
              transition={{ duration: 1, delay: 0.3 }}
            ></motion.div>
          </motion.div>
          
          {/* Content */}
          <motion.div 
            className="relative z-10 h-full flex items-end pb-8 sm:pb-12 md:pb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <div className="text-center mb-4 sm:mb-6">
                  <motion.div 
                    className="flex justify-center mb-2 sm:mb-3"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <motion.div 
                      className="text-sm sm:text-lg md:text-xl font-black text-white tracking-wider uppercase bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent"
                      animate={{ 
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                    >
                      CORPORATE GIFTS
                    </motion.div>
                  </motion.div>
                  {/* Readability panel behind text */}
                  <div className="mx-auto mb-2 sm:mb-3 rounded-xl sm:rounded-2xl bg-black/35 dark:bg-black/45 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                  <motion.h1 
                    className="text-xl sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-black text-white mb-1 sm:mb-2 leading-tight tracking-tight drop-shadow-[0_6px_16px_rgba(0,0,0,0.6)]"
                    initial={{ y: 30, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.9, type: "spring", stiffness: 100 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {bannerSlides[currentSlide].title}
                  </motion.h1>
                  <motion.h2 
                    className="text-sm sm:text-lg md:text-xl lg:text-2xl text-yellow-200 dark:text-amber-300 font-bold mb-1 tracking-wide"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {bannerSlides[currentSlide].subtitle}
                  </motion.h2>
                  <motion.p 
                    className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-100 dark:text-gray-200 leading-relaxed mb-1 sm:mb-2 font-medium max-w-xl mx-auto"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.3 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {bannerSlides[currentSlide].description}
                  </motion.p>
                  </div>
                </div>
                
                <motion.button 
                  className={`bg-gradient-to-r ${getAccent(bannerSlides[currentSlide])} text-white font-black px-4 sm:px-6 md:px-10 py-2 sm:py-3 md:py-5 rounded-full text-xs sm:text-sm md:text-lg uppercase tracking-wider border-2 border-white/10 shadow-2xl min-h-[44px] flex items-center justify-center mx-auto`}
                  initial={{ y: 30, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.5, type: "spring", stiffness: 100 }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {bannerSlides[currentSlide].cta}
                </motion.button>
              </div>
            </div>

            {/* Animated Decorative Elements - Hidden on mobile for better performance */}
            <motion.div 
              className="absolute right-4 sm:right-20 top-4 sm:top-20 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-br from-orange-500 via-white to-orange-600 rounded-full opacity-25 hidden sm:block"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
                opacity: [0.25, 0.5, 0.25]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            ></motion.div>
            <motion.div 
              className="absolute right-8 sm:right-40 bottom-4 sm:bottom-20 w-10 sm:w-20 h-10 sm:h-20 bg-gradient-to-br from-black via-yellow-400 to-gray-800 rounded-full opacity-25 hidden sm:block"
              animate={{ 
                scale: [1, 1.6, 1],
                opacity: [0.25, 0.7, 0.25]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
            ></motion.div>
            <motion.div 
              className="absolute left-4 sm:left-20 top-8 sm:top-32 w-8 sm:w-16 h-8 sm:h-16 bg-gradient-to-br from-orange-300 via-orange-200 to-orange-400 rounded-full opacity-20 hidden sm:block"
              animate={{ 
                scale: [1, 1.4, 1],
                rotate: [360, 0, 360],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 2
              }}
            ></motion.div>
            <motion.div 
              className="absolute left-8 sm:left-40 bottom-8 sm:bottom-32 w-6 sm:w-12 h-6 sm:h-12 bg-gradient-to-br from-gray-500 via-gray-300 to-gray-600 rounded-full opacity-20 hidden sm:block"
              animate={{ 
                scale: [1, 1.5, 1],
                rotate: [0, -180, 0],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 3
              }}
            ></motion.div>
            
            {/* Right-side brand badges removed */}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Manual navigation buttons - middle left and right */}
      <button
        aria-label="Previous Slide"
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 dark:bg-black/60 hover:bg-yellow-400 dark:hover:bg-amber-500 text-black dark:text-white rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200 z-20"
        disabled={isTransitioning}
        style={{transform: 'translateY(-50%)'}}
      >
        <span className="text-2xl font-bold">&#x2039;</span>
      </button>
      <button
        aria-label="Next Slide"
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 dark:bg-black/60 hover:bg-yellow-400 dark:hover:bg-amber-500 text-black dark:text-white rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200 z-20"
        disabled={isTransitioning}
        style={{transform: 'translateY(-50%)'}}
      >
        <span className="text-2xl font-bold">&#x203A;</span>
      </button>

      {/* Autoplay progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 dark:bg-black/30">
        <div
          className="h-full bg-amber-400 dark:bg-amber-500 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Navigation arrows removed */}


      {/* Brand Badge - Removed as it's now positioned below header */}



      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { top: "25%", left: "25%", color: "orange-400", size: "w-2 h-2", delay: 0 },
          { top: "75%", right: "33%", color: "yellow-400", size: "w-1 h-1", delay: 1 },
          { top: "50%", left: "50%", color: "gray-500", size: "w-1.5 h-1.5", delay: 2 },
          { top: "33%", right: "25%", color: "black", size: "w-1 h-1", delay: 3 },
          { bottom: "33%", left: "33%", color: "orange-300", size: "w-1.5 h-1.5", delay: 4 },
          { top: "60%", left: "15%", color: "white", size: "w-1 h-1", delay: 5 },
          { bottom: "20%", right: "20%", color: "yellow-300", size: "w-1 h-1", delay: 6 },
          { top: "40%", right: "15%", color: "gray-400", size: "w-1 h-1", delay: 7 },
          { bottom: "60%", left: "60%", color: "orange-200", size: "w-1 h-1", delay: 8 }
        ].map((particle, index) => (
          <motion.div
            key={index}
            className={`absolute ${particle.size} bg-${particle.color} rounded-full opacity-60`}
            style={{
              top: particle.top,
              left: particle.left,
              right: particle.right,
              bottom: particle.bottom
            }}
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6]
            }}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
