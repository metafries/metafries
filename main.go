package main

import (
	"fmt"
	"html/template"
	"net/http"
	"time"

	firebase "firebase.google.com/go"

	"google.golang.org/appengine" // Required external App Engine library
	"google.golang.org/appengine/datastore"
	"google.golang.org/appengine/log"
)

// [START new_variable]
var ( //Initialize template variable
	firebaseConfig = &firebase.Config{
		DatabaseURL:   "https://metafries.firebaseio.com",
		ProjectID:     "metafries",
		StorageBucket: "metafries.appspot.com",
	}
	indexTemplate = template.Must(template.ParseFiles("index.html"))
)

// [END new_variable]

//Post Define each user-submitted post as a data structure with three fields
// [START new_post_field]
type Post struct {
	Author  string
	UserID  string
	Message string
	Posted  time.Time
}

// [END new_post_field]

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
	// if r.URL.Path != "/" {
	// 	http.Redirect(w, r, "/", http.StatusFound)
	// 	return
	// }
	ctx := appengine.NewContext(r) //Link all operations related to a given request together
	// [START handling HTML form data]
	params := templateParams{}
	q := datastore.NewQuery("Post").Order("-Posted").Limit(20) //Requests the twenty most recent Post objects in Posted descending order
	// [START get_posts]
	if _, err := q.GetAll(ctx, &params.Posts); err != nil {
		log.Errorf(ctx, "Getting posts: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		params.Notice = "Couldn't get latest posts. Refresh?"
		indexTemplate.Execute(w, params)
		return
	}
	// [END get_posts]
	if r.Method == "GET" {
		indexTemplate.Execute(w, params)
		return
	}
	//It's a POST request, so handle the form submission.

	//[START firebase_token]
	message := r.FormValue("message")

	errHandler := func() {
		params.Notice = "Couldn't anthenticate. Try logging in again?"
		params.Message = message // Preserve their message so they can try again.
		indexTemplate.Execute(w, params)
		return
	}

	// Create a new Firebase App
	app, err := firebase.NewApp(ctx, firebaseConfig)
	if err != nil {
		errHandler()
	}
	// Create a new authenticator for the app.
	auth, err := app.Auth(ctx)
	if err != nil {
		errHandler()
	}
	// Verify the token passed in by the uer is valid.
	tok, err := auth.VerifyIDTokenAndCheckRevoked(ctx, r.FormValue("token"))
	if err != nil {
		errHandler()
	}
	// Use the validated token to get the user's information.
	user, err := auth.GetUser(ctx, tok.UID)
	if err != nil {
		errHandler()
	}

	// [START logged_in_post]
	post := Post{
		UserID:  user.UID, // Include UserID in case Author isn't unique.
		Author:  user.DisplayName,
		Message: message,
		Posted:  time.Now(),
	}
	// [END logged_in_post]
	params.Name = post.Author

	if post.Message == "" {
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
	params.Notice = fmt.Sprintf("Thank you for your submission, %s!", post.Author)
	// [END handling HTML form data]
	indexTemplate.Execute(w, params)
}

func main() {
	http.HandleFunc("/", indexHandler)
	appengine.Main() // Starts the server to receive requests
}
