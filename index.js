//constante para generar la aplicacion
const express = require("express");
const app = express();

//para poder utilizar rutas de archivos en cualquier sistema
const path = require("path");

//middelware para obtener logs detallados
const morgan = require("morgan");

//middelware para obtener los datos de los forms
const Parser = require("body-parser").urlencoded({ extended: false });

//routers
const main = require("./routes/main.routes");
//const crudAlumno = require("./routes/crud.alumno.routes");
const crudAsistencia = require("./routes/logic.paseLista.routes");
const navegacion = require('./routes/navegacion.rutas');

//variables

/*
el process.env.PORT se usa para obtener el puerto por defecto
de nuestro servicio de hosting o en su defecto usar el puerto 8080
*/
app.set("host", process.env.PORT || 3000);
//para poder utilizar el render con ejs
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
//para utilizar solo el nombre del html y no toda direccion
app.set("views", path.join(__dirname, "views"));

//middlewares
app.use(morgan("dev"));
//para acceder a archivos estaticos
app.use("/public", express.static("public"));
//usamos el body parser
app.use(Parser);

//rutas
app.use(main);
//app.use(crudAlumno);
app.use(crudAsistencia);
app.use(navegacion);

//rutas de emergencia cuando ocurre
//un error 404 (pagina no encontrada) o 500 (error interno del servidor)
//NO DESCOMENTAR ESTAS LINEAS HASTA QUE EXISTAN LAS PAGINAS
/*app.use((req, res) => {
    res.status(404);
    //se necesita crear la pagina
    res.render("404.html");
});*/
/* 
app.use((error, req, res, next) => {
    res.status(500);
    //se necesita crear la pagina
    res.render("500.html", { error: error });
});*/

//montando el servidor
app.listen(app.get("host"), (req, res) => {
    console.log("Servidor en puerto: " + app.get("host"));
});
