const mysql = require('mysql2');
const inquirer = require('inquirer');
const PORT = process.env.PORT || 3000;
const cTable = require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );