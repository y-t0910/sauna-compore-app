package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

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
