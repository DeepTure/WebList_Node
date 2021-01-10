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
        pass: '3CJ%BE82R@3^Z57' 
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
    db.query('SELECT idUser from token where idtoken=?',[data.code],(err,id)=>{
        res.render('comprobateCode',{correo:'Acceso concedido',icon:'success'});
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
        //No hace nada
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
