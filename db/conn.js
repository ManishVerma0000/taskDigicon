var mysql = require("mysql")
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"

})
connection.connect((error) => {
    if (error) {
        console.log("error occurs")
    } else {
        console.log("connected successfully.........");
    }

})

module.exports = connection;