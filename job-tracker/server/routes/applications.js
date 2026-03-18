const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all (with optional filter)
router.get("/", async (req, res) => {
  const { search } = req.query;

  if (search) {
    const result = await pool.query(
        `SELECT * FROM applications
         WHERE company ILIKE $1
            OR role ILIKE $1
            OR status ILIKE $1
         ORDER BY id DESC`,
        [`%${search}%`]
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
  const { company, role, status, location, salary } = req.body;

  const result = await pool.query(
    "INSERT INTO applications (company, role, status, location, salary) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [company, role, status, location, salary]
  );

  res.json(result.rows);
});

// PUT
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { company, role, status, applied_date, location, salary} = req.body;

  await pool.query(
    "UPDATE applications SET status = $3, applied_date = $4, location = $5, role = $2, company = $1, salary = $6 WHERE id = $7",
    [company, role, status, applied_date, location, salary, id]
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