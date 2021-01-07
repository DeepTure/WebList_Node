var patron_nombre=/^[áéíóúÁÉÍÓÚña-zA-Z\s]{1,50}/
var patron_ApellidoPM=/^[áéíóúÁÉÍÓÚña-zA-Z]{1,20}/
var patron_numEmpleado=/^[0-9]{1,10}/
var patron_boleta=/^[0-9]{10}/
var patron_email = /^(^[\w+.]+@{1}[a-z]+(([.](com|web|org|gob|ipn)){1}([.](jp|es|mx))?){1}$){1}/;
var patron_contra=/^[0-9a-zA-Z$@$!%*?&]{8,100}$/

function Nombres(nombre) {
    console.log(nombre);
    if(nombre.length == 0){
        return devolver={
            aceptacion: false,
            msj: "Necesito dato Nombre"
        };
    }else if(patron_nombre.test(nombre)){
        return devolver={
            aceptacion: true,
            msj: ""
        };
    }else{
        return devolver={
            aceptacion: false,
            msj: "No introdujo bien el nombre"
        };
    }
}

function ApellidoPM(appm) {
    var devolver;
    if(appm.length == 0){
        return devolver={
            aceptacion: false,
            msj: "Necesito el dato Apellido(s)"
        };
    }else if(patron_ApellidoPM.test(appm)){
        return devolver={
            aceptacion: true,
            msj: ""
        };
    }else{
        return devolver={
            aceptacion: false,
            msj: "No introdujo un Apellido correctamente"
        };
    }
}

function numEmpleado(num) {
    if(num.length == 0){
        return devolver={
            aceptacion: false,
            msj: "Necesito el dato NumEmpleado"
        };
    }else if(patron_numEmpleado.test(num)){
        return devolver={
            aceptacion: true,
            msj: ""
        };
    }else{
        return devolver={
            aceptacion: false,
            msj: "No introdujo bien el Numero de Empleado"
        };
    }
}

function boleta(bol) {
    if(bol.length == 0){
        return devolver={
            aceptacion: false,
            msj: "Necesito el dato boleta"
        };
    }else if(patron_boleta.test(bol)){
        return devolver={
            aceptacion: true,
            msj: ""
        };
    }else{
        return devolver={
            aceptacion: false,
            msj: "No introdujo bien la Boleta"
        };
    }
}

function correo(email){
    if(email.length == 0){
        return devolver={
            aceptacion: false,
            msj: "Necesito el dato correo"
        };
    }else if(patron_email.test(email)){
        return devolver={
            aceptacion: true,
            msj: ""
        };
    }else{
        return devolver={
            aceptacion: false,
            msj: "No introdujo bien el correo"
        };
    }
}

function contra(pass) {
    if(pass.length == 0){
        return devolver={
            aceptacion: false,
            msj: "Necesito datos"
        };
    }else if(patron_contra.test(pass)){
        return devolver={
            aceptacion: true,
            msj: ""
        };
    }else{
        return devolver={
            aceptacion: false,
            msj: "No introdujo bien la contraseña"
        };
    }
}

module.exports={
    Nombres,ApellidoPM,numEmpleado,boleta,correo,contra
}
