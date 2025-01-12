package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type ReviewHandler struct {
	// TODO: Add required dependencies like services
}

func NewReviewHandler() *ReviewHandler {
	return &ReviewHandler{}
}

func (h *ReviewHandler) RegisterRoutes(router *gin.RouterGroup) {
	reviews := router.Group("/reviews")
	{
		reviews.GET("/", h.GetReviews)
		reviews.GET("/:id", h.GetReviewByID)
		reviews.POST("/", h.CreateReview)
		reviews.PUT("/:id", h.UpdateReview)
		reviews.DELETE("/:id", h.DeleteReview)
	}
}

func (h *ReviewHandler) GetReviews(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Get all reviews"})
}

func (h *ReviewHandler) GetReviewByID(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Get review by ID"})
}

func (h *ReviewHandler) CreateReview(c *gin.Context) {
	c.JSON(http.StatusCreated, gin.H{"message": "Create review"})
}

func (h *ReviewHandler) UpdateReview(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Update review"})
}

func (h *ReviewHandler) DeleteReview(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Delete review"})
}
