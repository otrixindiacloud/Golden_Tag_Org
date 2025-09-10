"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../contexts/CartContext.js';
import { useNotifications } from '../contexts/NotificationContext.js';
import { formatCurrencyINR } from '@/lib/utils';

interface Product {
  id: number;
  name: string;
  price: number;
  mrp?: number;
  description: string;
  image: string;
  rating?: number;
  ratingCount?: number;
  features?: string[];
  specs?: Record<string, any>;
  warrantyMonths?: number;
  guaranteeMonths?: number;
  stock?: number;
  category?: string;
  subcategory?: string;
  offers?: string[];
}

interface UnifiedProductFrameworkProps {
  product: Product;
  relatedProducts?: Product[];
  onProductChange?: (productId: number) => void;
}

export default function UnifiedProductFramework({ 
  product, 
  relatedProducts = [], 
  onProductChange 
}: UnifiedProductFrameworkProps) {
  const router = useRouter();
  const { addToCart, removeFromCart, cartItems, updateQuantity } = useCart();
  const { addNotification } = useNotifications();

  // State management
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'gallery' | '360'>('gallery');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<{[key: string]: string}>({});
  const [quantity, setQuantity] = useState(0);
  const [userRating, setUserRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [savingFeedback, setSavingFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Refs
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const galleryScrollRef = useRef<HTMLDivElement | null>(null);

  // Update quantity when cartItem changes
  useEffect(() => {
    const cartItem = cartItems?.find((item: any) => String(item.id) === String(product?.id));
    setQuantity(cartItem ? cartItem.quantity : 0);
  }, [cartItems, product?.id]);

  // Initialize user rating and comment from localStorage
  useEffect(() => {
    if (product?.id) {
      const storageKey = `gt_product_feedback_${product.id}`;
      const saved = typeof window !== 'undefined' ? window.localStorage.getItem(storageKey) : null;
      const initialFeedback = saved ? JSON.parse(saved) : { rating: 0, comment: '' };
      setUserRating(initialFeedback.rating || 0);
      setComment(initialFeedback.comment || '');
    }
  }, [product?.id]);

  // Gallery images
  const galleryImages: string[] = useMemo(() => {
    if (!product?.image) return [];
    const baseImage = product.image;
    return [
      baseImage,
      baseImage, // In real app, these would be different angles
      baseImage,
      baseImage,
      baseImage,
      baseImage,
    ];
  }, [product]);

  // 360° spin frames
  const spinFrames: string[] = useMemo(() => {
    if (!product?.image) return [];
    const baseImage = product.image;
    return Array.from({ length: 36 }, () => baseImage);
  }, [product]);

  // 360° view handlers
  const handle360Start = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
  };

  const handle360Move = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const delta = clientX - dragStart;
    setRotation(prev => prev + delta * 0.5);
  };

  const handle360End = () => {
    setIsDragging(false);
  };

  // Get current 360° frame
  const getCurrent360Frame = () => {
    if (spinFrames.length === 0) return product?.image || '';
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    const frameIndex = Math.floor((normalizedRotation / 360) * spinFrames.length);
    return spinFrames[frameIndex] || product?.image || '';
  };

  // Scroll handlers
  const scrollBy = (dx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: 'smooth' });
  };

  const scrollGalleryBy = (dx: number) => {
    const el = galleryScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: 'smooth' });
  };

  // Cart handlers
  const handleAddToCart = () => { 
    addToCart(product); 
    setQuantity(1); 
    addNotification({ title: 'Cart', message: 'Added to cart!', type: 'cart', icon: '🛒' }); 
  };

  const handleIncrement = () => { 
    if (quantity === 0) { 
      addToCart(product); 
      setQuantity(1); 
    } else { 
      updateQuantity(product.id, quantity + 1); 
      setQuantity(quantity + 1); 
    } 
    addNotification({ title: 'Cart', message: 'Quantity increased!', type: 'cart', icon: '🛒' }); 
  };

  const handleDecrement = () => { 
    if (quantity > 1) { 
      updateQuantity(product.id, quantity - 1); 
      setQuantity(quantity - 1); 
    } else { 
      removeFromCart(product.id); 
      setQuantity(0); 
    } 
    addNotification({ title: 'Cart', message: 'Removed from cart!', type: 'cart', icon: '🛒' }); 
  };

  const handleBuyNow = () => { 
    addToCart(product); 
    addNotification({ title: 'Cart', message: 'Added to cart! Redirecting to checkout...', type: 'cart', icon: '🛒' });
    // Navigate to checkout page
    router.push('/checkout');
  };

  const handleImageError = (e: any) => { 
    e.target.src = '/placeholder.png'; 
  };

  const submitFeedback = () => { 
    const storageKey = `gt_product_feedback_${product.id}`;
    setSavingFeedback(true); 
    try { 
      const payload = { rating: userRating, comment }; 
      window.localStorage.setItem(storageKey, JSON.stringify(payload)); 
      addNotification({ title: 'Feedback', message: 'Thanks for your feedback!', type: 'info', icon: '⭐' }); 
    } finally { 
      setSavingFeedback(false); 
    } 
  };

  if (!product) return <div className="max-w-2xl mx-auto p-8 text-center">Product not found.</div>;

  return (
    <>
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-3 px-1">
        <Link href="/products" className="hover:underline">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium">{product.name}</span>
      </nav>

      {/* Main Product Container */}
      <div className="w-full p-4 bg-white rounded-lg shadow-lg flex flex-col lg:flex-row gap-10 relative">
        {/* Left Side - Product Images */}
        <div className="w-full lg:w-1/2">
          {/* View Mode Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setViewMode('gallery')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'gallery' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Gallery View
            </button>
            <button
              onClick={() => setViewMode('360')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === '360' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              360° View
            </button>
          </div>

          {/* Main Image Display */}
          <div className="relative mb-4">
            <Link href="/products" className="absolute top-4 left-4 bg-white hover:bg-gray-100 text-gray-700 rounded-full p-2 shadow-lg z-10" aria-label="Back to Products">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </Link>
            
            <div 
              className="w-full aspect-square bg-gray-50 flex items-center justify-center rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
              onMouseDown={viewMode === '360' ? handle360Start : undefined}
              onMouseMove={viewMode === '360' ? handle360Move : undefined}
              onMouseUp={viewMode === '360' ? handle360End : undefined}
              onMouseLeave={viewMode === '360' ? handle360End : undefined}
              onTouchStart={viewMode === '360' ? handle360Start : undefined}
              onTouchMove={viewMode === '360' ? handle360Move : undefined}
              onTouchEnd={viewMode === '360' ? handle360End : undefined}
            >
              <img 
                src={viewMode === '360' ? getCurrent360Frame() : (activeImage || product.image)} 
                alt={product.name} 
                className="w-full h-full object-contain p-4" 
                onError={handleImageError}
                draggable={false}
              />
            </div>
            
            {viewMode === '360' && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-600 bg-white/90 px-3 py-1 rounded-full shadow-sm">
                Drag to rotate 360°
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {viewMode === 'gallery' && (
            <div className="relative">
              <div className="flex gap-2 mb-2">
                <button 
                  onClick={() => scrollGalleryBy(-120)} 
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                  aria-label="Scroll left"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={() => scrollGalleryBy(120)} 
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                  aria-label="Scroll right"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <div 
                ref={galleryScrollRef}
                className="flex gap-3 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {galleryImages.map((src, idx) => (
                  <button 
                    key={idx} 
                    className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all hover:scale-105"
                    onClick={() => setActiveImage(src)}
                    style={{
                      borderColor: (activeImage || product.image) === src ? '#3b82f6' : '#e5e7eb'
                    }}
                  >
                    <img 
                      src={src} 
                      alt={`${product.name} angle ${idx + 1}`} 
                      className="w-full h-full object-cover" 
                      onError={handleImageError} 
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start gap-6">
          {/* Product Title and ID */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-sm text-gray-600">Product ID: {product.id}</p>
          </div>

          {/* Rating Section */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, idx) => {
                const rating = product.rating ?? 0;
                const filled = idx + 1 <= Math.round(rating);
                return (
                  <svg key={idx} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={filled ? '#f59e0b' : '#d1d5db'} className="w-5 h-5">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                );
              })}
            </div>
            <span className="text-lg font-semibold text-gray-800">{(product.rating ?? 0).toFixed(1)}</span>
            <span className="text-sm text-gray-500">({product.ratingCount ?? 0} ratings)</span>
            <div className="h-4 w-px bg-gray-300"></div>
            <span className="text-sm text-green-600 font-medium">In Stock</span>
          </div>

          {/* Price Section */}
          <div className="flex items-end gap-3">
            <p className="text-4xl text-green-700 font-bold">{formatCurrencyINR(product.price)}</p>
            {product.mrp && product.mrp > product.price && (
              <>
                <p className="text-xl text-gray-500 line-through">{formatCurrencyINR(product.mrp)}</p>
                <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                  {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                </span>
              </>
            )}
          </div>
          <p className="text-sm text-gray-500">incl. taxes</p>

          {/* Product Variants */}
          <div className="space-y-4">
            {/* Size Variants */}
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Size</h4>
              <div className="flex gap-2 flex-wrap">
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedVariant(prev => ({ ...prev, size }))}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      selectedVariant.size === size
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Variants */}
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Color</h4>
              <div className="flex gap-2 flex-wrap">
                {[
                  { name: 'Black', value: 'black', color: 'bg-black' },
                  { name: 'White', value: 'white', color: 'bg-white border border-gray-300' },
                  { name: 'Red', value: 'red', color: 'bg-red-500' },
                  { name: 'Blue', value: 'blue', color: 'bg-blue-500' },
                  { name: 'Green', value: 'green', color: 'bg-green-500' }
                ].map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedVariant(prev => ({ ...prev, color: color.value }))}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      color.color
                    } ${
                      selectedVariant.color === color.value
                        ? 'ring-2 ring-blue-500 ring-offset-2'
                        : 'hover:scale-110'
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Selected Variants Display */}
            {Object.keys(selectedVariant).length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h5 className="font-medium text-blue-800 mb-2">Selected Options:</h5>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(selectedVariant).map(([key, value]) => (
                    <span key={key} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Short Description */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Quick Overview</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            
            {/* Key Highlights */}
            {product.features && product.features.length > 0 && (
              <div className="mt-3">
                <h4 className="font-medium text-gray-800 mb-2">Key Highlights:</h4>
                <ul className="space-y-1">
                  {product.features.slice(0, 3).map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {quantity === 0 ? (
              <button 
                onClick={handleAddToCart} 
                className="flex-1 bg-yellow-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                <button 
                  onClick={handleDecrement} 
                  className="bg-yellow-500 text-white w-10 h-10 rounded-lg font-bold hover:bg-yellow-600 transition-colors flex items-center justify-center"
                >
                  -
                </button>
                <span className="px-4 py-2 font-bold text-lg text-gray-900 min-w-[3rem] text-center">{quantity}</span>
                <button 
                  onClick={handleIncrement} 
                  className="bg-yellow-500 text-white w-10 h-10 rounded-lg font-bold hover:bg-yellow-600 transition-colors flex items-center justify-center"
                >
                  +
                </button>
              </div>
            )}
            <button 
              onClick={handleBuyNow} 
              className="flex-1 bg-green-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Buy Now
            </button>
          </div>

          {/* User Rating Section */}
          <div className="mt-6 bg-gray-50 border rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Rate this Product
            </h3>
            <div className="flex items-center gap-2 mb-3">
              {Array.from({ length: 5 }).map((_, idx) => {
                const filled = idx + 1 <= userRating;
                return (
                  <button 
                    key={idx} 
                    onClick={() => setUserRating(idx + 1)} 
                    aria-label={`Rate ${idx + 1} stars`}
                    className="transition-transform hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={filled ? '#f59e0b' : '#d1d5db'} className="w-8 h-8">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                );
              })}
              <span className="ml-2 text-sm text-gray-600">
                {userRating > 0 ? `${userRating} star${userRating > 1 ? 's' : ''}` : 'Click to rate'}
              </span>
            </div>
            <textarea 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
              placeholder="Share your experience with this product..." 
              className="w-full border rounded-lg p-3 min-h-[100px] resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
            <div className="mt-3 flex justify-end">
              <button 
                disabled={savingFeedback || userRating === 0} 
                onClick={submitFeedback} 
                className={`px-6 py-2 rounded-lg text-white font-medium transition-colors ${
                  savingFeedback || userRating === 0 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {savingFeedback ? 'Saving…' : 'Submit Review'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="w-full mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'description', name: 'Description', icon: '📝' },
              { id: 'specifications', name: 'Specifications', icon: '⚙️' },
              { id: 'reviews', name: 'Reviews', icon: '⭐' },
              { id: 'shipping', name: 'Shipping & Returns', icon: '🚚' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors"
                style={{
                  borderBottomColor: activeTab === tab.id ? '#3b82f6' : 'transparent',
                  color: activeTab === tab.id ? '#3b82f6' : '#6b7280'
                }}
              >
                <span>{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Description Tab */}
          {activeTab === 'description' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Product Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              
              {product.features && product.features.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Key Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {product.specs && Object.keys(product.specs).length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Technical Specifications</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                          <span className="text-sm font-medium text-gray-600">{key}</span>
                          <span className="text-sm text-gray-800 font-medium">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Customer Reviews</h3>
              
              {/* Sample Reviews */}
              <div className="space-y-4">
                {[
                  { name: 'Sarah Johnson', rating: 5, date: '2 days ago', comment: 'Excellent product! Great quality and fast delivery. Highly recommended.' },
                  { name: 'Mike Chen', rating: 4, date: '1 week ago', comment: 'Good value for money. Works as expected. Minor issue with packaging but product is perfect.' },
                  { name: 'Emily Davis', rating: 5, date: '2 weeks ago', comment: 'Amazing quality! Exceeded my expectations. Will definitely buy again.' }
                ].map((review, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{review.name}</div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, starIdx) => (
                              <svg key={starIdx} className="w-4 h-4" fill={starIdx < review.rating ? '#f59e0b' : '#d1d5db'} viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Specifications Tab */}
          {activeTab === 'specifications' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Technical Specifications</h3>
              {product.specs && Object.keys(product.specs).length > 0 ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                        <span className="text-sm font-medium text-gray-600">{key}</span>
                        <span className="text-sm text-gray-800 font-medium">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No specifications available for this product.</p>
              )}
            </div>
          )}

          {/* Shipping Tab */}
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Shipping & Returns</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Shipping Information</h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li>• Free shipping on orders above ₹999</li>
                    <li>• Standard delivery: 3-5 business days</li>
                    <li>• Express delivery: 1-2 business days</li>
                    <li>• Cash on delivery available</li>
                  </ul>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Return Policy</h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• 30-day return policy</li>
                    <li>• Free return shipping</li>
                    <li>• Full refund on unused items</li>
                    <li>• Easy return process</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="w-full mt-8 p-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Related Products
            </h2>
            <div className="flex gap-2">
              <button onClick={() => scrollBy(-320)} className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors" aria-label="Scroll left">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={() => scrollBy(320)} className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors" aria-label="Scroll right">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto scroll-smooth pb-2 scrollbar-hide">
            {relatedProducts.map((item) => (
              <Link href={`/products/${item.id}`} key={item.id} className="min-w-[280px] max-w-[280px] border rounded-lg p-4 hover:shadow-lg transition-all bg-white group">
                <div className="flex flex-col items-center">
                  <div className="w-48 h-48 bg-gray-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 mb-2 text-center line-clamp-2 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <svg key={idx} className="w-4 h-4" fill={idx < Math.floor(item.rating || 0) ? '#f59e0b' : '#d1d5db'} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({item.ratingCount || 0})</span>
                  </div>
                  <p className="text-green-700 font-bold text-lg">{formatCurrencyINR(item.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
