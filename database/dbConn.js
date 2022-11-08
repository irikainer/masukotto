const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Lenovo1583",
    database: "masukotto",
});

connection.connect((error) => {
    if (error) {
        console.log("El error de conexion es " + error);
        return;
    }
    console.log("Conectado");
});

module.exports = connection;