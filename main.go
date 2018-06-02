package main

import (
	"fmt"
	"html/template"
	"net/http"
	"time"

	"google.golang.org/appengine" // Required external App Engine library
	"google.golang.org/appengine/datastore"
	"google.golang.org/appengine/log"
)

var ( //Initialize template variable
	indexTemplate = template.Must(template.ParseFiles("index.html"))
)

//Post Define each user-submitted post as a data structure with three fields
type Post struct {
	Author  string
	Message string
	Posted  time.Time
}

type templateParams struct { //Define template parameters as a data structure with four fields
	Notice  string
	Name    string
	Message string
	Posts   []Post
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	// if statement redirects all invalid URLs to the root homepage.
	// Ex: if URL is http://[YOUR_PROJECT_ID].appspot.com/FOO, it will be
	// redirected to http://[YOUR_PROJECT_ID].appspot.com.
	if r.URL.Path != "/" {
		http.Redirect(w, r, "/", http.StatusFound)
		return
	}
	ctx := appengine.NewContext(r) //Link all operations related to a given request together
	// [START handling HTML form data]
	params := templateParams{}
	if r.Method == "GET" {
		indexTemplate.Execute(w, params)
		return
	}
	//It's a POST request, so handle the form submission.
	post := Post{
		Author:  r.FormValue("name"),
		Message: r.FormValue("message"),
		Posted:  time.Now(),
	}
	name := r.FormValue("name")
	params.Name = name //Preserve the name field.
	if name == "" {
		name = "Anonymous Gopher"
	}
	if r.FormValue("message") == "" {
		w.WriteHeader(http.StatusBadRequest)
		params.Notice = "No message provided"
		indexTemplate.Execute(w, params)
		return
	}
	key := datastore.NewIncompleteKey(ctx, "Post", nil)
	// [START add_post]
	if _, err := datastore.Put(ctx, key, &post); err != nil {
		log.Errorf(ctx, "datastore.Put: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		params.Notice = "Couldn't add new post. Try again?"
		params.Message = post.Message //Preserve their message so they can try again.
		indexTemplate.Execute(w, params)
		return
	}
	// [END add_post]
	params.Posts = append([]Post{post}, params.Posts...) //Prepend the post that was just added.
	params.Notice = fmt.Sprintf("Thank you for your submission, %s!", name)
	// [END handling HTML form data]
	indexTemplate.Execute(w, params)
}

func main() {
	http.HandleFunc("/", indexHandler)
	appengine.Main() // Starts the server to receive requests
}
