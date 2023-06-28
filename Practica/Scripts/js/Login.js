

    $(document).ready(function () {

        $("#frm").submit(function (e) {
            e.preventDefault();

            url = "../Home/Ingresar_Async";

            parametros = $(this).serialize();
            $.post(url, parametros, function (data) {

                var Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                })

                if (data == "1") {

                    Toast.fire({
                        title: 'WELCOME',
                        icon: 'success'
                    });

                    location.href = "../Home/About";
                }
                else {

                    Toast.fire({
                        title: 'Invalid username or password',
                        icon: 'error'
                        /* timer: 2000*/
                    });
                }

            })
        })
    })
