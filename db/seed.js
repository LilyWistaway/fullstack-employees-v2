import db from "#db/client";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [
    { name: "Ava Chen", birthday: "1992-04-18", salary: 82000 },
    { name: "Noah Patel", birthday: "1989-11-03", salary: 95000 },
    { name: "Mia Johnson", birthday: "1995-02-27", salary: 73000 },
    { name: "Liam Garcia", birthday: "1990-07-12", salary: 88000 },
    { name: "Sophia Kim", birthday: "1993-09-25", salary: 91000 },
    { name: "Ethan Brown", birthday: "1987-01-19", salary: 105000 },
    { name: "Isabella Moore", birthday: "1996-06-08", salary: 69000 },
    { name: "James Wilson", birthday: "1988-12-30", salary: 99000 },
    { name: "Olivia Davis", birthday: "1994-03-14", salary: 76000 },
    { name: "Benjamin Lee", birthday: "1991-10-05", salary: 87000 },
  ];

  for (const employee of employees) {
    await db.query(
      `INSERT INTO employees (name, birthday, salary)
       VALUES ($1, $2, $3);`,
      [employee.name, employee.birthday, employee.salary]
    );
  }
}
