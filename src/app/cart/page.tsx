"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../contexts/CartContext";
import { formatCurrencyINR } from "@/lib/utils";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = (cartItems as any[]).reduce((sum: number, item: any) => {
    const price = Number(item?.price ?? 0);
    const qty = Number(item?.quantity ?? 0);
    return sum + price * qty;
  }, 0);
  const shipping = subtotal > 5000 ? 0 : 99;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-400 dark:text-gray-500 mx-2">/</span>
                  <span className="text-gray-900 dark:text-gray-100">Shopping Cart</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Cart Items ({cartItems.length})
                  </h2>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                          {formatCurrencyINR(item.price)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          -
                        </button>
                        <span className="w-12 text-center text-gray-900 dark:text-gray-100 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {formatCurrencyINR(item.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700 dark:text-gray-200">
                    <span>Subtotal</span>
                    <span>{formatCurrencyINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-200">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatCurrencyINR(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-200">
                    <span>Tax (GST)</span>
                    <span>{formatCurrencyINR(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 dark:text-gray-100 text-lg mt-4">
                    <span>Total</span>
                    <span>{formatCurrencyINR(total)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 transition-colors">
                    Proceed to Checkout
                  </button>
                  <Link
                    href="/"
                    className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors text-center block"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Promo Code */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Have a promo code?</h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Shipping Information</h3>
                  <p className="text-sm text-gray-600">
                    Free shipping on orders over $50. Standard delivery takes 3-5 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recently Viewed */}
        {cartItems.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Recently Viewed</h2>
              <div className="flex items-center space-x-2 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-sm font-medium">4 items</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:border-amber-200 hover:-translate-y-2 relative">
                  {/* Product Image Container */}
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
                    {/* Image Placeholder with Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-amber-600 text-sm font-semibold">Product Image</span>
                      </div>
                    </div>
                    
                    {/* Golden Tag Badge */}
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                      GT
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-amber-800 text-xs px-2 py-1 rounded-full border border-amber-200 font-medium">
                        🛍️ Product
                      </span>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full border border-amber-200 font-medium">
                        Premium
                      </span>
                      <span className="text-amber-600 text-xs font-bold bg-amber-50 px-2 py-1 rounded">STORE</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                      Premium Product {i}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">High-quality corporate gift</p>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, starIndex) => (
                          <svg key={starIndex} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-amber-600">{formatCurrencyINR(4199)}</span>
                        <span className="text-gray-400 text-sm line-through">{formatCurrencyINR(5899)}</span>
                      </div>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 px-4 rounded-xl text-sm font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 group-hover:scale-[1.02] transform">
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                        </svg>
                        <span>Add to Cart</span>
                      </span>
                    </button>
                  </div>
                  
                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
