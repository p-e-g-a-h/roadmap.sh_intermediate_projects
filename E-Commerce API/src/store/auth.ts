import db from "./pool.js";

interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
  role: "customer" | "admin";
}

interface UserWithPassword extends User {
  password: string;
}

const register = async (name: string, email: string, password: string) => {
  const { rows } = await db.query(
    `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, role, created_at`,
    [name, email, password],
  );

  return rows[0] as User;
};

const login = async (email: string) => {
  const { rows } = await db.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  return (rows[0] as UserWithPassword) || null;
};

export { register, login };
