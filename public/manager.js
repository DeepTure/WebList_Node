$(document).ready(() => {
    $("#entry").click((ev) => {
        $("#gen").prop("disabled", true);
        ev.preventDefault();
        $.ajax({
            url: "/genSign",
            type: "post",
            data: "",
            success: (res) => {
                let a = document.createElement("a");

                let doc = new Blob([new Uint8Array(res.doc.data)], {
                    type: "text/plain",
                });
                let sign = new Blob([new Uint8Array(res.sign.data)], {
                    type: "text/plain",
                });

                let docUrl = window.URL.createObjectURL(doc);
                let signUrl = window.URL.createObjectURL(sign);

                a.href = docUrl;
                a.download = res.usr + ".txt";
                a.click();

                window.URL.revokeObjectURL(docUrl);

                a.href = signUrl;
                a.download = res.usr + ".dat";
                a.click();

                window.URL.revokeObjectURL(signUrl);

                $("#gen").prop("disabled", false);
            },
            error: (err) => {
                console.log(err);
                alert("Ocurrio un error, intentelo mas tarde");
                $("#gen").prop("disabled", false);
            },
        });
    });

    $("#firmaLog").click((ev) => {
        ev.preventDefault();
        let formdata = new FormData();

        let usr = $("#user").val();
        let ivalues = 0;

        if (usr.length > 0) {
            formdata.append("usr", usr);
            ivalues++;
            if ($("#fileTxt").prop("files").length == 1) {
                let fileT = $("#fileTxt").prop("files")[0];
                formdata.append("flTxt", fileT, usr + ".txt");
                ivalues++;
            }

            if ($("#fileDat").prop("files").length == 1) {
                let fileD = $("#fileDat").prop("files")[0];
                formdata.append("flDat", fileD, usr + ".dat");
                ivalues++;
            }
        }
        if (ivalues == 3) {
            $.ajax({
                enctype: "multipart/form-data",
                url: "/verSign",
                type: "POST",
                data: formdata,
                processData: false,
                contentType: false,
                success: (res) => {
                    if (res.check == true) {
                        $("#user").attr("value", res.data.id);
                        $("#psw").attr("value", res.data.contraseña);
                        $("#rol").attr("value", res.rol);
                        $("#Log").submit();
                    } else {
                        alert("No se reconoce su firma");
                    }
                },
                error: (err) => {
                    console.log(err);
                },
            });
        } else {
            alert("Asegurese de haber subido sus archivos");
        }
    });
});
