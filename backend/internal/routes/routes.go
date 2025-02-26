package routes

import (
	"net/http"

	"github.com/USER/sauna-compore-app/internal/websocket"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	// 登録エンドポイントの追加
	router.POST("/register", handleRegister)

	// ログアウトエンドポイントの追加
	router.DELETE("/unregister", handleUnregister)
	router.GET("/search", handleSearch)
	router.DELETE("/unregister", handleUnregister)

	// アカウント修正エンドポイントの追加
	router.PUT("/account", handleUpdateAccount)
}

func RegisterRoutes(r *gin.Engine) {
	// 既存のルート

	// WebSocketルートを追加
	r.GET("/ws", websocket.HandleWebSocket)
}

func handleUpdateAccount(c *gin.Context) {
	// TODO: Implement account update logic
	c.JSON(http.StatusOK, gin.H{
		"message": "Account update endpoint",
	})
}

func handleLogout(c *gin.Context) {
	// セッションクッキーをクリア
	c.SetCookie("session_token", "", -1, "/", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		"message": "Successfully logged out",
	})
}

func handleRegister(c *gin.Context) {
	// TODO: Implement user registration logic
	c.JSON(http.StatusOK, gin.H{
		"message": "Registration endpoint",
	})
}

func handleUnregister(c *gin.Context) {
	// TODO: Implement user unregistration logic
	c.JSON(http.StatusOK, gin.H{
		"message": "Unregistration endpoint",
	})
}

func handleSearch(c *gin.Context) {
	// TODO: Implement search logic
	c.JSON(http.StatusOK, gin.H{
		"message": "Search endpoint",
	})
}
