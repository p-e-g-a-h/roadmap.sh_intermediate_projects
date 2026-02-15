# URL Shortener API

Project Challenge: [roadmap.sh - URL Shortening Service](https://roadmap.sh/projects/url-shortening-service)

A lightweight, high-performance URL shortener built with Node.js, Express, and SQLite. It generates clean, alphanumeric short codes and tracks the number of times each link is accessed.

## Live Demo

**x**

---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/p-e-g-a-h/roadmap.sh_intermediate_projects.git
```

2. **Navigate to the project folder:**

```bash
cd "roadmap.sh_intermediate_projects/URL Shortening Service"
```

3. **Install dependencies:**

```bash
npm install
```

4. **Start the server:**

```bash
npm start
```

---

## API Endpoints

### 1. URL Management

| Method   | Endpoint              | Description                                                                |
| -------- | --------------------- | -------------------------------------------------------------------------- |
| `POST`   | `/shorten/`           | Create a short URL. Body: `{ "url": "..." }`                               |
| `GET`    | `/shorten/:shortCode` | Retrieve data for a code.                                                  |
| `PUT`    | `/shorten/:shortCode` | Update the destination of an existing short code. Body: `{ "url": "..." }` |
| `DELETE` | `/shorten/:shortCode` | Remove a short code from the database.                                     |

### 2. Redirection

| Method | Endpoint                 | Description                                                |
| ------ | ------------------------ | ---------------------------------------------------------- |
| `GET`  | `/shorten/go/:shortCode` | Increments access count and redirects to the original URL. |

### Sample Response

```json
{
  "id": 1,
  "url": "https://google.com",
  "shortCode": "7Mbczg",
  "accessCount": 1,
  "createdAt": "2026-02-15 12:00:00",
  "updatedAt": "2026-02-15 12:00:00"
}
```
