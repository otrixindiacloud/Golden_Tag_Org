"use client";

import { useState } from 'react';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Tips for E-commerce Success",
      excerpt: "Discover the key strategies that can transform your online store into a thriving business...",
      author: "Sarah Johnson",
      date: "2024-01-15",
      category: "Business Tips",
      readTime: "5 min read",
      image: "/blog-1.jpg"
    },
    {
      id: 2,
      title: "The Future of Online Shopping",
      excerpt: "Explore how AI and machine learning are revolutionizing the way we shop online...",
      author: "Mike Chen",
      date: "2024-01-12",
      category: "Technology",
      readTime: "7 min read",
      image: "/blog-2.jpg"
    },
    {
      id: 3,
      title: "Building Customer Trust in Digital Commerce",
      excerpt: "Learn the essential elements that help build and maintain customer trust...",
      author: "Emily Rodriguez",
      date: "2024-01-10",
      category: "Customer Experience",
      readTime: "6 min read",
      image: "/blog-3.jpg"
    },
    {
      id: 4,
      title: "Optimizing Your Product Pages for Conversions",
      excerpt: "Maximize your sales with these proven product page optimization techniques...",
      author: "David Kim",
      date: "2024-01-08",
      category: "Marketing",
      readTime: "8 min read",
      image: "/blog-4.jpg"
    }
  ];

  const categories = ["All", "Business Tips", "Technology", "Customer Experience", "Marketing"];

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl mb-8">Insights, tips, and stories to help your business grow</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <svg className="absolute right-3 top-3 h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-700 hover:text-blue-600"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{post.title.charAt(0)}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 hover:text-blue-600 cursor-pointer">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-600">{post.author}</span>
                  </div>
                  <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold">
            Load More Articles
          </button>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Stay Updated</h2>
          <p className="text-gray-600 mb-8">Get the latest insights and tips delivered to your inbox</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
