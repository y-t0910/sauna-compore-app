package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept"}
	r.Use(cors.New(config))

	// ルートエンドポイント
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Welcome to Sauna Backend API!",
		})
	})

	// サンプルのデータエンドポイント
	r.GET("/saunas", func(c *gin.Context) {
		saunas := []gin.H{
			{"id": 1, "name": "Sauna A", "location": "Tokyo"},
			{"id": 2, "name": "Sauna B", "location": "Osaka"},
			{"id": 3, "name": "Sauna C", "location": "Nagoya"},
		}
		c.JSON(http.StatusOK, saunas)
	})

	// サーバー起動
	r.Run(":8080")
}
