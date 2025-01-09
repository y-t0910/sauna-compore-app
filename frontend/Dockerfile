# ベースイメージ
FROM node:18-alpine

# 作業ディレクトリの作成
WORKDIR /app

# 環境変数の設定
ENV NODE_ENV=development
ENV PATH /app/node_modules/.bin:$PATH

# package.json と package-lock.json をコピー
COPY package*.json ./

# キャッシュクリアとnpmの更新を追加
RUN npm cache clean --force && \
    npm install -g npm@latest && \
    npm install --legacy-peer-deps

# アプリケーションのソースコードをコピー
COPY . .

# コンテナのポートを公開
EXPOSE 3000

# サーバーの起動
CMD ["npm", "start"]
