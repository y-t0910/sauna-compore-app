package tests

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

type Handlers struct {
	// Add any required fields for your handlers
}

func (h *Handlers) Signup(c *gin.Context) {
	// Implement signup logic for testing
}

func (h *Handlers) Login(c *gin.Context) {
	// Implement login logic for testing
}

var handlers *Handlers = &Handlers{} // Initialize handlers

func setupTestRouter() *gin.Engine {
	router := gin.Default()
	router.POST("/signup", handlers.Signup)
	router.POST("/login", handlers.Login)
	return router
}

func TestSignup(t *testing.T) {
	router := setupTestRouter()

	t.Run("successful signup", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/signup", strings.NewReader(`{
			"email": "test@example.com",
			"password": "password123"
		}`))
		req.Header.Set("Content-Type", "application/json")
		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusCreated, w.Code)
	})

	t.Run("invalid email format", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/signup", strings.NewReader(`{
			"email": "invalid-email",
			"password": "password123"
		}`))
		req.Header.Set("Content-Type", "application/json")
		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
	})
}

func TestLogin(t *testing.T) {
	router := setupTestRouter()

	t.Run("successful login", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/login", strings.NewReader(`{
			"email": "test@example.com",
			"password": "password123"
		}`))
		req.Header.Set("Content-Type", "application/json")
		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)
		assert.Contains(t, w.Header().Get("Set-Cookie"), "token")
	})

	t.Run("invalid credentials", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/login", strings.NewReader(`{
			"email": "test@example.com",
			"password": "wrongpassword"
		}`))
		req.Header.Set("Content-Type", "application/json")
		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusUnauthorized, w.Code)
	})
}
