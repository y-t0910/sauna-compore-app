# ベースイメージ
FROM node:18

# 作業ディレクトリの作成
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# Reactアプリのビルド
RUN npm run build

# サーバーの起動
CMD ["npm", "start"]

# コンテナのポートを公開
EXPOSE 3000
