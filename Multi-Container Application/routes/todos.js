const store = require("../store");
const ObjectId = require("mongoose").Types.ObjectId;

const router = require("express").Router();

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "invalid id format." });
  }

  try {
    const result = await store.getById(id);

    if (!result) return res.status(404).json({ message: "todo not found" });

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    res.json(await store.getAll());
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { title } = req.body;

  if (!title) return res.status(400).json("no title provided.");

  try {
    res.status(201).json(await store.create(title));
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) return res.status(400).json("no title provided.");

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "invalid id format." });
  }

  try {
    const result = await store.update(id, title);

    if (!result) return res.status(404).json({ message: "todo not found" });

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "invalid id format." });
  }

  try {
    const result = await store.remove(id);

    if (!result) return res.status(404).json({ message: "todo not found" });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
