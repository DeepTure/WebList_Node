//aqui metan la logica para el crud
const router = require("express").Router();
const db = require("../database/connection");
const validacion= require("./validacion");
//CRUD del profesor mediante el formulario
router.post("/CRUDprofesor", (req, res) => {
    //guardamos los datos que recibimos de la vista y los que requerimos para realiar el proceso
    var { numEmpleado, nombre, app, apm, idMateria, action } = req.body;
    
    var correo = "correo@gmail.com";
    var contraseña = numEmpleado;
    var modificacion = { nombre, app, apm};
    var idMateria_profesor = numEmpleado + idMateria;
    //Depende la accion requerida realizar consultas correpondientes
    //insercion
    if (action == "1") {
        var validacionnum=validacion.numEmpleado(numEmpleado);
        var validacionnom=validacion.Nombres(nombre);
        var validacionapp=validacion.ApellidoPM(app);
        var validacionapm=validacion.ApellidoPM(apm);
        if (validacionnum.aceptacion) {
            if (validacionnom.aceptacion) {
                if (validacionapp.aceptacion) {
                    if (validacionapm.aceptacion) {
                        db.query(
                            "select * from profesor where numEmpleado= ?",
                            [numEmpleado],
                            (err, rows) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    if (rows.length == 0) {
                                        db.query(
                                            "insert into profesor set ?;" +
                                                "insert into materia_profesor set ?",
                                            [
                                                {
                                                    numEmpleado,
                                                    nombre,
                                                    app,
                                                    apm,
                                                    correo,
                                                    contraseña,
                                                },
                                                { idMateria_profesor, numEmpleado, idMateria },
                                            ],
                                            (err, result) => {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    req.flash('prof', 'Profesor Registrado Correctamente');
                                                    res.redirect("/homeadmin");
                                                }
                                            }
                                        );
                                    } else {
                                        req.flash('prof', 'Ya existe ese registro');
                                        res.redirect("/homeadmin");
                                    }
                                }
                            }
                        );  
                    }else{
                        req.flash('prof', validacionapm.msj);
                        res.redirect("/homeadmin");
                    }
                }else{
                    req.flash('prof', validacionapp.msj);
                    res.redirect("/homeadmin");
                }
            }else{
                req.flash('prof', validacionnom.msj);
                res.redirect("/homeadmin");
            }
        }else{
            req.flash('prof', validacionnum.msj);
            res.redirect("/homeadmin");
        }
            
        //actualizacion
    } else if (action == "2") {
        var validacionnum=validacion.numEmpleado(numEmpleado);
        var validacionnom=validacion.Nombres(nombre);
        var validacionapp=validacion.ApellidoPM(app);
        var validacionapm=validacion.ApellidoPM(apm);
        if (validacionnum.aceptacion) {
            if (validacionnom.aceptacion) {
                if (validacionapp.aceptacion) {
                    if (validacionapm.aceptacion) {
                        db.query(
                            "select * from profesor where numEmpleado= ?",
                            [numEmpleado],
                            (err, rows) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    if (rows.length == 0) {
                                        req.flash('prof', 'No se encontro al profesor');
                                        res.redirect("/homeadmin");
                                    } else {
                                        db.query(
                                            "update profesor set ? where numEmpleado=?",
                                            [modificacion, numEmpleado],
                                            (err, result) => {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    req.flash('prof', 'Modificacion de datos correctamente');
                                                    res.redirect("/homeadmin");
                                                }
                                            }
                                        );
                                    }
                                }
                            }
                        );
                    }else{
                        req.flash('prof', validacionapm.msj);
                        res.redirect("/homeadmin");
                    }
                }else{
                    req.flash('prof', validacionapp.msj);
                    res.redirect("/homeadmin");
                }
            }else{
                req.flash('prof', validacionnom.msj);
                res.redirect("/homeadmin");
            }
        }else{
            req.flash('prof', validacionnum.msj);
            res.redirect("/homeadmin");
        }
        //insercion materia
    } else if (action == "3") {
        var validacionnum=validacion.numEmpleado(numEmpleado);
        if (validacionnum.aceptacion) {
            db.query(
                "select * from materia_profesor where idMateria_profesor= ?",
                [idMateria_profesor],
                (err, rows) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (rows.length == 0) {
                            db.query(
                                "insert into materia_profesor set ?;",
                                { idMateria_profesor, numEmpleado, idMateria },
                                (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        req.flash('prof', 'Agrego de materia al profesor de manera correcta');
                                        res.redirect("/homeadmin");
                                    }
                                }
                            );
                        } else {
                            req.flash('prof', 'El profesor ya está registrado en esa materia');
                            res.redirect("/homeadmin");
                        }
                    }
                }
            );
        }else{
            req.flash('prof', validacionnum.msj);
            res.redirect("/homeadmin");
        }
    } else {
        res.redirect("/homeadmin");
    }
});

//Eliminar a un profesor mediante un boton
router.get("/eliminarprofe/:numEmpleado", (req, res) => {
    var { numEmpleado } = req.params;
    db.query(
        "delete from profesor where numEmpleado= ?",
        [numEmpleado],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                req.flash('prof', 'Profesor Eliminado Correctamente');
                res.redirect("/homeadmin");
            }
        }
    );
});

router.post("/CRUDalumno", (req, res) => {
    //guardamos los datos que recibimos de la vista y los que requerimos para realizar el proceso
    var { boleta, nombre, app, apm, idGrupo, cicloE, action } = req.body;
    var correo = "correo@gmail.com";
    var contraseña = boleta;
    var modificacion = { nombre, app, apm, correo, contraseña };
    var idInscripcion = boleta + idGrupo + cicloE;
    //Depende la accion requerida realizar consultas correpondientes
    //insercion
    if (action == "1") {
        var validacionbol=validacion.boleta(boleta);
        var validacionnom=validacion.Nombres(nombre);
        var validacionapp=validacion.ApellidoPM(app);
        var validacionapm=validacion.ApellidoPM(apm);
        if (validacionbol.aceptacion) {
            if (validacionnom.aceptacion) {
                if (validacionapp.aceptacion) {
                    if (validacionapm.aceptacion) {
                        db.query(
                            "select * from alumno where boleta= ?",
                            [boleta],
                            (err, rows) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    if (rows.length == 0) {
                                        db.query(
                                            "insert into alumno set ?;" +
                                                "insert into inscripcion set ?",
                                            [
                                                {
                                                    boleta,
                                                    nombre,
                                                    app,
                                                    apm,
                                                    correo,
                                                    contraseña,
                                                },
                                                { idInscripcion, boleta, idGrupo, cicloE },
                                            ],
                                            (err, result) => {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    req.flash('alumn', 'Alumno Registrado Correctamente');
                                                    res.redirect("/homeadmin");
                                                }
                                            }
                                        );
                                    } else {
                                        req.flash('alumn', 'Ya existe ese registro');
                                        res.redirect("/homeadmin");
                                    }
                                }
                            }
                        );
                    }else{
                        req.flash('alumn', validacionapm.msj);
                        res.redirect("/homeadmin");
                    }
                }else{
                    req.flash('alumn', validacionapp.msj);
                    res.redirect("/homeadmin");
                }
            }else{
                req.flash('alumn', validacionnom.msj);
                res.redirect("/homeadmin");
            }
        }else{
            req.flash('alumn', validacionbol.msj);
            res.redirect("/homeadmin");
        }
        //actualizacion
    } else if (action == "2") {
        var validacionbol=validacion.boleta(boleta);
        var validacionnom=validacion.Nombres(nombre);
        var validacionapp=validacion.ApellidoPM(app);
        var validacionapm=validacion.ApellidoPM(apm);
        if (validacionbol.aceptacion) {
            if (validacionnom.aceptacion) {
                if (validacionapp.aceptacion) {
                    if (validacionapm.aceptacion) {
                        db.query(
                            "select * from alumno where boleta= ?",
                            [boleta],
                            (err, rows) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    if (rows.length == 0) {
                                        req.flash('alumn', 'No se encontro al profesor');
                                        res.redirect("/homeadmin");
                                    } else {
                                        db.query(
                                            "update alumno set ? where boleta=?",
                                            [modificacion, boleta],
                                            (err, result) => {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    req.flash('alumn', 'Modificacion de datos correctamente');
                                                    res.redirect("/homeadmin");
                                                }
                                            }
                                        );
                                    }
                                }
                            }
                        );
                    }else{
                        req.flash('alumn', validacionapm.msj);
                        res.redirect("/homeadmin");
                    }
                }else{
                    req.flash('alumn', validacionapp.msj);
                    res.redirect("/homeadmin");
                }
            }else{
                req.flash('alumn', validacionnom.msj);
                res.redirect("/homeadmin");
            }
        }else{
            req.flash('alumn', validacionbol.msj);
            res.redirect("/homeadmin");
        }
        //añadir grupo
    } else if (action == "3") {
        var validacionbol=validacion.boleta(boleta);
        if (validacionbol.aceptacion) {
            db.query(
                "select * from inscripcion where idInscripcion= ?",
                [idInscripcion],
                (err, rows) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (rows.length == 0) {
                            db.query(
                                "insert into inscripcion set ?;",
                                { idInscripcion, boleta, idGrupo, cicloE },
                                (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        req.flash('alumn', 'Agrego de grupo al alumno de manera correcta');
                                        res.redirect("/homeadmin");
                                    }
                                }
                            );
                        } else {
                            req.flash('alumn', 'Alumno ya agregado en el grupo');
                            res.redirect("/homeadmin");
                        }
                    }
                }
            );
        }else{
            req.flash('alumn', validacionbol.msj);
            res.redirect("/homeadmin");
        }
    } else {
        res.redirect("/homeadmin");
    }
});

//Eliminar a un alumno mediante un boton
router.get("/eliminaralumno/:boleta", (req, res) => {
    var { boleta } = req.params;
    db.query("delete from alumno where boleta= ?", [boleta], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            req.flash('alumn', 'Alumno eliminado correctamente');
            res.redirect("/homeadmin");
        }
    });
});

module.exports = router;
