"use client";

import { useTranslation } from "../../contexts/TranslationContext";
import LanguageSelector from "../../components/LanguageSelector";

export default function TestTranslationPage() {
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

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Arabic Language Test</h2>
          <p className="text-sm text-gray-600 mb-4">
            Try selecting "Saudi Arabia" (🇸🇦) from the language selector above to test if Arabic translations work properly.
          </p>
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
