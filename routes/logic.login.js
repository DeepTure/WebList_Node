const router = require("express").Router();
const db = require("../database/connection");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const Passportlocal = require("passport-local").Strategy;

router.use(cookieParser("6$uRCRC1UAKyBCbCYb7%^90!NHwd9@OJWBHOe7AqyBB9zj^OZN"));
router.use(
    session({
        secret: "6$uRCRC1UAKyBCbCYb7%^90!NHwd9@OJWBHOe7AqyBB9zj^OZN",
        resave: true,
        saveUninitialized: true,
    })
);

router.use(passport.initialize());
router.use(passport.session());

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
                        return done(null, false);
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
    done(null, [user.rol, user.id]);
});

//Preparado para redireccionar a las vistas correspondientes dependiendo el rol
router.post(
    "/InicioSesionController",
    passport.authenticate("local", { failureRedirect: "/" }),
    function (req, res) {
        if (req.user.rol == "profesor") {
            res.redirect("/home");
        } else if (req.user.rol == "administrador") {
            res.redirect("/homeadmin");
        } else if (req.user.rol == "alumno") {
            res.redirect("/home");
        }
    }
);

router.get(
    "/home",
    (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect("/");
    },
    (req, res) => {
        return res.render("Home", {});
    }
);

router.get(
    "/homeadmin",
    (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect("/");
    },
    (req, res) => {
        db.query("select * from profesor;"+"select * from alumno", (err, resul) => {
            if (err) {
                console.log(err);
            } else {
                return res.render("Homeadmin", {
                    profesor: resul[0],
                    alumno: resul[1],
                });
            }
        });
    }
);


module.exports = router;
