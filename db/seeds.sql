\c employees_db;

-- Insert departments
INSERT INTO department(name)
VALUES 
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

-- Insert roles with correct department IDs
INSERT INTO role(title, salary, department_id)
VALUES 
  ('Sales Lead', 100000, 1),
  ('Sales Person', 80000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 120000, 2),
  ('Account Manager', 160000, 3),
  ('Accountant', 150000, 3),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 190000, 4);

-- Insert employees with correct role IDs
INSERT INTO employee(first_name, last_name, role_id)
VALUES
  ('John', 'Doe', 1),
  ('Mike', 'Chan', 2),
  ('Ashley', 'Rodriguez', 3),
  ('Matt', 'Vogelsang', 4),
  ('Bella', 'Vogelsang', 5),
  ('Sofia', 'T', 6),
  ('Cam', 'Ward', 7),
  ('Sari', 'Tej', 8);

-- Set manager relationships
UPDATE employee SET manager_id = 1 WHERE id = 2;
UPDATE employee SET manager_id = 1 WHERE id = 3;
UPDATE employee SET manager_id = 3 WHERE id = 4;
UPDATE employee SET manager_id = 3 WHERE id = 5;
