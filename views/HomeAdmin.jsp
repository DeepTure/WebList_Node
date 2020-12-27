<%-- 
    Document   : HomeAdmin
    Created on : 27/05/2020, 03:46:01 PM
    Author     : crist
--%>

<%@page import="java.util.List"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="com.deepture.utils.classdata.alumno"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <%
            //obtiene los productos del controlador
            List<alumno> alumnos = (List<alumno>) request.getAttribute("alumnosD");
            if (alumnos == null) {
                alumnos = (List<alumno>) session.getAttribute("als");
            } else {
                session.setAttribute("als", alumnos);
            }
        %>

        <title>
            WebList
        </title>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
        <link rel="shortcut icon" href="Img/DeepTureL.ico" />
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" media="screen and (prefers-color-scheme: no-preference)" href="CSS/RespL.css">
        <link rel="stylesheet" type="text/css" media="screen and (prefers-color-scheme: no-preference)" href="CSS/FuenteL.css">

        <link rel="stylesheet" type="text/css" media="screen and (prefers-color-scheme: dark)" href="CSS/RespD.css">
        <link rel="stylesheet" type="text/css" media="screen and (prefers-color-scheme: light)" href="CSS/RespL.css">

        <link rel="stylesheet" type="text/css" media="screen and (prefers-color-scheme: dark)" href="CSS/FuenteD.css">
        <link rel="stylesheet" type="text/css" media="screen and (prefers-color-scheme: light)" href="CSS/FuenteL.css">

        <style type="text/css">
            .bg-img{
                margin: 0;
                background-image: url('Img/BackgroundD.png');
                background-size: 100%;
                background-repeat: no-repeat;
                background-position: 0 0;
                background-attachment: fixed;
                background-size: cover;
                transition: background 1s;
            }
            .fg-img{
                background-image: url('Img/ForegroundD.png');
                background-size: 100%;
                background-repeat: no-repeat;
                background-position: 0 0;
                background-attachment: fixed;
                background-size: cover;
                transition: background 1s;
            }

            .logo{
                background-image: url('Img/DeepTureD.png');
                background-size: 100%;
                background-size: cover;
                transition: background 1s;
            }

            .logoHelp{
                background-image: url('Img/HelpL.png');
                background-size: 70%;
                background-repeat: no-repeat;
                background-position: 50% 0;
                transition: background 1s;
            }

            @media screen and (prefers-color-scheme: light) {
                .bg-img{
                    background-image: url('Img/BackgroundL.png');
                    transition: background 1s;
                }
                .fg-img{
                    background-image: url('Img/ForegroundLHelp.png');
                    transition: background 1s;
                }
                @media screen and (orientation: landscape){
                    .fg-img{
                        background-image: url('Img/ForegroundL.png');
                        transition: background 1s;
                    }
                }
                .logo{
                    background-image: url('Img/DeepTureL.png');
                    transition: background 1s;
                }
                .logoHelp{
                    background-image: url('Img/HelpD.png');
                    transition: background 1s;
                }
            }
        </style>
        <script src="JS/Validate.js"></script>
    </head>
    <body link="Black" vlink="Black" alink="Black" class="bg-img">
        <!-- Aquí esta todo el navegador -->
        <nav>
            <p class="title">
                Bienvenido
            </p>
            <p class="space">
                <br>
                <br>
                <br>
            </p>
            <p class="atxt">
                Grupos registrados
            </p>
            <p class="space">
                <br>
            </p>
            <!-- De momento los grupos se vana a quedar estaticos solo para los cuartos -->
            <a href="#" class="g7">4IV7</a>
            <p class="space">
                <br>
            </p>
            <a href="#"  class="g8">4IV8</a>
            <p class="space">
                <br>
            </p>
            <a href="#" class="g9">4IV9</a>
            <p class="space">
                <br>
            </p>
            <div class="padd">
                <button class="inputbutn int nav" onclick="location.href = 'profileAdmin.jsp'">
                    Perfil
                </button>
                <p class="space">
                    <br>
                </p>
                <button class="inputbutn int nav" onclick="location.href = 'index.jsp'">
                    Cerrar sesion
                </button>
            </div>
        </nav>
        <!-- este code son las alertas que manda el backend por errores -->
        <%=request.getAttribute("code")%>
        <div class="blockAn fg-img">
            <p class="space">
                <br>
                <br>
                <!--No quitar el br dinamico-->
            </p>

            <!-- Iniciamos con la parte conde el administrador puede modificar los datos -->
            <p class="title white">
                Alumnos
            </p>
            <p class="space">
                <br>
            </p>

            <!-- este es el formulario para los alumnos -->
            <form id="alumno" method="post" action="CRUDalumno">
                <select class="inputtxt white">
                    <%for (alumno a : alumnos) {%>
                    <option value="<%= a.getNombre()%>" id=""><%= a.getNombre()%></option>
                    <%}%>  
                </select>
                <p class="space">
                    <br>
                </p>
                <p class="atxt white">
                    Boleta: <input type="number" name="boleta" class="inputtxt">
                </p>
                <p class="space">
                    <br>
                </p>

                <!-- el año de ingreso lo omití porque viene en la boleta y creo que no es necesario -->

                <p class="atxt white">
                    Nombres: <input type="text" name="nombres" class="inputtxt">
                </p>
                <p class="space">
                    <br>
                </p>
                <p class="atxt white">
                    Apellido paterno: <input type="text" name="app" class="inputtxt">
                </p>
                <p class="space">
                    <br>
                </p>
                <p class="atxt white">
                    Apellido materno: <input type="text" name="apm" class="inputtxt">
                </p>
                <p class="space">
                    <br>
                </p>

                <!-- Botones del  formulariio-->
                <input type="hidden" id="gr" name="grupo" value="null">
                <input type="hidden" id="command" name="instruction" value="null">
                
                <p class="atxt white">
                    <input type="radio" style="width: 5%; height: 1vw;" name="election" class="new" value="new">
                    Guardar como nuevo
                </p>
                <p class="space">
                    <br>    
                </p>
                <p class="atxt white">
                    <input type="radio" style="width: 5%; height: 1vw;" name="election" class="save" value="save" onclick="">
                    Guardar cambios
                </p>
                <p class="space">
                    <br>    
                </p>
                <p class="atxt white">
                    <input type="radio" style="width: 5%; height: 1vw;" name="election" class="delete" value="delete" onclick="">
                    Eliminar
                </p>
                <p class="space">
                    <br>
                    <br>    
                </p>
                <input type="submit" value="Ejecutar acciones" class="inputbutn int white">
            </form>
            <!-- Este script se encarga de cambiar la instruccion del hidden -->
            <script type="text/javascript">
                window.location.hash = "no-back-button";
                window.location.hash = "Again-No-back-button";//esta linea es necesaria para chrome
                window.onhashchange = function () {
                    window.location.hash = "no-back-button";
                }

                $(document).ready(function () {
                    $('.new').click(function () {
                        document.getElementById('command').value = 'new';
                    });
                    $('.save').click(function () {
                        document.getElementById('command').value = 'save';
                    });
                    $('.delete').click(function () {
                        document.getElementById('command').value = 'delete';
                    });

                    //esto es de los grupos
                    $('.g7').click(function () {
                        document.getElementById('gr').value = "4IV7";
                    });
                    $('.g8').click(function () {
                        document.getElementById('gr').value = "4IV8";
                    });
                    $('.g9').click(function () {
                        document.getElementById('gr').value = "4IV9";
                    });
                });
            </script>

            <p class="space">
                <br>
            </p>

            <!-- Formulario de para los profesores -->
            <p class="title white">
                Profesores
            </p>
            <p class="space">
                <br>
            </p>
            <form action="CRUDprofesor" method="post">
                <select class="inputtxt white">
                    <option>Profesor 1</option>
                    <option>Profesor 2</option>
                    <option>Profesor 3</option>
                </select>
                <p class="space">
                    <br>
                </p>
                <p class="atxt white">
                    Numero de empleado: <input type="number" name="nempleado" class="inputtxt white">
                </p>
                <p class="space">
                    <br>
                </p>
                <p class="atxt white">
                    Nombres: <input type="text" name="nombres" class="inputtxt white">
                </p>
                <p class="space">
                    <br>
                </p>
                <p class="atxt white">
                    Apellido paterno: <input type="text" name="app" class="inputtxt white">
                </p>
                <p class="space">
                    <br>
                </p>
                <p class="atxt white">
                    Apellido materno: <input type="text" name="apm" class="inputtxt white">
                </p>
                <p class="space">
                    <br>
                </p>
                <input type="checkbox" style="width: 5%; height: 1vw;" id="ch" name="ch" value="PSW">
                <label for="ch" class="atxt white">PSW</label>
                <p class="space">
                    <br>  
                </p>
                <input type="checkbox" style="width: 5%; height: 1vw;" id="ch2" name="ch" value="TPPC">
                <label for="ch2" class="atxt white">TPPC</label>
                <p class="space">
                    <br>  
                </p>
                <input type="checkbox" style="width: 5%; height: 1vw;" id="ch3" name="ch" value="BBDD">
                <label for="ch3" class="atxt white">BBDD</label>
                <p class="space">
                    <br>  
                </p>
                <input type="checkbox" style="width: 5%; height: 1vw;" id="ch4" name="ch" value="LPTI">
                <label for="ch4" class="atxt white">LPTI</label>

                <p class="space">
                    <br>
                </p>
                <!-- Botones del  formulariio-->
                <input type="hidden" id="commando" name="instruction" value="null">
                <p class="atxt white">
                    <input type="radio" style="width: 5%; height: 1vw;" name="election" class="new2" value="new">
                    Guardar como nuevo
                </p>
                <p class="space">
                    <br>
                </p>
                <p class="atxt white">
                    <input type="radio" style="width: 5%; height: 1vw;" name="election" class="save2" value="save" onclick="">
                    Guardar cambios
                </p>
                <p class="space">
                    <br>
                </p>
                <p class="atxt white">
                    <input type="radio" style="width: 5%; height: 1vw;" name="election" class="delete2" value="delete" onclick="">
                    Eliminar
                </p>
                <p class="space">
                    <br>
                    <br>
                </p>
                <input type="submit" value="Ejecutar acciones" class="inputbutn int white">
                <p class="space">
                    <br>
                </p>
            </form>
            <!--Este script va hacer dinamica la instruccion que le llega al controlador -->
            <script type="text/javascript">
                $(document).ready(function () {
                    $('.new2').click(function () {
                        document.getElementById('commando').value = 'new';
                    });
                    $('.save2').click(function () {
                        document.getElementById('commando').value = 'save';
                    });
                    $('.delete2').click(function () {
                        document.getElementById('commando').value = 'delete';
                    });
                });
            </script>

        </div>
    </body>
</html>
