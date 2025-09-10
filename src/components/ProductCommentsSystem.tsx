"use client";

import { useEffect, useState } from 'react';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  date: string;
  likes: number;
  replies: Reply[];
  isLiked: boolean;
}

interface Reply {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  date: string;
  likes: number;
  isLiked: boolean;
}

interface ProductCommentsSystemProps {
  productId: number;
  comments?: Comment[];
  onCommentSubmit?: (content: string) => void;
  onReplySubmit?: (commentId: string, content: string) => void;
  onLikeComment?: (commentId: string) => void;
  onLikeReply?: (commentId: string, replyId: string) => void;
  className?: string;
}

export default function ProductCommentsSystem({
  productId,
  comments = [],
  onCommentSubmit,
  onReplySubmit,
  onLikeComment,
  onLikeReply,
  className = ""
}: ProductCommentsSystemProps) {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'most_liked'>('newest');
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [likedReplies, setLikedReplies] = useState<Set<string>>(new Set());

  // Load liked comments from localStorage
  useEffect(() => {
    const storageKey = `gt_product_likes_${productId}`;
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(storageKey) : null;
    if (saved) {
      const data = JSON.parse(saved);
      setLikedComments(new Set(data.comments || []));
      setLikedReplies(new Set(data.replies || []));
    }
  }, [productId]);

  // Save liked comments to localStorage
  const saveLikes = (comments: Set<string>, replies: Set<string>) => {
    const storageKey = `gt_product_likes_${productId}`;
    const data = {
      comments: Array.from(comments),
      replies: Array.from(replies)
    };
    window.localStorage.setItem(storageKey, JSON.stringify(data));
  };

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    try {
      if (onCommentSubmit) {
        onCommentSubmit(newComment.trim());
      }
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle reply submission
  const handleReplySubmit = async (commentId: string) => {
    if (!replyContent.trim()) return;
    
    setIsSubmitting(true);
    try {
      if (onReplySubmit) {
        onReplySubmit(commentId, replyContent.trim());
      }
      setReplyContent('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle comment like
  const handleLikeComment = (commentId: string) => {
    const newLikedComments = new Set(likedComments);
    if (newLikedComments.has(commentId)) {
      newLikedComments.delete(commentId);
    } else {
      newLikedComments.add(commentId);
    }
    setLikedComments(newLikedComments);
    saveLikes(newLikedComments, likedReplies);
    
    if (onLikeComment) {
      onLikeComment(commentId);
    }
  };

  // Handle reply like
  const handleLikeReply = (commentId: string, replyId: string) => {
    const newLikedReplies = new Set(likedReplies);
    const replyKey = `${commentId}-${replyId}`;
    if (newLikedReplies.has(replyKey)) {
      newLikedReplies.delete(replyKey);
    } else {
      newLikedReplies.add(replyKey);
    }
    setLikedReplies(newLikedReplies);
    saveLikes(likedComments, newLikedReplies);
    
    if (onLikeReply) {
      onLikeReply(commentId, replyId);
    }
  };

  // Sort comments
  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'most_liked':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">
          Comments ({comments.length})
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="most_liked">Most Liked</option>
        </select>
      </div>

      {/* Comment Form */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Add a Comment</h4>
        <div className="space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts about this product..."
            className="w-full border border-gray-300 rounded-lg p-3 min-h-[120px] resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex justify-end">
            <button
              onClick={handleCommentSubmit}
              disabled={isSubmitting || !newComment.trim()}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isSubmitting || !newComment.trim()
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {sortedComments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No comments yet. Be the first to comment!
          </div>
        ) : (
          sortedComments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-lg p-6 shadow-sm border">
              {/* Comment Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {comment.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{comment.userName}</div>
                    <div className="text-sm text-gray-500">{formatDate(comment.date)}</div>
                  </div>
                </div>
              </div>

              {/* Comment Content */}
              <p className="text-gray-700 mb-4 whitespace-pre-wrap">{comment.content}</p>

              {/* Comment Actions */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLikeComment(comment.id)}
                  className={`flex items-center gap-1 text-sm transition-colors ${
                    likedComments.has(comment.id)
                      ? 'text-red-600'
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.734a1 1 0 001.555.832l3.5-2.5a1 1 0 000-1.664l-3.5-2.5A1 1 0 006 10.333zM14.5 2a1.5 1.5 0 00-1.5 1.5v6a1.5 1.5 0 001.5 1.5h1.5a1.5 1.5 0 001.5-1.5v-6a1.5 1.5 0 00-1.5-1.5h-1.5z" />
                  </svg>
                  Like ({comment.likes + (likedComments.has(comment.id) ? 1 : 0)})
                </button>
                <button
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Reply
                </button>
              </div>

              {/* Reply Form */}
              {replyingTo === comment.id && (
                <div className="mt-4 pl-12 border-l-2 border-gray-200">
                  <div className="space-y-3">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      className="w-full border border-gray-300 rounded-lg p-3 min-h-[80px] resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReplySubmit(comment.id)}
                        disabled={isSubmitting || !replyContent.trim()}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isSubmitting || !replyContent.trim()
                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {isSubmitting ? 'Posting...' : 'Post Reply'}
                      </button>
                      <button
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyContent('');
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 pl-12 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {reply.userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 text-sm">{reply.userName}</div>
                            <div className="text-xs text-gray-500">{formatDate(reply.date)}</div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-2 whitespace-pre-wrap">{reply.content}</p>
                      <button
                        onClick={() => handleLikeReply(comment.id, reply.id)}
                        className={`flex items-center gap-1 text-xs transition-colors ${
                          likedReplies.has(`${comment.id}-${reply.id}`)
                            ? 'text-red-600'
                            : 'text-gray-600 hover:text-red-600'
                        }`}
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.734a1 1 0 001.555.832l3.5-2.5a1 1 0 000-1.664l-3.5-2.5A1 1 0 006 10.333zM14.5 2a1.5 1.5 0 00-1.5 1.5v6a1.5 1.5 0 001.5 1.5h1.5a1.5 1.5 0 001.5-1.5v-6a1.5 1.5 0 00-1.5-1.5h-1.5z" />
                        </svg>
                        Like ({reply.likes + (likedReplies.has(`${comment.id}-${reply.id}`) ? 1 : 0)})
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {sortedComments.length > 0 && (
        <div className="text-center">
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Load More Comments
          </button>
        </div>
      )}
    </div>
  );
}
