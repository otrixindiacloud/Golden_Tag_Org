"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSelection() {
  const [selected, setSelected] = useState("");
  const router = useRouter();

  const handlePay = () => {
    if (selected) {
      router.push("/order-success");
    } else {
      alert("Please select a payment method.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Select Payment Method</h1>
        <div className="space-y-4 mb-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={selected === "card"}
              onChange={() => setSelected("card")}
              className="mr-3"
            />
            <span>Credit/Debit Card</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={selected === "upi"}
              onChange={() => setSelected("upi")}
              className="mr-3"
            />
            <span>UPI</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={selected === "cod"}
              onChange={() => setSelected("cod")}
              className="mr-3"
            />
            <span>Cash on Delivery</span>
          </label>
        </div>
        <button
          onClick={handlePay}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 transition-colors"
        >
          Pay Now
        </button>
        <Link href="/cart" className="block text-center text-gray-500 mt-4 hover:underline">
          Back to Cart
        </Link>
      </div>
    </div>
  );
}
