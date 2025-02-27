package routes

import (
	"net/http"

	"sauna-compore-app/backend/internal/auth"
	"sauna-compore-app/backend/internal/websocket"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	// APIエンドポイント
	api := r.Group("/api")
	{
		api.POST("/login", auth.Login)
		api.POST("/register", auth.Register)
		api.DELETE("/unregister", auth.Unregister)
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
