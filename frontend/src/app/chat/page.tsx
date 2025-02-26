'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: number;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const websocket = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ユーザー名設定画面
  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      connectWebSocket();
    }
  };

  // WebSocket接続
  const connectWebSocket = () => {
    const userId = `user-${Math.floor(Math.random() * 10000)}`;
    const ws = new WebSocket(`ws://localhost:8080/ws?userId=${userId}&username=${encodeURIComponent(username)}`);

    ws.onopen = () => {
      console.log('WebSocket接続確立');
      setIsConnected(true);
      
      // 接続メッセージを送信
      const connectMessage = {
        id: crypto.randomUUID(),
        username: 'system',
        content: `${username}さんが入室しました`,
        timestamp: Date.now()
      };
      ws.send(JSON.stringify(connectMessage));
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setMessages((prev) => [...prev, message]);
      } catch (e) {
        console.error('メッセージのパースに失敗:', e);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket接続終了');
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    websocket.current = ws;
  };

  // メッセージ送信
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim() && websocket.current && isConnected) {
      const message = {
        id: crypto.randomUUID(),
        username: username,
        content: messageInput.trim(),
        timestamp: Date.now()
      };
      websocket.current.send(JSON.stringify(message));
      setMessageInput('');
    }
  };

  // 自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 接続解除
  useEffect(() => {
    return () => {
      if (websocket.current) {
        websocket.current.close();
      }
    };
  }, []);

  // ユーザー名入力画面
  if (!isConnected) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center">
            サウナチャット
          </h1>
          <form onSubmit={handleUsernameSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium">
                ニックネーム
              </label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                placeholder="名前を入力してください"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              チャットに参加
            </button>
          </form>
        </div>
      </div>
    );
  }

  // チャット画面
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-600 text-white p-4 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">サウナチャット</h1>
          <div className="text-sm">
            ようこそ <span className="font-semibold">{username}</span> さん
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden container mx-auto p-4">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white rounded">
            {messages.length === 0 ? (
              <p className="text-center text-gray-500 py-8">メッセージはまだありません</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded max-w-[80%] ${
                    msg.username === username
                      ? 'ml-auto bg-blue-100'
                      : msg.username === 'system'
                      ? 'mx-auto bg-gray-100 text-gray-600 text-sm italic'
                      : 'bg-gray-100'
                  }`}
                >
                  {msg.username !== 'system' && (
                    <div className="font-medium text-sm mb-1">{msg.username}</div>
                  )}
                  <div>{msg.content}</div>
                  <div className="text-xs text-gray-500 text-right mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} className="mt-4 flex">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 rounded-l border py-2 px-4"
              placeholder="メッセージを入力..."
            />
            <button
              type="submit"
              className="rounded-r bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
            >
              送信
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}