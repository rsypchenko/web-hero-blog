---
external: false
draft: false
title: React + Goxygen Building a Full-Stack App
description: How to create full-stack application using react and goxygen
date: 2023-12-21
image: '/images/react-goxygen.webp'
thumb: '/images/thumbs/10.png'
tags: ['react', 'go']
popular: false
---

![React and Goxygen](/images/react-goxygen.webp)

Developers face a perpetual challenge in seamlessly integrating frontend and backend technologies. The true test lies in creating a scalable, maintainable, and efficient environment that enables these technologies to work together perfectly.

Goxygen is a tool designed to help developers create a full-stack Go application without the need for complicated setup and configuration processes. With just one simple command, Goxygen saves developers hours of tedious setup work, allowing them to focus on creating unique features for their applications.

In this tutorial, we will show you how to use Goxygen to create a full-stack React application. We will provide insights into integrating React with Go and modifying Goxygen to suit your project requirements.

### Prerequisites

To follow the tutorial in this article, you will require the following items:

- Prior experience with React and Go
- Go, Node.js, Docker, and Docker Compose installed and running on your local dev environment

### What is Goxygen?

[Goxygen](https://github.com/Shpota/goxygen) is an innovative tool that has been created specifically for developers who want to leverage the power of Go in their web projects. The tool's primary objective is to simplify the process of setting up and configuring full-stack web applications. Goxygen achieves this by automatically generating boilerplate code that connects Go-based backends with popular frontend frameworks, such as React, Vue, and Angular.

Goxygen is a software tool that saves developers time and effort by automating the integration of the frontend and backend. By using Goxygen, developers can focus on building unique features and enhancing an application's functionality. This makes the development process more efficient and enables developers to invest their time and creativity more productively.

Goxygen comes with built-in support for Docker, which allows developers to containerize their applications for easier deployment in different environments. Additionally, it seamlessly integrates with popular relational databases like MySQL, PostgreSQL, and SQLite, making database management a breeze. With Goxygen, developers can not only build their applications but also ensure they are ready for deployment with inbuilt database integrations.

### Building the application

To create our full-stack React app, we will use Goxygen to scaffold the project, create a blog model, database services, and API endpoints, and finally build the React frontend.

### Scaffolding the project

To see Goxygen in action, let’s use it to build a full-stack application with Go. As a first step, scaffold the full-stack app using the command below:

```bash
go run github.com/shpota/goxygen@latest init --frontend react --db postgres my-blog
```

Here we specify the `--frontend` flag, allowing us to specify the frontend tool we wish to use. We selected react, but the value could also be vue or angular.

We use the `rea` flag to specify the database management system to store records in the application. For this tutorial, we’ll use the Postgres database.

The command above will generate a React app with a Go server backend, organized into the following folders:

![React and Goxygen](/images/react-goxygen-1.webp)

Now, `cd` Into the project folder, use the below command to run the project:

```bash
cd my-blog
docker-compose up
```

This will start the project on `localhost:8080`:

After scaffolding the project with Goxygen, we can modify the React frontend and Go server to meet our project needs. In this tutorial, we will modify the scaffolded project to create a blogging application.

### Creating a blog model

To set up a blog model for the Go server backend, start by opening the project in your preferred text editor. Navigate to the `server/model` directory and create a new file named `blog.go`. Then, add the following code snippet:

```go
package model
type Blog struct {
    ID       int    `json:"id"`
    Title    string `json:"title"`
    CoverURL string `json:"coverURL"`
    Body     string `json:"body"`
}
```

Here we define a Blog data structure (`struct`) with four fields: `ID`, `Title`, `CoverURL`, and `Body`. These fields are annotated with json tags, indicating how they should be represented when the struct is converted to or from JSON format.

### Creating Postgres services

Next, let’s update the `db/db.go` file to create CRUD services to communicate with our Postgres database to create, read, and delete records. First, let’s modify the DB interface and define the custom methods we’ll define for the CRUD operations and their return types, the `PostgresDB` type, and the `NewDB` function:

```go
//...
type DB interface {
    GetBlogs() ([]*model.Blog, error)
    CreateBlog(blog *model.Blog) error
    UpdateBlog(id int, blog *model.Blog) error
    DeleteBlog(id int)  error
    GetBlog(id int )(*model.Blog, error) 
}
type PostgresDB struct {
    db *sql.DB
}
func NewDB(db *sql.DB) DB {
    return PostgresDB{db: db}
}
//...
```

In the above code snippet, we update the DB interface to outline methods for the database operations related to the `blogs` table. We also modify the postgresDB type which embeds a pointer to an `sql.DB` instance to create a connection to a PostgreSQL database. The NewDB function initializes and returns an instance of `PostgresDB`, linking the SQL connection to our custom methods.

Now, create the `CreateBlog`, `GetBlogs`, `GetBlog`, `UpdateBlog`, DeleteBlog services, like so:

```go
//...
func (d PostgresDB) CreateBlog(blog *model.Blog) error {
    query := `INSERT INTO blogs (title, body, coverURL) VALUES ($1, $2, $3) RETURNING id`
    return d.db.QueryRow(query, blog.Title, blog.Body, blog.CoverURL).Scan(&blog.ID)
}
func (d PostgresDB) GetBlogs() ([]*model.Blog, error) {
    rows, err := d.db.Query("select title, body, coverURL from blogs")
    if err != nil {
        return nil, err
    }
    defer rows.Close()
    var tech []*model.Blog
    for rows.Next() {
        t := new(model.Blog)
        err = rows.Scan(&t.Title, &t.Body, &t.CoverURL)
        if err != nil {
            return nil, err
        }
        tech = append(tech, t)
    }
    return tech, nil
}
func (d PostgresDB) GetBlog(id int) (*model.Blog, error) {
    println(id)
    t := new(model.Blog)
    query := `SELECT id, title, body, coverURL FROM blogs WHERE id = $1`
    err := d.db.QueryRow(query, id).Scan(&t.ID, &t.Title, &t.Body, &t.CoverURL)
    if err != nil {
        return nil, err
    }
    return t, nil
}
func (d PostgresDB) UpdateBlog(id int, blog *model.Blog) error {
    query := `UPDATE blogs SET title = $1, body = $2, coverURL = $3 WHERE id = $4`
    _, err := d.db.Exec(query, blog.Title, blog.Body, blog.CoverURL, id)
    return err
}
func (d PostgresDB) DeleteBlog(id int) error {
    query := `DELETE FROM blogs WHERE id = $1`
    _, err := d.db.Exec(query, id)
    return err
//...
```


### Creating REST endpoints

Now that we’ve created the custom services to communicate with the Postgres database, let’s update the RESTful API in the `web/app.go` file. First, install the Gorilla Mux package to handle the setup of the routes:

```bash
go get -u github.com/gorilla/mux
```

Then import the packages and update the App struct and the `NewApp` function, like so:

```go
import (
    "encoding/json"
    "log"
    "net/http"
    "my-blog/db"
    "my-blog/model"
    "github.com/gorilla/mux"
    "strconv"
)
type App struct {
    d      db.DB
    router *mux.Router // Use Gorilla Mux's Router
}
func NewApp(d db.DB, cors bool) App {
    app := App{
        d:      d,
        router: mux.NewRouter(),
    }
// API routes using Gorilla Mux's HandleFunc method
    app.router.HandleFunc("/api/blogs", app.handleGetBlogs).Methods("GET")
    app.router.HandleFunc("/api/blog/{id:[0-9]+}", app.handleGetBlog).Methods("GET")
    app.router.HandleFunc("/api/blog/create", app.handleCreateBlog).Methods("POST")
    app.router.HandleFunc("/api/blog/update/{id:[0-9]+}", app.handleUpdateBlog).Methods("PUT")
    app.router.HandleFunc("/api/blog/delete/{id:[0-9]+}", app.handleDeleteBlog).Methods("DELETE")
    app.router.PathPrefix("/").Handler(http.FileServer(http.Dir("/webapp")))
    return app
}
```

Now, update the Serve method to use the disableCors function that was created when the project was generated:

```go
//...
func (a *App) Serve() error {
    log.Println("Web server is available on port 3001")
    return http.ListenAndServe(":3001", disableCors(a.router.ServeHTTP))
}
//...

```

Next, create the handler methods to communicate with the CRUD services:

```go
//...
func (a *App) handleGetBlogs(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    blogs, err := a.d.GetBlogs()
    if err != nil {
        sendErr(w, http.StatusInternalServerError, err.Error())
        return
    }
    err = json.NewEncoder(w).Encode(blogs)
    if err != nil {
        sendErr(w, http.StatusInternalServerError, err.Error())
    }
}
func (a *App) handleGetBlog(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id, err := strconv.Atoi(vars["id"])
    if err != nil {
        sendErr(w, http.StatusBadRequest, "Invalid blog ID")
        return
    }
    blog, err := a.d.GetBlog(id)
    if err != nil {
        sendErr(w, http.StatusInternalServerError, err.Error())
        return
    }
    json.NewEncoder(w).Encode(blog)
}
func (a *App) handleCreateBlog(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    var b model.Blog
    decoder := json.NewDecoder(r.Body)
    if err := decoder.Decode(&b); err != nil {
        sendErr(w, http.StatusBadRequest, "Invalid request payload")
        return
    }
    defer r.Body.Close()
    if err := a.d.CreateBlog(&b); err != nil {
        sendErr(w, http.StatusInternalServerError, "Error creating the blog")
        return
    }
    json.NewEncoder(w).Encode(b)
}
func (a *App) handleUpdateBlog(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id, err := strconv.Atoi(vars["id"])
    if err != nil {
        sendErr(w, http.StatusBadRequest, "Invalid blog ID")
        return
    }
    w.Header().Set("Content-Type", "application/json")
    var b model.Blog
    decoder := json.NewDecoder(r.Body)
    if err := decoder.Decode(&b); err != nil {
        sendErr(w, http.StatusBadRequest, "Invalid request payload")
        return
    }
    defer r.Body.Close()
    if err := a.d.UpdateBlog(id, &b); err != nil {
        sendErr(w, http.StatusInternalServerError, "Error updating the blog")
        return
    }
    json.NewEncoder(w).Encode(b)
}
func (a *App) handleDeleteBlog(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id, err := strconv.Atoi(vars["id"])
    if err != nil {
        sendErr(w, http.StatusBadRequest, "Invalid blog ID")
        return
    }
    if err := a.d.DeleteBlog(id); err != nil {
        sendErr(w, http.StatusInternalServerError, "Error deleting the blog")
        return
    }
    w.WriteHeader(http.StatusOK)
}
//...
```

The above code snippets define how the server should handle HTTP requests for different CRUD operations to the `blogs` model table. The handleGetBlogs function retrieves and sends all blogs in JSON format. The `handleGetBlog` method fetches and returns a specific blog based on an ID from the URL.

The `handleCreateBlog` function reads a JSON payload from the request, decodes it to a blog object, and attempts to save it. The `handleUpdateBlog` method updates an existing blog identified by its ID, using the provided JSON payload.

### Creating React App

The server-side setup is complete. Now, let’s move on to setting up the React frontend. Begin by modifying the `App.js` file within the webapp directory using the following code snippet:

```jsx
import React, { useState, useEffect } from "react";
import "./App.css";
export function App() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/blogs");
        if (!response.ok) {
          throw new Error("Error loading blogs");
        }
        const blogs = await response.json();
        setBlogs(blogs);
      } catch (error) {
        console.log(error.message);
      }
    };
    getBlogs();
  }, []);
  return (
    <div className="app">
      <header className="header">
        <h2 className="title">Goxxygen Blog</h2>
      </header>
      <main className="main-content">
        {blogs &&
          blogs.map((blog) => (
            <div className="blog-card" key={blog.id}>
              <div className="blog-cover">
                <img src={blog.coverURL} alt={blog.title} />
              </div>
              <h3 className="blog-title">{blog.title}</h3>
            </div>
          ))}
      </main>
    </div>
  );
}
```

Upon component mount, an API request is sent to the Go server to fetch all posts via Hook. Posts are then displayed by iterating through each post.

Next, update the `App.css` file to style add styling to the component with the code styles:

```css
.app {
    font-family: Arial, sans-serif;
    padding: 20px;
}
.header {
    border-bottom: 2px solid #333;
    padding: 10px 0;
    margin-bottom: 20px;
}
.title {
    margin: 0;
}
.main-content {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}
.blog-card {
    border: 2px solid #333;
    width: 30%;  /* Adjust as needed */
    display: flex;
    flex-direction: column;
    align-items: center;
}
.blog-cover {
    background-color: #e0e0e0;  /* Placeholder background color */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}
.blog-cover img{
    width: 100%;
}
.blog-title {
    margin: 0;
}
```

Run the following commands to build the changes we’ve made on the project:

```bash
docker-compose build 
docker-compose up
```

Then, refresh the browser to see the changes!

### Conclusion

In this tutorial, we demonstrated how to build a full-stack app with React and Goxygen. We introduced Goxygen and showed how to use it to create a React blog project with data stored in a Postgres database.

Unlock your full-stack development potential with Goxygen. Take your React app to the next level by creating a dynamic dashboard with the power of CRUD.