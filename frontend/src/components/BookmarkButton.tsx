import React, { useState } from 'react';

// Props型を明示的に定義してexportする
export interface BookmarkButtonProps {
  saunaId: number; // saunaIdは必須
  isBookmarked: boolean;
  onBookmark: (saunaId: number) => Promise<void>;
  onShare: (saunaId: number, targetUserId: number, message: string) => Promise<void>;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ saunaId, isBookmarked, onBookmark, onShare }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [targetUserId, setTargetUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleBookmarkClick = () => {
    onBookmark(saunaId);
  };

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onShare(saunaId, parseInt(targetUserId), message);
      setShowShareModal(false);
      setTargetUserId('');
      setMessage('');
    } catch (error) {
      console.error('Error sharing bookmark:', error);
    }
  };

  return (
    <div className="mt-3">
      <button 
        onClick={handleBookmarkClick}
        className={`mr-2 px-3 py-1 rounded ${isBookmarked 
          ? 'bg-yellow-400 text-white' 
          : 'bg-gray-200 text-gray-700'}`}
      >
        {isBookmarked ? '★ ブックマーク済み' : '☆ ブックマーク'}
      </button>
      
      <button 
        onClick={() => setShowShareModal(true)}
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        共有
      </button>

      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-80">
            <h3 className="text-lg font-bold mb-3">ブックマークを共有</h3>
            <form onSubmit={handleShare}>
              <div className="mb-3">
                <label className="block mb-1">共有するユーザーID:</label>
                <input
                  type="number"
                  placeholder="ユーザーID"
                  value={targetUserId}
                  onChange={(e) => setTargetUserId(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1">メッセージ:</label>
                <textarea
                  placeholder="メッセージを入力してください"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowShareModal(false)}
                  className="mr-2 px-3 py-1 bg-gray-300 rounded"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  共有する
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarkButton;