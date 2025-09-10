"use client";

import { Metadata } from "next";

export default function About() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <div className="fixed inset-0 -z-10 bg-white dark:bg-black" aria-hidden="true"></div>
            {/* Hero Section */}
  <section className="relative bg-white dark:bg-black py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="golden-tag-container relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                About <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">Golden Tag</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Your trusted partner in corporate gifting since 2015
          </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span className="bg-gradient-to-r from-yellow-100 to-amber-100 px-4 py-2 rounded-full border border-yellow-200">Premium Quality</span>
                <span className="bg-gradient-to-r from-yellow-100 to-amber-100 px-4 py-2 rounded-full border border-yellow-200">Custom Solutions</span>
                <span className="bg-gradient-to-r from-yellow-100 to-amber-100 px-4 py-2 rounded-full border border-yellow-200">8+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
  <section className="py-20 bg-white dark:bg-black">
        <div className="golden-tag-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Company Story */}
            <div className="animate-slide-in-left">
              <div className="mb-8">
                <span className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent font-semibold text-sm uppercase tracking-wider">Our Journey</span>
                <h2 className="text-4xl font-bold text-foreground mt-2 mb-6">
                  Building Excellence Since 2015
              </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Founded in 2015, Golden Tag has been at the forefront of corporate gifting in the Kingdom of Bahrain. 
                We understand that the right gift can strengthen business relationships, boost employee morale, and 
                create lasting impressions with clients and partners.
              </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                Our commitment to quality and attention to detail has made us the preferred choice for leading 
                multinational companies seeking premium gifts that reflect their brand values and 
                commitment to excellence.
              </p>
              </div>

              {/* Achievement Badge */}
              <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
              <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl font-bold">8+</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">Years of Excellence</p>
                    <p className="text-muted-foreground">Serving corporate clients across Bahrain</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Element */}
            <div className="animate-slide-in-right">
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/2.jpg" 
                    alt="Premium Gifts - Golden Tag Corporate Gifting" 
                    className="w-full h-80 sm:h-96 object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay with text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                    <div className="p-4 sm:p-8 text-center w-full">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-xl">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Premium Gifts</h3>
                      <p className="text-yellow-200 font-medium text-sm sm:text-base">Crafted with Excellence</p>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full opacity-60"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Values Section */}
  <section className="py-20 bg-white dark:bg-black">
        <div className="golden-tag-container">
          <div className="text-center mb-16">
            <span className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent font-semibold text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="text-4xl font-bold text-foreground mt-2 mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our core values guide every decision we make and every gift we create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quality First */}
            <div className="group bg-background p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 card-hover border border-yellow-100">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl flex items-center justify-center mb-6 group-hover:from-yellow-200 group-hover:to-amber-200 transition-colors">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Quality First</h3>
              <p className="text-muted-foreground leading-relaxed">
                  We source only the finest materials and work with skilled artisans to create gifts that 
                  exceed expectations and stand the test of time.
                </p>
              </div>
              
            {/* Customization */}
            <div className="group bg-background p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 card-hover border border-yellow-100">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl flex items-center justify-center mb-6 group-hover:from-yellow-200 group-hover:to-amber-200 transition-colors">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Customization</h3>
              <p className="text-muted-foreground leading-relaxed">
                  Every gift can be personalized with your company logo, colors, and messaging to create 
                  a unique brand experience.
                </p>
              </div>
              
            {/* Customer Service */}
            <div className="group bg-background p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 card-hover border border-yellow-100">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl flex items-center justify-center mb-6 group-hover:from-yellow-200 group-hover:to-amber-200 transition-colors">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Customer Service</h3>
              <p className="text-muted-foreground leading-relaxed">
                  Our dedicated team works closely with you to understand your needs and deliver solutions 
                  that perfectly align with your corporate gifting strategy.
                </p>
              </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
  <section className="py-20 bg-white dark:bg-black flex justify-center">
  <div className="bg-white dark:bg-black rounded-xl shadow-lg max-w-5xl w-full px-6 py-10 flex flex-col items-center border-2 border-yellow-200 dark:border-neutral-700">
          <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-0 justify-center items-center">
            {/* Mission Card */}
            <div className="flex-1 flex flex-col items-center text-center px-6 py-4">
              <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Our Mission</h2>
              <p className="text-base text-muted-foreground text-black dark:text-white leading-relaxed">
                To provide exceptional gifts that strengthen business relationships, 
                enhance brand recognition, and create meaningful connections between companies 
                and their stakeholders across the Kingdom of Bahrain.
              </p>
            </div>
            {/* Vision Card */}
            <div className="flex-1 flex flex-col items-center text-center px-6 py-4">
              <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Our Vision</h2>
              <p className="text-base text-muted-foreground text-black dark:text-white leading-relaxed">
                To become the leading corporate gifting partner in the Middle East, 
                recognized for our innovation, quality, and ability to transform business relationships 
                through meaningful and memorable gifts.
              </p>
            </div>
          </div>
        </div>
      </section>

    {/* Statistics Section */}
    <section className="py-20">
  <div className="golden-tag-container text-center">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Impact in Numbers</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Trusted by leading companies across Bahrain and the region
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Corporate Clients</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-lg opacity-90">Gifts Delivered</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <div className="text-lg opacity-90">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="golden-tag-container">
          <div className="text-center mb-16">
            <span className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent font-semibold text-sm uppercase tracking-wider">Meet Our Team</span>
            <h2 className="text-4xl font-bold text-foreground mt-2 mb-6">
              The People Behind Golden Tag
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our dedicated team of professionals brings years of experience and passion to every project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* CEO */}
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-40 h-40 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <div className="w-32 h-32 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Ahmed Al-Mansouri</h3>
              <p className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent font-medium mb-3">Founder & CEO</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Visionary leader with 15+ years in corporate relations and business development across the Middle East.
              </p>
            </div>
            
            {/* Creative Director */}
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-40 h-40 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <div className="w-32 h-32 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Fatima Al-Zahra</h3>
              <p className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent font-medium mb-3">Creative Director</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Award-winning designer specializing in luxury corporate gifts and brand experiences.
              </p>
            </div>
            
            {/* Operations Manager */}
            <div className="group text-center">
              <div className="relative mb-6">
                <div className="w-40 h-40 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <div className="w-32 h-32 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Omar Al-Rashid</h3>
              <p className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent font-medium mb-3">Operations Manager</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Logistics expert ensuring seamless delivery and exceptional service for all our corporate clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
  <section className="py-20 bg-gradient-to-br from-yellow-50 to-amber-50 dark:bg-black dark:bg-none">
  <div className="golden-tag-container bg-transparent dark:bg-black">
          <div className="text-center mb-16">
            <span className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent font-semibold text-sm uppercase tracking-wider">Client Testimonials</span>
            <h2 className="text-4xl font-bold text-foreground mt-2 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it - hear from the companies we've helped
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-background dark:bg-black p-8 rounded-2xl shadow-lg border border-yellow-100 dark:border-neutral-700">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "Golden Tag has been our go-to partner for corporate gifting for over 3 years. Their attention to detail and quality is unmatched. Every gift reflects our brand perfectly."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">SM</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Sarah Mohammed</p>
                  <p className="text-sm text-muted-foreground">Marketing Director, TechCorp Bahrain</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-background dark:bg-black p-8 rounded-2xl shadow-lg border border-yellow-100 dark:border-neutral-700">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "The customization options are incredible. They turned our vision into reality and delivered exactly what we needed for our annual client appreciation event."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">AK</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Ahmed Khalil</p>
                  <p className="text-sm text-muted-foreground">CEO, FinanceFirst Group</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-background dark:bg-black p-8 rounded-2xl shadow-lg border border-yellow-100 dark:border-neutral-700">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "Professional, reliable, and always on time. Golden Tag has helped us strengthen our client relationships through their exceptional gifting solutions."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">FA</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Fatima Al-Rashid</p>
                  <p className="text-sm text-muted-foreground">HR Director, Global Solutions Ltd</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="golden-tag-container text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Elevate Your Corporate Gifting?
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Let's discuss how Golden Tag can help you create meaningful connections and strengthen your business relationships through exceptional gifts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-amber-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-amber-600 transition-colors duration-200 btn-hover"
              >
                Get Started Today
              </a>
              <a 
                href="/products" 
                className="border-2 border-amber-500 text-amber-500 px-8 py-4 rounded-xl font-semibold hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200"
              >
                View Our Products
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
