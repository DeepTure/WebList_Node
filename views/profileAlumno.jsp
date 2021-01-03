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
            <p class="tittle">
                Mi Perfil
            </p>
            <p class="space">
                <br>
                <br>
            </p>
            <input type="button" name="Volver" value="Volver" class="inputbutn nav int padd" onclick="location.href = 'Homealumno.ejs'">
        </nav>
        <div class="blockAn fg-img">
            <div class="space">
                <br>
                <br>
                <br>
            </div>
            <div class="title white" style="text-align: left; margin-left: 1.5rem;">
                Cambiar contraseña
            </div>
            <div class="space">
                <br>
            </div>
            <div class="subtitle white" style="text-align: left; margin-left: 1.5rem;">
                Usar al menos 8 caracteres entre mayusculas y minusculas con al menos 1 numero
            </div>
            <div class="space">
                <br>
            </div>
            <div>
                <form method="post" id="password" style="text-align: left;" action="alumnoControllerPassword">
                    <p class="subtitle white" style="text-align: left; margin-left: 1.5rem;">
                        Nueva contraseña
                    </p>
                    <div class="space">
                        <br>
                    </div>
                    <input type="hidden" name="instruction" value="changePassword">
                    <input type="password" id="pass1" class="inputtxt" name="pass" style="margin-left: 1.5rem;">
                    <div class="space">
                        <br>
                    </div>
                    <p class="subtitle white" style="text-align: left; margin-left: 1.5rem;">
                        Confirmar contraseña
                    </p>
                    <div class="space">
                        <br>
                    </div>
                    <input type="password" id="pass2" class="inputtxt" name="pass2" style="margin-left: 1.5rem;">
                    <div class="space">
                        <br>
                    </div>
                    <p class="subtitle white" style="text-align: left; margin-left: 1.5rem;">
                        Ingrese numero de Boleta
                    </p><br>
                    <input type="text" id="pass2" class="inputtxt" name="id" style="margin-left: 1.5rem;">
                    <div class="space">
                        <br>
                    </div>
                    <input type="submit" id="Login" value="Enviar" class="inputbutn int" style="margin-left: 1.5rem;">
                </form>
                <p class="space">
                    <br>
                    <br>
                    <br>
                </p>
            </div>
            <form method="post" id="password" style="text-align: left;" action="alumnoControllerElementos">
                <p class="subtitle white" style="text-align: left; margin-left: 1.5rem;">
                    Modificar Correo
                </p>
                <div class="space">
                    <br>
                </div>
                <input type="hidden" name="instruction" value="newEmail">
                <input type="text" id="email" class="inputtxt" name="email" style="margin-left: 1.5rem;">
                <div class="space">
                    <br>
                </div>
                <p class="subtitle white" style="text-align: left; margin-left: 1.5rem;">
                    Modificar Nombre
                </p>
                <div class="space">
                    <br>
                </div>
                <input type="hidden" name="instruction" value="newName">
                <input type="text" id="name" class="inputtxt" name="name" style="margin-left: 1.5rem;">
                <div class="space">
                    <br>
                </div>
                <p class="subtitle white" style="text-align: left; margin-left: 1.5rem;">
                    Ingrese tu numero de boleta
                </p>
                <div class="space">
                    <br>
                </div>
                <input type="text" id="email" class="inputtxt" name="id" style="margin-left: 1.5rem;">>
                <div class="space">
                    <br>
                </div>
                <input type="submit" id="Send" value="Enviar" class="inputbutn int" style="margin-left: 1.5rem;">
            </form>
        </div>
    </div>
</body>
<%=request.getAttribute("code")%>
</html>
