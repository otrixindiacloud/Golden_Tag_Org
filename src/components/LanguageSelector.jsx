"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../contexts/TranslationContext";

const languages = [
  { code: "en", name: "English", country: "USA", flag: "🇺🇸" },
  { code: "ar", name: "العربية", country: "UAE", flag: "🇦🇪" },
  { code: "ar-sa", name: "العربية", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "ar-qa", name: "العربية", country: "Qatar", flag: "🇶🇦" },
  { code: "ar-bh", name: "العربية", country: "Bahrain", flag: "🇧🇭" },
  { code: "ur", name: "اردو", country: "Pakistan", flag: "🇵🇰" },
  { code: "hi", name: "हिन्दी", country: "India", flag: "🇮🇳" },
  { code: "fr", name: "Français", country: "France", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", country: "Germany", flag: "🇩🇪" },
  { code: "es", name: "Español", country: "Spain", flag: "🇪🇸" },
  { code: "it", name: "Italiano", country: "Italy", flag: "🇮🇹" },
  { code: "pt", name: "Português", country: "Brazil", flag: "🇧🇷" },
  { code: "ru", name: "Русский", country: "Russia", flag: "🇷🇺" },
  { code: "ja", name: "日本語", country: "Japan", flag: "🇯🇵" },
  { code: "ko", name: "한국어", country: "South Korea", flag: "🇰🇷" },
  { code: "zh", name: "中文", country: "China", flag: "🇨🇳" },
  { code: "tr", name: "Türkçe", country: "Turkey", flag: "🇹🇷" },
  { code: "nl", name: "Nederlands", country: "Netherlands", flag: "🇳🇱" },
  { code: "sv", name: "Svenska", country: "Sweden", flag: "🇸🇪" },
  { code: "no", name: "Norsk", country: "Norway", flag: "🇳🇴" },
  { code: "da", name: "Dansk", country: "Denmark", flag: "🇩🇰" },
  { code: "fi", name: "Suomi", country: "Finland", flag: "🇫🇮" },
  { code: "pl", name: "Polski", country: "Poland", flag: "🇵🇱" },
  { code: "cs", name: "Čeština", country: "Czech Republic", flag: "🇨🇿" },
  { code: "hu", name: "Magyar", country: "Hungary", flag: "🇭🇺" },
  { code: "ro", name: "Română", country: "Romania", flag: "🇷🇴" },
  { code: "bg", name: "Български", country: "Bulgaria", flag: "🇧🇬" },
  { code: "hr", name: "Hrvatski", country: "Croatia", flag: "🇭🇷" },
  { code: "sk", name: "Slovenčina", country: "Slovakia", flag: "🇸🇰" },
  { code: "sl", name: "Slovenščina", country: "Slovenia", flag: "🇸🇮" },
  { code: "et", name: "Eesti", country: "Estonia", flag: "🇪🇪" },
  { code: "lv", name: "Latviešu", country: "Latvia", flag: "🇱🇻" },
  { code: "lt", name: "Lietuvių", country: "Lithuania", flag: "🇱🇹" },
  { code: "el", name: "Ελληνικά", country: "Greece", flag: "🇬🇷" },
  { code: "he", name: "עברית", country: "Israel", flag: "🇮🇱" },
  { code: "th", name: "ไทย", country: "Thailand", flag: "🇹🇭" },
  { code: "vi", name: "Tiếng Việt", country: "Vietnam", flag: "🇻🇳" },
  { code: "id", name: "Bahasa Indonesia", country: "Indonesia", flag: "🇮🇩" },
  { code: "ms", name: "Bahasa Melayu", country: "Malaysia", flag: "🇲🇾" },
  { code: "tl", name: "Filipino", country: "Philippines", flag: "🇵🇭" },
  { code: "sw", name: "Kiswahili", country: "Kenya", flag: "🇰🇪" },
  { code: "af", name: "Afrikaans", country: "South Africa", flag: "🇿🇦" },
  { code: "ar-eg", name: "العربية", country: "Egypt", flag: "🇪🇬" },
  { code: "ar-jo", name: "العربية", country: "Jordan", flag: "🇯🇴" },
  { code: "ar-lb", name: "العربية", country: "Lebanon", flag: "🇱🇧" },
  { code: "ar-sy", name: "العربية", country: "Syria", flag: "🇸🇾" },
  { code: "ar-iq", name: "العربية", country: "Iraq", flag: "🇮🇶" },
  { code: "ar-kw", name: "العربية", country: "Kuwait", flag: "🇰🇼" },
  { code: "ar-om", name: "العربية", country: "Oman", flag: "🇴🇲" },
  { code: "ar-ye", name: "العربية", country: "Yemen", flag: "🇾🇪" },
  { code: "ar-ma", name: "العربية", country: "Morocco", flag: "🇲🇦" },
  { code: "ar-tn", name: "العربية", country: "Tunisia", flag: "🇹🇳" },
  { code: "ar-dz", name: "العربية", country: "Algeria", flag: "🇩🇿" },
  { code: "ar-ly", name: "العربية", country: "Libya", flag: "🇱🇾" },
  { code: "ar-sd", name: "العربية", country: "Sudan", flag: "🇸🇩" },
  { code: "ar-so", name: "العربية", country: "Somalia", flag: "🇸🇴" },
  { code: "ar-dj", name: "العربية", country: "Djibouti", flag: "🇩🇯" },
  { code: "ar-km", name: "العربية", country: "Comoros", flag: "🇰🇲" },
  { code: "ar-mr", name: "العربية", country: "Mauritania", flag: "🇲🇷" },
  { code: "ar-td", name: "العربية", country: "Chad", flag: "🇹🇩" },
  { code: "ar-er", name: "العربية", country: "Eritrea", flag: "🇪🇷" },
  { code: "ar-il", name: "العربية", country: "Palestine", flag: "🇵🇸" },
  { code: "ar-ps", name: "العربية", country: "Palestine", flag: "🇵🇸" },
  { code: "ar-jo", name: "العربية", country: "Jordan", flag: "🇯🇴" },
  { code: "ar-sy", name: "العربية", country: "Syria", flag: "🇸🇾" },
  { code: "ar-iq", name: "العربية", country: "Iraq", flag: "🇮🇶" },
  { code: "ar-kw", name: "العربية", country: "Kuwait", flag: "🇰🇼" },
  { code: "ar-om", name: "العربية", country: "Oman", flag: "🇴🇲" },
  { code: "ar-ye", name: "العربية", country: "Yemen", flag: "🇾🇪" },
  { code: "ar-ma", name: "العربية", country: "Morocco", flag: "🇲🇦" },
  { code: "ar-tn", name: "العربية", country: "Tunisia", flag: "🇹🇳" },
  { code: "ar-dz", name: "العربية", country: "Algeria", flag: "🇩🇿" },
  { code: "ar-ly", name: "العربية", country: "Libya", flag: "🇱🇾" },
  { code: "ar-sd", name: "العربية", country: "Sudan", flag: "🇸🇩" },
  { code: "ar-so", name: "العربية", country: "Somalia", flag: "🇸🇴" },
  { code: "ar-dj", name: "العربية", country: "Djibouti", flag: "🇩🇯" },
  { code: "ar-km", name: "العربية", country: "Comoros", flag: "🇰🇲" },
  { code: "ar-mr", name: "العربية", country: "Mauritania", flag: "🇲🇷" },
  { code: "ar-td", name: "العربية", country: "Chad", flag: "🇹🇩" },
  { code: "ar-er", name: "العربية", country: "Eritrea", flag: "🇪🇷" },
  { code: "ar-il", name: "العربية", country: "Palestine", flag: "🇵🇸" },
  { code: "ar-ps", name: "العربية", country: "Palestine", flag: "🇵🇸" }
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, changeLanguage, t } = useTranslation();
  const dropdownRef = useRef(null);
  
  
  
  // Find the current language object
  const selectedLanguage = languages.find(lang => lang.code === currentLanguage) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (language) => {
    changeLanguage(language.code);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50" ref={dropdownRef} style={{ zIndex: 1000 }}>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-muted transition-all duration-200 border border-gray-300 hover:border-blue-500 min-w-0 cursor-pointer bg-white hover:bg-gray-50"
        style={{ zIndex: 1000 }}
      >
        <span className="text-base sm:text-lg flag">{selectedLanguage.flag}</span>
        <span className="hidden xs:block text-xs sm:text-sm truncate max-w-20 language-selector-xs">{selectedLanguage.name}</span>
        <motion.svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-80 max-w-[calc(100vw-2rem)] max-h-96 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-xl"
            style={{ 
              zIndex: 9999, 
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px'
            }}
          >
            <div className="p-2">
              <div className="text-xs text-muted-foreground px-3 py-2 border-b border-border">
                {t("selectLanguage")} / {t("selectLanguageAr")}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {languages.map((language, index) => (
                  <motion.button
                    key={`${language.code}-${index}`}
                    onClick={() => handleLanguageSelect(language)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted rounded-md transition-colors duration-150 ${
                      selectedLanguage.code === language.code ? "bg-primary/10 text-primary" : "text-foreground"
                    }`}
                    whileHover={{ x: 2 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.1, delay: index * 0.01 }}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{language.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{language.country}</div>
                    </div>
                    {selectedLanguage.code === language.code && (
                      <motion.svg
                        className="w-4 h-4 text-primary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </motion.svg>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
