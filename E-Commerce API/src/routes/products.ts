import express, { Request, Response, NextFunction } from "express";
import { verifyToken } from "../middleware/authJWT";
import { isAdmin } from "../middleware/isAdmin";
import {
  createProduct,
  getAllProducts,
  deleteProductById,
} from "../store/products";
import validate from "../middleware/validate";
import productsSchema from "../schemas/products";

const router = express.Router();

router.get(
  "/",
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const sortBy = (req.query.sortBy as string) || "newest";

    try {
      const products = await getAllProducts(sortBy);

      if (products.length === 0) {
        return res.status(404).json({ message: "no products found." });
      }

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/",
  verifyToken,
  isAdmin,
  validate(productsSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, price } = req.body;

    try {
      const product = await createProduct(title, price);

      res.status(201).json({ message: "product created successfully." });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;

    try {
      const product = await deleteProductById(id);

      if (!product) {
        return res.status(404).json({ message: "product not found." });
      }

      res.status(200).json({ message: "product deleted successfully." });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
