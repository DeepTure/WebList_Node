const mysql = require("mysql");

//se le da paramentros a la conexion
const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root2",
    password: "root2",
    database: "weblist"
});

//se inicia la conexion
mysqlConnection.connect((err) => {
    //revisa si no ocurrio algun error
    if (err) {
        console.log("conexion fallida: "+err);
    } else {
        console.log("conexion exitosa");
    }
});

module.exports = mysqlConnection;
