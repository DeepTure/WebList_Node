//aqui metan la logica para el crud
const router = require("express").Router();
const db = require("../database/connection");

//CRUD del profesor mediante el formulario
router.post("/CRUDprofesor", (req, res) => {
    //guardamos los datos que recibimos de la vista y los que requerimos para realiar el proceso
    var { numEmpleado, nombre, app, apm, idMateria,action} = req.body;
    var correo="correo@gmail.com";
    var contraseña="patito";
    var modificacion = { nombre, app, apm, correo, contraseña };
    var idMateria_profesor= numEmpleado+idMateria;
    //Depende la accion requerida realizar consultas correpondientes
    if(action == "1"){
        db.query("select * from profesor where numEmpleado= ?" ,[numEmpleado],(err,rows) =>{
            if(err){
                console.log(err)
            }else{
                if (rows.length == 0){
                    db.query(
                        "insert into profesor set ?;" + "insert into materia_profesor set ?",
                        [{numEmpleado,nombre,app,apm,correo,contraseña},{idMateria_profesor,numEmpleado,idMateria}],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.redirect("/homeadmin");
                            }
                        }
                    );
                }else{
                    res.redirect("/homeadmin");            
                }
            }
        });
    }else if (action == "2"){
        db.query("select * from profesor where numEmpleado= ?" ,[numEmpleado],(err,rows) =>{
            if(err){
                console.log(err)
            }else{
                if (rows.length == 0){
                    res.redirect("/homeadmin");
                }else{
                    db.query(
                        "update profesor set ? where numEmpleado=?",
                        [modificacion, numEmpleado],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.redirect("/homeadmin");
                            }
                        }
                    );
                }
            }
        });
    }else if (action == "3"){
        db.query("select * from materia_profesor where idMateria_profesor= ?" ,[idMateria_profesor],(err,rows) =>{
            if(err){
                console.log(err)
            }else{
                if (rows.length == 0){
                    db.query("insert into materia_profesor set ?;",
                        {idMateria_profesor,numEmpleado,idMateria},
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.redirect("/homeadmin");
                            }
                        }
                    );
                }else{
                    res.redirect("/homeadmin"); 
                }
            }
        });
    }else{
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
                res.redirect("/homeadmin");
            }
        }
    );
});

router.post("/CRUDalumno", (req, res) => {
    //guardamos los datos que recibimos de la vista y los que requerimos para realiar el proceso
    var { boleta, nombre, app, apm, idGrupo,action} = req.body;
    var correo="correo@gmail.com";
    var contraseña="patito";
    var cicloE="2020-2"
    var modificacion = { nombre, app, apm, correo, contraseña };
    var idInscripcion= boleta+idGrupo+cicloE;
    //Depende la accion requerida realizar consultas correpondientes
    if(action == "1"){
        db.query("select * from alumno where boleta= ?" ,[boleta],(err,rows) =>{
            if(err){
                console.log(err)
            }else{
                if (rows.length == 0){
                    db.query(
                        "insert into alumno set ?;" + "insert into inscripcion set ?",
                        [{boleta,nombre,app,apm,correo,contraseña},{idInscripcion,boleta,idGrupo,cicloE}],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.redirect("/homeadmin");
                            }
                        }
                    );
                }else{
                    res.redirect("/homeadmin");            
                }
            }
        });
    }else if (action == "2"){
        db.query("select * from alumno where boleta= ?" ,[boleta],(err,rows) =>{
            if(err){
                console.log(err)
            }else{
                if (rows.length == 0){
                    res.redirect("/homeadmin");
                }else{
                    db.query(
                        "update alumno set ? where boleta=?",
                        [modificacion, boleta],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.redirect("/homeadmin");
                            }
                        }
                    );
                }
            }
        });
    }else if (action == "3"){
        db.query("select * from inscripcion where idInscripcion= ?" ,[idInscripcion],(err,rows) =>{
            if(err){
                console.log(err)
            }else{
                if (rows.length == 0){
                    db.query("insert into inscripcion set ?;",
                        {idInscripcion,boleta,idGrupo,cicloE},
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.redirect("/homeadmin");
                            }
                        }
                    );
                }else{
                    res.redirect("/homeadmin"); 
                }
            }
        });
    }else{
        res.redirect("/homeadmin");
    }
});

//Eliminar a un alumno mediante un boton
router.get("/eliminaralumno/:boleta", (req, res) => {
    var { boleta } = req.params;
    db.query(
        "delete from alumno where boleta= ?",
        [boleta],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/homeadmin");
            }
        }
    );
});

module.exports = router;