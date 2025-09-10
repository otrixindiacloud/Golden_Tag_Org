'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const OTPContext = createContext();

export const useOTP = () => {
  const context = useContext(OTPContext);
  if (!context) {
    throw new Error('useOTP must be used within an OTPProvider');
  }
  return context;
};

export const OTPProvider = ({ children }) => {
  const [otpData, setOtpData] = useState({
    isSent: false,
    timer: 0,
    canResend: false,
    attempts: 0,
    maxAttempts: 3,
    isVerified: false,
    email: '',
    phone: '',
    otp: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Timer effect
  useEffect(() => {
    if (otpData.timer > 0) {
      const timer = setTimeout(() => {
        setOtpData(prev => ({
          ...prev,
          timer: prev.timer - 1
        }));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (otpData.timer === 0 && otpData.isSent) {
      setOtpData(prev => ({
        ...prev,
        canResend: true
      }));
    }
  }, [otpData.timer, otpData.isSent]);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOTP = async (email, phone) => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const otp = generateOTP();
      
      // In a real app, this would be an API call to your backend
      console.log(`OTP for ${email}: ${otp}`); // For demo purposes
      console.log(`OTP for ${phone}: ${otp}`); // For demo purposes
      
      // Store OTP temporarily (in real app, this would be handled by backend)
      sessionStorage.setItem('tempOTP', otp);
      sessionStorage.setItem('tempEmail', email);
      sessionStorage.setItem('tempPhone', phone);
      
      setOtpData({
        isSent: true,
        timer: 60, // 60 seconds timer
        canResend: false,
        attempts: 0,
        maxAttempts: 3,
        isVerified: false,
        email: email,
        phone: phone,
        otp: otp
      });
      
      return { success: true };
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (enteredOTP) => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const storedOTP = sessionStorage.getItem('tempOTP');
      
      if (enteredOTP === storedOTP) {
        setOtpData(prev => ({
          ...prev,
          isVerified: true,
          attempts: 0
        }));
        return { success: true };
      } else {
        const newAttempts = otpData.attempts + 1;
        setOtpData(prev => ({
          ...prev,
          attempts: newAttempts
        }));
        
        if (newAttempts >= otpData.maxAttempts) {
          setError('Maximum verification attempts exceeded. Please request a new OTP.');
          return { success: false, error: 'Maximum attempts exceeded' };
        } else {
          setError(`Invalid OTP. ${otpData.maxAttempts - newAttempts} attempts remaining.`);
          return { success: false, error: 'Invalid OTP' };
        }
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    if (!otpData.canResend) return { success: false, error: 'Please wait before resending' };
    
    return await sendOTP(otpData.email, otpData.phone);
  };

  const resetOTP = () => {
    setOtpData({
      isSent: false,
      timer: 0,
      canResend: false,
      attempts: 0,
      maxAttempts: 3,
      isVerified: false,
      email: '',
      phone: '',
      otp: ''
    });
    setError('');
    setLoading(false);
    
    // Clear session storage
    sessionStorage.removeItem('tempOTP');
    sessionStorage.removeItem('tempEmail');
    sessionStorage.removeItem('tempPhone');
  };

  const clearError = () => {
    setError('');
  };

  const value = {
    otpData,
    loading,
    error,
    sendOTP,
    verifyOTP,
    resendOTP,
    resetOTP,
    clearError
  };

  return (
    <OTPContext.Provider value={value}>
      {children}
    </OTPContext.Provider>
  );
};
