//aqui metan la logica para el pase de lista
const router = require("express").Router();
const db = require("../database/connection");

//para guardar la inasistencia necesito que me manden en el req su id de inscripcion y su id de materia profesor
router.post('/saveInasistencia',(req,res)=>{
    //creamos nuestras constantes para las consultas
    const data = req.body;
    db.query('SELECT idInscripcion,boleta FROM inscripcion',(err,inscripciones)=>{
        if(err)res.json(err)
        const boleta = data.boletas;
        let idIns = []; //este arreglo guardará los id de los alumnos que coincidan
        for(var i=0; i<inscripciones.length;i++){
            for(var j=0; j<boleta.length;j++){
                if(inscripciones[i].boleta==data.boletas[j]){
                    idIns.push(inscripciones[i].idInscripcion);
                }
            }
        }
        //ahora vamos a obtener el id de la materia y el profesor
        db.query('SELECT idMateria_profesor FROM materia_profesor WHERE numEmpleado=? and idMateria=?',[data.numEmpleado,data.idMateria],(err,idmp)=>{
            if(err)res.json(err)
            console.log(data.idMateria);
            for(var i=0; i<data.boletas.length;i++){
                //preparamos los valores
                let inas = idmp[0].idMateria_profesor+idIns[i];
                db.query('INSERT INTO inasistencia VALUES(concat(?,CAST(now() AS CHAR)),?,?,current_date(),current_time())',[inas,idmp[0].idMateria_profesor,idIns[i]],(err,respuesta)=>{
                    if(err)res.json(err)
                    res.send(respuesta);
                });
            }
        });
    });
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
