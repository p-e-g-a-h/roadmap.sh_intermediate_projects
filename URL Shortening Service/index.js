const express = require("express");
const router = require("./routes/main");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/shorten", router);

app.use((err, req, res, next) => {
  console.error(err);

  if (err.code === "ERR_SQLITE_ERROR" || err.message.includes("UNIQUE")) {
    return res.status(400).json({
      message: "database validation error.",
    });
  }

  res.status(500).json({ message: "internal server error" });
});

app.listen(port, () => console.log(`server is running in port ${port}`));
