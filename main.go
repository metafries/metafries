package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
)

var (
	indexTmpl = template.Must(template.ParseFiles("index.html"))
)

func main() {
	http.HandleFunc("/", indexHandler)

	// By configuring a static handler in app.yaml, App Engine serves all the
	// static content itself. As a result, the following two lines are in
	// effect for development only.
	static := http.StripPrefix("/static", http.FileServer(http.Dir("static")))
	http.Handle("/static/", static)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

	log.Printf("Listening on port %s", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), nil))
}

// indexHandler uses a template to create an index.html.
func indexHandler(w http.ResponseWriter, r *http.Request) {
	// if r.URL.Path != "/" {
	// 	http.NotFound(w, r)
	// 	return
	// }
	type indexData struct {
		Menu    string
		NotMenu string
	}
	data := indexData{
		Menu:    "navbar",
		NotMenu: "events",
	}
	if err := indexTmpl.Execute(w, data); err != nil {
		log.Printf("Error executing template: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
	}
}
