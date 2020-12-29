/*
*Este archivo se encarga de hacer las direcciones entre las diferentes ventanas de la pagina
*al menos de manera provicional
*/
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


passport.use(new Passportlocal(function(username,password,done){
    if(username === "Leo" && password === "root"){
        return done (null, {id: 1, name: "Leonidas"}); 
    }else{ 
    done(null,false);
    }
}));

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    done(null, {id:1, name: "Leonidas"});
});

router.post("/InicioSesionController", passport.authenticate('local',{
    successRedirect:"/home",
    failureRedirect: "/"
}));

router.get("/home", (req,res,next)=>{
    if(req.isAuthenticated()) return next();


    res.redirect("/");
},(req,res)=>{

    return res.render('Home',{});
    
});

module.exports = router;