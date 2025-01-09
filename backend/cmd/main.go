package main

import (
	"log"
	"sauna-compore-app/internal/database"
	"sauna-compore-app/internal/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	database.InitDB()
	r := gin.Default()
	routes.RegisterRoutes(r)
	log.Fatal(r.Run(":8080"))
}
