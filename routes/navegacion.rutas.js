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

router.get('/send-email',(req,res)=>{
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user:'jafetkevin575@gmail.com',
            pass:'6!T3UzpT'
        }
    });

    let mailOptions = {
        from:'Remitente',
        to:'moran.orozco.kevin@gmail.com',
        subject:'Enviado desde nodemailer',
        text:'Hola mundo!'
    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            res.status(500).send(error.message);
        }else{
            console.log('Email enviado');
            res.status(200).json(req.body);
        }
    });
});

module.exports = router;