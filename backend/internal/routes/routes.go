package routes

import (
	"backend/internal/websocket"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	// APIエンドポイント
	api := r.Group("/api")
	{
		api.POST("/login", handleLogin)
		api.POST("/register", handleRegister)
		api.DELETE("/unregister", handleUnregister)
		// 他のAPIエンドポイント
	}

	// WebSocketエンドポイント
	r.GET("/ws", websocket.HandleWebSocket)
}

func handleUpdateAccount(c *gin.Context) {
	// TODO: Implement account update logic
	c.JSON(http.StatusOK, gin.H{
		"message": "Account update endpoint",
	})
}

func handleLogin(c *gin.Context) {
	// TODO: Implement user login logic
	c.JSON(http.StatusOK, gin.H{
		"message": "Login endpoint",
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
