/*
*Este archivo se encarga de hacer las direcciones entre las diferentes ventanas de la pagina
*al menos de manera provicional
*/
const router = require("express").Router();
const db = require("../database/connection");
let codigoG;

router.get('/error',(req,res)=>{
    res.render('error',{});
});

//para enviar correos
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: 'jafetkevin575@gmail.com', 
        pass: 'clhjhxejirvnjfth' 
    }
});

router.get('/send-email',(req,res)=>{

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            res.status(500).send(error.message);
        }else{
            console.log('Email enviado');
            res.status(200).json(req.body);
        }
    });
});

router.get('/recover',(req,res)=>{
    res.render('Recover',{correo:'null'});
});

router.post('/comprobateCode',(req,res)=>{
    const data = req.body;
    db.query('SELECT idUser,time from token where idtoken=?',[data.code],(err,id)=>{
        if(err)res.send(err)
        if(Array.isArray(id) && !(id.length === 0)){
            //si entra aquí es porque el token es correcto, falta verificar si ha caducado y eliminarlo despues de usarlo
            const hoy = new Date();
            const caducacion = new Date(id[0].time);
            if((hoy.getDate() == caducacion.getDate()) && (hoy.getMonth() == caducacion.getMonth()) && (hoy.getFullYear() == caducacion.getFullYear())){
                if((hoy.getHours() >= caducacion.getHours()) && (hoy.getHours() <= (caducacion.getHours()+3))){
                    //Debe tener una caducación de tres horas
                    db.query('DELETE FROM token WHERE idtoken = ?',[data.code],(err,deleted)=>{
                        if(err)res.json(err);
                        //Solo así entra al software de nuevo
                        res.render('comprobateCode',{correo:'Acceso concedido',icon:'success'});
                    });
                }else{
                    db.query('DELETE FROM token WHERE idtoken = ?',[data.code],(err,deleted)=>{
                        if(err)res.json(err);
                        res.render('comprobateCode',{correo:'Acceso denegado, su token acaba de caducar',icon:'error'});
                    });
                }
            }else{
                res.render('comprobateCode',{correo:'Acceso denegado',icon:'error'});
                db.query('DELETE FROM token WHERE idtoken = ?',[data.code],(err,deleted)=>{
                    if(err)res.json(err);
                    res.render('comprobateCode',{correo:'Acceso denegado, su token caducó',icon:'error'});
                });
            }  
        }else{
            res.render('comprobateCode',{correo:'Acceso denegado, su token no existe',icon:'error'});
        }
    });
});

router.post('/comprobateEmail',(req,res)=>{
    const data = req.body;
        db.query('SELECT contraseña,numEmpleado FROM profesor WHERE correo=?',[data.correo],(err,numEmpleado)=>{
            if(err)res.json(err)
            if(Array.isArray(numEmpleado) && !(numEmpleado.length === 0)){
                insertToken(numEmpleado[0].numEmpleado, generate());
                enviarCorreo(data.correo, codigoG);
                res.render('comprobateCode',{correo:'Se le ha enviado un correo con su contraseña',icon:'success'});
            }else{
                db.query('SELECT contraseña,boleta FROM alumno WHERE correo=?',[data.correo],(err,boleta)=>{
                    if(err)res.json(err)
                    if(Array.isArray(boleta) && !(boleta.length === 0)){
                        insertToken(boleta[0].boleta, generate());
                        enviarCorreo(data.correo, codigoG);
                        res.render('comprobateCode',{correo:'Se le ha enviado un correo con su contraseña',icon:'success'});
                    }else{
                        db.query('SELECT contraseña,idAdmin FROM administrador WHERE correo=?',[data.correo],(err,id)=>{
                            if(err)res.json(err)
                            if(Array.isArray(id) && !(id.length === 0)){
                                insertToken(id[0].idAdmin, generate());
                                enviarCorreo(data.correo, codigoG);
                                res.render('comprobateCode',{correo:'Se le ha enviado un correo con su contraseña',icon:'success'});
                            }else{
                                res.render('Recover',{correo:'No hemos encontrado su correo',icon:'error'});
                            }
                        });
                    }
                });
            }
        })
});

function enviarCorreo(correo, contrasena){
    const mailOptions = {
        from: 'System',
        to: correo,
        subject: 'Recuperacion de contraseña',
        text: 'Su contraseña es: '+contrasena
      };
    
      transporter.sendMail(mailOptions,(error,info)=>{
        try{
            if(error){
                console.log('Error');
                console.log(error);
                console.log(error.message);
            }else{
                console.log('Email enviado');
            }
        }catch(err){
            console.log('Error inesperado '+err);
            console.log(err.message);
        }
    });
}

function insertToken(idUser, code){
    db.query('INSERT INTO token VALUES(?,?,now())',[code, idUser],(err,response)=>{
        if(err)console.log(err.message);
        console.log(response);
    });
}

function generate(){
    let code = '';
    for(var i=0; i<5; i++){
        code += Math.floor(Math.random() * (9 - 0)) + 0;
    }
    codigoG = code;
    return code;
}

module.exports = router;
