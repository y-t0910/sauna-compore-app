import React, { useEffect, useState } from 'react';
import { Sauna, RegisterFormData, UpdateUserRequest } from './types';
import RegisterForm from './components/RegisterForm';
import UpdateAccountForm from './components/UpdateAccountForm';

function App() {
  const [data, setData] = useState<Sauna[]>([]);

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

  return (
    <div>
      <h1>Sauna List</h1>
      <RegisterForm onSubmit={handleRegisterSubmit} />
      <ul>
        {data.map((sauna: Sauna) => (
          <li key={sauna.id}>
            {sauna.name} - {sauna.location}
          </li>
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
