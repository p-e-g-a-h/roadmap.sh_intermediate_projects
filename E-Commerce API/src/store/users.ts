import db from "./pool.js";

interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
  role: "customer" | "admin";
}

const getAllUsers = async () => {
  const { rows } = await db.query(
    `SELECT id, email, name, role, created_at FROM users`,
  );

  return rows as User[];
};

const deleteUserById = async (id: string) => {
  const { rows } = await db.query(
    `DELETE FROM users WHERE id = $1 RETURNING id, email, name`,
    [id],
  );

  return (rows[0] as User) || null;
};

export { deleteUserById, getAllUsers };
