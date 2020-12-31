const router = require("express").Router();
const db = require("../database/connection");
const passport = require('passport');
const cookieParser=require('cookie-parser');
const session= require('express-session');
const Passportlocal = require('passport-local').Strategy;


router.use(cookieParser('6$uRCRC1UAKyBCbCYb7%^90!NHwd9@OJWBHOe7AqyBB9zj^OZN'));
router.use(session({
    secret: '6$uRCRC1UAKyBCbCYb7%^90!NHwd9@OJWBHOe7AqyBB9zj^OZN',
    resave: true,
    saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

passport.use(new Passportlocal({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},(req, username, password,done)=>{
    db.query('select * from profesor where (numEmpleado= ? AND contraseña= ?);',[username,password],(err,profesores)=>{
        if (profesores.length !=0){
                let profesor= profesores[0];
                return done (null, {rol: "profesor",id:profesor.numEmpleado.toString()}); 
        }else{
            console.log('no ha prof')
            db.query('select * from administrador where (idAdmin= ? AND contraseña= ?)',[username,password],(err,administradores)=>{
                if (administradores != 0){
                        let administrador= administradores[0];
                        return done (null, {rol: "administrador", id: administrador.idAdmin.toString()});     
                }else{
                    console.log('no ha admin')
                    db.query('select * from alumno where (boleta= ? AND contraseña= ?)',[username,password],(err,alumnos)=>{
                        if (alumnos != 0){
                                let alumno= alumnos[0];
                                return done (null, {rol: "alumno", id:alumno.boleta.toString()});     
                        }else{
                            console.log('no hay alumno')
                            done(null,false);
                        }
                    });
                }
            });
        }
    });
    
}));

passport.serializeUser(function(user,done){
    done(null,[user.rol,user.id]);
});

passport.deserializeUser(function(user,done){
    done(null,[user.rol,user.id]);
});

//Preparado para redireccionar a las vistas correspondientes dependiendo el rol
router.post("/InicioSesionController", passport.authenticate('local'),function(req, res){
    if(req.user.rol== "profesor"){
        res.redirect('/home');
    }else if(req.user.rol== "administrador"){
        res.redirect('/homeadmin');
    }else if(req.user.rol== "alumno"){
        res.redirect('/home');
    }
});

router.get("/home", (req,res,next)=>{
    if(req.isAuthenticated()) return next();
    res.redirect("/");
},(req,res)=>{
    return res.render('Home',{});
});

router.get("/homeadmin", (req,res,next)=>{
    if(req.isAuthenticated()) return next();
    res.redirect("/");
},(req,res)=>{
    return res.render('Homeadmin',{});
});
module.exports = router;