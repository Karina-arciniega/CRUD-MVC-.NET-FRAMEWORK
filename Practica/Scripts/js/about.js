﻿var tabla_spec = null;

$(document).ready(function () {

    /** MANDA LOS DATOS DEL FORMULARIO AL PULSAE EL BOTON***/
    $("#frm").submit(function (e) {
        e.preventDefault();

        url = "Registrar";

        parametros = $(this).serialize();
        var form = $(this);
        var campos_vacios = false;

        form.find('input[type="text"], textarea').each(function () {
            if ($(this).val() === '') {
              campos_vacios = true;
            }
        });

        if (!campos_vacios) {

            $.post(url, parametros, function (data) {

                var Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                })
                console.log(data)
                if (data == "True") {

                    form[0].reset(); // Limpiar los campos del formulario
                    tabla_spec.ajax.reload();
                    Bien('Datos guardardos exitosamente')
                }
                else {
                    form[0].reset();
                    Mal('Ocurrio un error')
                }
            })

        }
        else {
            Mal('Algunos campos están vacíos')
        }
    })

    tabla_spec = $('#TableSpecs').DataTable({

        "ajax": {
            "url": "ListarUsuarios",
            "method ": "GET",
            "datatype": "json"
        },
        "columns": [
            /*{ "data": "Id" },*/
            { "data": "Nombre" },
            { "data": "Correo" },
            { "data": "Edad" },
            { "data": "CURP" },
            { "data": "Genero" },
            {
                "data": "Rol",
                "render": function (data, type, row) {

                    if (data === "1") {
                        return "Administrador";
                    } else if (data === "2") {
                        return "Usuario";
                    } else {
                        return "";
                    }
                }
            },
            {
                "data": "estado",
                "render": function (data, type, row) {

                    if (data === "1") {
                        return "<span class='badge bg-success' > Activo </span>";
                    } else if (data === "0") {
                        return "<span class='badge bg-danger' > Desactivado </span>";
                    } else {
                        return "";
                    }
                }
            },
            {
                "defaultContent": "<button class='eliminar btn btn-danger btn-sm ml-2' style='margin-left:2em !important';background: #ef2026;border-radius:8px !important;' type='button' ><i class='fa fa-trash' ></i></button> ",
            },
            {
                "defaultContent": "<button data-bs-toggle='modal' data-bs-target='#myModal' class='btn btn-warning btn-sm ml-2 info' style='margin-left:2em !important'  id='info' type='button' ><i class='fa fa-pen' style='color:white' ></i></button>",
            }

        ],
        "columnDefs": [
            { "width": "420px", targets: [0] },

        ],
        "oLanguage": {
            "sInfo": "Showing _START_ to _END_ of _TOTAL_ Users",// text you want show for info section
            "sLengthMenu": "Show _MENU_ Users"
        },
        "scrollY": "300px",
        "broder": "0px",
    });

    var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('tipo='))
        .split('=')[1];

    // Ocultar los botones dependiendo del tipo de usuario

    if (cookieValue === "2") {
       
        tabla_spec.columns([7, 8]).visible(false);
    } else if (cookieValue === "1") {
       
        tabla_spec.columns([7, 8]).visible(true);
    }

    /**         * Validaciones en el formulario *       * */

    /*1. correo */
    document.getElementsByName("correo")[0].addEventListener('change', validarEmail);

    function validarEmail(event) {

        var c = document.getElementsByName("correo")[0].value;
     
        // Expresión regular para validar el formato del correo electrónico
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(c)) {
            // Si el correo electrónico es válido
        } else {
            // Si el correo electrónico no es válido, mostrar el mensaje de error
            document.getElementsByName("correo")[0].value = ""
            Mal('El correo electr\u00F3nico no es v\u00E1lido')
        }
    }

    /*2. CURP */


    var inputCurp = document.getElementById('curp');

    inputCurp.addEventListener('change', function () {
        var value = inputCurp.value;

        console.log(value)
        console.log(value.length)
        // Limitar la longitud del texto a 18 caracteres
        if (value.length >= 18) {
            inputCurp.value = value.slice(0, 18);
        }
        else {
            // Si el correo electrónico no es válido, mostrar el mensaje de error
            document.getElementsByName("curp")[0].value = ""
            Mal('El campo CURP no es v\u00E1lido')
        }

        // Convertir el texto a mayúsculas
        inputCurp.value = inputCurp.value.toUpperCase();
    });

});

$("#tbody2").on("click", "button.info", async function () {

    var data = tabla_spec.row($(this).parents("tr")).data();

    document.getElementById("nombre").value = data.Nombre;
    document.getElementById("correo").value = data.Correo;
    document.getElementById("curp").value = data.CURP;
    document.getElementById("edad").value = data.Edad;
    document.getElementById("contrasena").value = data.Contrasena;

    if (data.Genero === "Femenino") {
        document.getElementById('F').checked = true;
        document.getElementById('M').checked = false;
    }
    else {
        document.getElementById('F').checked = false;
        document.getElementById('M').checked = true;
    }

    document.getElementById('genero').value

    
    if (data.Rol === "1") {
        document.getElementById("select").value = "1";
    }
    else {
        document.getElementById("select").value = "2";
    }

    document.getElementById("Id").value = data.Id;

    //if (data.estado === "1") {
    //    document.getElementById('A').checked = true;
    //    document.getElementById('D').checked = false;
    //}
    //else {
    //    document.getElementById('A').checked = false;
    //    document.getElementById('D').checked = true;
    //}

    //document.getElementById("estado").value = data.estado;
   console.log(data)
})

$("#tbody2").on("click", "button.eliminar", async function () {

    var data = tabla_spec.row($(this).parents("tr")).data();
    var id = data.Id;
    
        Swal.fire({
            title: '¿Estas seguro de eliminar definitivamente este usuario?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#005384',
            cancelButtonColor: '#ef2026',
            confirmButtonText: ' Si!',

        }).then((result) => {
            if (result.isConfirmed) {

                jQuery.ajax({
                    url: "EliminarUsuario" + "?id=" + id,
                    type: "GET",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {

                        if (data.resultado) {

                            tabla_spec.ajax.reload();
                            tabla_spec.search('').draw();

                            Bien('Usuario desactivado temporalmente');

                        } else {

                            Mal('No se puedo eliminar');

                        }
                    }
                });
            }
        })


})

$.get("getTipos", {  }, function (data) {

    $("#select").empty();
     
    $.each(data, function (index, row) {
            
        $("#select").append("<option value='" + row.Id + "' > " + row.Tipo + "</option >")

    });
});

$('#F').click(function () {
    if ($('#F').is(':checked')) {
        document.getElementById('M').checked = false;
        document.getElementById('genero').value = "Femenino";
    }
});
$('#M').click(function () {
    if ($('#M').is(':checked')) {
        document.getElementById('F').checked = false;
        document.getElementById('genero').value = "Masculino";
    }
});

//$('#A').click(function () {
//    if ($('#A').is(':checked')) {
//        document.getElementById('D').checked = false;
//        document.getElementById('estado').value = "1";
//    }
//});
//$('#D').click(function () {
//    if ($('#D').is(':checked')) {
//        document.getElementById('A').checked = false;
//        document.getElementById('estado').value = "0";
//    }
//});

/* Sweet alert * */
var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
})
function Bien(text) {

    Toast.fire({
        title: text,
        icon: 'success',
        timer: 3000,
        
    });

}
function Mal(text) {

    Toast.fire({
        title: text,
        icon: 'error',
        timer: 3000
    });
}




