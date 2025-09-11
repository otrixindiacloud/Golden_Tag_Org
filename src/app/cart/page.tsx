"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../contexts/CartContext";
import { formatCurrencyINR } from "@/lib/utils";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const subtotal = (cartItems as any[]).reduce((sum: number, item: any) => {
    const price = Number(item?.price ?? 0);
    const qty = Number(item?.quantity ?? 0);
    return sum + price * qty;
  }, 0);
  const shipping = subtotal > 5000 ? 0 : 99;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  // Helper to check if image src is allowed by next.config.mjs
  const isAllowedImage = (src: string) => {
    if (!src) return false;
    try {
      const url = new URL(src);
      // Add all allowed hostnames and path patterns here
      if (
        (url.hostname === 'fakestoreapi.com' && url.pathname.startsWith('/img/')) ||
        (url.hostname === 'cdn.dummyjson.com' && url.pathname.startsWith('/product-images/'))
      ) {
        return true;
      }
      // Allow local/public images
      if (src.startsWith('/')) return true;
    } catch {
      // Not a valid URL, treat as local
      if (src.startsWith('/')) return true;
    }
    return false;
  };

  const placeholder = '/placeholder.png';

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
                  {cartItems.map((item: {
                    id: string;
                    name: string;
                    image: string;
                    price: number;
                    quantity: number;
                  }) => (
                    <div key={item.id} className="p-6 flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Image
                          src={isAllowedImage(item.image) ? item.image : placeholder}
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

            {/*  */}
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
                  <button
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 transition-colors"
                    onClick={() => router.push('/payment')}
                  >
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


      </div>
    </div>
  );
}
