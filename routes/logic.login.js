const router = require("express").Router();
const passport = require("passport");

//Preparado para redireccionar a las vistas correspondientes dependiendo el rol
router.post(
    "/InicioSesionController",
    passport.authenticate("local", {
        failureRedirect: "/",
        failureFlash: true,
    }),
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
        db.query(
            "select * from profesor;" + "select * from alumno",
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

module.exports = router;
