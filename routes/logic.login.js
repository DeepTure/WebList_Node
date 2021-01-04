const router = require("express").Router();
const passport = require("passport");
const db = require("../database/connection");

//Preparado para redireccionar a las vistas correspondientes dependiendo el rol
router.post(
    "/InicioSesionController",
    passport.authenticate("local", {
        failureRedirect: "/",
        failureFlash: true,
    }),
    function (req, res) {
        req.session.save((err) => {
            if (err) {
                return res.json(err);
            }
            if (req.user.rol == "profesor") {
                return res.redirect("/homeprof");
            } else if (req.user.rol == "administrador") {
                return res.redirect("/homeadmin");
            } else if (req.user.rol == "alumno") {
                return res.redirect("/homealumno");
            }
        });
    }
);

router.get("/logout", (req, res) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return res.json(err);
        }
        return res.redirect("/");
    });
});

router.get(
    "/homeprof",
    (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect("/");
    },
    (req, res) => {
        console.log(req.user);
        return res.render("Homeprof", {});
    }
);

router.get(
    "/homeadmin",
    (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect("/");
    },
    (req, res) => {
        db.query(
            "select * from profesor;" + "select * from alumno;",
            (err, resul) => {
                if (err) {
                    console.log(err);
                } else {
                    return res.render("Homeadmin", {
                        profesor: resul[0],
                        alumno: resul[1],
                    });
                }
            }
        );
    }
);

router.get(
    "/homealumno",
    (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect("/");
    },
    (req, res) => {
        db.query(
            "SELECT " +
                "idGrupo, cicloE, dia, hora, nomMateria " +
                "FROM " +
                "inasistencia ina " +
                "INNER JOIN " +
                "inscripcion ins ON ina.idInscripcion = ins.idInscripcion " +
                "INNER JOIN " +
                "materia_profesor mp ON ina.idMateria_profesor = mp.idMateria_profesor " +
                "INNER JOIN " +
                "materia ma ON mp.idMateria = ma.idMateria " +
                "WHERE " +
                "ins.boleta = ?;",
            [req.user.id],
            (err, inasistencias) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render("Homealumno", { inasistencias });
                }
            }
        );
    }
);

module.exports = router;
