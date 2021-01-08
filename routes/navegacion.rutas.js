/*
*Este archivo se encarga de hacer las direcciones entre las diferentes ventanas de la pagina
*al menos de manera provicional
*/
const router = require("express").Router();
const db = require("../database/connection");

router.get('/error',(req,res)=>{
    res.render('error',{});
});

//para enviar correos
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user:'jafetkevin575@gmail.com',
        pass:'6!T3UzpT'
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

router.post('/comprobateEmail',(req,res)=>{
    const data = req.body;

        db.query('SELECT contraseña FROM profesor WHERE correo=?',[data.correo],(err,numEmpleado)=>{
            if(err)res.json(err)
            if(Array.isArray(numEmpleado) && !(numEmpleado.length === 0)){
                enviarCorreo(data.correo, numEmpleado[0].contraseña);
                res.render('Recover',{correo:'Se le ha enviado un correo con su contraseña',icon:'success'});
            }else{
                db.query('SELECT contraseña FROM alumno WHERE correo=?',[data.correo],(err,boleta)=>{
                    if(err)res.json(err)
                    if(Array.isArray(boleta) && !(boleta.length === 0)){
                        enviarCorreo(data.correo, boleta[0].contraseña);
                        res.render('Recover',{correo:'Se le ha enviado un correo con su contraseña',icon:'success'});
                    }else{
                        db.query('SELECT contraseña FROM administrador WHERE correo=?',[data.correo],(err,id)=>{
                            if(err)res.json(err)
                            if(Array.isArray(id) && !(id.length === 0)){
                                enviarCorreo(data.correo, id[0].contraseña);
                                res.render('Recover',{correo:'Se le ha enviado un correo con su contraseña',icon:'success'});
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
    
            }else{
                console.log('Email enviado');
            }
        }catch(err){
            console.log('Error inesperado '+err);
            console.log(err.message);
        }
    });
}

module.exports = router;
