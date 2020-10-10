var mysql = require("mysql");
var inquirer = require('inquirer');
// const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "212Sqlblue",

    database: "employee_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

})

function start() {
    inquirer
        .prompt({
            name: "selection",
            type: "list",
            message: "Would you like to update, add, or read any of the data?",
            choices: ["UPDATE", "READ", "ADD", "EXIT"]
        })
        .then(function (answer) {
            if (answer.selection === "ADD") {
                addToTable();
            }
            else if (answer.selection === "READ") {
                readTable();
            }
            else if (answer.selection === "UPDATE") {
                updateTable();
            } else {
                connection.end()
            }
        });
}

function addToTable() {
    inquirer
        .prompt([
            {
                name: "Table",
                type: "list",
                choices: ["Department", "Roles", "Employee"]
            }
        ])
        .then(function (answer) {
            if (answer.Table === "Department") {
                departmentTable();
            }
            else if (answer.Table === "Roles") {
                rolesTable();
            }
            else {
                employeeTable();
            }
        })
}

function employeeTable() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the id?"
            },
            {
                name: "firstname",
                type: "input",
                message: "What is the first name?"
            },
            {
                name: "lastname",
                type: "input",
                message: "What is the last name?"
            },
            {
                name: "roleid",
                type: "input",
                message: "What is the role id?"
            },
            {
                name: "managerid",
                type: "input",
                message: "What is the manager id?"
            }
        ])
        .then(function (answer) {
            console.log("Adding to tables")
            connection.query(
                "INSERT INTO Employee SET ?",
                {
                    id: answer.id,
                    first_name: answer.firstname,
                    last_name: answer.lastname,
                    role_id: answer.roleid,
                    manager_id: answer.managerid

                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res)
                    start();
                }
            )
        })

}

function rolesTable() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the id?"
            },
            {
                name: "title",
                type: "input",
                message: "What is the title?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary?"
            },
            {
                name: "departmentid",
                type: "input",
                message: "What is the department id?"
            }
        ])
        .then(function (answer) {
            console.log("Adding to tables")
            connection.query(
                "INSERT INTO Roles SET ?",
                {
                    id: answer.id,
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.departmentid
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res)
                    start();
                }
            )
        })

}


function departmentTable() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the id?"
            },
            {
                name: "name",
                type: "input",
                message: "What is the name?"
            }

        ])
        .then(function (answer) {
            console.log("Adding to tables")
            connection.query(
                "INSERT INTO Department SET ?",
                {
                    id: answer.id,
                    name: answer.name
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res)
                    start();
                }
            )
        })

}

function readTable() {
    inquirer
        .prompt([
            {
                name: "table",
                type: "input",
                message: "Which table would you like to read from?"
            },
            {
                name: "read",
                type: "input",
                message: "What would you like to read?"
            },
            {
                name: "table",
                type: "input",
                message: ""
            }


        ])
        .then(function () {
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;

                console.log(res)
                connection.end();
            })
        })
}

function updateTable() {
    inquirer
        .prompt([
            {
                name: "table",
                type: "input",
                message: "Which table would you like to update?"
            },
            {
                name: "update",
                type: "input",
                message: "What would you like to update?"
            },
            {
                name: "table",
                type: "input",
                message: ""
            }


        ])
        .then(function (answer) {
            connection.query("DELERE FROM (table) WHERE ?"),
            {

            },
                function (err, res) {
                    if (err) throw err;

                    console.log(res.affectedRows + " deleted \n")
                }
        })

}

start();
