package models

import (
	"time"
)

// Image represents an image entity in the system
type Image struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	URL       string    `json:"url" gorm:"not null"`
	Type      string    `json:"type" gorm:"not null"` // e.g., "sauna", "review", "profile"
	SaunaID   *uint     `json:"sauna_id,omitempty" gorm:"index"`
	ReviewID  *uint     `json:"review_id,omitempty" gorm:"index"`
	UserID    uint      `json:"user_id" gorm:"not null;index"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
