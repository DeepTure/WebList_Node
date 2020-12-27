<%-- 
    Document   : Recover
    Created on : 27/05/2020, 03:37:09 PM
    Author     : crist
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
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
    <body link="Black" vlink="Black" alink="Black" class="bg-img">

        <nav>
            <article class="ImgicoLog logo">

            </article>
        </nav>

        <div class="blockAn fg-img">
            <p class="space">
                <br>
                <!--No quitar el br dinamico-->
            </p>
            <p class="title white">
                Recuperar cuenta
            </p>
            <p class="space">
                <br>
            </p>
            <p class="atxt white">
                Para recuperar su contraseña llene los siguientes campos: 
            </p>
            <p class="space">
                <br>
            </p>
            <form method="get" action="InicioSesionController">
                <p class="atxt white">
                    Correo electronico:
                </p>
                <p class="space">
                    <br>
                </p>
                <input type="text" name="correo" class="inputtxt white">
                <p class="space">
                    <br>
                    <br>
                    <br>
                </p>
                <p class="atxt white">
                    Número de empleado:
                </p>
                <p class="space">
                    <br>
                </p>
                <input type="text" name="id" class="inputtxt white">
                <p class="space">
                    <br>
                </p>
                <p class="space">
                    <br>
                </p>
                <input type="hidden" name="instruction" value="recover">
                <input type="submit" name="Send" class="inputbutn int white" value="Enviar código">
            </form>
            <input type="button" class="inputbutn int white" value="Menú principal" style="margin-top: 20%; margin-left: 80%;" onclick="location.href = 'index.jsp'">
        </div>
    </body>
</html>
