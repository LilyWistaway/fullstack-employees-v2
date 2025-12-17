import db from "#db/client";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  const { rows } = await db.query(
    `INSERT INTO employees (name, birthday, salary)
     VALUES ($1, $2, $3)
     RETURNING *;`,
    [name, birthday, salary]
  );
  return rows[0];
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  const { rows } = await db.query(`SELECT * FROM employees;`);
  return rows;
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  const { rows } = await db.query(`SELECT * FROM employees WHERE id = $1;`, [
    id,
  ]);
  return rows[0];
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  const { rows } = await db.query(
    `UPDATE employees
     SET name = $2, birthday = $3, salary = $4
     WHERE id = $1
     RETURNING *;`,
    [id, name, birthday, salary]
  );
  return rows[0];
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  const { rows } = await db.query(
    `DELETE FROM employees
     WHERE id = $1
     RETURNING *;`,
    [id]
  );
  return rows[0];
}
