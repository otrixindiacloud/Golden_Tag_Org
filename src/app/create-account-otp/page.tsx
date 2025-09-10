"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useOTP } from "../../contexts/OTPContext";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function CreateAccountOTPPage() {
  const { sendOTP, resetOTP, otpData } = useOTP();
  const { registerWithOTP } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState(1); // 1: Info, 2: OTP, 3: Password, 4: Success
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    otp: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    // Validate phone: must be 10 digits
    if (!form.phone || form.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits");
      return;
    }
    setLoading(true);
    const fullPhone = (form.countryCode || "+91") + form.phone;
    const result = await sendOTP(form.email, fullPhone);
    setLoading(false);
    if (result.success) {
      setStep(2);
      setSuccess("OTP sent! Check your email/phone.");
    } else {
      setError(result.error || "Failed to send OTP");
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setError("");
    if (form.otp.length !== 6) {
      setError("Enter a valid 6-digit OTP");
      return;
    }
    const storedOTP = sessionStorage.getItem("tempOTP");
    if (form.otp === storedOTP) {
      setStep(3);
      setSuccess("OTP verified!");
    } else {
      setError("Invalid OTP");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    const result = await registerWithOTP({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
  phone: (form.countryCode || "+91") + form.phone,
      password: form.password,
      otp: form.otp
    });
    setLoading(false);
    if (result.success) {
      setStep(4);
      setSuccess("Account created!");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setError(result.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 p-4">
      <div className="relative bg-white/90 rounded-3xl shadow-2xl px-8 py-10 w-full max-w-md border border-orange-100">
        {/* Decorative Gradient Circle */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-orange-400 via-yellow-300 to-orange-200 rounded-full opacity-30 blur-2xl z-0"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-200 to-orange-100 rounded-full opacity-20 blur-2xl z-0"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold mb-7 text-center text-black-300 tracking-tight drop-shadow-sm">Create Account with OTP</h2>
          {error && <div className="mb-4 text-red-600 text-center font-medium animate-pulse">{error}</div>}
          {success && <div className="mb-4 text-green-600 text-center font-medium animate-fade-in">{success}</div>}
          {step === 1 && (
            <form onSubmit={handleSendOTP} className="space-y-5">
              <div className="flex flex-col gap-3">
                <label className="text-lg font-bold text-black-700">Full Name</label>
                <div className="flex gap-2">
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="w-1/2 px-2 py-2 border border-black-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-base bg-white/80" required />
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="w-1/2 px-2 py-2 border border-black-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-base bg-white/80" required />
                </div>
                <label className="text-lg font-bold text-black-700 mt-2">Email</label>
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="w-full px-2 py-2 border border-black-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-base bg-white/80" required />
                <label className="text-lg font-bold text-black-700 mt-2">Phone No.</label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={form.countryCode}
                    onChange={e => setForm({ ...form, countryCode: e.target.value })}
                    className="px-1 py-2 border border-black-200 rounded-lg bg-white/80 text-base focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    style={{ minWidth: '70px' }}
                  >
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+966">🇸🇦 +966</option>
                    <option value="+973">🇧🇭 +973</option>
                    <option value="+974">🇶🇦 +974</option>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+39">🇮🇹 +39</option>
                    <option value="+31">🇳🇱 +31</option>
                  </select>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={e => {
                      // Only allow numbers, max 10 digits
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setForm({ ...form, phone: val });
                    }}
                    placeholder="Phone"
                    className="w-full px-2 py-2 border border-black-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-base bg-white/80"
                    required
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 rounded-lg shadow-lg hover:from-orange-600 hover:to-yellow-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg tracking-wide">
                {loading ? (
                  <span className="flex items-center justify-center gap-2"><span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span> Sending...</span>
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-5">
              <div className="flex flex-col gap-3">
                <input name="otp" value={form.otp} onChange={handleChange} placeholder="Enter OTP" className="w-full px-6 py-4 border-2 border-black-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-center text-2xl font-mono tracking-widest bg-white/80" maxLength={6} required />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 rounded-lg shadow-lg hover:from-orange-600 hover:to-yellow-500 transition-all duration-200 text-lg tracking-wide">Verify OTP</button>
              <button type="button" onClick={() => setStep(1)} className="w-full text-sm text-gray-500 mt-2 hover:underline">Back</button>
            </form>
          )}
          {step === 3 && (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="flex flex-col gap-3">
                <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-lg bg-white/80" required />
                <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" type="password" className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-lg bg-white/80" required />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-3 rounded-lg shadow-lg hover:from-orange-600 hover:to-yellow-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg tracking-wide">
                {loading ? (
                  <span className="flex items-center justify-center gap-2"><span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span> Creating...</span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          )}
          {step === 4 && (
            <div className="text-center text-green-600 font-bold py-8 animate-fade-in">Account created! Redirecting to login...</div>
          )}
        </div>
      </div>
    </div>
  );
}
