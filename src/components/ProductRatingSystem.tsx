"use client";

import { useEffect, useState } from 'react';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

interface ProductRatingSystemProps {
  productId: number;
  averageRating?: number;
  totalRatings?: number;
  reviews?: Review[];
  onReviewSubmit?: (rating: number, comment: string) => void;
  onReviewHelpful?: (reviewId: string) => void;
  className?: string;
}

export default function ProductRatingSystem({
  productId,
  averageRating = 0,
  totalRatings = 0,
  reviews = [],
  onReviewSubmit,
  onReviewHelpful,
  className = ""
}: ProductRatingSystemProps) {
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [filterRating, setFilterRating] = useState(0);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const [helpfulReviews, setHelpfulReviews] = useState<Set<string>>(new Set());

  // Load user's previous review
  useEffect(() => {
    const storageKey = `gt_product_review_${productId}`;
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(storageKey) : null;
    if (saved) {
      const review = JSON.parse(saved);
      setUserRating(review.rating || 0);
      setUserComment(review.comment || '');
    }
  }, [productId]);

  // Handle rating submission
  const handleSubmitReview = async () => {
    if (userRating === 0) return;
    
    setIsSubmitting(true);
    try {
      // Save to localStorage
      const storageKey = `gt_product_review_${productId}`;
      const reviewData = {
        rating: userRating,
        comment: userComment,
        date: new Date().toISOString()
      };
      window.localStorage.setItem(storageKey, JSON.stringify(reviewData));
      
      // Call parent callback
      if (onReviewSubmit) {
        onReviewSubmit(userRating, userComment);
      }
      
      setShowReviewForm(false);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle helpful review
  const handleHelpful = (reviewId: string) => {
    if (helpfulReviews.has(reviewId)) return;
    
    setHelpfulReviews(prev => new Set([...prev, reviewId]));
    if (onReviewHelpful) {
      onReviewHelpful(reviewId);
    }
  };

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(review => filterRating === 0 || review.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    stars: star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: totalRatings > 0 ? (reviews.filter(r => r.rating === star).length / totalRatings) * 100 : 0
  }));

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overall Rating Summary */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Customer Reviews</h3>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Write a Review
          </button>
        </div>

        <div className="flex items-center gap-8">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <svg
                  key={idx}
                  className="w-6 h-6"
                  fill={idx < Math.floor(averageRating) ? '#f59e0b' : '#d1d5db'}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              Based on {totalRatings} review{totalRatings !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1">
            {ratingDistribution.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-700">{stars}</span>
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Write Your Review</h4>
          
          {/* Rating Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating *
            </label>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setUserRating(idx + 1)}
                  className="transition-transform hover:scale-110"
                >
                  <svg
                    className="w-8 h-8"
                    fill={idx < userRating ? '#f59e0b' : '#d1d5db'}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {userRating > 0 ? `${userRating} star${userRating > 1 ? 's' : ''}` : 'Click to rate'}
              </span>
            </div>
          </div>

          {/* Comment Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              placeholder="Share your experience with this product..."
              className="w-full border border-gray-300 rounded-lg p-3 min-h-[120px] resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSubmitReview}
              disabled={isSubmitting || userRating === 0}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isSubmitting || userRating === 0
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
            <button
              onClick={() => setShowReviewForm(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterRating(0)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filterRating === 0
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({totalRatings})
          </button>
          {[5, 4, 3, 2, 1].map(rating => {
            const count = reviews.filter(r => r.rating === rating).length;
            return (
              <button
                key={rating}
                onClick={() => setFilterRating(rating)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterRating === rating
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {rating} star{count > 0 ? ` (${count})` : ''}
              </button>
            );
          })}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {filterRating === 0 ? 'No reviews yet' : `No ${filterRating}-star reviews`}
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {review.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">{review.userName}</span>
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <svg
                          key={idx}
                          className="w-4 h-4"
                          fill={idx < review.rating ? '#f59e0b' : '#d1d5db'}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.175 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </div>
              </div>

              <p className="text-gray-700 mb-3">{review.comment}</p>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleHelpful(review.id)}
                  disabled={helpfulReviews.has(review.id)}
                  className={`flex items-center gap-1 text-sm transition-colors ${
                    helpfulReviews.has(review.id)
                      ? 'text-green-600'
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.734a1 1 0 001.555.832l3.5-2.5a1 1 0 000-1.664l-3.5-2.5A1 1 0 006 10.333zM14.5 2a1.5 1.5 0 00-1.5 1.5v6a1.5 1.5 0 001.5 1.5h1.5a1.5 1.5 0 001.5-1.5v-6a1.5 1.5 0 00-1.5-1.5h-1.5z" />
                  </svg>
                  Helpful ({review.helpful + (helpfulReviews.has(review.id) ? 1 : 0)})
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {filteredReviews.length > 0 && (
        <div className="text-center">
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
}
