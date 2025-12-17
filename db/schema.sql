DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
  id serial PRIMARY KEY,
  name text NOT NULL,
  birthday date NOT NULL,
  salary integer NOT NULL
);

INSERT INTO employees (name, birthday, salary) VALUES
  ('Ava Chen', '1992-04-18', 82000),
  ('Noah Patel', '1989-11-03', 95000),
  ('Mia Johnson', '1995-02-27', 73000),
  ('Liam Garcia', '1990-07-12', 88000),
  ('Sophia Kim', '1993-09-25', 91000),
  ('Ethan Brown', '1987-01-19', 105000),
  ('Isabella Moore', '1996-06-08', 69000),
  ('James Wilson', '1988-12-30', 99000),
  ('Olivia Davis', '1994-03-14', 76000),
  ('Benjamin Lee', '1991-10-05', 87000);
