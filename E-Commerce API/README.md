# E-Commerce API

A simple and fast API to manage a E-Commerce. Built with **Node.js**, **Express**, **TypeScript**, **Zod**, and **PostgreSQL**.

## Live Demo

**https://roadmap-sh-intermediate-projects.onrender.com/**

## Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js
- **Framework:** Express.js
- **Validation:** Zod
- **Database:** PostgreSQL
- **Security:** JSON Web Tokens (JWT) & Bcrypt

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/p-e-g-a-h/roadmap.sh_intermediate_projects.git
```

2. **Navigate to the project folder:**

```bash
cd "roadmap.sh_intermediate_projects/E-Commerce API"
```

3. **Install dependencies:**

```bash
npm install
```

4. **Configure Environment:**

Create a .env file:

```
DB_URL="your_postgres_url"
JWT_KEY="your_secret_key"
ADMIN_EMAIL="your_email"
ADMIN_PASSWORD="your_password"
```

5. **Start the server:**

```bash
npm run build
npm start
```

## API Routes

### Authentication

- `POST /auth/register` - Create an account.
- `POST /auth/login` - Login to get a token.

### Cart

- `GET /cart` - Get all products in cart (Requires Token).
- `POST /cart/:id` - Add a product (or increase quantity) to cart (Requires Token).
- `DELETE /cart/:id` - Delete a product (or decrease quantity) from cart (Requires Token).

### Products

- `GET /products` - Get all products (Requires Token).
- `POST /products` - Create a product (Requires Token, Requires admin).
- `DELETE /products/:id` - Delete a product (Requires Token, Requires admin).

### Users

- `GET /users` - Get all users (Requires Token, Requires admin).
- `DELETE /users/:id` - Delete a user (Requires Token, Requires admin).
