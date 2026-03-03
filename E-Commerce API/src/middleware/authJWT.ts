import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

  if (token) {
    try {
      const verified = jwt.verify(token, process.env.JWT_KEY!);
      req.user = verified as {
        id: string;
        role: string;
      };
      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  res.status(401).json({ message: "Unauthorized: No token provided" });
};

export { verifyToken, AuthRequest };
