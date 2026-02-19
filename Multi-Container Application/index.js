const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/todos");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/todo_app";

(async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("db connected successfully.");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

app.use("/todos", router);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "internal server error" });
});

app.listen(port, "0.0.0.0", () =>
  console.log(`server is runnig on port ${port}`),
);
