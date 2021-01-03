//extraer los grupos
let grupoAct = "";
function getAlumnos(grupo) {
    $.ajax({
        url: "/getAlumnosGrupo",
        type: "post",
        data: { grupoS: grupo },
        success: function (response) {
            grupoAct = grupo;
            console.log(response);
            mostrarAlumnos(response, grupo);
            if (materiaDeLaInasistencia.length > 0) {
                mostrarAlumnosDeHoy();
            }
        },
        error: function (response) {
            alert(response);
            console.log(response);
        },
    });
}

function getMaterias() {
    $.ajax({
        url: "/getMateriasProfesor",
        type: "post",
        success: (res) => {
            mostrarMaterias(res);
        },
        error: function (response) {
            alert(response);
            console.log(response);
        },
    });
}

//para mostrar en la tabla los grupos //alumnosDeGrupo
function mostrarAlumnos(alumnos, grupo) {
    boletasDeInasistencia = [];
    let codigo = "";
    codigo = `<tr>
                    <td class="atxt white">
                        Boleta
                    </td>
                    <td class="atxt white">    
                        Nombre
                    </td>
                    <td class="atxt white">
                        Asistencia
                    </td>
                </tr>`;
    for (var i = 0; i < alumnos.length; i++) {
        codigo +=
            `
        <tr>
            <td class="atxt white">
               ` +
            alumnos[i].bol +
            ` 
            </td>   
            <td class="atxt white">
               ` +
            alumnos[i].name +
            " " +
            alumnos[i].lastName +
            ` 
            </td>  
            <td class="atxt white">
                <input type="checkbox" style="width: 5%; height: 1vw;" name="asistencia" onclick="prepararBoletas(` +
            alumnos[i].bol +
            `)" name="` +
            alumnos[i].bol +
            `">
            </td>   
        </tr>
        `;
    }
    $("#listg").text("Lista actual: " + grupo);
    $("#alumnosDeGrupo").html(codigo);
}

function mostrarMaterias(materias) {
    codigo = "Materia<br />";
    console.log(materias);
    materias.forEach((materia) => {
        codigo +=
            `
        <input
            type="radio"
            style="width: 5%; height: 1vw"
            name="rd"
            id="mat1"
            onclick="prepararIdMateria('` +
            materia.idMateria +
            `')"
        />
        <label for="mat1" class="atxt white"
            >` +
            (materia.idMateria == "SWyA"
                ? "Seguridad web y aplicaciones"
                : materia.idMateria == "ISD"
                ? "Introducción a los sistemas distribuidos"
                : materia.idMateria == "IIDP"
                ? "Ingeniería de pruebas"
                : "Laboratorio de proyectos de tecnologias de la informacion") +
            `</label
        ><br />
        `;
    });
    $("#materias").html(codigo);
}

//esta funcion se encarga de preparar las boletas, cada vez que hace click en un alumno para registrar su inasistencia, entonces se carga en esta funcion y se prepara
//para cuando el profesor presione en guardar
let boletasDeInasistencia = [];
function prepararBoletas(boleta) {
    if (boletasDeInasistencia.indexOf(boleta) == -1) {
        boletasDeInasistencia.push(boleta);
    } else {
        eliminarBoletaDeInasistenciaLista(boleta);
    }
}

function eliminarBoletaDeInasistenciaLista(boleta) {
    const indice = boletasDeInasistencia.indexOf(boleta);
    boletasDeInasistencia = boletasDeInasistencia.splice(indice, 1);
}

//esta funcion se encarga de almacenar la materia del profesor
let materiaDeLaInasistencia = [];
function prepararIdMateria(materia) {
    if (materiaDeLaInasistencia.length > 0) {
        materiaDeLaInasistencia[0] = materia;
    } else {
        materiaDeLaInasistencia[0] = materia;
        $("#btn1").prop("disabled", false);
        $("#btn3").prop("disabled", false);
        $("#btn2").prop("disabled", false);
    }
    getInasistenciasHoy();
}

//para guardar la inasistencia usamos esta petición
function registrarInasistencia() {
    var aux = JSON.stringify({
        boletas: boletasDeInasistencia,
        idMateria: materiaDeLaInasistencia,
    });
    $.ajax({
        url: "/saveInasistencia",
        type: "post",
        data: { datos: aux },
        success: function (response) {
            console.log(response);
            ventanaEmergente(
                "Correcto",
                "Se ha registrado de manera correcta la inasistencia",
                "success"
            );
            getInasistenciasHoy();
        },
        error: function (response) {
            console.log(response);
            ventanaEmergente(
                "Error",
                "Ha ocurrido un error inesperado",
                "error"
            );
        },
    });
}

function ventanaEmergente(titulo, relleno, icono) {
    Swal.fire({
        title: titulo,
        text: relleno,
        icon: icono,
    });
}

//Obtenemos los registros de asistencia de hoy para posibles modificacones
function getInasistenciasHoy() {
    const fecha = new Date();
    let hoy =
        fecha.getFullYear() +
        "-" +
        (fecha.getMonth() + 1) +
        "-" +
        fecha.getDate();
    let data = JSON.stringify({
        fecha: hoy,
        materia: materiaDeLaInasistencia,
        grupo: grupoAct,
    });
    $.ajax({
        url: "/getAlumnosToday",
        type: "post",
        data: { datos: data },
        success: function (response) {
            console.log(response);
            mostrarAlumnosDeHoy(response);
        },
        error: function (response) {
            console.log(response);
            alert(response);
        },
    });
}

function mostrarAlumnosDeHoy(alumnos) {
    if (!alumnos) {
        let codigo = `<p class="atxt white">No hay faltas hoy en la materia</p>`;
        $("#alumnosHoy").html(codigo);
    } else if (alumnos.length > 0) {
        let codigo = `<tr>
        <td class="atxt white">
            Boleta
        </td>
        <td class="atxt white">
            Nombre
        </td>
        <td class="atxt white">
            Accion
        </td>
            </tr>`;
        for (var i = 0; i < alumnos.length; i++) {
            codigo +=
                `
        <tr>
            <td class="atxt white">
            ` +
                alumnos[i].bol +
                ` 
            </td>   
            <td class="atxt white">
            ` +
                alumnos[i].name +
                " " +
                alumnos[i].lastName +
                ` 
            </td>  
            <td class="atxt white">
                <input type="button" name="" value="Borrar" id="btn" onclick="eliminarInasistencia('` +
                alumnos[i].idIns +
                `')" class="inputbutn int white">
            </td>   
        </tr>`;
        }
        $("#alumnosHoy").html(codigo);
    } else {
        let codigo = `<p class="atxt white">No hay faltas hoy en la materia</p>`;
        $("#alumnosHoy").html(codigo);
    }
}

function eliminarInasistencia(id) {
    const fecha = new Date();
    let hoy =
        fecha.getFullYear() +
        "-" +
        ((fecha.getMonth() + 1).toString().length < 2
            ? 0 + (fecha.getMonth() + 1).toString()
            : fecha.getMonth() + 1) +
        "-" +
        (fecha.getDate().toString().length < 2
            ? 0 + fecha.getDate().toString()
            : fecha.getDate());
    console.log(hoy);
    let data = JSON.stringify({
        id: id,
        dia: hoy,
        materia: materiaDeLaInasistencia,
    });
    $.ajax({
        url: "/deleteInasistencia",
        type: "post",
        data: { datos: data },
        success: function (response) {
            console.log(response);
            ventanaEmergente(
                "Correcto",
                "Se ha eliminado de manera correcta la inasistencia",
                "success"
            );
            getInasistenciasHoy();
        },
        error: function (response) {
            console.log(response);
            ventanaEmergente(
                "Error",
                "Ha ocurrido un error inesperado",
                "error"
            );
        },
    });
}

function individualIns() {
    var aux = JSON.stringify({
        boleta: $("#boletaIndv").val(),
        idMateria: materiaDeLaInasistencia,
    });
    $.ajax({
        url: "/addInasistencia",
        type: "post",
        data: { datos: aux },
        success: function (response) {
            console.log(response);
            ventanaEmergente(
                "Correcto",
                "Se ha registrado de manera correcta la inasistencia",
                "success"
            );
            getInasistenciasHoy();
        },
        error: function (response) {
            console.log(response);
            ventanaEmergente(
                "Error",
                "Ha ocurrido un error inesperado",
                "error"
            );
        },
    });
}

getAlumnos("5IV6");
getMaterias();
