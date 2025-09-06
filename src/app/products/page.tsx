"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  const categories = [
    { id: "all", name: "All Products", icon: "🛍️", count: 0 },
    { id: "bags", name: "Bags & Wallets", icon: "👜", count: 0 },
    { id: "drinkware", name: "Drinkware", icon: "🥤", count: 0 },
    { id: "electronics", name: "Electronics", icon: "📱", count: 0 },
    { id: "accessories", name: "Office Accessories", icon: "✏️", count: 0 },
    { id: "apparel", name: "Apparel & Fashion", icon: "👔", count: 0 },
    { id: "home", name: "Home & Living", icon: "🏠", count: 0 },
    { id: "tech", name: "Tech Gadgets", icon: "💻", count: 0 },
    { id: "wellness", name: "Wellness & Health", icon: "🧘", count: 0 },
    { id: "travel", name: "Travel & Outdoor", icon: "✈️", count: 0 },
    { id: "food", name: "Food & Beverage", icon: "🍫", count: 0 },
    { id: "sports", name: "Sports & Fitness", icon: "⚽", count: 0 }
  ];

  const products = [
    // Bags & Wallets
    {
      id: 1,
      name: "Premium Leather Portfolio",
      price: 89.99,
      category: "bags",
      image: "/placeholder.png",
      rating: 4.8,
      reviews: 156,
      inStock: true,
      description: "Elegant leather portfolio perfect for corporate presentations"
    },
    {
      id: 2,
      name: "Laptop Sleeve",
      price: 39.99,
      category: "bags",
      image: "/images/Laptop Sleeve.jpg",
      rating: 4.4,
      reviews: 123,
      inStock: true,
      description: "Protective laptop sleeve with corporate branding"
    },
    {
      id: 3,
      name: "Executive Briefcase",
      price: 129.99,
      category: "bags",
      image: "/placeholder.png",
      rating: 4.9,
      reviews: 89,
      inStock: true,
      description: "Professional leather briefcase with multiple compartments"
    },
    {
      id: 4,
      name: "Premium Wallet Set",
      price: 49.99,
      category: "bags",
      image: "/placeholder.png",
      rating: 4.6,
      reviews: 67,
      inStock: true,
      description: "Genuine leather wallet with card slots and coin pocket"
    },

    // Drinkware
    {
      id: 5,
      name: "Stainless Steel Water Bottle",
      price: 34.99,
      category: "drinkware",
      image: "/placeholder.png",
      rating: 4.6,
      reviews: 89,
      inStock: true,
      description: "Premium insulated water bottle with custom branding"
    },
    {
      id: 6,
      name: "Ceramic Coffee Mug",
      price: 19.99,
      category: "drinkware",
      image: "/placeholder.png",
      rating: 4.6,
      reviews: 89,
      inStock: true,
      description: "Premium ceramic mug with custom design"
    },
    {
      id: 7,
      name: "Glass Water Bottle",
      price: 24.99,
      category: "drinkware",
      image: "/placeholder.png",
      rating: 4.5,
      reviews: 45,
      inStock: true,
      description: "Borosilicate glass bottle with silicone sleeve"
    },
    {
      id: 8,
      name: "Travel Coffee Tumbler",
      price: 29.99,
      category: "drinkware",
      image: "/placeholder.png",
      rating: 4.7,
      reviews: 78,
      inStock: true,
      description: "Insulated travel tumbler with leak-proof lid"
    },

    // Electronics
    {
      id: 9,
      name: "Wireless Power Bank",
      price: 59.99,
      category: "electronics",
      image: "/images/Wireless Power Bank.jpg",
      rating: 4.7,
      reviews: 234,
      inStock: true,
      description: "High-capacity wireless charging power bank"
    },
    {
      id: 10,
      name: "Bluetooth Speaker",
      price: 79.99,
      category: "electronics",
      image: "/placeholder.png",
      rating: 4.5,
      reviews: 156,
      inStock: true,
      description: "Portable Bluetooth speaker with premium sound quality"
    },
    {
      id: 11,
      name: "USB-C Hub",
      price: 45.99,
      category: "electronics",
      image: "/placeholder.png",
      rating: 4.4,
      reviews: 98,
      inStock: true,
      description: "Multi-port USB-C hub for laptops and tablets"
    },

    // Office Accessories
    {
      id: 12,
      name: "Executive Pen Set",
      price: 24.99,
      category: "accessories",
      image: "/placeholder.png",
      rating: 4.5,
      reviews: 67,
      inStock: true,
      description: "Professional pen set in elegant gift box"
    },
    {
      id: 13,
      name: "Desk Organizer",
      price: 34.99,
      category: "accessories",
      image: "/placeholder.png",
      rating: 4.3,
      reviews: 45,
      inStock: true,
      description: "Wooden desk organizer with multiple compartments"
    },
    {
      id: 14,
      name: "Notebook Set",
      price: 19.99,
      category: "accessories",
      image: "/placeholder.png",
      rating: 4.6,
      reviews: 89,
      inStock: true,
      description: "Premium leather-bound notebook set"
    },
    {
      id: 15,
      name: "Business Card Holder",
      price: 15.99,
      category: "accessories",
      image: "/placeholder.png",
      rating: 4.4,
      reviews: 34,
      inStock: true,
      description: "Elegant metal business card holder"
    },

    // Apparel & Fashion
    {
      id: 16,
      name: "Corporate Polo Shirt",
      price: 39.99,
      category: "apparel",
      image: "/placeholder.png",
      rating: 4.5,
      reviews: 123,
      inStock: true,
      description: "Premium cotton polo shirt with embroidered logo"
    },
    {
      id: 17,
      name: "Executive Tie",
      price: 29.99,
      category: "apparel",
      image: "/placeholder.png",
      rating: 4.6,
      reviews: 67,
      inStock: true,
      description: "Silk tie with subtle pattern and custom branding"
    },
    {
      id: 18,
      name: "Corporate Cap",
      price: 19.99,
      category: "apparel",
      image: "/placeholder.png",
      rating: 4.3,
      reviews: 45,
      inStock: true,
      description: "Adjustable cap with embroidered company logo"
    },

    // Home & Living
    {
      id: 19,
      name: "Aromatherapy Diffuser",
      price: 49.99,
      category: "home",
      image: "/placeholder.png",
      rating: 4.7,
      reviews: 89,
      inStock: true,
      description: "Ultrasonic aromatherapy diffuser with LED lights"
    },
    {
      id: 20,
      name: "Indoor Plant Set",
      price: 34.99,
      category: "home",
      image: "/placeholder.png",
      rating: 4.5,
      reviews: 56,
      inStock: true,
      description: "Set of 3 small indoor plants in decorative pots"
    },
    {
      id: 21,
      name: "Candles Gift Set",
      price: 29.99,
      category: "home",
      image: "/placeholder.png",
      rating: 4.6,
      reviews: 78,
      inStock: true,
      description: "Set of 3 scented candles in elegant packaging"
    },

    // Tech Gadgets
    {
      id: 22,
      name: "Smart Watch",
      price: 199.99,
      category: "tech",
      image: "/placeholder.png",
      rating: 4.8,
      reviews: 234,
      inStock: true,
      description: "Fitness tracking smartwatch with custom watch face"
    },
    {
      id: 23,
      name: "Wireless Earbuds",
      price: 89.99,
      category: "tech",
      image: "/placeholder.png",
      rating: 4.6,
      reviews: 156,
      inStock: true,
      description: "True wireless earbuds with noise cancellation"
    },
    {
      id: 24,
      name: "Phone Stand",
      price: 24.99,
      category: "tech",
      image: "/placeholder.png",
      rating: 4.4,
      reviews: 67,
      inStock: true,
      description: "Adjustable phone stand with wireless charging"
    },

    // Wellness & Health
    {
      id: 25,
      name: "Yoga Mat",
      price: 39.99,
      category: "wellness",
      image: "/placeholder.png",
      rating: 4.7,
      reviews: 89,
      inStock: true,
      description: "Premium non-slip yoga mat with carrying strap"
    },
    {
      id: 26,
      name: "Essential Oils Set",
      price: 44.99,
      category: "wellness",
      image: "/placeholder.png",
      rating: 4.5,
      reviews: 56,
      inStock: true,
      description: "Set of 6 essential oils for aromatherapy"
    },
    {
      id: 27,
      name: "Massage Ball Set",
      price: 19.99,
      category: "wellness",
      image: "/placeholder.png",
      rating: 4.4,
      reviews: 34,
      inStock: true,
      description: "Set of 3 massage balls for muscle relief"
    },

    // Travel & Outdoor
    {
      id: 28,
      name: "Travel Pillow",
      price: 24.99,
      category: "travel",
      image: "/placeholder.png",
      rating: 4.6,
      reviews: 78,
      inStock: true,
      description: "Memory foam travel pillow with carrying case"
    },
    {
      id: 29,
      name: "Packable Backpack",
      price: 49.99,
      category: "travel",
      image: "/placeholder.png",
      rating: 4.5,
      reviews: 67,
      inStock: true,
      description: "Lightweight packable backpack for travel"
    },
    {
      id: 30,
      name: "Travel Adapter",
      price: 19.99,
      category: "travel",
      image: "/placeholder.png",
      rating: 4.3,
      reviews: 45,
      inStock: true,
      description: "Universal travel adapter with USB ports"
    },

    // Food & Beverage
    {
      id: 31,
      name: "Gourmet Chocolate Box",
      price: 34.99,
      category: "food",
      image: "/placeholder.png",
      rating: 4.8,
      reviews: 123,
      inStock: true,
      description: "Premium chocolate assortment in elegant packaging"
    },
    {
      id: 32,
      name: "Tea Gift Set",
      price: 29.99,
      category: "food",
      image: "/placeholder.png",
      rating: 4.6,
      reviews: 89,
      inStock: true,
      description: "Assorted tea collection with infuser and cups"
    },
    {
      id: 33,
      name: "Coffee Gift Basket",
      price: 44.99,
      category: "food",
      image: "/placeholder.png",
      rating: 4.7,
      reviews: 67,
      inStock: true,
      description: "Premium coffee beans with accessories"
    },

    // Sports & Fitness
    {
      id: 34,
      name: "Resistance Bands Set",
      price: 24.99,
      category: "sports",
      image: "/placeholder.png",
      rating: 4.5,
      reviews: 78,
      inStock: true,
      description: "Set of 5 resistance bands with door anchor"
    },
    {
      id: 35,
      name: "Water Bottle with Timer",
      price: 19.99,
      category: "sports",
      image: "/placeholder.png",
      rating: 4.4,
      reviews: 56,
      inStock: true,
      description: "Hydration tracking water bottle"
    },
    {
      id: 36,
      name: "Fitness Tracker",
      price: 79.99,
      category: "sports",
      image: "/placeholder.png",
      rating: 4.6,
      reviews: 134,
      inStock: true,
      description: "Activity tracker with heart rate monitoring"
    }
  ];

  // Calculate product counts for each category
  const categoriesWithCounts = categories.map(category => {
    if (category.id === "all") {
      return { ...category, count: products.length };
    }
    const count = products.filter(product => product.category === category.id).length;
    return { ...category, count };
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {categoriesWithCounts.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white border-amber-500 shadow-xl'
                    : 'bg-white dark:bg-gray-900 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-gray-700 hover:border-amber-400 hover:shadow-lg'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <div className="font-semibold text-sm mb-1 leading-tight">
                    {category.name}
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-amber-100 dark:bg-gray-800 text-amber-700 dark:text-amber-200'
                  }`}>
                    {category.count} items
                  </div>
                </div>
                {/* Active indicator */}
                {selectedCategory === category.id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>

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
          {filteredProducts.length === 0 ? (
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
              {filteredProducts.map((product) => (
                <a
                  key={product.id}
                  href={`/products/productpage?id=${product.id}`}
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
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">({product.reviews} reviews)</span>
                    </div>
                    {/* Price and Stock */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">${product.price}</span>
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
            </>
          )}
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
