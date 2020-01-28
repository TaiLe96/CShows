var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "cshows_db"
});

// Make connection
connection.connect(function(err){
    if (err){
        console.log("error connection: " + err.stack);
        return;
    }
})