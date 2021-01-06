/*
*Este archivo se encarga de hacer las direcciones entre las diferentes ventanas de la pagina
*al menos de manera provicional
*/
const router = require("express").Router();
const db = require("../database/connection");

router.get('/error',(req,res)=>{
    res.render('error',{});
});

module.exports = router;