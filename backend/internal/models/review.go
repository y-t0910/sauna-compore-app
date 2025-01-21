package models

import "time"

// Review represents a sauna review in the system
type Review struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	UserID      uint      `json:"user_id" gorm:"not null"`
	SaunaID     uint      `json:"sauna_id" gorm:"not null"`
	Rating      float32   `json:"rating" gorm:"not null"`
	Comment     string    `json:"comment"`
	Temperature float32   `json:"temperature"`
	Humidity    float32   `json:"humidity"`
	Visited     time.Time `json:"visited"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
