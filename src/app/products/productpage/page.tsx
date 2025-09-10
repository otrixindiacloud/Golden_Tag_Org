"use client";
export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import UnifiedProductFramework from '../../../components/UnifiedProductFramework';
import ProductRatingSystem from '../../../components/ProductRatingSystem';
import ProductCommentsSystem from '../../../components/ProductCommentsSystem';

function ProductDetailPageInner() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    async function load() {
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
            replies: [],
            isLiked: false
          }
        ]);
      } catch (e) {
        setError("Unable to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleReviewSubmit = (rating: number, comment: string) => {
    console.log('Review submitted:', { rating, comment });
  };

  const handleCommentSubmit = (content: string) => {
    console.log('Comment submitted:', content);
  };

  const handleReplySubmit = (commentId: string, content: string) => {
    console.log('Reply submitted:', { commentId, content });
  };

  const handleLikeComment = (commentId: string) => {
    console.log('Comment liked:', commentId);
  };

  const handleLikeReply = (commentId: string, replyId: string) => {
    console.log('Reply liked:', { commentId, replyId });
  };

  const handleReviewHelpful = (reviewId: string) => {
    console.log('Review marked helpful:', reviewId);
  };

  if (loading) {
    return <div className="max-w-2xl mx-auto p-8 text-center">Loading…</div>;
  }
  if (error || !product) {
    return <div className="max-w-2xl mx-auto p-8 text-center text-red-600">{error || 'Product not found.'}</div>;
  }

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

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto p-8 text-center">Loading…</div>}>
      <ProductDetailPageInner />
    </Suspense>
  );
}