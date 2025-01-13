package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Facility struct {
	ID          uint   `json:"id"`
	Name        string `json:"name"`
	HasSauna    bool   `json:"has_sauna"`
	HasColdBath bool   `json:"has_cold_bath"`
	HasLounge   bool   `json:"has_lounge"`
	Temperature int    `json:"temperature"`
	Capacity    int    `json:"capacity"`
}

func SetupFacilityRoutes(router *gin.Engine) {
	facilities := router.Group("/api/facilities")
	{
		facilities.GET("/", getAllFacilities)
		facilities.GET("/:id", getFacility)
		facilities.POST("/", createFacility)
		facilities.PUT("/:id", updateFacility)
		facilities.DELETE("/:id", deleteFacility)
	}
}

func getAllFacilities(c *gin.Context) {
	// TODO: Implement database interaction
	facilities := []Facility{}
	c.JSON(http.StatusOK, facilities)
}

func getFacility(c *gin.Context) {
	id := c.Param("id")
	// TODO: Implement database lookup
	facility := Facility{}
	c.JSON(http.StatusOK, facility)
}

func createFacility(c *gin.Context) {
	var facility Facility
	if err := c.ShouldBindJSON(&facility); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// TODO: Implement database creation
	c.JSON(http.StatusCreated, facility)
}

func updateFacility(c *gin.Context) {
	id := c.Param("id")
	var facility Facility
	if err := c.ShouldBindJSON(&facility); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// TODO: Implement database update
	c.JSON(http.StatusOK, facility)
}

func deleteFacility(c *gin.Context) {
	id := c.Param("id")
	// TODO: Implement database deletion
	c.JSON(http.StatusOK, gin.H{"message": "Facility deleted"})
}
