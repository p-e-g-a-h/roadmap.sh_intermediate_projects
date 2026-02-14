const express = require("express");
const { check } = require("gramma");
const path = require("path");
const fs = require("fs").promises;
const marked = require("marked");

const app = express();
const port = process.env.PORT || 3000;

const dirPath = path.join(__dirname, "notes");

app.use(express.json());

app.post("/grammer", async (req, res, next) => {
  const { note } = req.body;

  if (!note) return res.status(400).json({ message: "no note provided" });

  try {
    const result = await check(note);
    res.json(result.matches);
  } catch (error) {
    next(error);
  }
});

app.post("/save", async (req, res, next) => {
  const { title, note } = req.body;

  if (!title || !note) {
    return res.status(400).json({ message: "no title or note provided" });
  }
  try {
    await fs.mkdir(dirPath, { recursive: true });

    const filePath = path.join(dirPath, `${title}.md`);
    await fs.writeFile(filePath, note);
    res.status(201).json({ message: "note saved successfully." });
  } catch (error) {
    next(error);
  }
});

app.get("/notes", async (req, res, next) => {
  try {
    const files = await fs.readdir(dirPath);
    const list = files.map((fileName) => fileName);

    res.json({ listOfFiles: list });
  } catch (error) {
    next(error);
  }
});

app.get("/notes/:fileName", async (req, res, next) => {
  const { fileName } = req.params;

  if (!fileName) {
    return res.status(400).json({ message: "no file name provided" });
  }

  try {
    const filePath = path.join(dirPath, fileName);

    try {
      await fs.access(filePath);
    } catch (error) {
      return res.status(404).json({ message: "not found privided name" });
    }

    const markdown = await fs.readFile(filePath, "utf-8");
    const html = marked.parse(markdown);

    res.set("Content-Type", "text/html");
    res.send(html);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error("Error Log:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(port, () => console.log(`server running on port ${port}`));
