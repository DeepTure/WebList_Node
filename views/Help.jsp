<%-- 
    Document   : Help
    Created on : 27/05/2020, 03:49:39 PM
    Author     : crist
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
﻿<!DOCTYPE html>
<html>
    <head>
        <title>
            WebList
        </title>
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
    <body link="white" vlink="white" alink="white" class="bg-img">

        <nav>
            <div class="title">
                Iniciar sesi&oacute;n
            </div>
            <div class="space">
                <br>
            </div>
            <div>
                <form method="post" id="LogIn">
                    <p class="subtitle">
                        Usuario
                    </p>
                    <div class="space">
                        <br>
                    </div>
                    <input type="text" name="Account" class="inputtxt nav">
                    <div class="space">
                        <br>
                        <br>
                        <br>
                    </div>
                    <p class="subtitle">
                        Contrase&ntilde;a
                    </p>
                    <div class="space">
                        <br>
                    </div>
                    <input type="password" name="Password" class="inputtxt nav">
                    <div class="space">
                        <br>
                        <br>
                        <br>
                        <br>
                    </div>
                    <input type="button" name="Log" value="Inicia sesi&oacute;n" class="inputbutn nav int" onclick="Log_In()">
                    <div class="space">
                        <br>
                    </div>
                    <input type="button" name="Log" value="Recuperar cuenta" class="inputbutn nav int" onclick="location.href = 'Recover.jsp'">
                    <br>
                    <br>
                    <input type="button" name="Volver" value="Menú principal" class="inputbutn nav int padd" onclick="location.href = 'index.jsp'">
                </form>
            </div>
        </nav>

        <div class="blockAn fg-img">
            <p class="space">
                <br>
                <!--No quitar el br dinamico-->
            </p>
            <p class="title white"> 
                FAQ
            </p>
            <p class="space">
                <br>
                <br>
            </p>
            <p class="atxt white">
                ¿Como funciona la herramienta?
            </p>
            <p class="space">
                <br>
            </p>
            <p class="atxt white">
                Por favor lea el manual de usuario pulsando <a href="Img/ManualDeUsuario.pdf"> aqui</a>
            </p>
            <p class="space">
                <br>
                <br>
            </p>
            <p class="atxt white">
                ¿Como puedo restablecer mi cuenta?
            </p>
            <p class="space">
                <br>
            </p>
            <p class="atxt white">
                Pulse el botón de recuperar cuenta para continuar con el proceso de restablecimiento de contraseña.
            </p>
            <p class="space">
                <br>
                <br>
            </p>
            <p class="atxt white">
                No registre mi correo electronico, ¿Como puedo reestablecer mi contraseña?
            </p>
            <p class="space">
                <br>
            </p>
            <p class="atxt white">
                Deberá de dirigirse a la unidad de informática (UDI) para continuar el proceso.
            </p>
            <p class="space">
                <br>
                <br>
            </p>
            <p class="atxt white">
                ¿Cuales son los horarios de atención?
            </p>
            <p class="space">
                <br>
            </p>
            <p class="atxt white">
                De 9:00 a 20:00 hrs. (Sujeto a disponibilidad del personal)
            </p>
            <p class="space">
                <br>
                <br>
            </p>
            <p class="atxt white">
                Aviso de Privacidad. 
            </p>
            <p class="space">
                <br>
                <br>
            </p>
            <p class="atxt white">
                Aviso de privacidad para la protección de datos personales En términos de lo previsto en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, la aportación que hagas de tus datos Personales a DeepTure constituye la aceptación de estos Términos y Condiciones
            </p>
            <p class="atxt white">
                1.- El presente Aviso tiene por objeto la protección de tus datos personales, mediante su tratamiento legítimo, controlado e informado, a efecto de garantizar su privacidad, así como tu derecho a la autodeterminación informativa.
            </p>
            <p class="atxt white">
                2.- Conforme al artículo 3, fracción V, de la Ley, se entiende por Datos Personales: Cualquier información concerniente a una persona física identificada o identificable.
            </p>
            <p class="atxt white">
                3.- DeepTure, de conformidad a lo dispuesto por la fracción I del artículo 16 de la Ley, será el Responsable de tu información personal (Datos Personales). DeepTure hará uso de los datos para fines únicamente editoriales y estadísticos, así como para mantenerte al tanto de la información concerniente a la franquicia 30 Promesas.
            </p>
            <p class="atxt white">
                4.- Al participar en el proceso de selección, autorizas a Deepture utilizar y tratar de forma automatizada tus datos personales e información suministrados, los cuales formarán parte de nuestra base de datos con la finalidad de usarlos en forma enunciativa, más no limitativa para: identificarte, ubicarte, comunicarte, contactarte, enviarte información, actualizar nuestra base de datos y obtener estadísticas.
            </p>
            <p class="atxt white">
                6.- La temporalidad del manejo de tus Datos Personales será indefinida a partir de la fecha en que nos los proporciones.
            </p>
            <p class="atxt white">
                7.- DeepTure, como responsable del tratamiento de tus datos personales, está obligada a cumplir con los principios de licitud, consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y responsabilidad tutelados en la Ley; por tal motivo con fundamento en los artículos 13 y 14 de la Ley, Deepture se compromete a tratar tu información con normas de confidencialidad y seguridad administrativa.
            </p>
            <p class="atxt white">
                8.- En términos de lo establecido por el artículo 22 de la Ley, tienes derecho en cualquier momento a ejercer tus derechos de acceso, rectificación, cancelación y oposición al tratamiento de tus datos personales. 
            </p>
            <p class="space">
                <br>
            </p>
        </div>
    </body>
</html>
