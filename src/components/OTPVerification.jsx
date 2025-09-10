'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOTP } from '../contexts/OTPContext';
import OTPInput from './OTPInput';

const OTPVerification = ({ 
  email, 
  phone, 
  onVerified, 
  onResend,
  title = "Verify Your Email & Phone",
  subtitle = "We've sent a 6-digit code to:",
  className = ""
}) => {
  const { otpData, loading, error, verifyOTP, resendOTP, clearError } = useOTP();
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    // Clear any previous errors when component mounts
    clearError();
  }, [clearError]);

  const handleOTPChange = (value) => {
    setOtp(value);
    clearError();
  };

  const handleOTPComplete = async (value) => {
    if (value.length === 6) {
      await handleVerify();
    }
  };

  const handleVerify = async () => {
    if (otp.length !== 6) return;
    
    setIsVerifying(true);
    const result = await verifyOTP(otp);
    
    if (result.success) {
      onVerified && onVerified(otp);
    }
    
    setIsVerifying(false);
  };

  const handleResend = async () => {
    const result = await resendOTP();
    if (result.success) {
      onResend && onResend();
    }
  };

  const formatPhone = (phone) => {
    // Simple phone formatting for display
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  return (
    <motion.div
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center">
        <motion.div
          className="w-16 h-16 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"
          animate={{ 
            rotate: otpData.isSent ? [0, 360] : 0,
            scale: otpData.isVerified ? [1, 1.1, 1] : 1
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.5 }
          }}
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
            />
          </svg>
        </motion.div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">
          {subtitle}
          <br />
          <span className="font-medium text-gray-900">{email}</span>
          <br />
          <span className="font-medium text-gray-900">{formatPhone(phone)}</span>
        </p>
      </div>

      {/* Error Messages */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm text-center"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* OTP Input */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 text-center">
          Enter OTP Code
        </label>
        
        <OTPInput
          length={6}
          value={otp}
          onChange={handleOTPChange}
          onComplete={handleOTPComplete}
          disabled={loading || isVerifying}
          error={!!error}
          className="justify-center"
        />
        
        {/* Attempts Counter */}
        {otpData.attempts > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-orange-600"
          >
            {otpData.maxAttempts - otpData.attempts} attempts remaining
          </motion.p>
        )}
      </div>

      {/* Timer and Resend */}
      <div className="text-center">
        {otpData.timer > 0 ? (
          <motion.p
            key="timer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-500"
          >
            Resend OTP in {otpData.timer}s
          </motion.p>
        ) : (
          <motion.button
            key="resend"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            type="button"
            onClick={handleResend}
            disabled={loading || !otpData.canResend}
            className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Resend OTP
          </motion.button>
        )}
      </div>

      {/* Verify Button */}
      <motion.button
        type="button"
        onClick={handleVerify}
        disabled={loading || isVerifying || otp.length !== 6}
        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isVerifying ? (
          <div className="flex items-center justify-center space-x-2">
            <motion.div
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>Verifying...</span>
          </div>
        ) : (
          'Verify OTP'
        )}
      </motion.button>

      {/* Success Message */}
      <AnimatePresence>
        {otpData.isVerified && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm text-center"
          >
            ✓ OTP verified successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OTPVerification;
