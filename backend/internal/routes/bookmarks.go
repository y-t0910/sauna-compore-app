package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Bookmark struct {
	ID          uint   `json:"id"`
	UserID      uint   `json:"user_id"`
	SaunaID     uint   `json:"sauna_id"`
	Description string `json:"description"`
}

func SetupBookmarkRoutes(router *gin.Engine) {
	bookmarks := router.Group("/api/bookmarks")
	{
		bookmarks.POST("", createBookmark)
		bookmarks.GET("", getUserBookmarks)
		bookmarks.DELETE("/:id", deleteBookmark)
	}
}

func createBookmark(c *gin.Context) {
	var bookmark Bookmark
	if err := c.ShouldBindJSON(&bookmark); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// TODO: Implement bookmark creation logic with database

	c.JSON(http.StatusCreated, bookmark)
}

func getUserBookmarks(c *gin.Context) {
	userID := c.Query("user_id")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user_id is required"})
		return
	}

	// TODO: Implement get bookmarks logic with database

	bookmarks := []Bookmark{}
	c.JSON(http.StatusOK, bookmarks)
}

func deleteBookmark(c *gin.Context) {
	bookmarkID := c.Param("id")
	if bookmarkID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bookmark ID is required"})
		return
	}

	// TODO: Implement delete bookmark logic with database

	c.JSON(http.StatusOK, gin.H{"message": "Bookmark deleted successfully"})
}
