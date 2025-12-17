import express from "express";
import db from "#db/client";

const router = express.Router();
export default router;

function parseId(req, res) {
  const raw = req.params.id;

  // Must be digits only (reject "1e10")
  if (!/^\d+$/.test(raw)) {
    res.sendStatus(400);
    return null;
  }

  const id = Number(raw);

  // Allow 0 so it can hit "not found" => 404 in tests
  if (!Number.isSafeInteger(id) || id < 0) {
    res.sendStatus(400);
    return null;
  }

  return id;
}

function validateBody(req, res) {
  if (!req.body) {
    res.sendStatus(400);
    return null;
  }

  const { name, birthday, salary } = req.body;
  if (name == null || birthday == null || salary == null) {
    res.sendStatus(400);
    return null;
  }

  return { name, birthday, salary };
}

// GET /employees
router.get("/", async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM employees;");
    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
});

// POST /employees
router.post("/", async (req, res, next) => {
  try {
    const body = validateBody(req, res);
    if (body === null) return;

    const result = await db.query(
      `INSERT INTO employees (name, birthday, salary)
       VALUES ($1, $2, $3)
       RETURNING *;`,
      [body.name, body.birthday, body.salary]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// GET /employees/:id
router.get("/:id", async (req, res, next) => {
  try {
    const id = parseId(req, res);
    if (id === null) return;

    const result = await db.query(`SELECT * FROM employees WHERE id = $1;`, [
      id,
    ]);

    const employee = result.rows[0];
    if (!employee) return res.sendStatus(404);

    res.status(200).json(employee);
  } catch (err) {
    next(err);
  }
});

// DELETE /employees/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseId(req, res);
    if (id === null) return;

    const result = await db.query(
      `DELETE FROM employees
       WHERE id = $1
       RETURNING *;`,
      [id]
    );

    const employee = result.rows[0];
    if (!employee) return res.sendStatus(404);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// PUT /employees/:id
router.put("/:id", async (req, res, next) => {
  try {
    const id = parseId(req, res);
    if (id === null) return;

    const body = validateBody(req, res);
    if (body === null) return;

    const result = await db.query(
      `UPDATE employees
       SET name = $2, birthday = $3, salary = $4
       WHERE id = $1
       RETURNING *;`,
      [id, body.name, body.birthday, body.salary]
    );

    const employee = result.rows[0];
    if (!employee) return res.sendStatus(404);

    res.status(200).json(employee);
  } catch (err) {
    next(err);
  }
});
