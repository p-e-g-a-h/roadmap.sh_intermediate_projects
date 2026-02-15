const { DatabaseSync } = require("node:sqlite");

const db = new DatabaseSync("urls.db");

db.exec(`CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT UNIQUE,
    shortCode TEXT UNIQUE,
    accessCount INTEGER DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

const create = (url, shortCode) => {
  const stmt = db.prepare(`INSERT INTO urls (url, shortCode)
    VALUES (?, ?) RETURNING *`);
  return stmt.get(url, shortCode);
};

const retrieve = (shortCode) => {
  const stmt = db.prepare(`SELECT * FROM urls WHERE shortCode = ?`);
  return stmt.get(shortCode);
};

const update = (url, shortCode) => {
  const stmt =
    db.prepare(`UPDATE urls SET url = ?, updatedAt = CURRENT_TIMESTAMP 
    WHERE shortCode = ? 
    RETURNING *`);

  return stmt.get(url, shortCode);
};

const remove = (shortCode) => {
  const stmt = db.prepare(`DELETE FROM urls 
    WHERE shortCode = ?`);
  return stmt.run(shortCode).changes;
};

const accessCount = (shortCode) => {
  const stmt = db.prepare(`UPDATE urls 
    SET accessCount = accessCount + 1, updatedAt = CURRENT_TIMESTAMP 
    WHERE shortCode = ? RETURNING *`);
  return stmt.get(shortCode);
};

module.exports = { create, retrieve, update, remove, accessCount };
