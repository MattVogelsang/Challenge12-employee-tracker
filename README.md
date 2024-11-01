# Challenge12-employee-tracker

This Employee Management System is a command-line application that allows users to manage employee data for a company. Users can view departments, roles, and employees, as well as add new entries and update existing ones. This application uses PostgreSQL for the database, pg for database queries, and inquirer for user interaction.

Table of Contents
Features
Installation
Usage
Database Schema
Technologies Used
License
Features
The application provides the following functionalities:

View all departments - Displays a formatted table showing department names and IDs.
View all roles - Shows job titles, role IDs, the department each role belongs to, and the salary for that role.
View all employees - Displays a table with employee IDs, names, job titles, departments, salaries, and managers.
Add a department - Allows the user to add a new department.
Add a role - Enables adding a new role by specifying its name, salary, and department.
Add an employee - Allows adding a new employee by specifying their name, role, and manager.
Update an employee role - Enables updating an employee's role by selecting the employee and assigning a new role.
Installation
Prerequisites
Node.js
PostgreSQL
Steps
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/employee-management-system.git
cd employee-management-system
Install dependencies:

bash
Copy code
npm install
Set up the PostgreSQL database:

Ensure PostgreSQL is running on your local machine.
Create a new database, e.g., employee_management.
Run the SQL schema and seed files to set up the tables and initial data:
bash
Copy code
psql -d employee_management -f schema.sql
psql -d employee_management -f seeds.sql
Configure environment variables:

Create a .env file in the root directory and add your PostgreSQL credentials:
plaintext
Copy code
DB_USER=yourUsername
DB_PASSWORD=yourPassword
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=employee_management
Usage
Start the application:

bash
Copy code
node index.js
Use the menu prompts to navigate through the options:

Choose an action (e.g., View all departments, Add a department, etc.).
Follow the prompts to view or modify data.
Example Commands
View All Departments: Select the option to view a table of department names and IDs.
Add an Employee: Select "Add an employee" and follow prompts to enter the employee’s first and last names, role, and manager.
Database Schema
The database consists of three main tables:

Department:

id: Primary key, unique ID for each department.
name: Name of the department.
Role:

id: Primary key, unique ID for each role.
title: Name of the role.
salary: Salary for the role.
department_id: Foreign key linking to the department table.
Employee:

id: Primary key, unique ID for each employee.
first_name: Employee's first name.
last_name: Employee's last name.
role_id: Foreign key linking to the role table.
manager_id: Self-referencing foreign key linking to another employee who is the manager.
Technologies Used
Node.js: JavaScript runtime for server-side programming.
PostgreSQL: Relational database management system for data storage.
pg: PostgreSQL client for Node.js to interact with the database.
inquirer: CLI library for handling user input.
License
This project is licensed under the MIT License. See the LICENSE file for details.