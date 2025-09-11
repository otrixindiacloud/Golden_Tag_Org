"use client";

import { useState, useEffect, useRef } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Form submitted:", formData);
    setShowSuccess(true);
    setFormData({ name: "", email: "", company: "", message: "" });
    setIsSubmitting(false);
    
    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  return (
  <main className="min-h-screen overflow-hidden bg-white dark:bg-black p-0 m-0">
      {/* Animated Hero Section */}
      <section 
        id="hero"
        ref={(el) => { sectionRefs.current.hero = el; }}
        className="relative py-20 overflow-hidden p-0 m-0 w-full max-w-none"
        style={{
          backgroundImage: `url('/7.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'left',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-200/30 to-amber-200/30 dark:from-yellow-600/10 dark:to-amber-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-amber-200/30 to-orange-200/30 dark:from-amber-600/10 dark:to-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-100/20 to-amber-100/20 dark:from-yellow-600/5 dark:to-amber-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

  <div className="relative z-10 p-0 m-0 w-full max-w-none">
          <div className={`text-center transition-all duration-1000 ${visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-center text-muted-foreground text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
              Get in touch with our team for personalized corporate gifting solutions and custom branding services
            </p>
            <div className="flex justify-center">
              <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Premium Service Since 2015
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Information */}
      <section 
        id="contact-form"
        ref={(el) => { sectionRefs.current['contact-form'] = el; }}
        className="bg-white dark:bg-black py-20"
      >
        <div className="golden-tag-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Animated Contact Form */}
            <div className={`transition-all duration-1000 delay-200 ${visibleSections.has('contact-form') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="bg-gradient-to-br from-white to-yellow-50/30 dark:from-gray-900 dark:to-gray-800/50 p-8 rounded-2xl shadow-xl border border-yellow-100 dark:border-gray-700">
                <h2 className="text-4xl font-bold text-foreground mb-8 bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
                  Send us a Message
                </h2>
                
                {/* Success Message */}
                {showSuccess && (
                  <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg animate-bounce">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-green-800 dark:text-green-200 font-medium">Thank you! We'll get back to you soon.</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none bg-white dark:bg-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                        focusedField === 'name' 
                          ? 'border-yellow-500 shadow-lg shadow-yellow-200/50 transform scale-[1.02]' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none bg-white dark:bg-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                        focusedField === 'email' 
                          ? 'border-yellow-500 shadow-lg shadow-yellow-200/50 transform scale-[1.02]' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onFocus={() => handleFocus('company')}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none bg-white dark:bg-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                        focusedField === 'company' 
                          ? 'border-yellow-500 shadow-lg shadow-yellow-200/50 transform scale-[1.02]' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      placeholder="Enter your company name"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                      required
                      rows={5}
                      className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none resize-none bg-white dark:bg-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                        focusedField === 'message' 
                          ? 'border-yellow-500 shadow-lg shadow-yellow-200/50 transform scale-[1.02]' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      placeholder="Tell us about your corporate gifting needs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 hover:scale-105 hover:shadow-xl'
                    } text-white shadow-lg`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Animated Contact Information */}
            <div className={`transition-all duration-1000 delay-400 ${visibleSections.has('contact-form') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h2 className="text-4xl font-bold text-foreground mb-8 bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
                Get in Touch
              </h2>
              
              <div className="space-y-8">
                {/* Office Location Card */}
                <div className="group">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Office Location</h3>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 border border-amber-200 dark:border-gray-600 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                        <span className="text-white text-lg font-bold">GT</span>
                      </div>
                      <h4 className="font-bold text-amber-800 dark:text-amber-200 text-xl">GOLDEN TAG</h4>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      <strong className="text-foreground">Manama, Bahrain</strong><br />
                      Serving the Kingdom of Bahrain<br />
                      <span className="text-amber-600 font-semibold">Since 2015</span>
                    </p>
                  </div>
                </div>

                {/* Contact Details Cards */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-6">Contact Details</h3>
                  <div className="space-y-4">
                    {/* Phone Card */}
                    <div className="group bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-gray-800 dark:to-gray-700 border border-yellow-200 dark:border-gray-600 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-lg">Phone</p>
                          <p className="text-yellow-600 font-semibold text-xl">+973 3663 0814</p>
                        </div>
                      </div>
                    </div>

                    {/* Email Card */}
                    <div className="group bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 border border-amber-200 dark:border-gray-600 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-lg">Email</p>
                          <p className="text-amber-600 font-semibold text-xl">Info@goldentag.com.bh</p>
                        </div>
                      </div>
                    </div>

                    {/* Business Hours Card */}
                    <div className="group bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 border border-orange-200 dark:border-gray-600 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-lg">Business Hours</p>
                          <p className="text-orange-600 font-semibold text-xl">Always Open</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Map Section */}
      <section 
        id="map-section"
        ref={(el) => { sectionRefs.current['map-section'] = el; }}
        className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 py-20"
      >
        <div className="golden-tag-container">
          <div className={`text-center mb-12 transition-all duration-1000 delay-200 ${visibleSections.has('map-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Find Us
            </h2>
            <p className="text-amber-600 font-semibold text-xl">Located in the Heart of Manama, Bahrain</p>
          </div>
          
          <div className={`transition-all duration-1000 delay-400 ${visibleSections.has('map-section') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Map Section - 80% width on large screens */}
              <div className="lg:col-span-4">
                <div className="bg-white dark:bg-gray-800 p-2 rounded-3xl shadow-2xl border border-yellow-100 dark:border-gray-600 overflow-hidden">
                  <div className="w-full h-96 lg:h-[500px] rounded-2xl relative overflow-hidden">
                    {/* Interactive Map */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.5!2d50.585!3d26.228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49ae0b4b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sManama%2C%20Bahrain!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-2xl"
                      title="Golden Tag Location - Manama, Bahrain"
                    ></iframe>
                    
                    {/* Map Overlay with Brand Badge */}
                    
                  </div>
                </div>
              </div>

              {/* Location Information Panel - 20% width on large screens */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-white to-yellow-50/30 dark:from-gray-800 dark:to-gray-700/50 p-6 rounded-3xl shadow-2xl border border-yellow-100 dark:border-gray-600 h-full">
                  <div className="space-y-6">
                    {/* Location Title */}
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-foreground mb-2 bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
                        Our Location
                      </h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-yellow-500 to-amber-600 mx-auto rounded-full"></div>
                    </div>

                    {/* Location Details */}
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 border border-amber-200 dark:border-gray-500 p-4 rounded-2xl">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-amber-800 dark:text-amber-200 text-lg">Address</h4>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          <strong className="text-foreground">Manama, Bahrain</strong><br />
                          Kingdom of Bahrain<br />
                          <span className="text-amber-600 font-semibold">Middle East</span>
                        </p>
                      </div>

                      

                      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-600 border border-orange-200 dark:border-gray-500 p-4 rounded-2xl">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-orange-800 dark:text-orange-200 text-lg">Service Area</h4>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          <strong className="text-foreground">Bahrain & GCC</strong><br />
                          <span className="text-orange-600 font-semibold">International Shipping</span>
                        </p>
                      </div>
                    </div>

                    {/* Quick Contact */}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated CTA Section */}
      <section 
        id="cta-section"
        ref={(el) => { sectionRefs.current['cta-section'] = el; }}
        className="bg-gradient-to-br from-yellow-100 via-amber-600 to-yellow-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 dark:bg-black/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 dark:bg-black/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 dark:bg-black/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="golden-tag-container relative z-10">
          <div className={`text-center transition-all duration-1000 delay-200 ${visibleSections.has('cta-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center mb-8">
              <div className="text-5xl font-bold text-white animate-bounce">
                GOLDEN TAG
              </div>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h3>
            <p className="text-white/90 text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
              Contact us today to discuss your corporate gifting needs. Our team is ready to help you create meaningful gifts that strengthen your business relationships.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {/* Call Us Card */}
              <div className={`group transition-all duration-1000 delay-300 ${visibleSections.has('cta-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white/20 dark:hover:bg-gray-700/80">
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:rotate-12 transition-transform duration-300">
                    <span className="text-white text-3xl">📞</span>
                  </div>
                  <h4 className="font-bold text-white text-xl mb-3">Call Us</h4>
                  <p className="text-white/80 text-lg font-semibold">+973 3663 0814</p>
                </div>
              </div>

              {/* Email Us Card */}
              <div className={`group transition-all duration-1000 delay-500 ${visibleSections.has('cta-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white/20 dark:hover:bg-gray-700/80">
                  <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:rotate-12 transition-transform duration-300">
                    <span className="text-white text-3xl">✉️</span>
                  </div>
                  <h4 className="font-bold text-white text-xl mb-3">Email Us</h4>
                  <p className="text-white/80 text-lg font-semibold">Info@goldentag.com.bh</p>
                </div>
              </div>

              {/* Visit Us Card */}
              <div className={`group transition-all duration-1000 delay-700 ${visibleSections.has('cta-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white/20 dark:hover:bg-gray-700/80">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:rotate-12 transition-transform duration-300">
                    <span className="text-white text-3xl">🌐</span>
                  </div>
                  <h4 className="font-bold text-white text-xl mb-3">Visit Us</h4>
                  <p className="text-white/80 text-lg font-semibold">www.goldentag.com.bh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
