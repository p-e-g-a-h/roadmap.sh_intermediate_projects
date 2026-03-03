import { INSPECT_MAX_BYTES } from "node:buffer";
import db from "./pool.js";

interface CartItem {
  user_id: string;
  product_id: string;
  quantity: number;
}

interface CartItemDetailed extends CartItem {
  title: string;
  price: number;
  total_item_price: number;
}

const getAllProductsInCart = async (userId: string) => {
  const { rows } = await db.query(
    `SELECT 
      c.product_id, 
      c.quantity, 
      p.title, 
      p.price,
      (p.price * c.quantity) AS total_item_price
     FROM cart AS c
     JOIN products AS p ON c.product_id = p.id
     WHERE c.user_id = $1`,
    [userId],
  );

  return rows as CartItemDetailed[];
};

// upsert: update + insert
const addProductToCart = async (userId: string, productId: string) => {
  const { rows } = await db.query(
    `INSERT INTO cart (user_id, product_id)
     VALUES ($1, $2)
     ON CONFLICT (user_id, product_id) 
     DO UPDATE SET quantity = cart.quantity + 1
     RETURNING *`,
    [userId, productId],
  );

  return rows[0] as CartItem;
};

const removeProductFromCart = async (userId: string, productId: string) => {
  const { rows: rowsUpdate } = await db.query(
    `UPDATE cart 
        SET quantity = quantity - 1 
        WHERE user_id = $1 AND product_id = $2 AND quantity > 0
        RETURNING *`,
    [userId, productId],
  );

  if (!rowsUpdate[0]) {
    return null;
  }

  if (rowsUpdate[0].quantity <= 0) {
    const { rows: rowsDelete } = await db.query(
      `DELETE FROM cart 
        WHERE user_id = $1 AND product_id = $2
        RETURNING *`,
      [userId, productId],
    );

    return rowsDelete[0] as CartItem;
  }

  return rowsUpdate[0] as CartItem;
};

export { getAllProductsInCart, addProductToCart, removeProductFromCart };
