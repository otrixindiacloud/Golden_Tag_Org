"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from "../contexts/CartContext";
import { BsCart3 } from "react-icons/bs";
import Link from 'next/link';
import Image from 'next/image';
import { formatCurrencyINR } from '@/lib/utils';

export default function CartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { cartItems, cartCount, removeFromCart, updateQuantity, getCartTotal } = useCart();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatPrice = (price) => {
    return formatCurrencyINR(price);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Cart Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Shopping Cart"
      >
        <BsCart3 className="w-5 h-5" />
        
        {/* Cart Count Badge */}
        {cartCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
          >
            {cartCount > 9 ? '9+' : cartCount}
          </motion.div>
        )}
      </motion.button>

      {/* Cart Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-card rounded-lg shadow-xl border border-border z-50 max-h-96 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border bg-muted">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-card-foreground">Shopping Cart</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {cartCount} {cartCount === 1 ? 'item' : 'items'}
                  </span>
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    View cart
                  </Link>
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="max-h-80 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  <BsCart3 className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                  <p>Your cart is empty</p>
                  <p className="text-sm mt-1">Add some items to get started</p>
                </div>
              ) : (
                cartItems.slice(0, 5).map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="px-4 py-3 border-b border-border hover:bg-muted transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-3">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                          <Image
                            src={item.image || '/placeholder.png'}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground line-clamp-2">
                              {item.name}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {formatPrice(item.price)} each
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-6 h-6 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-xs"
                                >
                                  -
                                </button>
                                <span className="text-sm font-medium w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-6 h-6 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-xs"
                                >
                                  +
                                </button>
                              </div>
                              <span className="text-sm font-semibold text-foreground">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-muted-foreground hover:text-destructive transition-colors ml-2"
                            title="Remove from cart"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="px-4 py-3 border-t border-border bg-muted">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-semibold text-card-foreground">
                    Total: {formatPrice(getCartTotal())}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    View Cart
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
