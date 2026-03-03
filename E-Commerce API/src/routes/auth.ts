import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validate from "../middleware/validate";
import { registerSchema, loginSchema } from "../schemas/auth";
import { register, login } from "../store/auth";

const router = express.Router();

const createToken = (data: { id: string; role: string }) => {
  return jwt.sign(data, process.env.JWT_KEY!, { expiresIn: "1h" });
};

router.post(
  "/register",
  validate(registerSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    try {
      const user = await register(name, email, await bcrypt.hash(password, 10));

      res
        .status(201)
        .json({ message: "user created successfully.", data: user });
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/login",
  validate(loginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      const user = await login(email);

      if (!user) {
        return res.status(401).json({ message: "invalid email or password." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "invalid email or password." });
      }

      res
        .status(200)
        .json({ token: createToken({ id: user.id, role: user.role }) });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
