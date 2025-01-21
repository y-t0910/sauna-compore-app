package models

import "time"

// Facility represents a sauna facility information
type Facility struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Name        string    `json:"name" gorm:"not null"`
	Address     string    `json:"address" gorm:"not null"`
	Phone       string    `json:"phone"`
	Description string    `json:"description"`
	Rating      float32   `json:"rating"`
	SaunaTemp   int       `json:"sauna_temp"`
	WaterTemp   int       `json:"water_temp"`
	Price       int       `json:"price"`
	ImageURL    string    `json:"image_url"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
