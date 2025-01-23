package main

import (
	"log"
	"sauna-compore-app/internal/database"
	"sauna-compore-app/internal/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// データベース初期化
	database.InitDB()
	defer database.DB.Close()

	// Ginの初期化
	r := gin.Default()

	// CORSの設定
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept"}
	r.Use(cors.New(config))

	// ルートの登録
	routes.RegisterRoutes(r)

	// サーバー起動
	log.Fatal(r.Run(":8080"))
}
