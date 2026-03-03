import db from "./pool.js";

interface Product {
  id: string;
  title: string;
  price: number;
  created_at: string;
}

const getAllProducts = async (sortBy: string) => {
  const sortOptions: Record<string, string> = {
    oldest: "created_at ASC",
    price_low: "price ASC",
    price_high: "price DESC",
    newest: "created_at DESC",
  };

  const orderBy = sortOptions[sortBy] || "created_at DESC";

  const { rows } = await db.query(`SELECT * FROM products ORDER BY ${orderBy}`);

  return rows as Product[];
};

const createProduct = async (title: string, price: number) => {
  const { rows } = await db.query(
    `INSERT INTO products (title, price)
    VALUES ($1, $2)
    RETURNING *`,
    [title, price],
  );

  return rows[0] as Product;
};

const deleteProductById = async (id: string) => {
  const { rows } = await db.query(
    `DELETE FROM products WHERE id = $1 RETURNING *`,
    [id],
  );

  return (rows[0] as Product) || null;
};

export { getAllProducts, createProduct, deleteProductById };
