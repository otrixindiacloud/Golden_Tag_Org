"use client";

import { useTranslation } from "../../contexts/TranslationContext";
import LanguageSelector from "../../components/LanguageSelector";

export default function TranslationTestPage() {
  const { t, currentLanguage, isRTL } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Translation Test Page</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Language Settings</h2>
          <div className="space-y-2">
            <p><strong>Current Language:</strong> {currentLanguage}</p>
            <p><strong>RTL Mode:</strong> {isRTL ? "Yes" : "No"}</p>
            <p><strong>Document Direction:</strong> {typeof document !== 'undefined' ? document.documentElement.dir : 'N/A'}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Language Selector</h2>
          <LanguageSelector />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Translation Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Navigation</h3>
              <ul className="space-y-1 text-sm">
                <li><strong>Home:</strong> {t("home")}</li>
                <li><strong>About:</strong> {t("about")}</li>
                <li><strong>Products:</strong> {t("products")}</li>
                <li><strong>E-Catalog:</strong> {t("eCatalog")}</li>
                <li><strong>Contact:</strong> {t("contact")}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Common Terms</h3>
              <ul className="space-y-1 text-sm">
                <li><strong>Loading:</strong> {t("loading")}</li>
                <li><strong>Error:</strong> {t("error")}</li>
                <li><strong>Success:</strong> {t("success")}</li>
                <li><strong>Cancel:</strong> {t("cancel")}</li>
                <li><strong>Save:</strong> {t("save")}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Product Terms</h3>
              <ul className="space-y-1 text-sm">
                <li><strong>Add to Cart:</strong> {t("addToCart")}</li>
                <li><strong>View Details:</strong> {t("viewDetails")}</li>
                <li><strong>Price:</strong> {t("price")}</li>
                <li><strong>Quantity:</strong> {t("quantity")}</li>
                <li><strong>In Stock:</strong> {t("inStock")}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Hero Section</h3>
              <ul className="space-y-1 text-sm">
                <li><strong>Store:</strong> {t("store")}</li>
                <li><strong>Hero Title:</strong> {t("heroTitle")}</li>
                <li><strong>Browse Products:</strong> {t("browseProducts")}</li>
                <li><strong>Contact Us:</strong> {t("contactUs")}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Search Functionality Test</h2>
          <div className="space-y-2">
            <p><strong>Search Placeholder:</strong> {t("searchGifts")}</p>
            <input
              type="text"
              placeholder={t("searchGifts")}
              className="w-full p-2 border border-gray-300 rounded-md"
              dir={isRTL ? "rtl" : "ltr"}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Multi-Language Test</h2>
          <p className="text-sm text-gray-600 mb-4">
            Try selecting different languages from the language selector above to test translations:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-blue-50 rounded-md">
              <h3 className="font-medium text-blue-800 mb-2">English (USA) 🇺🇸</h3>
              <p className="text-sm text-blue-600">Default language with USA-specific content</p>
            </div>
            <div className="p-3 bg-green-50 rounded-md">
              <h3 className="font-medium text-green-800 mb-2">Urdu (Pakistan) 🇵🇰</h3>
              <p className="text-sm text-green-600">Complete Urdu translations added</p>
            </div>
            <div className="p-3 bg-red-50 rounded-md">
              <h3 className="font-medium text-red-800 mb-2">Arabic - Saudi Arabia 🇸🇦</h3>
              <p className="text-sm text-red-600">Saudi-specific Arabic content</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-md">
              <h3 className="font-medium text-yellow-800 mb-2">Arabic - Qatar 🇶🇦</h3>
              <p className="text-sm text-yellow-600">Qatar-specific Arabic content</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-md">
              <h3 className="font-medium text-purple-800 mb-2">Arabic - Bahrain 🇧🇭</h3>
              <p className="text-sm text-purple-600">Bahrain-specific Arabic content</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-md">
              <h3 className="font-medium text-indigo-800 mb-2">Arabic - UAE 🇦🇪</h3>
              <p className="text-sm text-indigo-600">UAE-specific Arabic content</p>
            </div>
          </div>
          <div className="p-4 bg-gray-100 rounded-md">
            <p className="text-lg" dir={isRTL ? "rtl" : "ltr"}>
              {t("heroTitle")}
            </p>
            <p className="text-sm mt-2" dir={isRTL ? "rtl" : "ltr"}>
              {t("heroDescription")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
