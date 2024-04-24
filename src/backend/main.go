package main

import (
	"fmt"
	"net/http"
	"os"
	"time"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func getWikiArticle(title string) string {
	return "https://en.wikipedia.org/wiki/" + title
}

func main() {
	// Get the port from the environment variable or default to 8000
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	r := gin.Default()
	r.Use(cors.Default())

	r.GET("/", func(c *gin.Context) {
		src := c.Query("src")
		dest := c.Query("dest")
		search := c.Query("search")

		fmt.Println("src:", getWikiArticle(src))
		fmt.Println("dest:", getWikiArticle(dest))

		
		if src == "" || dest == "" || search == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Source, destination, search is required"})
			return
		}

		start := time.Now()
		paths := [][]string{}
		if search == "BFS" {
			paths = BFS2(getWikiArticle(src), getWikiArticle(dest))
		} else if search == "IDS" {
			paths = IDS(getWikiArticle(src), getWikiArticle(dest))
		}
		elapsed := time.Since(start).Milliseconds()

		c.JSON(http.StatusOK, gin.H{"paths": paths, "timeTaken": elapsed})
	})

	// Run the server on the specified port
	r.Run(":" + port)
}
