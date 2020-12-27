//aqui metan la logica para el pase de lista
const router = require("express").Router();
const db = require("../database/connection");

//para guardar la inasistencia necesito que me manden en el req su id de inscripcion y su id de materia profesor
router.post("/save", (req, res) => {
    //creamos nuestras constantes para las consultas
    const data = req.body;
    console.log(data.materia);
    //los parametros son (id_inasistencia,id_materia,id_inscripcion)
    db.query(
        "INSERT INTO inasistencia VALUES(concat(?,CAST(now() AS CHAR)),?,?,current_date(),current_time());",
        [data.inscripcion, data.materia, data.inscripcion],
        (err, response) => {
            if (err) res.json(err);
            res.send("Registrado con exito");
        }
    );
});

//para las consultas sql uso response para capturar lo que nos regresa la db y res para el response que regresa el servidor
router.post("/delete", (req, res) => {
    const data = req.body;
    db.query(
        "DELETE FROM inasistencia WHERE idInasistencia = ?",
        [data.inasistencia],
        (err, response) => {
            if (err) res.json(err);
            res.send("Eliminado con exito");
        }
    );
});

router.post("/update", (req, res) => {
    const data = req.body;
    db.query(
        "UPDATE inasistencia SET idMateria_profesor = ?, idInscripcion=? WHERE idInasistencia = ?",
        [data.materia, data.inscripcion, data.inasistencia],
        (err, response) => {
            if (err) res.json(err);
            res.send("Se ha actualizado con exito");
        }
    );
});

//Para obtener a todos los alumnos de un grupo
router.post("/getAlumnosGrupo", (req, res) => {
    const data = req.body;
    //el id del grupo debe ser pasado en mayusculoas o no lo encontrará
    try {
        db.query(
            "SELECT boleta FROM inscripcion WHERE idGrupo=?",
            [data.grupoS],
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

//esta ruta es solo para prueba para redireccionar
router.get("/prueba", (req, res) => {
    res.render("pruebaInasistencia", {});
});

module.exports = router;
