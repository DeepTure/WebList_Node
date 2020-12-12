//aqui metan la logica para el crud
const router = require("express").Router();
const db = require("../database/connection");

//Aqui ir el url en la que se presentará a todos los profesores si es que se requiere
router.get("[aqui va la direccion]", (req, res) => {
    //Se realiza la consulta
    db.query("select * from profesores", (err, resul) => {
        //en caso de que ocurra error
        if (err) {
            console.log(err);
        } else {
            //Pase de parametros al url y renderizamos la página
            return res.render("[aqui va la dirección]", {
                profesores: resul,
            });
        }
    });
});
//Funcion de añadir un profesor mediante un formulario
router.post("[nombre del formulario]", (req, res) => {
    //guardamos los datos que recibimos de la vista
    var { idProfesores, nombre, app, apm, contraseña, correo } = req.body;
    //Establecemos la sentencia sql
    db.query(
        "insert into Profesores set?",
        {
            idProfesores,
            nombre,
            app,
            apm,
            contraseña,
            correo,
        },
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                //direcciónar a la pagina si se hizo bien el proceso
                return res.redirect("[aqui la direccion]");
            }
        }
    );
});

//Funcion de modificar todos los datos a un profesor mediante su id formulario
router.post("[nombre del formulario]", (req, res) => {
    //guardamos los datos que recibimos de la vista
    var { idProfesores, nombre, app, apm, contraseña, correo } = req.body;
    //lo que se modificará
    var modificacion = { nombre, app, apm, contraseña, correo };
    //Establecemos la sentencia sql
    db.query(
        "update Profesores set? where idProfesor=?",
        [modificacion, idProfesores],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                //direcciónar a la pagina si se hizo bien el proceso
                return res.redirect("[aqui la direccion]");
            }
        }
    );
});

//Eliminar a un profesor mediante un boton
router.get("/eliminar/:idProfesor", (req, res) => {
    var { idProfesores } = req.params;
    conexion.query(
        "delete from Profesores where idProfesores= ?",
        [idProfesores],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                //direcciónar a la pagina si se hizo bien el proceso
                return res.redirect("[aqui la direccion]");
            }
        }
    );
});

//Eliminar profesor mediante formulario
router.post("[nombre del formulario]", (req, res) => {
    //guardamos los datos que recibimos de la vista
    var { idProfesores } = req.body;
    //Establecemos la sentencia sql
    db.query(
        "delete from Profesores where idProfesores= ?",
        [idProfesores],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                //direcciónar a la pagina si se hizo bien el proceso
                res.redirect("[aqui la direccion]");
            }
        }
    );
});

module.exports = router;
