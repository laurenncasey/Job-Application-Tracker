const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all (with optional filter)
router.get("/", async (req, res) => {
  const { status } = req.query;

  if (status) {
    const result = await pool.query(
      "SELECT * FROM applications WHERE status = $1 ORDER BY id DESC",
      [status]
    );
    return res.json(result.rows);
  }

  const result = await pool.query(
    "SELECT * FROM applications ORDER BY id DESC"
  );
  res.json(result.rows);
});

// POST
router.post("/", async (req, res) => {
  const { company, role, status, notes } = req.body;

  const result = await pool.query(
    "INSERT INTO applications (company, role, status, notes) VALUES ($1, $2, $3, $4) RETURNING *",
    [company, role, status, notes]
  );

  res.json(result.rows[0]);
});

// PUT
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await pool.query(
    "UPDATE applications SET status = $1 WHERE id = $2",
    [status, id]
  );

  res.sendStatus(200);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM applications WHERE id = $1", [id]);

  res.sendStatus(200);
});

module.exports = router;