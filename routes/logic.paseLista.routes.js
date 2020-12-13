//aqui metan la logica para el pase de lista
const router = require("express").Router();
const db = require("../database/connection");

//para guardar la inasistencia necesito que me manden en el req su id de inscripcion y su id de materia profesor
router.post('/save',(req,res)=>{
    //creamos nuestras constantes para las consultas
    const data = req.body;
    console.log(data.materia)
    db.query('INSERT INTO inasistencia VALUES (?,?,now(),now())',[data.inscripcion,data.materia],(err,response)=>{
        if(err)res.json(err)
        res.send(response);
    });
});

//esta ruta es solo para prueba
router.get('/prueba',(req,res)=>{
    res.render('pruebaInasistencia',{});
});

module.exports = router;
