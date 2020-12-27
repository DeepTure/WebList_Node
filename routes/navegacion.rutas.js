/*
*Este archivo se encarga de hacer las direcciones entre las diferentes ventanas de la pagina
*al menos de manera provicional
*/
const router = require("express").Router();

router.get('/home',(req,res)=>{
    return res.render('Home',{});
});

module.exports = router;