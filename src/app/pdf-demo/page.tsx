"use client";

import { useState } from 'react';
import PDFDownloadButton from '@/components/PDFDownloadButton';
import products from '@/data/products';

export default function PDFDemoPage() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');

  // Filter products by category
  const filteredProducts = products.filter(product => 
    filterCategory === 'all' || product.category === filterCategory
  );

  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category))];

  const toggleProductSelection = (product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.some(p => p.id === product.id);
      if (isSelected) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const selectAllProducts = () => {
    setSelectedProducts(filteredProducts);
  };

  const clearSelection = () => {
    setSelectedProducts([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            PDF Download with Images Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Test the enhanced PDF generation with product images, placeholders, and customizable options.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Filter by Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Categories</option>
                  {categories.filter(c => c !== 'all').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Selection Controls */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Product Selection
                </label>
                <div className="space-y-2">
                  <button
                    onClick={selectAllProducts}
                    className="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium"
                  >
                    Select All ({filteredProducts.length})
                  </button>
                  <button
                    onClick={clearSelection}
                    className="w-full px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm font-medium"
                  >
                    Clear Selection
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {selectedProducts.length} products selected
                </p>
              </div>

              {/* Download Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Download Options
                </label>
                <PDFDownloadButton
                  catalogId="custom"
                  catalogName="Custom Product Selection"
                  products={selectedProducts}
                  className="w-full justify-center"
                  showOptions={true}
                />
              </div>

              {/* Quick Downloads */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quick Downloads
                </label>
                <div className="space-y-2">
                  <PDFDownloadButton
                    catalogId="electronics"
                    catalogName="Electronics Catalog"
                    className="w-full justify-center"
                  />
                  <PDFDownloadButton
                    catalogId="clothing"
                    catalogName="Clothing Catalog"
                    className="w-full justify-center"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Products ({filteredProducts.length})
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {selectedProducts.length} selected
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Try selecting a different category
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const isSelected = selectedProducts.some(p => p.id === product.id);
                  return (
                    <div
                      key={product.id}
                      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border-2 transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-amber-300'
                      }`}
                      onClick={() => toggleProductSelection(product)}
                    >
                      <div className="aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center relative">
                        {product.image && product.image.startsWith('http') ? (
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover rounded-t-lg"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className="w-full h-full flex flex-col items-center justify-center text-4xl text-gray-400">
                          {getCategoryIcon(product.category)}
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 px-2 py-1 rounded-full">
                            {product.category}
                          </span>
                          {product.subcategory && (
                            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                              {product.subcategory}
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              ₹{product.price}
                            </span>
                            {product.mrp && product.mrp > product.price && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{product.mrp}
                              </span>
                            )}
                          </div>
                          {product.rating && (
                            <div className="flex items-center space-x-1">
                              <span className="text-yellow-400">★</span>
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                {product.rating}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getCategoryIcon(category: string): string {
  const iconMap: { [key: string]: string } = {
    'Electronics': '📱',
    'Clothing': '👕',
    'Footwear': '👟',
    'Home Decor': '🏠',
    'Beauty': '💄',
  };
  return iconMap[category] || '📦';
}
