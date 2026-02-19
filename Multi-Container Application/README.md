# Multi-Container Application

Project Challenge: [roadmap.sh - Multi-Container Application](https://roadmap.sh/projects/multi-container-service)

A todo management API built with Node.js and MongoDB. It uses Docker for containerization and MongoDB Atlas for cloud storage.

## Live Demo

**https://todo-docker-app-5yuz.onrender.com**

---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/p-e-g-a-h/roadmap.sh_intermediate_projects.git
```

2. **Navigate to the project folder:**

```bash
cd "roadmap.sh_intermediate_projects/Multi-Container Application"
```

3. **Run with Docker Compose:**

```bash
docker-compose up --build
```

---

## API Endpoints

| Method   | Endpoint     | Description                                   |
| -------- | ------------ | --------------------------------------------- |
| `GET`    | `/todos`     | Fetch all todo items from the database.       |
| `POST`   | `/todos`     | Create a new todo. Body: `{ "title": "..." }` |
| `GET`    | `/todos/:id` | Get details of a specific todo by ID.         |
| `PUT`    | `/todos/:id` | Update a todo. Body: `{ "title": "..." }`     |
| `DELETE` | `/todos/:id` | Delete a todo from the database.              |
