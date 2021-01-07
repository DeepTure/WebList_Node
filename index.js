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
const crudAsistencia = require("./routes/logic.paseLista.routes");
const navegacion = require("./routes/navegacion.rutas");
const login = require("./routes/logic.login");
const vistaAdmin = require("./routes/vista.admin.cruds");
const profile = require("./routes/profile");
const firma = require("./routes/sign.routes");
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
                    if (err)
                        console.log(err);
                        return done(null, false, {
                            message: "Hubo un fallo en el proceso",
                        });
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
app.use(crudAsistencia);
app.use(navegacion);
app.use(login);
app.use(vistaAdmin);
app.use(profile);
app.use(firma);

//rutas de emergencia cuando ocurre
app.use((req, res) => {
    res.status(404);
    //se necesita crear la pagina
    res.render("error", {
        error: 404,
        message: "No hemos podido encontrar su pagina",
    });
});

app.use((req, res) => {
    /*la petición es correcta pero el servidor se niega a ofrecerte el recurso o página web. Es posible que necesites una cuenta en el servicio e iniciar sesión 
    antes de poder acceder.*/
    res.status(403);
    res.render("error", { error: 403, message: "Ha Ocurrido un error" });
});

app.use((req, res) => {
    //no se permite el uso de ese método.
    res.status(405);
    res.render("error", {
        error: 405,
        message: "Ha ocurrido un error de negación",
    });
});

app.use((req, res) => {
    //el servidor aun no ha implementado el método que se ha pedido, aunque es probable que se añada en un futuro.
    res.status(501);
    res.render("error", { error: 501, message: "Ha ocurrido un error" });
});

app.use((error, req, res, next) => {
    res.status(500);
    //se necesita crear la pagina
    res.render("error", { error: 500, message: error });
});

//montando el servidor

app.listen(app.get("host"), (req, res) => {
    console.log("Servidor en puerto: " + app.get("host"));
});
