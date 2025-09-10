"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import UnifiedProductFramework from '../../../components/UnifiedProductFramework';
import ProductRatingSystem from '../../../components/ProductRatingSystem';
import ProductCommentsSystem from '../../../components/ProductCommentsSystem';

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    async function loadProduct() {
      if (!id) return;
      setLoading(true);
      setError("");
      try {
        // Mock API call - replace with actual API
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        
        const data = await response.json();
        
        if (!isMounted) return;
        
        setProduct(data.product);
        setRelatedProducts(data.relatedProducts || []);
        
        // Mock reviews and comments - replace with actual API calls
        setReviews([
          {
            id: '1',
            userId: 'user1',
            userName: 'Sarah Johnson',
            rating: 5,
            comment: 'Excellent product! Great quality and fast delivery. Highly recommended.',
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            helpful: 12,
            verified: true
          },
          {
            id: '2',
            userId: 'user2',
            userName: 'Mike Chen',
            rating: 4,
            comment: 'Good value for money. Works as expected. Minor issue with packaging but product is perfect.',
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            helpful: 8,
            verified: true
          },
          {
            id: '3',
            userId: 'user3',
            userName: 'Emily Davis',
            rating: 5,
            comment: 'Amazing quality! Exceeded my expectations. Will definitely buy again.',
            date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            helpful: 15,
            verified: false
          }
        ]);

        setComments([
          {
            id: 'comment1',
            userId: 'user1',
            userName: 'John Doe',
            content: 'Has anyone tried this with the latest software update? I\'m curious about compatibility.',
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            likes: 5,
            replies: [
              {
                id: 'reply1',
                userId: 'user2',
                userName: 'Jane Smith',
                content: 'Yes, I\'ve tested it and it works perfectly with the latest update!',
                date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
                likes: 2,
                isLiked: false
              }
            ],
            isLiked: false
          },
          {
            id: 'comment2',
            userId: 'user3',
            userName: 'Alex Wilson',
            content: 'Great product! The build quality is impressive and it feels very premium.',
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            likes: 8,
            replies: [],
            isLiked: false
          }
        ]);
      } catch (e: any) {
        setError(e?.message || 'Unable to load product');
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
    return () => { isMounted = false; };
  }, [id]);

  const handleReviewSubmit = (rating: number, comment: string) => {
    // Handle review submission
    console.log('Review submitted:', { rating, comment });
    // Add to reviews state or call API
  };

  const handleCommentSubmit = (content: string) => {
    // Handle comment submission
    console.log('Comment submitted:', content);
    // Add to comments state or call API
  };

  const handleReplySubmit = (commentId: string, content: string) => {
    // Handle reply submission
    console.log('Reply submitted:', { commentId, content });
    // Add to replies state or call API
  };

  const handleLikeComment = (commentId: string) => {
    // Handle comment like
    console.log('Comment liked:', commentId);
    // Update likes state or call API
  };

  const handleLikeReply = (commentId: string, replyId: string) => {
    // Handle reply like
    console.log('Reply liked:', { commentId, replyId });
    // Update likes state or call API
  };

  const handleReviewHelpful = (reviewId: string) => {
    // Handle review helpful
    console.log('Review marked helpful:', reviewId);
    // Update helpful state or call API
  };

  if (loading) return <div className="max-w-2xl mx-auto p-8 text-center">Loading…</div>;
  if (error || !product) return <div className="max-w-2xl mx-auto p-8 text-center text-red-600">{error || 'Product not found.'}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Main Product Framework */}
      <UnifiedProductFramework 
        product={product}
        relatedProducts={relatedProducts}
      />

      {/* Rating and Review System */}
      <div className="mt-8">
        <ProductRatingSystem
          productId={product.id}
          averageRating={product.rating || 0}
          totalRatings={product.ratingCount || 0}
          reviews={reviews}
          onReviewSubmit={handleReviewSubmit}
          onReviewHelpful={handleReviewHelpful}
        />
      </div>

      {/* Comments System */}
      <div className="mt-8">
        <ProductCommentsSystem
          productId={product.id}
          comments={comments}
          onCommentSubmit={handleCommentSubmit}
          onReplySubmit={handleReplySubmit}
          onLikeComment={handleLikeComment}
          onLikeReply={handleLikeReply}
        />
      </div>
    </div>
  );
}
