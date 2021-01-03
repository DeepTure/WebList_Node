//aqui metan la logica para el pase de lista
const router = require("express").Router();
const db = require("../database/connection");

//para guardar la inasistencia necesito que me manden en el req su id de inscripcion y su id de materia profesor
router.post("/saveInasistencia", (req, res) => {
    //creamos nuestras constantes para las consultas
    let data = JSON.parse(req.body.datos);
    console.log(data);
    db.query(
        "SELECT idInscripcion,boleta FROM inscripcion WHERE cicloE=?",
        [
            new Date().getFullYear() +
                "-" +
                (new Date().getMonth() + 1 < 7 ? "1" : "2"),
        ],
        (err, inscripciones) => {
            if (err) res.json(err);
            let boletaArray = data.boletas;
            let idIns = []; //este arreglo guardará los id de los alumnos que coincidan
            inscripciones.forEach((inscripcion) => {
                boletaArray.forEach((boleta) => {
                    if (inscripcion.boleta == boleta) {
                        idIns.push(inscripcion.idInscripcion);
                    }
                });
            });
            //ahora vamos a obtener el id de la materia y el profesor
            db.query(
                "SELECT idMateria_profesor FROM materia_profesor WHERE numEmpleado=? and idMateria=?",
                [req.user.id, data.idMateria[0]],
                (err, idmp) => {
                    if (err) res.json(err);
                    let query = "";
                    let args = [];
                    idIns.forEach((idIn) => {
                        query +=
                            "INSERT INTO inasistencia VALUES(concat(?,CAST(now() AS CHAR)),?,?,current_date(),current_time());";
                        let inas = idmp[0].idMateria_profesor + idIn;
                        args.push(inas, idmp[0].idMateria_profesor, idIn);
                    });
                    db.query(query, args, (err, respuesta) => {
                        if (err) res.json(err);
                        return res.send(respuesta);
                    });
                }
            );
        }
    );
});

//para las consultas sql uso response para capturar lo que nos regresa la db y res para el response que regresa el servidor
router.post("/deleteInasistencia", (req, res) => {
    const data = JSON.parse(req.body.datos);
    console.log(data);
    db.query(
        "SELECT idMateria_profesor FROM materia_profesor WHERE numEmpleado=? and idMateria=?",
        [req.user.id, data.materia[0]],
        (err, idMP) => {
            if (err) res.json(err);
            db.query(
                "DELETE FROM inasistencia WHERE idInscripcion=? AND dia=? AND idMateria_profesor=?",
                [data.id, data.dia, idMP[0].idMateria_profesor],
                (err, respuesta) => {
                    if (err) return res.json(err);
                    return res.send(respuesta);
                }
            );
        }
    );
});

router.post("/addInasistencia", (req, res) => {
    let data = JSON.parse(req.body.datos);
    console.log(data);
    db.query(
        "SELECT idInscripcion FROM inscripcion WHERE cicloE=? AND boleta=?",
        [
            new Date().getFullYear() +
                "-" +
                (new Date().getMonth() + 1 < 7 ? "1" : "2"),
            data.boleta,
        ],
        (err, inscripcion) => {
            if (err) res.json(err);
            //ahora vamos a obtener el id de la materia y el profesor
            db.query(
                "SELECT idMateria_profesor FROM materia_profesor WHERE numEmpleado=? and idMateria=?",
                [req.user.id, data.idMateria[0]],
                (err, idmp) => {
                    if (err) res.json(err);
                    db.query(
                        "INSERT INTO inasistencia VALUES(concat(?,CAST(now() AS CHAR)),?,?,current_date(),current_time());",
                        [
                            idmp[0].idMateria_profesor +
                                inscripcion[0].idInscripcion,
                            idmp[0].idMateria_profesor,
                            inscripcion[0].idInscripcion,
                        ],
                        (err, response) => {
                            if (err) res.json(err);
                            return res.send(response);
                        }
                    );
                }
            );
        }
    );
});

//Para obtener a todos los alumnos de un grupo
router.post("/getAlumnosGrupo", (req, res) => {
    const data = req.body;
    //el id del grupo debe ser pasado en mayusculoas o no lo encontrará
    try {
        db.query(
            "SELECT boleta FROM inscripcion WHERE idGrupo=? AND cicloE=?",
            [
                data.grupoS,
                new Date().getFullYear() +
                    "-" +
                    (new Date().getMonth() + 1 < 7 ? "1" : "2"),
            ],
            (err, boletas) => {
                if (err) res.json(err);

                db.query(
                    "SELECT boleta,nombre,app FROM alumno",
                    (err, alumnos) => {
                        let alumnosDelGrupo = [];
                        if (err) res.json(err);
                        alumnos.forEach((alumno) => {
                            let data = boletas.find(
                                (boleta) => alumno.boleta == boleta.boleta
                            );
                            if (data) {
                                alumnosDelGrupo.push({
                                    bol: alumno.boleta,
                                    name: alumno.nombre,
                                    lastName: alumno.app,
                                });
                            }
                        });
                        res.json(alumnosDelGrupo);
                    }
                );
            }
        );
    } catch (e) {
        res.send(e);
    }
});

//esto es para obtener a todos los amlumnos que hayan sido registrados hoy
router.post("/getAlumnosToday", (req, res) => {
    let data = JSON.parse(req.body.datos);
    console.log(data);
    db.query(
        "SELECT idMateria_profesor FROM materia_profesor WHERE numEmpleado=? and idMateria=?",
        [req.user.id, data.materia[0]],
        (err, idMP) => {
            if (err) res.json(err);
            console.log(req.user.id, data.materia[0], idMP);
            db.query(
                "SELECT idInscripcion FROM inasistencia WHERE dia=? AND idMateria_profesor=?",
                [data.fecha, idMP[0].idMateria_profesor],
                (err, idInscripciones) => {
                    if (err) res.json(err);
                    db.query(
                        "SELECT idInscripcion,boleta,idGrupo FROM inscripcion",
                        (err, boletas) => {
                            if (err) res.json(err);
                            let aux = [];
                            idInscripciones.forEach((id) => {
                                boletas.forEach((boleta) => {
                                    if (
                                        id.idInscripcion ==
                                            boleta.idInscripcion &&
                                        boleta.idGrupo == data.grupo
                                    ) {
                                        aux.push({
                                            bol: boleta.boleta,
                                            id: id.idInscripcion,
                                        });
                                    }
                                });
                            });
                            db.query(
                                "SELECT boleta,nombre,app from alumno",
                                (err, nombres) => {
                                    if (err) res.json(err);
                                    let alumnosDeHoy = [];
                                    nombres.forEach((nombre) => {
                                        aux.forEach((obj) => {
                                            if (nombre.boleta == obj.bol) {
                                                //usamos el ingles para evitar confuciones en lo que es de aqui y lo que se manda
                                                alumnosDeHoy.push({
                                                    bol: nombre.boleta,
                                                    name: nombre.nombre,
                                                    lastName: nombre.app,
                                                    idIns: obj.id,
                                                });
                                            }
                                        });
                                    });
                                    res.json(alumnosDeHoy);
                                }
                            );
                        }
                    );
                }
            );
        }
    );
});

//para obtener las materias que da el profesor
router.post("/getMateriasProfesor", (req, res) => {
    console.log(req.user);
    db.query(
        "SELECT idMateria FROM materia_profesor WHERE numEmpleado=?",
        [req.user.id],
        (err, materias) => {
            if (err) return res.json(err);
            return res.send(materias);
        }
    );
});

//esta ruta es solo para prueba para redireccionar
router.get("/prueba", (req, res) => {
    res.render("pruebaInasistencia", {});
});

module.exports = router;
