const router = require("express").Router();
const db = require("../database/connection");
const validacion = require("./validacion");
router.post("/changepasswordprof",(req, res)=>{
    var {contraseña, confirmar, numEmpleado} = req.body;
    var validacioncon=validacion.contra(contraseña);
    var validacioncona=validacion.contra(confirmar);
    if (validacioncon.aceptacion) {
        if (validacioncona.aceptacion) {
            if(contraseña== confirmar){
                db.query("update profesor set contraseña=? where numEmpleado= ?",[contraseña,numEmpleado],(err,result)=>{
                    if (err){
                        console.log(err);
                    }else{
                        req.flash('profe',"La contraseña ha sido actualizada");
                        res.redirect('/Myprofile');
                    }
                });
            }else{
                req.flash('profe',"La contraseña no coincide");
                res.redirect('/Myprofile');
            }
        }else{
            req.flash('profe', validacioncon.msj);
            res.redirect("/Myprofile");
        }
    }else{
        req.flash('profe', validacioncona.msj);
        res.redirect("/Myprofile");
    }
});

router.post("/changeemailprof",(req, res)=>{
    var {correo, numEmpleado} = req.body;
    var validacioncor=validacion.correo(correo);
    if(validacioncor.aceptacion){
        db.query("update profesor set correo=? where numEmpleado= ?",[correo,numEmpleado],(err,result)=>{
            if (err){
                console.log(err);
            }else{
                req.flash('profe',"El correo ha sido actualizado");
                res.redirect('/Myprofile');
            }
        });
    }else{
        req.flash('profe', validacioncor.msj);
                res.redirect('/Myprofile');
    }
});

router.post("/changedataprof",(req, res)=>{
    var{nombre, app, apm, numEmpleado} = req.body;
    var modificiacion= {nombre,app,apm};
    var validacionnom=validacion.Nombres(nombre);
    var validacionapp=validacion.ApellidoPM(app);
    var validacionapm=validacion.ApellidoPM(apm);
        if (validacionnom.aceptacion) {
            if (validacionapp.aceptacion) {
                if (validacionapm.aceptacion) {
                    db.query("update profesor set ? where numEmpleado= ?",[modificiacion,numEmpleado],(err,result)=>{
                        if(err){
                            console.log(err);
                        }else{
                            req.flash('profe',"Los datos han sido actualizados");
                            res.redirect('/Myprofile');
                        }
                    });
                }else{
                    req.flash('profe', validacionapm.msj);
                    res.redirect("/Myprofile");
                }
            }else{
                req.flash('profe', validacionapp.msj);
                res.redirect("/Myprofile");
            }
        }else{
            req.flash('profe', validacionnom.msj);
            res.redirect("/Myprofile");
        }
});

router.post("/changepasswordalumno", (req, res) => {
    var {contraseña, confirmar, boleta} = req.body;
    var validacioncon=validacion.contra(contraseña);
    var validacioncona=validacion.contra(confirmar);
    if (validacioncon.aceptacion) {
        if (validacioncona.aceptacion) {
            if(contraseña== confirmar){
                db.query("update alumno set contraseña=? where boleta= ?",[contraseña,boleta],(err,result)=>{
                    if (err){
                        console.log(err);
                    }else{
                        req.flash('alumno',"La contraseña ha sido actualizada");
                        res.redirect('/Myprofile');
                    }
                });
            }else{
                req.flash('alumno',"La contraseña no coincide");
                res.redirect('/Myprofile');
            }
        }else{
            req.flash('alumno', validacioncon.msj);
            res.redirect("/Myprofile");
        }
    }else{
        req.flash('alumno', validacioncona.msj);
        res.redirect("/Myprofile");
    }
});

router.post("/changeemailalumno", (req, res) => {
    var {correo, boleta} = req.body;
    var validacioncor=validacion.correo(correo);
    if(validacioncor.aceptacion){
        db.query("update alumno set correo=? where boleta= ?",[correo,boleta],(err,result)=>{
            if (err){
                console.log(err);
            }else{
                req.flash('alumno',"El correo ha sido actualizado");
                res.redirect('/Myprofile');
            }
        });
    }else{
        req.flash('alumno', validacioncor.msj);
                res.redirect('/Myprofile');
    }
});

router.post("/changepasswordadmin",(req, res)=>{
    var {contraseña, confirmar, idAdmin} = req.body;
    var validacioncon=validacion.contra(contraseña);
    var validacioncona=validacion.contra(confirmar);
    if (validacioncon.aceptacion) {
        if (validacioncona.aceptacion) {
            if(contraseña== confirmar){
                db.query("update administrador set contraseña=? where idAdmin= ?",[contraseña,idAdmin],(err,result)=>{
                    if (err){
                        console.log(err);
                    }else{
                        req.flash('admin',"La contraseña ha sido actualizada");
                        res.redirect('/Myprofile');
                    }
                });
            }else{
                req.flash('admin',"La contraseña no coincide");
                res.redirect('/Myprofile');
            }
        }else{
            req.flash('admin', validacioncon.msj);
            res.redirect("/Myprofile");
        }
    }else{
        req.flash('admin', validacioncona.msj);
        res.redirect("/Myprofile");
    }
});

router.post("/changeemailadmin",(req, res)=>{
    var {correo, idAdmin} = req.body;
    var validacioncor=validacion.correo(correo);
    if(validacioncor.aceptacion){
        db.query("update administrador set correo=? where idAdmin= ?",[correo,idAdmin],(err,result)=>{
            if (err){
                console.log(err);
            }else{
                req.flash('admin',"El correo ha sido actualizado");
                res.redirect('/Myprofile');
            }
        });
    }else{
        req.flash('admin', validacioncor.msj);
                res.redirect('/Myprofile');
    }
});

router.post("/changedataadmin",(req, res)=>{
    var{nombre, idAdmin} = req.body;
    var validacionnom=validacion.correo(nombre);
    if(validacionnom.aceptacion){
        db.query("update administrador set nombre= ? where idAdmin= ?",[nombre,idAdmin],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                req.flash('admin',"Los datos han sido actualizados");
                res.redirect('/Myprofile');
            }
        });
    }else{
        req.flash('admin', validacionnom.msj);
                res.redirect('/Myprofile');
    }
});
module.exports = router;