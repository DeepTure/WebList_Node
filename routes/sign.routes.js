const router = require("express").Router();
const passport = require("passport");
const fs = require("fs").promises;
const fsConstants = require("fs");
const path = require("path");
const db = require("../database/connection");
const { spawn } = require("child_process");
const multer = require("multer");
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../temp/"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
var upload = multer({ storage: storage });

router.post(
    "/genSign",
    (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect("/");
    },
    async (req, res) => {
        try {
            let usr = req.user.id;
            let query = "";
            if (req.user.rol == "administrador") {
                query = "SELECT * FROM administrador WHERE idAdmin=?";
            } else if (req.user.rol == "profesor") {
                query = "SELECT * FROM profesor WHERE numEmpleado=?";
            } else if (req.user.rol == "alumno") {
                query = "SELECT * FROM alumno WHERE boleta=?";
            }
            db.query(query, [usr], async (err, datos) => {
                if (err) {
                    console.log(error);
                    return res.status(500).send(error);
                }
                let data = "";
                let fileNm = "";
                if (req.user.rol == "administrador") {
                    data = `id: ${datos[0].idAdmin} name: ${datos[0].nombre} correo: ${datos[0].correo}`;
                    fileNm = usr + datos[0].nombre;
                } else if (req.user.rol == "profesor") {
                    data = `id: ${datos[0].numEmpleado} name: ${datos[0].nombre} ${datos[0].app} ${datos[0].apm} correo: ${datos[0].correo}`;
                    fileNm =
                        usr + datos[0].nombre + datos[0].app + datos[0].apm;
                } else if (req.user.rol == "alumno") {
                    data = `id: ${datos[0].boleta} name: ${datos[0].nombre} ${datos[0].app} ${datos[0].apm} correo: ${datos[0].correo}`;
                    fileNm =
                        usr + datos[0].nombre + datos[0].app + datos[0].apm;
                }
                await fs.writeFile(
                    path.join(__dirname, "../temp/" + usr + ".txt"),
                    data
                );
                let child = spawn("java", [
                    "-jar",
                    path.join(__dirname, "../utils/GenSig.jar"),
                    path.join(__dirname, "../temp/" + usr + ".txt"),
                    path.join(__dirname, "../temp/" + usr),
                ]);

                child.on("error", async (error) => {
                    console.log(error);
                    await quitFiles(usr);
                    return res.send(error);
                });

                child.on("close", async (code) => {
                    console.log(code);
                    let data = await fs.readFile(
                        path.join(__dirname, "../temp/" + usr + ".key")
                    );
                    db.query(
                        "DELETE FROM llaves where idllaves=?",
                        [usr],
                        async (err) => {
                            if (err) {
                                console.log(err);
                                await quitFiles(usr);
                                return res.send(err);
                            }
                            db.query(
                                "INSERT INTO llaves SET ?",
                                [
                                    {
                                        idllaves: usr,
                                        rol: req.user.rol,
                                        key: data,
                                    },
                                ],
                                async (err) => {
                                    if (err) {
                                        console.log(err);
                                        await quitFiles(usr);
                                        return res.send(err);
                                    }
                                    let doc = await fs.readFile(
                                        path.join(
                                            __dirname,
                                            "../temp/" + usr + ".txt"
                                        )
                                    );
                                    let sign = await fs.readFile(
                                        path.join(
                                            __dirname,
                                            "../temp/" + usr + ".dat"
                                        )
                                    );
                                    await quitFiles(usr);
                                    return res.json({
                                        doc: doc.toJSON(),
                                        sign: sign.toJSON(),
                                        usr: fileNm,
                                    });
                                }
                            );
                        }
                    );
                });
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }
);

router.post(
    "/verSign",
    upload.fields([
        { name: "flDat", maxCount: 1 },
        { name: "flTxt", maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            let usr = req.body.usr;
            db.query(
                "SELECT * FROM llaves WHERE idllaves=?",
                [usr],
                async (err, key) => {
                    if (err) {
                        console.log(err);
                        await quitFiles(usr);
                        return res.json({ data: false });
                    }
                    await fs.writeFile(
                        path.join(__dirname, "../temp/" + usr + ".key"),
                        key[0].key
                    );
                    let check = false;
                    let child = spawn("java", [
                        "-jar",
                        path.join(__dirname, "../utils/VerSig.jar"),
                        path.join(__dirname, "../temp/" + usr + ".key"),
                        path.join(__dirname, "../temp/" + usr + ".dat"),
                        path.join(__dirname, "../temp/" + usr + ".txt"),
                    ]);

                    child.stdout.on("data", (data) => {
                        if (`${data}`.startsWith("true")) {
                            check = true;
                        }
                    });

                    child.stderr.on("data", (data) => {
                        console.log(data);
                    });

                    child.on("error", async (error) => {
                        console.log(error);
                        await quitFiles(usr);
                        return res.send(error);
                    });

                    child.on("close", async (code) => {
                        console.log(code, check);
                        if (check == true) {
                            await quitFiles(usr);
                            let query = "";
                            if (key[0].rol == "profesor") {
                                query =
                                    "SELECT numEmpleado AS id,contraseña FROM profesor WHERE numEmpleado=?";
                            } else if (key[0].rol == "administrador") {
                                query =
                                    "SELECT idAdmin AS id,contraseña FROM administrador WHERE idAdmin=?";
                            } else if (key[0].rol == "alumno") {
                                query =
                                    "SELECT boleta AS id,contraseña FROM alumno WHERE boleta=?";
                            }
                            db.query(query, [usr], (err, data) => {
                                return res.json({
                                    rol: key[0].rol,
                                    data: data[0],
                                    check: true,
                                });
                            });
                        } else {
                            await quitFiles(usr);

                            return res.json({ check: false });
                        }
                    });
                }
            );
        } catch (err) {
            console.log(err);
            return res.json({
                data: false,
            });
        }
    }
);

router.post(
    "/signLog",
    passport.authenticate("sign-auth", {
        failureRedirect: "/",
        failureFlash: true,
        badRequestMessage: "No ha introducido los datos correspondientes",
    }),
    (req, res) => {
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

async function quitFiles(usr) {
    fsConstants.access(
        path.join(__dirname, "../temp/" + usr + ".txt"),
        fsConstants.constants.F_OK,
        async (err) => {
            if (!err) {
                await fs.unlink(
                    path.join(__dirname, "../temp/" + usr + ".txt")
                );
            }
        }
    );
    fsConstants.access(
        path.join(__dirname, "../temp/" + usr + ".dat"),
        fsConstants.constants.F_OK,
        async (err) => {
            if (!err) {
                await fs.unlink(
                    path.join(__dirname, "../temp/" + usr + ".dat")
                );
            }
        }
    );
    fsConstants.access(
        path.join(__dirname, "../temp/" + usr + ".key"),
        fsConstants.constants.F_OK,
        async (err) => {
            if (!err) {
                await fs.unlink(
                    path.join(__dirname, "../temp/" + usr + ".key")
                );
            }
        }
    );
}

module.exports = router;
