"use client";

import { useState } from 'react';
import collections from '@/data/collections';
import PDFDownloadButton from '@/components/PDFDownloadButton';

export default function ECatalogPage() {
  const [downloading, setDownloading] = useState('');

  const catalogs = [
    { id: 'corporate', name: 'Corporate Gifts', description: 'Premium corporate gifting solutions' },
    { id: 'electronics', name: 'Electronics', description: 'Latest electronic gadgets and devices' },
    { id: 'apparel', name: 'Apparel', description: 'Trendy and comfortable clothing' },
    { id: 'wellness', name: 'Wellness', description: 'Health and wellness products' },
    { id: 'office-supplies', name: 'Office Supplies', description: 'Essential office equipment and supplies' },
    { id: 'eco-friendly', name: 'Eco‑friendly', description: 'Sustainable and environmentally friendly products' },
    { id: 'tech-accessories', name: 'Tech Accessories', description: 'Technology accessories and peripherals' },
    { id: 'drinkware', name: 'Drinkware', description: 'Premium drinkware and beverage accessories' },
    { id: 'bags', name: 'Bags', description: 'Stylish bags for every occasion' },
    { id: 'stationery', name: 'Stationery', description: 'Office and personal stationery items' },
    { id: 'fitness', name: 'Wellness & Fitness', description: 'Fitness equipment and wellness products' },
    { id: 'custom-apparel', name: 'Custom Apparel', description: 'Customized clothing and apparel' },
    { id: 'awards-recognition', name: 'Awards & Recognition', description: 'Trophies, awards, and recognition items' },
    { id: 'travel', name: 'Travel', description: 'Travel accessories and essentials' },
    { id: 'home-lifestyle', name: 'Home & Lifestyle', description: 'Home decor and lifestyle products' },
    { id: 'home-kitchen', name: 'Home & Kitchen', description: 'Kitchen appliances and home essentials' },
    { id: 'toys-games', name: 'Toys & Games', description: 'Entertainment and educational toys' },
    { id: 'sports-outdoors', name: 'Sports & Outdoors', description: 'Sports equipment and outdoor gear' },
    { id: 'beauty-personal-care', name: 'Beauty & Personal Care', description: 'Beauty and personal care products' },
    { id: 'books', name: 'Books', description: 'Educational and entertainment books' },
    { id: 'automotive', name: 'Automotive', description: 'Automotive accessories and parts' },
    { id: 'baby', name: 'Baby', description: 'Baby care and infant products' },
    { id: 'pet-supplies', name: 'Pet Supplies', description: 'Pet care and accessories' },
    { id: 'gaming', name: 'Gaming', description: 'Gaming accessories and equipment' },
    { id: 'furniture', name: 'Furniture', description: 'Home and office furniture' },
    { id: 'jewelry', name: 'Jewelry', description: 'Fashion jewelry and accessories' },
    { id: 'health-household', name: 'Health & Household', description: 'Health and household essentials' },
    { id: 'grocery-gourmet', name: 'Grocery & Gourmet Food', description: 'Premium food and beverage items' },
    { id: 'tools-home-improvement', name: 'Tools & Home Improvement', description: 'Tools and home improvement supplies' }
  ];

  const handleDownload = async (catalogId, format = 'pdf') => {
    setDownloading(catalogId);
    try {
      // Create download link
      const link = document.createElement('a');
      link.href = `/api/e-catalog?catalog=${catalogId}&format=${format}&images=true`;
      link.download = `${catalogId}-catalog.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setDownloading('');
    }
  };

  const handleDownloadAllProducts = async (format = 'csv') => {
    setDownloading('all-products');
    try {
      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create download link
      const link = document.createElement('a');
      link.href = `/api/product-catalog?format=${format}`;
      link.download = `complete-product-catalog.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setDownloading('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">E‑Catalog Downloads</h1>
          <p className="text-gray-600 text-lg">Download our complete product catalogs and details instantly</p>
        </div>

        {/* Complete Product Catalog Download */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Product Catalog</h2>
            <p className="text-gray-600 mb-6">Download our entire product database with all categories and details</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleDownloadAllProducts('csv')}
                disabled={downloading === 'all-products'}
                className={`px-6 py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 ${
                  downloading === 'all-products' 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-orange-500 hover:bg-orange-600'
                }`}
              >
                {downloading === 'all-products' ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Downloading...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download CSV
                  </>
                )}
              </button>
              <PDFDownloadButton
                catalogId="all-products"
                catalogName="Complete Product Catalog"
                className="px-6 py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600"
                showOptions={true}
              />
            </div>
          </div>
        </div>

        {/* Category Catalogs */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Category-Specific Catalogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogs.map((catalog) => (
              <div key={catalog.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{catalog.name}</h3>
                    <p className="text-sm text-gray-600">{catalog.description}</p>
                  </div>
                </div>
                <PDFDownloadButton
                  catalogId={catalog.id}
                  catalogName={catalog.name}
                  className="flex-1 px-3 py-2 text-sm font-medium rounded-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
          <p className="text-blue-700 mb-4">
            If you need assistance with any catalog or have specific requirements, please contact our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </a>
            <a 
              href="/products" 
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Browse Products Online
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
