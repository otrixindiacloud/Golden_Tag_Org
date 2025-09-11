"use client";

import Link from "next/link";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-6xl mb-4 text-green-500">✅</div>
        <h1 className="text-3xl font-bold mb-2 text-green-700">Order Placed Successfully!</h1>
        <p className="text-gray-700 mb-6">Thank you for your purchase. Your order has been placed and is being processed.</p>
        <Link href="/" className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors">
          Go to Home
        </Link>
      </div>
    </div>
  );
}
