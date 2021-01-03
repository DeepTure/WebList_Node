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
router.post("adminControllerCreate", (req, res) => {
    //Recopilamos los datos del formulario
    var { idAdmin, nombre, contraseña, correo } = req.body;
    //Establecemos la sentencia sql para guardarlos en la bd
    db.query("insert into administrador set idAdmin=?, nombre=?, contraseña=?, correo=?",{
        idAdmin,
        nombre,
        contraseña,
        correo,
        },(err, result) => {
            //en caso de que ocurra error
            if (err) {
                console.log(err);
            } else {
                console.log("Se realizo correctamente la creacion de una cuenta administradora");
                return res.redirect("/homeadmin");
            }
        }
    );
});

//Funcion modificarAdminContraseña
router.post("adminControllerPassword", (req, res) => {
    //Recopilamos los datos del formulario
    var { idAdmin, contraseña} = req.body;
    //Establecemos la sentencia sql para Modificar la bd
    db.query("update administrador set contraseña=? where idAdmin=?",[
        contraseña, 
        idAdmin
        ],(err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Se realizo correctamente el cambio de contraseña");
                return res.redirect("/homeadmin");
            }
        }
    );
});

//Funcion modificarAdminElementos
router.post("adminControllerElementos", (req, res) => {
    //Recopilamos los datos del formulario
    var { idAdmin, nombre, correo} = req.body;
    //Establecemos la sentencia sql para Modificar la bd
    db.query("update administrador set correo=?, nombre=? where idAdmin=?",[
        correo,
        nombre, 
        idAdmin
        ],(err, result) => {
            if (err) {
                console.log(err);
            } else {
                //direcciónar a la pagina si se hizo bien el proceso
                console.log("Se realizo correctamente el cambio de correo y nombre");
                return res.redirect("/homeadmin") ;
                
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