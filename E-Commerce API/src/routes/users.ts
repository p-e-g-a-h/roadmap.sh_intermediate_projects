import express, { Request, Response, NextFunction } from "express";
import { verifyToken } from "../middleware/authJWT";
import { isAdmin } from "../middleware/isAdmin";
import { getAllUsers, deleteUserById } from "../store/users";

const router = express.Router();

router.get(
  "/",
  verifyToken,
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getAllUsers();

      if (users.length === 0)
        return res.status(404).json({ message: "no users found." });

      res.status(200).json(users);
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
      const user = await deleteUserById(id);

      if (!user) return res.status(404).json({ message: "user not found." });

      res.status(200).json({ message: "user deleted successfully." });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
