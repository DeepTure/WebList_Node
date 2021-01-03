const mysql = require("mysql");

//se le da paramentros a la conexion
const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "n0m3l0",
    database: "weblist",
    multipleStatements: true,
});

//se inicia la conexion
mysqlConnection.connect((err) => {
    //revisa si no ocurrio algun error
    if (err) {
        console.log("conexion fallida: " + err);
    } else {
        console.log("conexion exitosa");
    }
});

module.exports = mysqlConnection;
