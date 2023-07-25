

    $(document).ready(function () {

        $("#frm").submit(function (e) {
            e.preventDefault();

            url = "../Login/comprobarUsuario";

            parametros = $(this).serialize();
            $.post(url, parametros, function (data) {

                var Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                })

                if (data == "1") {

                    Toast.fire({
                        title: 'BIENVENIDO',
                        icon: 'success'
                    });

                    location.href = "../CRUD/Index";
                }
                else {

                    Toast.fire({
                        title: 'Usuario y/o contrase\u00F1a inv\u00E1lidos',
                        icon: 'error'
                        /* timer: 2000*/
                    });
                }

            })
        })
    })
