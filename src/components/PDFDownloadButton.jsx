"use client";

import React, { useState } from 'react';

const PDFDownloadButton = ({ 
  catalogId, 
  catalogName, 
  products = [], 
  className = "",
  showOptions = false 
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadOptions, setDownloadOptions] = useState({
    includeImages: true,
    layout: 'grid',
    showPrices: true,
    showRatings: true,
    showFeatures: true
  });
  const [showModal, setShowModal] = useState(false);

  const handleDownload = async (format = 'pdf', options = {}) => {
    setIsDownloading(true);
    try {
      let url;
      
      if (products.length > 0) {
        // Custom products download
        const response = await fetch('/api/pdf-catalog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            products,
            title: catalogName || 'Product Catalog',
            ...downloadOptions,
            ...options
          })
        });
        
        if (!response.ok) throw new Error('Download failed');
        
        const blob = await response.blob();
        url = URL.createObjectURL(blob);
      } else {
        // Catalog-based download
        const params = new URLSearchParams({
          catalog: catalogId,
          format,
          images: downloadOptions.includeImages.toString(),
          layout: downloadOptions.layout,
          ...options
        });
        
        url = `/api/e-catalog?${params}`;
      }
      
      // Create download link
      const link = document.createElement('a');
      link.href = url;
      link.download = `${catalogId || 'catalog'}-${format === 'pdf' ? 'catalog.pdf' : 'catalog.html'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      if (products.length > 0) {
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
      setShowModal(false);
    }
  };

  const handleOptionChange = (option, value) => {
    setDownloadOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  if (showOptions) {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className={`bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg flex items-center space-x-2 ${className}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download PDF</span>
        </button>

        {/* Options Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                PDF Download Options
              </h3>
              
              <div className="space-y-4">
                {/* Include Images */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Include Product Images
                  </label>
                  <input
                    type="checkbox"
                    checked={downloadOptions.includeImages}
                    onChange={(e) => handleOptionChange('includeImages', e.target.checked)}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                  />
                </div>

                {/* Layout */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Layout
                  </label>
                  <select
                    value={downloadOptions.layout}
                    onChange={(e) => handleOptionChange('layout', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="grid">Grid Layout</option>
                    <option value="list">List Layout</option>
                  </select>
                </div>

                {/* Show Prices */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Show Prices
                  </label>
                  <input
                    type="checkbox"
                    checked={downloadOptions.showPrices}
                    onChange={(e) => handleOptionChange('showPrices', e.target.checked)}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                  />
                </div>

                {/* Show Ratings */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Show Ratings
                  </label>
                  <input
                    type="checkbox"
                    checked={downloadOptions.showRatings}
                    onChange={(e) => handleOptionChange('showRatings', e.target.checked)}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                  />
                </div>

                {/* Show Features */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Show Features
                  </label>
                  <input
                    type="checkbox"
                    checked={downloadOptions.showFeatures}
                    onChange={(e) => handleOptionChange('showFeatures', e.target.checked)}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => handleDownload('pdf')}
                  disabled={isDownloading}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  {isDownloading ? 'Generating...' : 'Download PDF'}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => handleDownload('pdf')}
        disabled={isDownloading}
        className={`bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2 ${className}`}
      >
        {isDownloading ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>PDF</span>
          </>
        )}
      </button>
      
      <button
        onClick={() => handleDownload('html')}
        disabled={isDownloading}
        className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>HTML</span>
      </button>
    </div>
  );
};

export default PDFDownloadButton;
