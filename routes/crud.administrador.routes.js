//aqui metan la logica del administrador
const router = require("express").Router();
const db = require("../database/connection");

//Funcion mostrarAdmin
router.get("[aqui va la direccion]", (req, res) => {
    //Se realiza la consulta mediante la tabla admin
    db.query("select * from Admin", (err, resul) => {
        //en caso de que ocurra error
        if (err) {
            console.log(err);
        } else {
            //Pase de parametros al url y renderizamos la página
            return res.render("[aqui va la dirección]", { admin: resul,});
        }
    });
});

//Funcion nuevoAdmin
router.post("[nombre del formulario]", (req, res) => {
    //Recopilamos los datos del formulario
    var { idAdmin, nombre, contraseña, correo } = req.body;
    //Establecemos la sentencia sql para guardarlos en la bd
    db.query("insert into Admin set?",{
        idAdmin,
        nombre,
        contraseña,
        correo,
        },(err, result) => {
            //en caso de que ocurra error
            if (err) {
                console.log(err);
            } else {
                //direcciónar a la pagina si se hizo bien el proceso
                return res.redirect("[aqui la direccion]");
            }
        }
    );
});

//Funcion ModificarAdmin
router.post("[nombre del formulario]", (req, res) => {
    //Recopilamos los datos del formulario
    var { idAdmin, nombre, contraseña, correo } = req.body;
    //lo guardamos en modificar
    var modificacion = { nombre, contraseña, correo };
    //Establecemos la sentencia sql para Modificar la bd
    db.query("update Admin set? where idAdmin=?",[
        modificacion, 
        idAdmin
        ],(err, result) => {
            if (err) {
                console.log(err);
            } else {
                //direcciónar a la pagina si se hizo bien el proceso
                return res.redirect("[aqui la direccion]");
            }
        }
    );
});

//Funcion eliminarAdminBoton
router.get("/eliminar/:idAdmin", (req, res) => {
    var { idAdmin } = req.params;
    //Establecemos la sentencia sql para Modificar la bd
    conexion.query("delete from Admin where idAdmin= ?",[
        idAdmin
        ],(err, result) => {
            if (err) {
                console.log(err);
            } else {
                //direcciónar a la pagina si se hizo bien el proceso
                return res.redirect("[aqui la direccion]");
            }
        }
    );
});

//Funcion eliminarAdminForm
router.post("[nombre del formulario]", (req, res) => {
    //guardamos los datos que recibimos de la vista
    var { idAdmin } = req.body;
    //Establecemos la sentencia sql para Modificar la bd
    db.query("delete from Admin where idAdmin= ?",[
        idAdmin
        ],(err, result) => {
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