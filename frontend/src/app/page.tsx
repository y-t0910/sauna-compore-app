import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">サウナCompore</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/chat" className="p-6 border rounded-lg hover:bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">チャット</h2>
          <p>サウナユーザーとリアルタイムでチャット</p>
        </Link>
        {/* 他の機能へのリンク */}
      </div>
    </main>
  )
}