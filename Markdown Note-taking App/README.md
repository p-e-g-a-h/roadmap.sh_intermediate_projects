# Markdown Note-taking App API

Project Challenge: [roadmap.sh - Markdown Note-taking App](https://roadmap.sh/projects/markdown-note-taking-app)

A RESTful API built with Node.js and Express that allows users to create, manage, and render Markdown notes. It features integrated grammar checking and converts Markdown into valid HTML for easy viewing.

## Live Demo

**x**

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/p-e-g-a-h/roadmap.sh_intermediate_projects.git
```

2. **Navigate to the project folder:**

```bash
cd "roadmap.sh_intermediate_projects/Backend Projects/Markdown Note-taking App""
```

3. **Install dependencies:**

```bash
npm install
```

4. **Start the server:**

```bash
npm start
```

## Usage

### Public Route

| Method | Route              | Description                                     | Status Codes       |
| ------ | ------------------ | ----------------------------------------------- | ------------------ |
| `POST` | `/grammer`         | Check grammar of a string (returns suggestions) | 200, 400, 500      |
| `POST` | `/save`            | Save a new `.md` file to the server             | 201, 400, 500      |
| `GET`  | `/notes`           | List all saved markdown file names              | 200, 500           |
| `GET`  | `/notes/:fileName` | Retrieve a note and render it as HTML           | 200, 400, 404, 500 |

### Sample Request Body

**Save a Note - POST `/save`**

```json
{
  "title": "grocery-list",
  "note": "# My List"
}
```

**Grammar Check - POST `/grammer`**

```json
{
  "note": "This are an test."
}
```
