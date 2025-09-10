"use client";

import React, { useState } from 'react';
import { getAllCategoriesWithSubcategories, getSubcategories } from '../data/category-icons';

const CategoryFilter = ({ 
  selectedCategory, 
  selectedSubcategory, 
  onCategoryChange, 
  onSubcategoryChange,
  products = [] 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const categoriesWithSubcategories = getAllCategoriesWithSubcategories();

  // Calculate product counts for each category and subcategory
  const getCategoryCount = (categoryName) => {
    return products.filter(product => product.category === categoryName).length;
  };

  const getSubcategoryCount = (categoryName, subcategoryName) => {
    return products.filter(product => 
      product.category === categoryName && product.subcategory === subcategoryName
    ).length;
  };

  const getSubcategoriesForCategory = (categoryName) => {
    return getSubcategories(categoryName);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Categories
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-2">
          {/* All Products Option */}
          <div
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200' 
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            onClick={() => onCategoryChange('all')}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">🛍️</span>
              <span className="font-medium">All Products</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {products.length}
            </span>
          </div>

          {/* Main Categories */}
          {categoriesWithSubcategories.map((category) => {
            const categoryCount = getCategoryCount(category.name);
            const isSelected = selectedCategory === category.name;
            const subcategories = getSubcategoriesForCategory(category.name);

            return (
              <div key={category.name} className="space-y-1">
                {/* Main Category */}
                <div
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => onCategoryChange(category.name)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {categoryCount}
                  </span>
                </div>

                {/* Subcategories */}
                {isSelected && subcategories.length > 0 && (
                  <div className="ml-6 space-y-1">
                    {subcategories.map((subcategory) => {
                      const subcategoryCount = getSubcategoryCount(category.name, subcategory);
                      const isSubSelected = selectedSubcategory === subcategory;

                      return (
                        <div
                          key={subcategory}
                          className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                            isSubSelected 
                              ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300' 
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSubcategoryChange(subcategory);
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">📱</span>
                            <span className="text-sm">{subcategory}</span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {subcategoryCount}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
