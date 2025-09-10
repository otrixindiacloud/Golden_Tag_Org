"use client";

import Link from "next/link";

export default function BannerDemo() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Store Banner Component Demo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            This page showcases the interactive slider banner component inspired by luxury retail stores. 
            The banner features smooth transitions, engaging content, and a modern design aesthetic.
          </p>
        </div>

        {/* Banner Showcase */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Interactive Slider Banner
          </h3>
          <div className="text-center py-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg">
            <h4 className="text-2xl font-bold text-white mb-4">Banner Component</h4>
            <p className="text-white/90">The StoreBanner component is now only displayed on the home page.</p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🎨</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Modern Design</h4>
            <p className="text-gray-600">
              Sleek, contemporary design with luxury store aesthetics and smooth animations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🔄</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Auto-Play Slider</h4>
            <p className="text-gray-600">
              Automatic slide transitions every 5 seconds with manual navigation controls.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">📱</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Responsive</h4>
            <p className="text-gray-600">
              Fully responsive design that works perfectly on all devices and screen sizes.
            </p>
          </div>
        </div>

        {/* Implementation Info */}
        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Implementation Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Features</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Auto-advancing slides with 5-second intervals</li>
                <li>• Manual navigation with arrow buttons</li>
                <li>• Slide indicators for easy navigation</li>
                <li>• Smooth transitions and hover effects</li>
                <li>• Luxury brand aesthetic with gradients</li>
                <li>• Floating decorative elements</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Technical Details</h4>
              <ul className="space-y-2 text-gray-600">
                                 <li>• Built with React hooks (useState, useEffect)</li>
                 <li>• Tailwind CSS for styling</li>
                 <li>• JavaScript for functionality</li>
                 <li>• CSS animations and transitions</li>
                 <li>• Responsive design patterns</li>
                 <li>• Accessible navigation controls</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="text-center mt-12">
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/checkout" 
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              View Checkout Page
            </Link>
            <Link 
              href="/products" 
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              View Products Page
            </Link>
            <Link 
              href="/" 
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
