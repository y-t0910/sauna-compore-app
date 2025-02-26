import React, { useState } from 'react';
import { CreateReviewRequest } from '../types';

interface Props {
  saunaId: number;
  onSubmit: (review: CreateReviewRequest) => Promise<void>;
}

const ReviewForm: React.FC<Props> = ({ saunaId, onSubmit }) => {
  const [review, setReview] = useState<CreateReviewRequest>({
    saunaId: saunaId,
    rating: 5,
    comment: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(review);
      setReview({ ...review, comment: '' }); // フォームをリセット
      alert('レビューを投稿しました');
    } catch (error) {
      alert('レビューの投稿に失敗しました');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 border-t pt-2">
      <div className="mb-2">
        <label className="block text-sm font-medium">評価:</label>
        <select
          value={review.rating}
          onChange={(e) => setReview({ ...review, rating: parseInt(e.target.value) })}
          className="p-1 border rounded"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}⭐</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">コメント:</label>
        <textarea
          value={review.comment}
          onChange={(e) => setReview({ ...review, comment: e.target.value })}
          required
          minLength={10}
          maxLength={500}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded text-sm">レビューを投稿</button>
    </form>
  );
};

export default ReviewForm;