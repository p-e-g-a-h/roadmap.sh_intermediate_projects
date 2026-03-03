import { Pool } from "pg";

const connectionString = process.env.DB_URL;

if (!connectionString) {
  throw new Error("DB_URL is not defined in environment variables");
}

const pool = new Pool({
  connectionString: connectionString,
  max: 100, // 20
  ssl: {
    // This bypasses the 'self-signed certificate' error
    rejectUnauthorized: false,
  },
});

pool.on("error", (error: Error) => {
  console.error(error);
});

pool.query(`ALTER TABLE users ALTER COLUMN role SET DEFAULT 'customer'`);

export default pool;
