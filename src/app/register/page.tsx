"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useOTP } from '../../contexts/OTPContext';
import { useRouter } from 'next/navigation';
import OTPVerification from '../../components/OTPVerification';

export default function RegisterPage() {
  const { user, registerWithOTP } = useAuth();
  const { sendOTP, resetOTP, otpData } = useOTP();
  const router = useRouter();
  
  // Form states
  const [currentStep, setCurrentStep] = useState(1); // 1: Basic Info, 2: OTP Verification, 3: Password Setup, 4: Success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    otp: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
  

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  useEffect(() => {
    // Password validation
    const password = formData.password;
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  }, [formData.password]);


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };


  const handleStep1Submit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!validatePhone(formData.phone)) {
      setError('Please enter a valid phone number');
      return;
    }
    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);
    try {
      const result = await sendOTP(formData.email, formData.phone);
      if (result.success) {
        setCurrentStep(2);
        setSuccess('OTP sent successfully! Please check your email and phone.');
      } else {
        setError(result.error || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const handleStep3Submit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Password validation
    const isPasswordValid = Object.values(passwordValidation).every(Boolean);
    if (!isPasswordValid) {
      setError('Password does not meet all requirements');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const result = await registerWithOTP({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        otp: formData.otp
      });

      if (result.success) {
        setCurrentStep(4);
        setSuccess('Account created successfully!');
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const PasswordRequirement = ({ text, isValid }) => (
    <motion.div 
      className={`flex items-center space-x-2 text-sm ${
        isValid ? 'text-green-600' : 'text-gray-500'
      }`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`w-4 h-4 rounded-full flex items-center justify-center ${
          isValid ? 'bg-green-500' : 'bg-gray-300'
        }`}
        animate={{ scale: isValid ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.2 }}
      >
        {isValid && (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </motion.div>
      <span>{text}</span>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full opacity-10"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full opacity-10"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Join Golden Tag for exclusive corporate gifts</p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((step) => (
              <motion.div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
                animate={{ 
                  scale: step === currentStep ? [1, 1.1, 1] : 1,
                  boxShadow: step === currentStep ? '0 0 0 4px rgba(249, 115, 22, 0.2)' : 'none'
                }}
                transition={{ duration: 0.3 }}
              >
                {step}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Error/Success Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm"
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 1: Basic Information */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.form
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleStep1Submit}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="john.doe@company.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                  className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </motion.button>
            </motion.form>
          )}

          {/* Step 2: OTP Verification */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <OTPVerification
                email={formData.email}
                phone={formData.phone}
                onVerified={(verifiedOTP) => {
                  setFormData({...formData, otp: verifiedOTP});
                  setCurrentStep(3);
                  setSuccess('OTP verified successfully!');
                }}
                onResend={() => {
                  setSuccess('OTP resent successfully!');
                }}
              />
            </motion.div>
          )}

          {/* Step 3: Password Setup */}
          {currentStep === 3 && (
            <motion.form
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleStep3Submit}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Create Your Password</h3>
                <p className="text-gray-600 text-sm">Choose a strong password to secure your account</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="Create a strong password"
                  required
                />
              </div>

              {/* Password Requirements */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Password Requirements:</h4>
                <PasswordRequirement text="At least 8 characters" isValid={passwordValidation.length} />
                <PasswordRequirement text="One uppercase letter" isValid={passwordValidation.uppercase} />
                <PasswordRequirement text="One lowercase letter" isValid={passwordValidation.lowercase} />
                <PasswordRequirement text="One number" isValid={passwordValidation.number} />
                <PasswordRequirement text="One special character" isValid={passwordValidation.special} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading || !Object.values(passwordValidation).every(Boolean) || formData.password !== formData.confirmPassword}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </motion.button>
            </motion.form>
          )}

          {/* Step 4: Success */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
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
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Golden Tag!</h3>
                <p className="text-gray-600">
                  Your account has been created successfully. You can now access exclusive corporate gifts and personalized catalogs.
                </p>
              </div>

              <motion.button
                onClick={() => router.push('/')}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue to Dashboard
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
