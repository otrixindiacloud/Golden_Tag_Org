'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const OTPInput = ({ 
  length = 6, 
  value = '', 
  onChange, 
  onComplete,
  disabled = false,
  error = false,
  className = ''
}) => {
  const [otp, setOtp] = useState(value);
  const inputRefs = useRef([]);

  useEffect(() => {
    setOtp(value);
  }, [value]);

  const handleChange = (index, value) => {
    if (disabled) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp.join(''));
    
    if (onChange) {
      onChange(newOtp.join(''));
    }
    
    // Auto-focus next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Check if OTP is complete
    if (newOtp.join('').length === length && onComplete) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (disabled) return;
    
    // Handle backspace
    if (e.key === 'Backspace') {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp.join(''));
        if (onChange) {
          onChange(newOtp.join(''));
        }
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
    
    // Handle paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then(text => {
        const pastedOtp = text.replace(/\D/g, '').slice(0, length);
        if (pastedOtp.length > 0) {
          setOtp(pastedOtp.padEnd(length, ''));
          if (onChange) {
            onChange(pastedOtp.padEnd(length, ''));
          }
          if (pastedOtp.length === length && onComplete) {
            onComplete(pastedOtp);
          }
        }
      });
    }
  };

  const handleFocus = (index) => {
    if (disabled) return;
    inputRefs.current[index]?.select();
  };

  return (
    <div className={`flex justify-center space-x-2 ${className}`}>
      {Array.from({ length }, (_, index) => (
        <motion.input
          key={index}
          ref={el => inputRefs.current[index] = el}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={otp[index] || ''}
          onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ''))}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={() => handleFocus(index)}
          disabled={disabled}
          className={`
            w-12 h-12 text-center text-2xl font-bold border-2 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
            transition-all duration-200
            ${error 
              ? 'border-red-500 bg-red-50 text-red-700' 
              : 'border-gray-300 bg-white text-gray-900'
            }
            ${disabled 
              ? 'bg-gray-100 cursor-not-allowed' 
              : 'hover:border-orange-400'
            }
          `}
          initial={{ scale: 1 }}
          whileFocus={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={error ? { 
            x: [-2, 2, -2, 2, 0],
            transition: { duration: 0.3 }
          } : {}}
        />
      ))}
    </div>
  );
};

export default OTPInput;
