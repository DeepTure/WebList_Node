//extraer los grupos
function getAlumnos(grupo){
    $.ajax({
        url:'/getAlumnosGrupo',
        type:'post',
        data:{grupoS:grupo},
        success: function(response){
            console.log(response)
            mostrarAlumnos(response);
        },
        error:function(response){
            alert(response);
            console.log(response)
        }
    });
}

//para mostrar en la tabla los grupos //alumnosDeGrupo
function mostrarAlumnos(alumnos){
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
                </tr>`
    for(var i=0; i<alumnos.length; i++){
        codigo += `
        <tr>
            <td class="atxt white">
               `+alumnos[i].bol+` 
            </td>   
            <td class="atxt white">
               `+alumnos[i].name+' '+alumnos[i].lastName+` 
            </td>  
            <td class="atxt white">
                <input type="checkbox" style="width: 5%; height: 1vw;" name="asistencia" onclick="prepararBoletas(`+alumnos[i].bol+`)" name="`+alumnos[i].bol+`">
            </td>   
        </tr>
        `
    }
    $('#alumnosDeGrupo').html(codigo);
}

//esta funcion se encarga de preparar las boletas, cada vez que hace click en un alumno para registrar su inasistencia, entonces se carga en esta funcion y se prepara 
//para cuando el profesor presione en guardar
let boletasDeInasistencia = [];
function prepararBoletas(boleta){
    if(boletasDeInasistencia.indexOf(boleta)!=-1){
        boletasDeInasistencia.push(boleta);
    }else{
        eliminarBoletaDeInasistenciaLista(boleta);
    }
}

function eliminarBoletaDeInasistenciaLista(boleta){
    const indice = boletasDeInasistencia.indexOf(boleta);
    boletasDeInasistencia = boletasDeInasistencia.splice(indice,1);
}

//esta funcion se encarga de almacenar la materia del profesor
let materiaDeLaInasistencia = [];
function prepararIdMateria(materia){
    materiaDeLaInasistencia[0] = materia;
}

//para guardar la inasistencia usamos esta petición
function registrarInasistencia(){
    var aux = JSON.stringify({
        boletas: boletasDeInasistencia,
        numEmpleado: '526',
        idMateria: materiaDeLaInasistencia,
    })
    $.ajax({
        url:'/saveInasistencia',
        type:'post',
        data:{datos:aux},
        success: function(response){
            console.log(response)
            ventanaEmergente('Correcto',"Se ha registrado de manera correcta la inasistencia",'success');
        },
        error:function(response){
            console.log(response);
            ventanaEmergente('Error',"Ha ocurrido un error inesperado",'error');
        }
    });
}

function ventanaEmergente(titulo, relleno, icono){
    Swal.fire({
        title:titulo,
        text:relleno,
        icon: icono
    });
}