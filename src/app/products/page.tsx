"use client";

import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { formatCurrencyINR } from "@/lib/utils";
import CategoryFilter from "@/components/CategoryFilter";
import { productAPI, Product } from "@/lib/api";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  
  // Enhanced filter states
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [minRating, setMinRating] = useState('');
  const [availability, setAvailability] = useState('');
  const [brand, setBrand] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [warrantyFilter, setWarrantyFilter] = useState('');
  const [discountFilter, setDiscountFilter] = useState('');

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await productAPI.fetchAllProducts({
          page: 1,
          limit: 1000, // Get all products for filtering
          category: selectedCategory !== "all" ? selectedCategory : undefined,
          subcategory: selectedSubcategory || undefined,
          search: searchQuery || undefined,
          minPrice: priceRange.min ? parseFloat(priceRange.min) : undefined,
          maxPrice: priceRange.max ? parseFloat(priceRange.max) : undefined,
          minRating: minRating ? parseFloat(minRating) : undefined,
          inStock: availability === 'in-stock' ? true : availability === 'out-of-stock' ? false : undefined,
          sortBy: sortBy,
          sortOrder: sortOrder as 'asc' | 'desc'
        });
        setAllProducts(response.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedSubcategory, searchQuery, priceRange, minRating, availability, sortBy, sortOrder]);

  // Get unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(allProducts.map(p => p.category))];
    const base = [{ id: "all", name: "All Products", icon: "🛍️", count: 0 }];
    const iconMap: Record<string, string> = {
      "Electronics": "📱",
      "Clothing": "👕",
      "Footwear": "👟",
      "Home Decor": "🏠",
      "Beauty": "💄",
    };
    const rest = uniqueCategories.map((c) => ({
      id: c,
      name: c,
      icon: iconMap[c] || "🧩",
      count: 0,
    }));
    return [...base, ...rest];
  }, [allProducts]);

  // Get unique brands from products
  const getUniqueBrands = () => {
    const brands = new Set();
    allProducts.forEach(product => {
      const productBrand = product.name.split(' ')[0]; // Extract first word as brand
      if (productBrand && productBrand.length > 1) {
        brands.add(productBrand);
      }
    });
    return Array.from(brands).sort();
  };

  // Calculate product counts for each category
  const categoriesWithCounts = categories.map(category => {
    if (category.id === "all") {
      return { ...category, count: allProducts.length };
    }
    const count = allProducts.filter(product => product.category === category.id).length;
    return { ...category, count };
  });

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by search term
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
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
      filtered = filtered.filter(product => product.rating >= parseFloat(minRating));
    }

    // Filter by availability
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

    return filtered;
  }, [allProducts, searchQuery, selectedCategory, selectedSubcategory, priceRange, minRating, availability, brand, sortBy, sortOrder, warrantyFilter, discountFilter]);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [selectedCategory, selectedSubcategory, searchQuery, priceRange, minRating, availability, brand, sortBy, sortOrder, warrantyFilter, discountFilter]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(""); // Reset subcategory when category changes
  };

  // Handle subcategory change
  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
  };

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-primary' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* Page Header */}
      <section className="bg-muted dark:bg-black py-16">
        <div className="golden-tag-container dark:bg-black">
          <div className="flex justify-center mb-8">
            <div className="text-4xl font-bold text-amber-600">
              STORE
            </div>
          </div>
          <h1 className="golden-tag-heading text-black dark:text-white">Gifts Collection</h1>
          <p className="text-center text-muted-foreground dark:text-gray-300 text-lg max-w-2xl mx-auto mb-6">
            Premium gifts and giveaways that make lasting impressions. Perfect for business relationships, employee recognition, and client appreciation.
          </p>
          <div className="flex justify-center">
            <span className="bg-amber-600 text-white px-6 py-2 rounded-full text-sm font-bold">
              Premium Quality Since 2015
            </span>
          </div>
        </div>
      </section>

      {/* Enhanced Filters and Search */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-black dark:to-black py-12 border-b border-amber-200 dark:border-gray-800">
        <div className="golden-tag-container dark:bg-black">
          {/* Search Bar */}
          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-4 border-2 border-amber-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg font-semibold shadow-lg bg-white dark:bg-gray-900 text-black dark:text-white"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-amber-800 dark:text-amber-400 mb-2">Browse by Category</h3>
            <p className="text-amber-700 dark:text-amber-200">Select a category to explore our premium products</p>
          </div>
          
          {/* Hierarchical Category Filter */}
          <div className="max-w-4xl mx-auto">
            <CategoryFilter
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
              onCategoryChange={handleCategoryChange}
              onSubcategoryChange={handleSubcategoryChange}
              products={allProducts}
            />
          </div>

          {/* Advanced Filters Toggle */}
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
            >
              {showAdvancedFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
            </button>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="mt-8 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-amber-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-amber-800 dark:text-amber-400 mb-6 text-center">Advanced Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Brand</label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price Range (₹)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Minimum Rating</label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Availability</label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="">All Products</option>
                    <option value="in-stock">In Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>

                {/* Warranty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Warranty</label>
                  <select
                    value={warrantyFilter}
                    onChange={(e) => setWarrantyFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discount</label>
                  <select
                    value={discountFilter}
                    onChange={(e) => setDiscountFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="">Any Discount</option>
                    <option value="no-discount">No Discount</option>
                    <option value="any-discount">Any Discount</option>
                    <option value="high-discount">20%+ Discount</option>
                  </select>
                </div>

                {/* Sort Options */}
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
                  <div className="flex gap-4">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="name">Name</option>
                      <option value="price">Price</option>
                      <option value="rating">Rating</option>
                      <option value="newest">Newest</option>
                    </select>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                    <button
                      onClick={() => {
                        setPriceRange({ min: '', max: '' });
                        setMinRating('');
                        setAvailability('');
                        setBrand('');
                        setSortBy('name');
                        setSortOrder('asc');
                        setWarrantyFilter('');
                        setDiscountFilter('');
                      }}
                      className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Summary */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 px-6 py-3 rounded-full shadow-lg border border-amber-200 dark:border-gray-700">
              <span className="text-amber-600 dark:text-amber-200 font-semibold">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </span>
              {selectedCategory !== "all" && (
                <span className="text-gray-500 dark:text-gray-300">
                  in {categoriesWithCounts.find(c => c.id === selectedCategory)?.name}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 py-16">
        <div className="golden-tag-container dark:bg-black">
          {isLoading ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-amber-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Loading products…</h3>
              <p className="text-gray-600">Fetching from FakeStore API</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-red-600 mb-2">{error}</h3>
              <p className="text-gray-600">Please refresh the page.</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <button 
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200"
              >
                View All Products
              </button>
            </div>
          ) : (
            <>
              {/* Category Header */}
              {selectedCategory !== "all" && (
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full shadow-lg border border-amber-200">
                    <span className="text-3xl">
                      {categoriesWithCounts.find(c => c.id === selectedCategory)?.icon}
                    </span>
                    <div>
                      <h2 className="text-2xl font-bold text-amber-800">
                        {categoriesWithCounts.find(c => c.id === selectedCategory)?.name}
                      </h2>
                      <p className="text-amber-600 text-sm">
                        {filteredProducts.length} premium products available
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {visibleProducts.map((product) => (
                <a
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="block bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:border-amber-200 dark:hover:border-amber-400 hover:-translate-y-2"
                  style={{ textDecoration: 'none' }}
                >
                  {/* Product Image */}
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black flex items-center justify-center relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center shadow-lg hidden">
                      <span className="text-amber-600 text-sm font-semibold">Product Image</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                      GT
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-amber-800 text-xs px-2 py-1 rounded-full border border-amber-200 font-medium">
                        {categoriesWithCounts.find(c => c.id === product.category)?.icon} {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full border border-amber-200 font-medium">
                        {categoriesWithCounts.find(c => c.id === product.category)?.name}
                      </span>
                      <span className="text-amber-600 text-xs font-bold bg-amber-50 px-2 py-1 rounded">STORE</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex mr-2">
                        {renderStars(product.rating || 0)}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">({product.ratingCount || 0} reviews)</span>
                    </div>
                    {/* Price and Stock */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{formatCurrencyINR(product.price)}</span>
                      <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                        product.inStock 
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 border border-green-200 dark:border-green-700' 
                          : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 border border-red-200 dark:border-red-700'
                      }`}>
                        {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                      </span>
                    </div>
                    {/* Add to Cart Button (optional, can remove from grid) */}
                  </div>
                </a>
              ))}
              </div>

              {visibleProducts.length < filteredProducts.length && (
                <div className="mt-10 flex justify-center">
                  <button
                    onClick={() => setVisibleCount((c) => c + 12)}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors"
                  >
                    See more products
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Recommended Products Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="golden-tag-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-white mb-4 flex items-center justify-center gap-2">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recommended Products
            </h2>
            <p className="text-muted-foreground dark:text-gray-300">Discover our handpicked selection of premium products</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts.slice(0, 8).map((product) => (
              <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  <img 
                    src={product.image || '/placeholder.png'} 
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground dark:text-white mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 capitalize">{product.category}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <svg key={idx} className="w-4 h-4" fill={idx < Math.floor(product.rating || 0) ? '#f59e0b' : '#d1d5db'} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">({(product.rating || 0).toFixed(1)})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-green-700 dark:text-green-400 font-bold text-lg">{formatCurrencyINR(product.price)}</p>
                    <button
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image || '/placeholder.png',
                        quantity: 1
                      })}
                      className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="/products" 
              className="golden-tag-button bg-green-600 hover:bg-green-700 text-white inline-block"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>

      {/* Corporate Gifts Brand Section */}
      <section className="bg-amber-50 dark:bg-black border-t border-amber-200 dark:border-gray-800 py-16">
        <div className="golden-tag-container dark:bg-black">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="text-4xl font-bold text-amber-600">
                STORE
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground dark:text-white mb-4">Why Choose Us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🏆</span>
                </div>
                <h4 className="font-semibold text-foreground dark:text-white mb-2">Premium Quality</h4>
                <p className="text-muted-foreground dark:text-gray-300 text-sm">Handpicked products that meet the highest standards</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🎁</span>
                </div>
                <h4 className="font-semibold text-foreground dark:text-white mb-2">Custom Branding</h4>
                <p className="text-muted-foreground dark:text-gray-300 text-sm">Professional branding services for your corporate identity</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🌟</span>
                </div>
                <h4 className="font-semibold text-foreground dark:text-white mb-2">Trusted Since 2015</h4>
                <p className="text-muted-foreground dark:text-gray-300 text-sm">Serving leading multinational companies in Bahrain</p>
              </div>
            </div>
            <div className="mt-8">
              <a 
                href="tel:+97336630814" 
                className="golden-tag-button bg-amber-600 hover:bg-amber-700 text-white inline-block"
              >
                Call Us: +973 3663 0814
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
