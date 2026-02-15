const router = require("express").Router();
const { customAlphabet } = require("nanoid");
const store = require("../store");

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

router.post("/", (req, res, next) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ message: "no url provided." });

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return res.status(400).json({ message: "not valid url (https://)." });
  }

  try {
    const result = store.create(url, customAlphabet(alphabet, 6)());
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/go/:shortCode", (req, res, next) => {
  const { shortCode } = req.params;

  try {
    const result = store.accessCount(shortCode);

    if (!result) return res.sendStatus(404);

    res.redirect(result.url);
  } catch (error) {
    next(error);
  }
});

router.get("/:shortCode", (req, res, next) => {
  const { shortCode } = req.params;

  try {
    const result = store.retrieve(shortCode);

    if (!result) return res.sendStatus(404);

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:shortCode", (req, res, next) => {
  const { shortCode } = req.params;
  const { url } = req.body;

  if (!url) return res.status(400).json({ message: "not url provided" });

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return res.status(400).json({ message: "not valid url (https://)." });
  }

  try {
    const result = store.update(url, shortCode);

    if (!result) return res.sendStatus(404);

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:shortCode", (req, res, next) => {
  const { shortCode } = req.params;

  try {
    const result = store.remove(shortCode);

    if (!result) return res.sendStatus(404);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
