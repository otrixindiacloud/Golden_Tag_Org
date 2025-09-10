"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "../contexts/TranslationContext";
import { useTheme } from "../contexts/ThemeContext";

export default function SecondaryHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, isRTL } = useTranslation();
  const { theme } = useTheme();

  const navigationItems = [
    { href: "/", label: t("home") || "Home" },
    { href: "/about", label: t("about") || "About" },
    { href: "/products", label: t("products") || "Products" },
    { href: "/e-catalog", label: t("eCatalog") || "E-Catalog" },
    { href: "/contact", label: t("contact") || "Contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10); // Make fixed when scrolling more than 10px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isScrolled) {
      document.body.style.paddingTop = '64px'; // 64px is the height of secondary header
    } else {
      document.body.style.paddingTop = '0px';
    }
  }, [isScrolled]);

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${isScrolled ? 'fixed top-0 left-0 right-0 z-50' : ''} bg-background border-b border-border shadow-sm transition-colors duration-200 overflow-visible ${theme === 'dark' ? 'dark' : ''}`}
    >
      <div className="max-w-7xl mx-auto overflow-visible">
        <div className="flex items-center justify-between h-16 overflow-visible">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex flex-1 justify-center space-x-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {navigationItems.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link 
                  href={link.href} 
                  className="text-foreground hover:text-primary transition-all duration-200 font-medium text-sm relative group"
                >
                  {link.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Language Selector - Right Corner */}
          <motion.div
            className="flex items-center overflow-visible"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <LanguageSelector />
          </motion.div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div 
              className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg z-50 sm:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="px-4 py-6 space-y-1">
                {navigationItems.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className="block text-foreground hover:text-primary transition-colors duration-200 font-medium text-lg py-4 px-4 rounded-md hover:bg-muted mobile-nav-item min-h-[44px] flex items-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-6 border-t border-border">
                  <div className="text-base text-muted-foreground mb-4 px-4">{t("selectLanguage")} / {t("selectLanguageAr")}</div>
                  <div className="px-4">
                    <LanguageSelector />
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
