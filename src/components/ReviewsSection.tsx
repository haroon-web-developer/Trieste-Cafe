import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, CheckCircle, Plus, X } from 'lucide-react';
import { REVIEWS_DATA, RESTAURANT_INFO, ReviewItem } from '../data/restaurantData';

export const ReviewsSection: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS_DATA);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});

  // Review form states
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newTag, setNewTag] = useState('steaks');

  const tags = [
    { id: 'all', label: 'All Reviews', count: 1883 },
    { id: 'steaks', label: 'Steaks', count: 139 },
    { id: 'chicken steaks', label: 'Chicken Steaks', count: 20 },
    { id: 'buy one get one free', label: 'Buy One Get One', count: 10 },
    { id: 'steak deal', label: 'Steak Deals', count: 8 },
  ];

  const filteredReviews = reviewsList.filter((rev) => {
    if (selectedTag === 'all') return true;
    return rev.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase()));
  });

  const handleHelpfulClick = (id: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: ReviewItem = {
      id: `review-${Date.now()}`,
      author: newAuthor.trim(),
      avatarText: newAuthor.substring(0, 2).toUpperCase(),
      rating: newRating,
      timeAgo: 'Just now',
      reviewMeta: 'Verified Diner · Google Maps',
      content: newComment.trim(),
      tags: [newTag, 'diner review'],
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsWriteModalOpen(false);
    setNewAuthor('');
    setNewComment('');
  };

  return (
    <section id="reviews" className="py-24 bg-[#0e0e12] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/5">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
              Google Customer Reviews
            </p>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Verified Dining Experiences
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Honest impressions from over 1,880 diners in Islamabad and Rawalpindi.
            </p>
          </div>

          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Rating Breakdown Scorecard */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-900/40 border border-white/5 rounded-2xl p-6 sm:p-8">
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-white/5 pb-6 lg:pb-0 lg:pr-8">
            <div className="flex items-baseline gap-2">
              <span className="font-cinzel text-6xl font-extrabold text-white tabular-nums">4.2</span>
              <span className="text-zinc-500 text-lg">/ 5.0</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'text-amber-400/40 fill-amber-400/20'}`}
                />
              ))}
            </div>
            <p className="mt-3 text-xs text-zinc-400">
              Based on <strong className="text-zinc-200 tabular-nums">1,883 Google reviews</strong>
            </p>
            <span className="mt-1 text-[11px] text-zinc-500">
              Price Range: Rs 1,000–6,000 per person
            </span>
          </div>

          {/* Progress distribution */}
          <div className="lg:col-span-8 space-y-2">
            {[
              { stars: 5, pct: 64, count: '1,205' },
              { stars: 4, pct: 20, count: '376' },
              { stars: 3, pct: 8, count: '150' },
              { stars: 2, pct: 4, count: '75' },
              { stars: 1, pct: 4, count: '77' },
            ].map((row) => (
              <div key={row.stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 text-zinc-400 font-medium">{row.stars} stars</span>
                <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span className="w-14 text-right text-zinc-500 tabular-nums">{row.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter tags */}
        <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setSelectedTag(tag.id)}
              className={`px-3.5 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedTag === tag.id
                  ? 'bg-amber-400 text-zinc-950 font-semibold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-white/5'
              }`}
            >
              <span>{tag.label}</span>
              <span className="ml-1.5 opacity-60 text-[11px] tabular-nums">({tag.count})</span>
            </button>
          ))}
        </div>

        {/* Reviews List Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#121318] border border-white/5 rounded-xl p-6 flex flex-col justify-between hover:border-white/10 transition-colors"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-300 font-semibold text-xs flex items-center justify-center border border-amber-500/30">
                      {rev.avatarText}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white leading-tight">{rev.author}</h4>
                      <p className="text-[11px] text-zinc-500 mt-0.5">{rev.reviewMeta}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-zinc-500">{rev.timeAgo}</span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-zinc-700'
                      }`}
                    />
                  ))}
                </div>

                {/* Comment Text */}
                <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {rev.content}
                </p>

                {/* Real Owner Response if present */}
                {rev.ownerResponse && (
                  <div className="mt-4 p-3.5 rounded-lg bg-zinc-900/90 border-l-2 border-amber-400 text-xs">
                    <div className="flex items-center justify-between text-[11px] text-amber-400 font-semibold mb-1">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Response from {RESTAURANT_INFO.name}
                      </span>
                      <span className="text-zinc-500">{rev.ownerResponse.date}</span>
                    </div>
                    <p className="text-zinc-300 italic">{rev.ownerResponse.text}</p>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500">
                <button
                  onClick={() => handleHelpfulClick(rev.id)}
                  className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful {helpfulCounts[rev.id] ? `(${helpfulCounts[rev.id]})` : ''}</span>
                </button>
                <div className="flex items-center gap-1 text-[11px] text-zinc-500">
                  <span>Google Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#14151b] border border-zinc-800 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <h3 className="font-cinzel text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                Write a Diner Review
              </h3>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g., Usman Tariq"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Overall Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewRating(s)}
                      className="p-1 text-amber-400 focus:outline-none cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${s <= newRating ? 'fill-amber-400' : 'text-zinc-700'}`}
                      />
                    </button>
                  ))}
                  <span className="text-zinc-400 font-medium ml-2">{newRating} of 5 stars</span>
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Dish Highlight</label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="steaks">Mushroom Steak / Beef Cuts</option>
                  <option value="italian steak">Italian Steak</option>
                  <option value="chicken steaks">Grilled Chicken Steaks</option>
                  <option value="burgers">Burgers & Fries</option>
                  <option value="cappuccino">Artisan Coffee & Drinks</option>
                  <option value="service">Hospitality & Service</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">Your Review</label>
                <textarea
                  rows={4}
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share details of your experience, food quality, temperature, and service..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-md cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
