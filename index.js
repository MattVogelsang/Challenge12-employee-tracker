const inquirer = require("inquirer");
const { printTable } = require('console-table-printer');
const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: '127.0.0.1',
  database: process.env.DB_NAME
});

pool.connect(() => {
  console.log(`Connected to the books_db database.`);
  mainMenu();
});


function mainMenu() {
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "menu",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role"
      ]
    }
  ]).then(response => {
    if (response.menu === "view all departments") {
      viewDepartments();
    } else if (response.menu === "view all roles") {
      viewRoles();
    } else if (response.menu === "view all employees") {
      viewEmployees();
    } else if (response.menu === "add a department") {
      addDepartment();
    } else if (response.menu === "add a role") {
      addRole();
    } else if (response.menu === "add an employee") {
      addEmployees();
    } else if (response.menu === "update an employee role") {
      updateEmployeesRole();
    }
  });
}


function viewDepartments() {
  pool.query("SELECT * FROM department", (err, { rows }) => {
    if (err) throw err;
    printTable(rows);
    mainMenu();
  });
}


function viewRoles() {
  pool.query("SELECT * FROM role", (err, { rows }) => {
    if (err) throw err;
    printTable(rows);
    mainMenu();
  });
}


function viewEmployees() {
  pool.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id 
    LEFT JOIN employee manager ON manager.id = employee.manager_id;
  `, (err, { rows }) => {
    if (err) throw err;
    printTable(rows);
    mainMenu();
  });
}


function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the name of the new department:",
      name: "department_name"
    }
  ]).then(res => {
    pool.query(`INSERT INTO department (name) VALUES ('${res.department_name}')`, (err) => {
      if (err) throw err;
      console.log("New department has been added!");
      viewDepartments();
    });
  });
}


function addRole() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the title of the new role:",
      name: "role_title"
    },
    {
      type: "input",
      message: "Enter the salary for this role:",
      name: "role_salary"
    },
    {
      type: "input",
      message: "Enter the department ID for this role:",
      name: "department_id"
    }
  ]).then(res => {
    pool.query(`INSERT INTO role (title, salary, department_id) VALUES ('${res.role_title}', ${res.role_salary}, ${res.department_id})`, (err) => {
      if (err) throw err;
      console.log("New role has been added!");
      viewRoles();
    });
  });
}


function addEmployees() {
  pool.query("SELECT title as name, id as value FROM role", (err, { rows }) => {
    if (err) throw err;
    pool.query("SELECT CONCAT(first_name,' ',last_name) AS name, id AS value FROM employee", (err, { rows: managerRows }) => {
      if (err) throw err;
      inquirer.prompt([
        {
          type: "input",
          message: "What is the employee's first name?",
          name: "first_name"
        },
        {
          type: "input",
          message: "What is the employee's last name?",
          name: "last_name"
        },
        {
          type: "list",
          message: "What is the employee's role?",
          name: "role",
          choices: rows
        },
        {
          type: "list",
          message: "Who is the employee's manager?",
          name: "manager",
          choices: managerRows
        }
      ]).then(res => {
        pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${res.first_name}', '${res.last_name}', ${res.role}, ${res.manager})`, (err) => {
          if (err) throw err;
          console.log("New employee has been added into system!");
          viewEmployees();
        });
      });
    });
  });
}


function updateEmployeesRole() {
  pool.query("SELECT CONCAT(first_name,' ',last_name) AS name, id AS value FROM employee", (err, { rows }) => {
    if (err) throw err;
    pool.query("SELECT title AS name, id AS value FROM role", (err, { rows: roleRows }) => {
      if (err) throw err;
      inquirer.prompt([
        {
          type: "list",
          message: "Which employee do you want to update?",
          name: "employee",
          choices: rows
        },
        {
          type: "list",
          message: "Which role do you want to assign to the selected employee?",
          name: "role",
          choices: roleRows
        }
      ]).then(res => {
        pool.query(`UPDATE employee SET role_id = ${res.role} WHERE id = ${res.employee}`, (err) => {
          if (err) throw err;
          console.log("Employee's role has been updated!");
          viewEmployees();
        });
      });
    });
  });
}
