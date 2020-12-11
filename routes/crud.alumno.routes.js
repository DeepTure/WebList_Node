//el nombre del archivo solo es por comodidad
//no influje en las funciones del mismo

//router
const router = require("express").Router();
const db = require("../database/connection");

//ejemplo de base de datos

/*
    si tienen variables afuera del metodo 'query' y les hacen cambios dentro de el
    NO se veran reflejados si usan el 'res.send' o 'res.render'
    a fuerzas tienen que hacer los cambios dentro del callback del metodo 'query'
*/

//para paquete completo
router.get("/datos", (req, res) => {
    var patito = "";
    db.query("select * from patito", (err, results) => {
        //se revisa si ocurrio un error
        if (err) {
            console.log(err);
            //por ejemplo
        }
        //lo que te devuelve es un arreglo de objeto que representan los datos de las tablas
        patito = results;
    });
    //NUNCA hagas esto
    return res.send(patito);
    /*
    Como el query es una funciona asincrona lo mas probable es que cuando envie
    la variable patito, aun siga vacia porque el query aun no llegaba a
    la parte en que se le asigna el valor a patito

    lo mejor es meter de res.send adentro del query

    var patito = "";
    db.query("select * from patito", (err, results) => {
        if (err) {
            console.log(err);
        }
        patito = results;
        return res.send(patito)
    });
    */
});

//para iteraciones por columna
router.get("/datos", (req, res) => {
    var patito = [];
    db.query("select * from patito")
        //si te devolvio un error ejecuta:
        .on("error", (err) => {
            console.log(err);
        })
        /*
        Si te devolvio un resultado va a iterar cada uno
        y te va a devolver en cada iteracion la fila como un objeto
        y el index de la fila
        */
        .on("result", (row, index) => {
            patito.push(row, index);
        })
        //cuando termine de todo ejecuta:
        .on("end", () => {
            return res.send(patito);
        });
    /*
        Esta es una forma mas segura de hacer queries pero
        aqui afuerzas tienes que iterar los resultados
        si deseas mandar todo el paquete sin tanto codigo
        usa el primer metodo
        si vas a realizar acciones con el resultado a partir de iterar el mismo
        usa el segundo metodo
        */
});
