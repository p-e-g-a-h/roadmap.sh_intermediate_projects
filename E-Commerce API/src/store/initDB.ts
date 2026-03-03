import db from "./pool.js";
import bcrypt from "bcryptjs";

export default async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
        created_at TIMESTAMPTZ DEFAULT NOW()
      );  
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );  
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS cart (
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL DEFAULT 1,
        PRIMARY KEY (user_id, product_id)
      );  
    `);

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return;
    }

    const { rows } = await db.query(`SELECT id FROM users WHERE email = $1`, [
      adminEmail,
    ]);

    if (rows.length === 0) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      await db.query(
        `
        INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, $4)`,
        ["admin", adminEmail, hashedPassword, "admin"],
      );
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
