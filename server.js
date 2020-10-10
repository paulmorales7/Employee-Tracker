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
            choices: ["UPDATE", "READ", "ADD"]
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
            } else (
                connection.end()
            )
        });
}

function addToTable() {
    inquirer
        .prompt([
            {
                name: "table",
                type: "input",
                message: "Which table would you like to add something too?"
            },
            {
                name: "adding",
                type: "input",
                message: "What would you like to add?"
            },
            {
                name: "table",
                type: "input",
                message: ""
            }


        ])
        .then(function (answer) {
            console.log("Adding to tables")
            connection.query(
                "INSERT INTO (name of table here) SET ?",
                {

                },
                function (err, res) {
                    if (err) throw err;
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
        .then(function (){
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