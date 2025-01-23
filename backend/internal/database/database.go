package database

import (
	"backend/internal/models"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	dsn := "root:password@tcp(localhost:3306)/sauna_db?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("データベース接続に失敗しました:", err)
	}

	// テーブルの自動マイグレーション
	db.AutoMigrate(&models.User{})

	DB = db
	log.Println("データベース接続に成功しました")
}
