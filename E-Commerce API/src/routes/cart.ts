import express, { Response, NextFunction } from "express";
import { verifyToken, AuthRequest } from "../middleware/authJWT";
import {
  getAllProductsInCart,
  addProductToCart,
  removeProductFromCart,
} from "../store/cart";

const router = express.Router();

router.get(
  "/",
  verifyToken,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const products = await getAllProductsInCart(req.user!.id);

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/:id",
  verifyToken,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const productId = req.params.id as string;

    try {
      const product = await addProductToCart(req.user!.id, productId);

      res.status(201).json({ message: "product added to cart successfully." });
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:id",
  verifyToken,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const productId = req.params.id as string;

    try {
      const product = await removeProductFromCart(req.user!.id, productId);

      if (!product) {
        return res.status(404).json({ message: "product not found in cart." });
      }

      res
        .status(200)
        .json({ message: "product removed from cart successfully." });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
