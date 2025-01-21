package models

import "time"

// Sauna represents a sauna facility
type Sauna struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Name        string    `json:"name" gorm:"not null"`
	Address     string    `json:"address" gorm:"not null"`
	PhoneNumber string    `json:"phone_number"`
	Rating      float32   `json:"rating"`
	Price       int       `json:"price"`
	Hours       string    `json:"hours"`
	Description string    `json:"description"`
	ImageURL    string    `json:"image_url"`
	CreatedAt   time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt   time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}
