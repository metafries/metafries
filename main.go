package main

import (
	"net/http"

	"google.golang.org/appengine" // Required external App Engine library
)

type Channel struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

func main() {
	// http.HandleFunc("/", indexHandler)
	router := NewRouter()
	router.Handle("channel add", addChannel)
	http.Handle("/", router)
	http.ListenAndServe(":4000", nil)
	appengine.Main() // Starts the server to receive requests
}
