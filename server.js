const mysql = require("mysql2");
const inquirer = require("inquirer");
const util = require("util");
require('console.table');
require("dotenv").config;

const db = mysql.createConnection({
  host: "localhost",
  // port: 3001,
  user: "root",
  password: "Solar4life$",
  database: "employees_db"
});

db.connect(function (err) {
  if (err) throw err;
  console.log('Connected to db.');
  runPrompts();
});

function runPrompts() {
  inquirer.prompt({
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an existing employee\'s role',
        'Exit'
      ]
  }).then(function ({choice}) {
    switch (choice) {
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'Add a department':
        createDepartment();
        break;
      case 'Add a role':
        createRole();
        break;
      case 'Add an employee':
        createEmployee();
        break;
      case 'Update an existing employee\'s role':
        updateEmployeeRole();
        break;
      case 'Exit':
        console.log('Exiting');
        db.end();
        break;
    }
  });
}

//view

function viewAllDepartments() {
  db.query('SELECT * FROM department', function (err, result) {
    if (err) {
      console.log(err);
    }
    console.table(result);
    console.log("Departments:\n");
    runPrompts();
  });
}

function viewAllRoles() {
  db.query('SELECT r.title AS job_title, r.id AS role_id, d.name AS department, r.salary FROM role r LEFT JOIN department d ON r.department_id = d.id', function (err, result) {
    if (err) {
        console.log(err);
      }
      console.table(result);
      console.log("Roles:\n");
      runPrompts();
  });
}

function viewAllEmployees() {
  db.query("SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON d.id = r.department_id LEFT JOIN employee m ON m.id = e.manager_id", function (err, result) {
    if (err) {
        console.log(err);
      }
      console.table(result);
      console.log("Viewing all employees\n");
      runPrompts();
  });
}

//create

function createDepartment() {
  inquirer.prompt({
    type: 'input',
    name: 'departmentName',
    message: 'What is the name of the department?'
  }).then(data => {
    console.log("Adding Department to database\n");
    let query = `INSERT INTO department(name) VALUES('${data.departmentName}')`;
    db.query(query, function (err, result) {
      if (err) throw err;
      viewAllDepartments();
    });
  });
}

function createRole() {
      inquirer.prompt([
        {
          type: 'input',
          name: "roleTitle",
          message: "What is the name of the role?"
        },
        {
          type: 'input',
          name: "roleSalary",
          message: "What is the salary rate?"
        },
        {
          type: "input",
          name: "roleId",
          message: "Which department Id does the role fall in under?",
        },
      ]).then(data => {
            console.log("Adding role to database\n");
            let query = `INSERT INTO role(title,salary,department_id) VALUES('${data.roleTitle}','${data.roleSalary}','${data.roleId}')`;
            db.query(query, function (err, result) {
              if (err) throw err;
              viewAllRoles();
            });
        });
    }

function createEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: "firstName",
      message: "What's the employee's first name?"
    },
    {
      type: 'input',
      name: "lastName",
      message: "What's the employee's last name?"
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'What is the role id?'
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'What is the manager\'s id?'
    }
  ]).then(data => {
    console.log('Adding employee to db');
    let query = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES('${data.firstName}','${data.lastName}','${data.roleId}','${data.managerId}')`;
    db.query(query, function (err, result) {
      if (err) throw err;
      viewAllEmployees();
    });
  });
}

function updateEmployeeRole () {
  db.query("SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON d.id = r.department_id LEFT JOIN employee m ON m.id = e.manager_id", function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log("\n");
    console.log("Viewing employees to update\n");
    console.table(result);
    console.log("Viewing employees to update\n");
  });
  db.query('SELECT id, title FROM role', function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log("Viewing role IDs\n");
    console.table(result);
    console.log("Viewing role IDs\n");
    newRole();
  });
}

function newRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'What is the ID of the employee that needs to be updated?'
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'What is the new role ID of the employee that needs to be updated?'
    }
  ]).then(input => {
    console.log("Updating employee\n");
    let query = `UPDATE employee SET role_id = ${input.roleId} WHERE id = ${input.id}`;
    db.query(query, function (err, result) {
      if (err) throw err;
      viewAllEmployees();
      console.log("Viewing updated employees\n");
    });
  });
}

