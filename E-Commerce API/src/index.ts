require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import initDB from "./store/initDB.js";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import productsRoute from "./routes/products.js";
import cartRoute from "./routes/cart.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/products", productsRoute);
app.use("/cart", cartRoute);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "internal server error" });
});

(async () => {
  await initDB();
  app.listen(port, () => console.log(`server is running on port ${port}`));
})();
