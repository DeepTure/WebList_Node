const mysql = require("mysql");

//se le da paramentros a la conexion
const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mGr4@9y62J#-",
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
