const mysql = require("mysql2");

const connection = mysql.createConnection({
<<<<<<< Updated upstream
  host: "localhost",
  user: "root",
  password: "julian123",
  database: "masukotto",
=======
    host: "localhost",
    user: "root",
    password: "julian123",
    database: "masukotto",
>>>>>>> Stashed changes
});

connection.connect((error) => {
  if (error) {
    console.log("El error de conexion es " + error);
    return;
  }
  console.log("Conectado");
});

module.exports = connection;
