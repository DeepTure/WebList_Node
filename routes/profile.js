const router = require("express").Router();
const db = require("../database/connection");

router.post("/changepassword",(req, res)=>{
    var {contraseña, confirmar, numEmpleado} = req.body;
    if(contraseña== confirmar){
        db.query("update profesor set contraseña=? where numEmpleado= ?",[contraseña,numEmpleado],(err,result)=>{
            if (err){
                console.log(err);
            }else{
                res.redirect('/Myprofile');
            }
        });
    }else{
        res.redirect('/Myprofile');
    }
});

router.post("/changeemail",(req, res)=>{
    var {correo, numEmpleado} = req.body;
        db.query("update profesor set correo=? where numEmpleado= ?",[correo,numEmpleado],(err,result)=>{
            if (err){
                console.log(err);
            }else{
                res.redirect('/Myprofile');
            }
        });
});

module.exports = router;