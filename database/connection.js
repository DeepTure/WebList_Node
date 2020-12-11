const mysql = require("mysql");

//se le da paramentros a la conexion
const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "[Tu usario aqui]",
    password: "[Tu contraseña aqui]",
    database: "[Nombre de la db]",
});

//se inicia la conexion
mysqlConnection.connect((err) => {
    //revisa si no ocurrio algun error
    if (err) {
        console.log("conexion fallida");
    } else {
        console.log("conexion exitosa");
    }
});

module.exports = mysqlConnection;
