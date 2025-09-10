"use client";

import { useState } from 'react';
import UnifiedProductFramework from '../../components/UnifiedProductFramework';
import ProductRatingSystem from '../../components/ProductRatingSystem';
import ProductCommentsSystem from '../../components/ProductCommentsSystem';
import Product360View from '../../components/Product360View';

export default function ProductDemoPage() {
  // Sample product data
  const sampleProduct = {
    id: 1,
    name: "Samsung Galaxy M14 5G",
    price: 11499,
    mrp: 13999,
    description: "Experience the power of 5G with the Samsung Galaxy M14. Featuring a massive 6000mAh battery, 90Hz smooth display, and 50MP triple camera system. Perfect for photography enthusiasts and power users who need all-day battery life.",
    image: "/placeholder.png",
    rating: 4.5,
    ratingCount: 34059,
    features: [
      "6000mAh massive battery for all-day usage",
      "90Hz smooth display for fluid scrolling",
      "50MP triple camera with AI enhancements",
      "5G connectivity for ultra-fast internet",
      "128GB storage with expandable memory",
      "Android 13 with One UI 5.0"
    ],
    specs: {
      "Display": "6.6-inch FHD+ 90Hz",
      "Processor": "Exynos 1330",
      "RAM": "6GB",
      "Storage": "128GB (expandable)",
      "Camera": "50MP + 2MP + 2MP",
      "Battery": "6000mAh",
      "OS": "Android 13",
      "Connectivity": "5G, Wi-Fi 6, Bluetooth 5.2"
    },
    warrantyMonths: 12,
    guaranteeMonths: 0,
    stock: 150,
    category: "Electronics",
    subcategory: "Mobile",
    offers: [
      "Bank Offer: 10% off up to ₹50 on orders above ₹250",
      "5% Cashback on Flipkart Axis Bank Card",
      "Special Price: Extra ₹3000 off (incl. coupons)"
    ]
  };

  const sampleRelatedProducts = [
    {
      id: 2,
      name: "OnePlus Nord CE 3",
      price: 22999,
      image: "/placeholder.png",
      rating: 4.3,
      ratingCount: 12543
    },
    {
      id: 3,
      name: "iPhone 15 Pro",
      price: 134900,
      image: "/placeholder.png",
      rating: 4.8,
      ratingCount: 8765
    },
    {
      id: 4,
      name: "Dell Laptop Inspiron 15",
      price: 45999,
      image: "/placeholder.png",
      rating: 4.2,
      ratingCount: 1276
    }
  ];

  const sampleReviews = [
    {
      id: '1',
      userId: 'user1',
      userName: 'Sarah Johnson',
      rating: 5,
      comment: 'Excellent product! Great quality and fast delivery. The camera quality is amazing and the battery lasts all day. Highly recommended for anyone looking for a reliable smartphone.',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 12,
      verified: true
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Mike Chen',
      rating: 4,
      comment: 'Good value for money. Works as expected. Minor issue with packaging but product is perfect. The 5G speed is impressive.',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 8,
      verified: true
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Emily Davis',
      rating: 5,
      comment: 'Amazing quality! Exceeded my expectations. Will definitely buy again. The display is crystal clear and the performance is smooth.',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 15,
      verified: false
    },
    {
      id: '4',
      userId: 'user4',
      userName: 'David Wilson',
      rating: 3,
      comment: 'Decent phone but could be better. The camera is good but not exceptional. Battery life is average. Overall okay for the price.',
      date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 3,
      verified: true
    }
  ];

  const sampleComments = [
    {
      id: 'comment1',
      userId: 'user1',
      userName: 'John Doe',
      content: 'Has anyone tried this with the latest software update? I\'m curious about compatibility and performance improvements.',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 5,
      replies: [
        {
          id: 'reply1',
          userId: 'user2',
          userName: 'Jane Smith',
          content: 'Yes, I\'ve tested it and it works perfectly with the latest update! Performance has actually improved.',
          date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          likes: 2,
          isLiked: false
        },
        {
          id: 'reply2',
          userId: 'user3',
          userName: 'Alex Brown',
          content: 'I agree with Jane. The update made the phone even smoother. Highly recommend updating.',
          date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          likes: 1,
          isLiked: false
        }
      ],
      isLiked: false
    },
    {
      id: 'comment2',
      userId: 'user4',
      userName: 'Alex Wilson',
      content: 'Great product! The build quality is impressive and it feels very premium. The camera quality is outstanding.',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 8,
      replies: [],
      isLiked: false
    },
    {
      id: 'comment3',
      userId: 'user5',
      userName: 'Maria Garcia',
      content: 'Does anyone know if this phone supports wireless charging? I couldn\'t find this information in the specs.',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 3,
      replies: [
        {
          id: 'reply3',
          userId: 'user6',
          userName: 'Tom Lee',
          content: 'No, this model doesn\'t support wireless charging. You\'ll need to use the included USB-C cable.',
          date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          likes: 0,
          isLiked: false
        }
      ],
      isLiked: false
    }
  ];

  const [reviews, setReviews] = useState(sampleReviews);
  const [comments, setComments] = useState(sampleComments);

  const handleReviewSubmit = (rating: number, comment: string) => {
    const newReview = {
      id: Date.now().toString(),
      userId: 'currentUser',
      userName: 'You',
      rating,
      comment,
      date: new Date().toISOString(),
      helpful: 0,
      verified: false
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const handleCommentSubmit = (content: string) => {
    const newComment = {
      id: 'comment' + Date.now(),
      userId: 'currentUser',
      userName: 'You',
      content,
      date: new Date().toISOString(),
      likes: 0,
      replies: [],
      isLiked: false
    };
    setComments(prev => [newComment, ...prev]);
  };

  const handleReplySubmit = (commentId: string, content: string) => {
    const newReply = {
      id: 'reply' + Date.now(),
      userId: 'currentUser',
      userName: 'You',
      content,
      date: new Date().toISOString(),
      likes: 0,
      isLiked: false
    };
    
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...comment.replies, newReply] }
        : comment
    ));
  };

  const handleLikeComment = (commentId: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1, isLiked: !comment.isLiked }
        : comment
    ));
  };

  const handleLikeReply = (commentId: string, replyId: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? {
            ...comment, 
            replies: comment.replies.map(reply => 
              reply.id === replyId 
                ? { ...reply, likes: reply.likes + 1, isLiked: !reply.isLiked }
                : reply
            )
          }
        : comment
    ));
  };

  const handleReviewHelpful = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Unified Product Framework Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience our comprehensive product framework featuring 360° views, 
            detailed descriptions, rating systems, and interactive comments. 
            All products now use this unified framework for consistent user experience.
          </p>
        </div>

        {/* Main Product Framework */}
        <UnifiedProductFramework 
          product={sampleProduct}
          relatedProducts={sampleRelatedProducts}
        />

        {/* Rating and Review System */}
        <div className="mt-8">
          <ProductRatingSystem
            productId={sampleProduct.id}
            averageRating={sampleProduct.rating || 0}
            totalRatings={sampleProduct.ratingCount || 0}
            reviews={reviews}
            onReviewSubmit={handleReviewSubmit}
            onReviewHelpful={handleReviewHelpful}
          />
        </div>

        {/* Comments System */}
        <div className="mt-8">
          <ProductCommentsSystem
            productId={sampleProduct.id}
            comments={comments}
            onCommentSubmit={handleCommentSubmit}
            onReplySubmit={handleReplySubmit}
            onLikeComment={handleLikeComment}
            onLikeReply={handleLikeReply}
          />
        </div>

        {/* 360° View Demo */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            360° Product View Demo
          </h2>
          <div className="max-w-2xl mx-auto">
            <Product360View
              images={[
                "/placeholder.png",
                "/placeholder.png", 
                "/placeholder.png",
                "/placeholder.png",
                "/placeholder.png",
                "/placeholder.png"
              ]}
              alt="360° View Demo"
              className="w-full"
            />
          </div>
        </div>

        {/* Features Overview */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Framework Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">360° Views</h3>
              <p className="text-gray-600">Interactive 360-degree product rotation with drag controls and auto-rotation features.</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Rating System</h3>
              <p className="text-gray-600">Comprehensive rating and review system with filtering, sorting, and helpful voting.</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Comments System</h3>
              <p className="text-gray-600">Interactive comments with replies, likes, and real-time engagement features.</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Page Description</h3>
              <p className="text-gray-600">Detailed product descriptions with specifications, features, and comprehensive information.</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Unified Framework</h3>
              <p className="text-gray-600">Consistent experience across all products with reusable components and standardized layouts.</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Fast Performance</h3>
              <p className="text-gray-600">Optimized components with smooth animations and responsive design for all devices.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
