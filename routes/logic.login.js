const router = require("express").Router();
const db = require("../database/connection");
const passport = require('passport');
const cookieParser=require('cookie-parser');
const session= require('express-session');
const Passportlocal = require('passport-local').Strategy;


router.use(cookieParser('msj'));
router.use(session({
    secret: 'msj',
    resave: true,
    saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());


passport.use(new Passportlocal({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password,done)=>{
    await db.query('select * from profesor where (numEmpleado= ? AND contraseña= ?)',[username,password],(err,resul)=>{
        if (resul.length !=0){
            if (resul.length > 0){
                const num= resul[0];
                if(username === num.numEmpleado && password === num.contraseña){
                    return done (null, {rol: "profesor"}); 
                }else{ 
                done(null,false);
                }
            }
        }else{
            console.log('no ha prof')
            db.query('select * from administrador where (idAdmin= ? AND contraseña= ?)',[username,password],(err,resula)=>{
                if (resula != 0){
                    if (resula.length > 0){
                        const numa= resula[0];
                        if(username === numa.idAdmin.toString() && password === numa.contraseña){
                            return done (null, {rol: "administrador"}); 
                        }else{ 
                        done(null,false);
                        }
                    }
                }else{
                    console.log('no ha admin')
                    db.query('select * from alumno where (boleta= ? AND contraseña= ?)',[username,password],(err,resulb)=>{
                        if (resulb != 0){
                            if (resulb.length > 0){
                                const num= resulb[0];
                                if(username ===num.boleta.toString() && password === num.contraseña){
                                    return done (null, {rol: "alumno"}); 
                                }else{ 
                                done(null,false);
                                }
                            }else{
                                done(null,false);
                            }      
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
    done(null,user.rol);
});

passport.deserializeUser(function(id,done){
    done(null, {rol:"prof"});
});

//Preparado para redireccionar a las vistas correspondientes dependiendo el rol
router.post("/InicioSesionController", passport.authenticate('local'),function(req, res){
    if(req.user.rol== "profesor"){
        res.redirect('/home');
    }else if(req.user.rol== "administrador"){
        res.redirect('/home');
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

module.exports = router;