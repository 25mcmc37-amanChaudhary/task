const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ GET users (pagination + search)
router.get("/", (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const offset = (page - 1) * limit;

  const query = `
    SELECT * FROM users 
    WHERE name LIKE ? OR email LIKE ?
    LIMIT ? OFFSET ?
  `;

  db.query(
    query,
    [`%${search}%`, `%${search}%`, Number(limit), Number(offset)],
    (err, result) => {
      if (err) return res.send(err);
      res.json(result);
    }
  );
});

// ✅ CREATE user
router.post("/", (req, res) => {
  const { name, email, age } = req.body;

  db.query(
    "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
    [name, email, age],
    (err, result) => {
      if (err) return res.send(err);
      res.send("User Added");
    }
  );
});

// ✅ UPDATE user
router.put("/:id", (req, res) => {
  const { name, email, age } = req.body;

  db.query(
    "UPDATE users SET name=?, email=?, age=? WHERE id=?",
    [name, email, age, req.params.id],
    (err, result) => {
      if (err) return res.send(err);
      res.send("User Updated");
    }
  );
});

// ✅ DELETE user
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM users WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.send(err);
      res.send("User Deleted");
    }
  );
});

module.exports = router;