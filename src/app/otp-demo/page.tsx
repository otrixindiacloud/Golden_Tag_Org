"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOTP } from '../../contexts/OTPContext';
import OTPVerification from '../../components/OTPVerification';
import OTPInput from '../../components/OTPInput';

export default function OTPDemoPage() {
  const { sendOTP, resetOTP, otpData } = useOTP();
  const [email, setEmail] = useState('demo@example.com');
  const [phone, setPhone] = useState('+973 1234 5678');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  const handleSendOTP = async () => {
    const result = await sendOTP(email, phone);
    if (result.success) {
      setStep(2);
    }
  };

  const handleOTPVerified = (verifiedOTP) => {
    console.log('OTP Verified:', verifiedOTP);
    setStep(3);
  };

  const handleReset = () => {
    resetOTP();
    setStep(1);
    setOtp('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">OTP Demo</h1>
          <p className="text-gray-600">Test the OTP verification system</p>
        </motion.div>

        {/* Step 1: Send OTP */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter phone number"
              />
            </div>

            <motion.button
              onClick={handleSendOTP}
              disabled={!email || !phone}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send OTP
            </motion.button>
          </motion.div>
        )}

        {/* Step 2: Verify OTP */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <OTPVerification
              email={email}
              phone={phone}
              onVerified={handleOTPVerified}
              onResend={() => console.log('OTP Resent')}
            />
          </motion.div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">OTP Verified Successfully!</h3>
              <p className="text-gray-600">
                The OTP verification system is working perfectly.
              </p>
            </div>

            <motion.button
              onClick={handleReset}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Test Again
            </motion.button>
          </motion.div>
        )}

        {/* OTP Input Component Demo */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">OTP Input Component Demo</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                Try the OTP Input (6 digits)
              </label>
              <OTPInput
                length={6}
                value={otp}
                onChange={setOtp}
                onComplete={(value) => {
                  console.log('OTP Complete:', value);
                  alert(`OTP Complete: ${value}`);
                }}
                className="justify-center"
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Current OTP: <span className="font-mono font-bold">{otp || 'Empty'}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
