# ベースイメージの指定（Go公式イメージ）
FROM golang:1.23

# 作業ディレクトリの作成
WORKDIR /app

# Goモジュールの初期化と依存関係のコピー
COPY go.mod go.sum ./
RUN go mod tidy

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションのビルド
RUN go build -o main .

# コンテナがリッスンするポートを指定
EXPOSE 8080

# サーバーを起動
CMD ["./main"]
