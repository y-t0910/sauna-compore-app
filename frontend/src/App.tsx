import React, { useEffect, useState } from 'react';
import { Sauna, RegisterFormData, UpdateUserRequest, SaunaSearchParams, CreateReviewRequest, SaunaFacility } from './types';
import RegisterForm from './components/RegisterForm';
import UpdateAccountForm from './components/UpdateAccountForm';
import SaunaSearchForm from './components/SaunaSearchForm';
import ReviewForm from './components/ReviewForm';
import FacilityDisplay from './components/FacilityDisplay';
import BookmarkButton from './components/BookmarkButton';

// Simple mobile navigation component
const MobileNav = () => {
  return (
    <nav className="mobile-navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/search">Search</a></li>
        <li><a href="/account">My Account</a></li>
      </ul>
    </nav>
  );
};


interface UpdateAccountFormProps {
  currentUser: {
    id: number;
    username: string;
    email: string;
  };
  onUpdate: (updateData: UpdateUserRequest) => Promise<void>;
}

function App() {
  const [data, setData] = useState<Sauna[]>([]);
  const [facilityData, setFacilityData] = useState<Record<number, SaunaFacility>>({});
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());

  const handleRegisterSubmit = (formData: RegisterFormData) => {
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/saunas');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      if (error instanceof Error) {
        alert('データの取得に失敗しました: ' + error.message);
      }
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Logout failed');
      }
      // ログアウト後の処理（例：ステート初期化）
      setData([]);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('本当にアカウントを削除しますか？')) {
      return;
    }

    try {
      const userId = '1'; // TODO: 実際のユーザーIDを使用
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      const result = await response.json();
      if (result.success) {
        alert('アカウントが削除されました');
        // TODO: ログアウト処理とリダイレクト
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('アカウントの削除に失敗しました');
    }
  };

  const handleUpdateAccount = async (updateData: UpdateUserRequest) => {
    try {
      const userId = '1'; // TODO: 実際のユーザーIDを使用
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error('Failed to update account');
      }

      const result = await response.json();
      if (result.success) {
        alert('アカウント情報を更新しました');
      }
    } catch (error) {
      console.error('Error updating account:', error);
      throw error;
    }
  };

  const handleSearch = async (searchParams: SaunaSearchParams) => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          queryParams.append(key, String(value));
        }
      });

      const response = await fetch(`http://localhost:8080/saunas/search?${queryParams}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }

      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error searching saunas:', error);
      alert('検索に失敗しました');
    }
  };

  const handleReviewSubmit = async (review: CreateReviewRequest) => {
    try {
      const response = await fetch('http://localhost:8080/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const result = await response.json();
      if (result.success) {
        // TODO: レビュー一覧を更新
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  };

  const fetchFacilityData = async (saunaId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/facilities/sauna/${saunaId}`);
      if (!response.ok) throw new Error('Failed to fetch facility data');
      const result = await response.json();
      if (result.success) {
        setFacilityData(prev => ({...prev, [saunaId]: result.data}));
      }
    } catch (error) {
      console.error('Error fetching facility data:', error);
    }
  };

  const handleBookmark = async (saunaId: number) => {
    try {
      if (bookmarks.has(saunaId)) {
        // TODO: 削除APIの呼び出し
        bookmarks.delete(saunaId);
      } else {
        const response = await fetch('http://localhost:8080/bookmarks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ saunaId }),
        });
        
        if (!response.ok) throw new Error('Failed to bookmark');
        bookmarks.add(saunaId);
      }
      setBookmarks(new Set(bookmarks));
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleShareBookmark = async (saunaId: number, targetUserId: number, message: string) => {
    try {
      const response = await fetch('http://localhost:8080/bookmarks/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ saunaId, targetUserId, message }),
      });

      if (!response.ok) throw new Error('Failed to share bookmark');
      alert('ブックマークを共有しました！');
    } catch (error) {
      console.error('Error sharing bookmark:', error);
      alert('共有に失敗しました');
    }
  };

  return (
    <div>
      <MobileNav />
      <h1>Sauna List</h1>
      <SaunaSearchForm onSearch={handleSearch} />
      <RegisterForm onSubmit={handleRegisterSubmit} />
      <ul>
      {data.map((sauna: Sauna) => (
        <div key={sauna.id}>
          <li>{sauna.name} - {sauna.location}</li>
          {facilityData[sauna.id] && (
            <FacilityDisplay facility={facilityData[sauna.id]} />
          )}
          <button onClick={() => fetchFacilityData(sauna.id)}>
            施設情報を表示
          </button>
          <ReviewForm saunaId={sauna.id} onSubmit={(reviewData) => handleReviewSubmit({ ...reviewData, saunaId: sauna.id })} />
          <BookmarkButton
            saunaId={sauna.id}
            isBookmarked={bookmarks.has(sauna.id)}
            onBookmark={handleBookmark}
            onShare={handleShareBookmark}
          />
        </div>
      ))}
      </ul>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDeleteAccount} style={{ backgroundColor: 'red', color: 'white' }}>
      退会する
      </button>
      {/* ダミーユーザーデータを使用 */}
      <UpdateAccountForm
      currentUser={{ id: 1, username: "testuser", email: "test@example.com" }}
      onUpdate={handleUpdateAccount}
      />
    </div>
  );
}

export default App;
