package tests

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"

	"sauna-compore-app/backend/internal/routes"
)

func TestCreateBookmark(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := gin.New()
	routes.SetupBookmarkRoutes(router)

	tests := []struct {
		name       string
		bookmark   routes.Bookmark
		wantStatus int
	}{
		{
			name: "Valid bookmark",
			bookmark: routes.Bookmark{
				UserID:      1,
				SaunaID:     1,
				Description: "Test bookmark",
			},
			wantStatus: http.StatusCreated,
		},
		{
			name:       "Invalid bookmark - empty body",
			bookmark:   routes.Bookmark{},
			wantStatus: http.StatusBadRequest,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			jsonData, _ := json.Marshal(tt.bookmark)
			req := httptest.NewRequest("POST", "/api/bookmarks", bytes.NewBuffer(jsonData))
			req.Header.Set("Content-Type", "application/json")
			w := httptest.NewRecorder()
			router.ServeHTTP(w, req)

			assert.Equal(t, tt.wantStatus, w.Code)
		})
	}
}

func TestGetUserBookmarks(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := gin.New()
	routes.SetupBookmarkRoutes(router)

	tests := []struct {
		name       string
		userID     string
		wantStatus int
	}{
		{
			name:       "Valid user ID",
			userID:     "1",
			wantStatus: http.StatusOK,
		},
		{
			name:       "Missing user ID",
			userID:     "",
			wantStatus: http.StatusBadRequest,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			url := "/api/bookmarks"
			if tt.userID != "" {
				url += "?user_id=" + tt.userID
			}
			req := httptest.NewRequest("GET", url, nil)
			w := httptest.NewRecorder()
			router.ServeHTTP(w, req)

			assert.Equal(t, tt.wantStatus, w.Code)
		})
	}
}

func TestDeleteBookmark(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := gin.New()
	routes.SetupBookmarkRoutes(router)

	tests := []struct {
		name       string
		bookmarkID string
		wantStatus int
	}{
		{
			name:       "Valid bookmark ID",
			bookmarkID: "1",
			wantStatus: http.StatusOK,
		},
		{
			name:       "Invalid bookmark ID",
			bookmarkID: "",
			wantStatus: http.StatusBadRequest,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			url := "/api/bookmarks/" + tt.bookmarkID
			req := httptest.NewRequest("DELETE", url, nil)
			w := httptest.NewRecorder()
			router.ServeHTTP(w, req)

			assert.Equal(t, tt.wantStatus, w.Code)
		})
	}
}
