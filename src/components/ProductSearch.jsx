"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCategoryIcon, getAllCategoriesWithSubcategories } from '../data/category-icons';
import products from '../data/products';

const ProductSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);
  
  // New filter states
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [minRating, setMinRating] = useState('');
  const [availability, setAvailability] = useState('');
  const [brand, setBrand] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [warrantyFilter, setWarrantyFilter] = useState('');
  const [discountFilter, setDiscountFilter] = useState('');

  const categoriesWithSubcategories = getAllCategoriesWithSubcategories();

  // Initialize filters from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    setSearchTerm(params.get('search') || '');
    setSelectedCategory(params.get('category') || '');
    setSelectedSubcategory(params.get('subcategory') || '');
    setPriceRange({
      min: params.get('minPrice') || '',
      max: params.get('maxPrice') || ''
    });
    setMinRating(params.get('rating') || '');
    setAvailability(params.get('availability') || '');
    setBrand(params.get('brand') || '');
    setSortBy(params.get('sortBy') || 'name');
    setSortOrder(params.get('sortOrder') || 'asc');
    setWarrantyFilter(params.get('warranty') || '');
    setDiscountFilter(params.get('discount') || '');
  }, [searchParams]);

  // Update URL when filters change
  const updateURL = (newFilters) => {
    const params = new URLSearchParams();
    
    if (newFilters.searchTerm) params.set('search', newFilters.searchTerm);
    if (newFilters.selectedCategory) params.set('category', newFilters.selectedCategory);
    if (newFilters.selectedSubcategory) params.set('subcategory', newFilters.selectedSubcategory);
    if (newFilters.priceRange.min) params.set('minPrice', newFilters.priceRange.min);
    if (newFilters.priceRange.max) params.set('maxPrice', newFilters.priceRange.max);
    if (newFilters.minRating) params.set('rating', newFilters.minRating);
    if (newFilters.availability) params.set('availability', newFilters.availability);
    if (newFilters.brand) params.set('brand', newFilters.brand);
    if (newFilters.sortBy !== 'name') params.set('sortBy', newFilters.sortBy);
    if (newFilters.sortOrder !== 'asc') params.set('sortOrder', newFilters.sortOrder);
    if (newFilters.warrantyFilter) params.set('warranty', newFilters.warrantyFilter);
    if (newFilters.discountFilter) params.set('discount', newFilters.discountFilter);

    const newURL = params.toString() ? `?${params.toString()}` : window.location.pathname;
    router.replace(newURL, { scroll: false });
  };

  // Get unique brands from products
  const getUniqueBrands = () => {
    const brands = new Set();
    products.forEach(product => {
      const productBrand = product.name.split(' ')[0]; // Extract first word as brand
      if (productBrand && productBrand.length > 1) {
        brands.add(productBrand);
      }
    });
    return Array.from(brands).sort();
  };

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by subcategory
    if (selectedSubcategory) {
      filtered = filtered.filter(product => product.subcategory === selectedSubcategory);
    }

    // Filter by price range
    if (priceRange.min !== '') {
      filtered = filtered.filter(product => product.price >= parseFloat(priceRange.min));
    }
    if (priceRange.max !== '') {
      filtered = filtered.filter(product => product.price <= parseFloat(priceRange.max));
    }

    // Filter by minimum rating
    if (minRating) {
      filtered = filtered.filter(product => (product.rating || 0) >= parseFloat(minRating));
    }

    // Filter by availability (assuming all products are in stock for now)
    if (availability === 'in-stock') {
      filtered = filtered.filter(product => product.inStock !== false);
    } else if (availability === 'out-of-stock') {
      filtered = filtered.filter(product => product.inStock === false);
    }

    // Filter by brand
    if (brand) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().startsWith(brand.toLowerCase())
      );
    }

    // Filter by warranty
    if (warrantyFilter) {
      filtered = filtered.filter(product => {
        const warranty = product.warrantyMonths || 0;
        switch (warrantyFilter) {
          case 'no-warranty':
            return warranty === 0;
          case '1-year':
            return warranty === 12;
          case '2-years':
            return warranty >= 24;
          case '3-years':
            return warranty >= 36;
          default:
            return true;
        }
      });
    }

    // Filter by discount
    if (discountFilter) {
      filtered = filtered.filter(product => {
        if (discountFilter === 'no-discount') {
          return !product.mrp || product.mrp <= product.price;
        } else if (discountFilter === 'any-discount') {
          return product.mrp && product.mrp > product.price;
        } else if (discountFilter === 'high-discount') {
          return product.mrp && product.mrp > product.price && 
                 ((product.mrp - product.price) / product.mrp) >= 0.2; // 20% or more discount
        }
        return true;
      });
    }

    // Sort products
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating || 0;
          bValue = b.rating || 0;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'newest':
          aValue = a.id; // Assuming higher ID means newer
          bValue = b.id;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedSubcategory, priceRange, minRating, availability, brand, sortBy, sortOrder, warrantyFilter, discountFilter]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(''); // Reset subcategory when category changes
    updateURL({
      searchTerm,
      selectedCategory: category,
      selectedSubcategory: '',
      priceRange,
      minRating,
      availability,
      brand,
      sortBy,
      sortOrder,
      warrantyFilter,
      discountFilter
    });
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
    updateURL({
      searchTerm,
      selectedCategory,
      selectedSubcategory: subcategory,
      priceRange,
      minRating,
      availability,
      brand,
      sortBy,
      sortOrder,
      warrantyFilter,
      discountFilter
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedSubcategory('');
    setPriceRange({ min: '', max: '' });
    setMinRating('');
    setAvailability('');
    setBrand('');
    setSortBy('name');
    setSortOrder('asc');
    setWarrantyFilter('');
    setDiscountFilter('');
    router.replace(window.location.pathname, { scroll: false });
  };

  const getSubcategoriesForCategory = (categoryName) => {
    const category = categoriesWithSubcategories.find(cat => cat.name === categoryName);
    return category ? category.subcategories : [];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Search</h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              updateURL({
                searchTerm: e.target.value,
                selectedCategory,
                selectedSubcategory,
                priceRange,
                minRating,
                availability,
                brand,
                sortBy,
                sortOrder,
                warrantyFilter,
                discountFilter
              });
            }}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="mb-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Filters */}
        {showFilters && (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">All Categories</option>
                  {categoriesWithSubcategories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
                <select
                  value={selectedSubcategory}
                  onChange={(e) => handleSubcategoryChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={!selectedCategory}
                >
                  <option value="">All Subcategories</option>
                  {getSubcategoriesForCategory(selectedCategory).map((subcategory) => (
                    <option key={subcategory.name} value={subcategory.name}>
                      {subcategory.icon} {subcategory.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <select
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    updateURL({
                      searchTerm,
                      selectedCategory,
                      selectedSubcategory,
                      priceRange,
                      minRating,
                      availability,
                      brand: e.target.value,
                      sortBy,
                      sortOrder,
                      warrantyFilter,
                      discountFilter
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">All Brands</option>
                  {getUniqueBrands().map((brandName) => (
                    <option key={brandName} value={brandName}>
                      {brandName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (₹)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => {
                      const newPriceRange = { ...priceRange, min: e.target.value };
                      setPriceRange(newPriceRange);
                      updateURL({
                        searchTerm,
                        selectedCategory,
                        selectedSubcategory,
                        priceRange: newPriceRange,
                        minRating,
                        availability,
                        brand,
                        sortBy,
                        sortOrder,
                        warrantyFilter,
                        discountFilter
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => {
                      const newPriceRange = { ...priceRange, max: e.target.value };
                      setPriceRange(newPriceRange);
                      updateURL({
                        searchTerm,
                        selectedCategory,
                        selectedSubcategory,
                        priceRange: newPriceRange,
                        minRating,
                        availability,
                        brand,
                        sortBy,
                        sortOrder,
                        warrantyFilter,
                        discountFilter
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                <select
                  value={minRating}
                  onChange={(e) => {
                    setMinRating(e.target.value);
                    updateURL({
                      searchTerm,
                      selectedCategory,
                      selectedSubcategory,
                      priceRange,
                      minRating: e.target.value,
                      availability,
                      brand,
                      sortBy,
                      sortOrder,
                      warrantyFilter,
                      discountFilter
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                  <option value="3">3+ Stars</option>
                </select>
              </div>

              {/* Availability Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <select
                  value={availability}
                  onChange={(e) => {
                    setAvailability(e.target.value);
                    updateURL({
                      searchTerm,
                      selectedCategory,
                      selectedSubcategory,
                      priceRange,
                      minRating,
                      availability: e.target.value,
                      brand,
                      sortBy,
                      sortOrder,
                      warrantyFilter,
                      discountFilter
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">All Products</option>
                  <option value="in-stock">In Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>

              {/* Warranty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Warranty</label>
                <select
                  value={warrantyFilter}
                  onChange={(e) => {
                    setWarrantyFilter(e.target.value);
                    updateURL({
                      searchTerm,
                      selectedCategory,
                      selectedSubcategory,
                      priceRange,
                      minRating,
                      availability,
                      brand,
                      sortBy,
                      sortOrder,
                      warrantyFilter: e.target.value,
                      discountFilter
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Any Warranty</option>
                  <option value="no-warranty">No Warranty</option>
                  <option value="1-year">1 Year</option>
                  <option value="2-years">2+ Years</option>
                  <option value="3-years">3+ Years</option>
                </select>
              </div>

              {/* Discount Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount</label>
                <select
                  value={discountFilter}
                  onChange={(e) => {
                    setDiscountFilter(e.target.value);
                    updateURL({
                      searchTerm,
                      selectedCategory,
                      selectedSubcategory,
                      priceRange,
                      minRating,
                      availability,
                      brand,
                      sortBy,
                      sortOrder,
                      warrantyFilter,
                      discountFilter: e.target.value
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Any Discount</option>
                  <option value="no-discount">No Discount</option>
                  <option value="any-discount">Any Discount</option>
                  <option value="high-discount">20%+ Discount</option>
                </select>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      updateURL({
                        searchTerm,
                        selectedCategory,
                        selectedSubcategory,
                        priceRange,
                        minRating,
                        availability,
                        brand,
                        sortBy: e.target.value,
                        sortOrder,
                        warrantyFilter,
                        discountFilter
                      });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                    <option value="newest">Newest</option>
                  </select>
                  <select
                    value={sortOrder}
                    onChange={(e) => {
                      setSortOrder(e.target.value);
                      updateURL({
                        searchTerm,
                        selectedCategory,
                        selectedSubcategory,
                        priceRange,
                        minRating,
                        availability,
                        brand,
                        sortBy,
                        sortOrder: e.target.value,
                        warrantyFilter,
                        discountFilter
                      });
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Clear all filters
              </button>
              <div className="text-sm text-gray-600">
                {filteredProducts.length} products found
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          <div className="flex flex-wrap items-center gap-2">
            <span>Found {filteredProducts.length} products</span>
            {selectedCategory && (
              <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                {selectedCategory}
              </span>
            )}
            {selectedSubcategory && (
              <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                {selectedSubcategory}
              </span>
            )}
            {brand && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                Brand: {brand}
              </span>
            )}
            {(priceRange.min || priceRange.max) && (
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                ₹{priceRange.min || '0'} - ₹{priceRange.max || '∞'}
              </span>
            )}
            {minRating && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                {minRating}+ Stars
              </span>
            )}
            {availability && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                {availability === 'in-stock' ? 'In Stock' : 'Out of Stock'}
              </span>
            )}
            {warrantyFilter && (
              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                {warrantyFilter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            )}
            {discountFilter && (
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                {discountFilter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = '/placeholder.png';
                }}
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{getCategoryIcon(product.category, product.subcategory)}</span>
                <span className="text-xs text-gray-500">{product.subcategory}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-orange-600">₹{product.price}</span>
                  {product.mrp && (
                    <span className="text-sm text-gray-500 line-through">₹{product.mrp}</span>
                  )}
                </div>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition text-sm">
                  Add to Cart
                </button>
              </div>
              {product.rating && (
                <div className="mt-2 flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.ratingCount})</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
