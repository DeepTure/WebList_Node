//constante para generar la aplicacion
const express = require("express");
const app = express();

//para poder utilizar rutas de archivos en cualquier sistema
const path = require("path");

//middelware para obtener logs detallados
const morgan = require("morgan");

//middelware para obtener los datos de los forms
const Parser = require("body-parser").urlencoded({ extended: false });

//cosas del passport
const db = require("./database/connection");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const Passportlocal = require("passport-local").Strategy;
const flash = require("connect-flash");

//routers
const main = require("./routes/main.routes");
//const crudAlumno = require("./routes/crud.alumno.routes");
const crudAsistencia = require("./routes/logic.paseLista.routes");
const navegacion = require("./routes/navegacion.rutas");
const login = require("./routes/logic.login");

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
app.use(cookieParser("6$uRCRC1UAKyBCbCYb7%^90!NHwd9@OJWBHOe7AqyBB9zj^OZN"));
app.use(
    session({
        secret: "6$uRCRC1UAKyBCbCYb7%^90!NHwd9@OJWBHOe7AqyBB9zj^OZN",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());

//passport local
passport.use(
    new Passportlocal(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true,
        },
        (req, username, password, done) => {
            db.query(
                "select * from profesor where (numEmpleado= ? AND contraseña= ?);" +
                    "select * from administrador where (idAdmin= ? AND contraseña= ?);" +
                    "select * from alumno where (boleta= ? AND contraseña= ?);",
                [username, password, username, password, username, password],
                (err, rows) => {
                    if (err) return done(null, false);
                    if (rows[0].length > 0) {
                        let profesor = rows[0];
                        return done(null, {
                            rol: "profesor",
                            id: profesor[0].numEmpleado.toString(),
                        });
                    } else if (rows[1].length > 0) {
                        let administrador = rows[1];
                        return done(null, {
                            rol: "administrador",
                            id: administrador[0].idAdmin.toString(),
                        });
                    } else if (rows[2].length > 0) {
                        let alumno = rows[2];
                        return done(null, {
                            rol: "alumno",
                            id: alumno[0].boleta.toString(),
                        });
                    } else {
                        return done(null, false, {
                            message:
                                "Usuario y/o contraseña incorrectos, Intentelo nuevamente",
                        });
                    }
                }
            );
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, [user.rol, user.id]);
});

passport.deserializeUser(function (user, done) {
    done(null, {
        rol: user[0],
        id: user[1],
    });
});

//para acceder a archivos estaticos
app.use("/public", express.static("public"));
//usamos el body parser
app.use(Parser);

//rutas
app.use(main);
//app.use(crudAlumno);
app.use(crudAsistencia);
app.use(navegacion);
app.use(login);
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
