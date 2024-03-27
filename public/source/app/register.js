document.addEventListener("DOMContentLoaded", function () {

    const botonIngresar = document.getElementById("botonCrearUsuario");

    botonIngresar.addEventListener("click", function (event) {
        event.preventDefault();
        registrarDatos();
    });

    // Función para enviar datos al servidor
    function registrarDatos() {
        // Capturar datos del formulario
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const rubro = document.getElementById('rubro').value;
        const direccion = document.getElementById('direccion').value;
        const codigoPostal = document.getElementById('codigoPostal').value;
        const telefono = document.getElementById('telefono').value;
        const movil = document.getElementById('movil').value;
        const roi = document.getElementById('roi').value;
        const iva = document.getElementById('iva').value;

        // Validar que los campos no estén vacíos
        if (!email || !password || !nombre || !apellido || rubro === 'Elija su rubro...' || !direccion || !codigoPostal || !telefono || !movil || !roi || !iva) {
            Toastify({
                text: "Por favor complete todos los datos correctamente",
                duration: 2000,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #29235C, #1D71B8)",
                },
                // onClick: function(){} // Callback after click
            }).showToast();
            return;
        }

        // Crear objeto con los datos
        const datos = {
            email : email,
            password : password,
            nombre : nombre,
            apellido : apellido,
            rubro : rubro,
            direccion : direccion,
            codigoPostal : codigoPostal,
            telefono : telefono,
            movil : movil,
            roi : roi,
            iva : iva,
        };

        // Realizar la solicitud POST al servidor
        fetch('/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
            .then(response => response.json())
            .then(response => {
                if (response.success === false && response.status === 400) {
                        Toastify({
                            text: "Por favor complete todos los datos correctamente",
                            duration: 2000,
                            close: true,
                            gravity: "bottom", // `top` or `bottom`
                            position: "right", // `left`, `center` or `right`
                            stopOnFocus: true, // Prevents dismissing of toast on hover
                            style: {
                                background: "linear-gradient(to right, #29235C, #1D71B8)",
                            },
                            // onClick: function(){} // Callback after click
                        }).showToast();
                        return;
                    } else if (response.success === false && response.status === 409) {
                        Toastify({
                            text: "Email ya registrado",
                            duration: 2000,
                            close: true,
                            gravity: "bottom", // `top` or `bottom`
                            position: "right", // `left`, `center` or `right`
                            stopOnFocus: true, // Prevents dismissing of toast on hover
                            style: {
                                background: "linear-gradient(to right, #29235C, #1D71B8)",
                            },
                            // onClick: function(){} // Callback after click
                        }).showToast();
                        return;
                    } else if (response.success === true && response.status === 200) {
                        // Redirige al usuario a login.html con un parámetro de éxito
                        window.location.href = './login.html?registroExitoso=true';
                        return;
                    }
            })
            .catch(error => {
                console.log(error);
                Toastify({
                    text: "Error en el servidor, informe a atención al cliente",
                    duration: 2000,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #29235C, #1D71B8)",
                    },
                    // onClick: function(){} // Callback after click
                }).showToast();
            });
        
    }
});