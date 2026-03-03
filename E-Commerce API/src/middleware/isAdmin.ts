import { Response, NextFunction } from "express";
import { verifyToken, AuthRequest } from "./authJWT.js";

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }

  return next();
};
