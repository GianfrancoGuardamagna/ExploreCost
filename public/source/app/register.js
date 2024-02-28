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

    //El siguiente fragmento de Script controla el navbar

    //Logica buscador//
    async function buscador() {
        const search = document.getElementById('search');
        const block = document.getElementById('block');

        let items; // Variable para almacenar los items cargados desde el archivo JSON

        // Cargar y analizar el archivo JSON
        try {
            const response = await fetch('../../resources/articulosJson.json');
            items = await response.json();
        } catch (error) {
            console.error('Error al cargar el archivo JSON:', error);
        }

        block.style.display = 'none';

        search.addEventListener('input', () => {
            if (search.value === '') {
                block.style.display = 'none';
            } if (search.value !== '') {
                block.style.display = 'block';
            }
        });

        search.addEventListener('keyup', (event) => {

            if (event.key === 'Enter') {
                block.style.display = 'none';
                const searchTerm = search.value.toLowerCase();

                // Filtrar los items que coinciden con el término de búsqueda
                const resultados = items.filter(item => item.nombre.toLowerCase().includes(searchTerm));

                console.log(resultados);

                search.value = '';

                // Aquí puedes realizar acciones adicionales con los resultados de la búsqueda
            }
        });
    };

    // Verifica el ancho de la pantalla y realiza cambios en el nav
    function checkViewportWidth() {
        const nav = document.querySelector('nav');

        if (window.innerWidth >= 768) {
            nav.classList.add('navbar');
            nav.classList.add('bg-stone-200');
            nav.classList.add('flex');
            nav.classList.add('flex-row');
            nav.classList.add('pl-6');
            nav.classList.add('pr-6');
            nav.classList.add('h-16');
            nav.classList.add('top-0');
            nav.classList.add('items-center');
            nav.classList.add('justify-between');
            nav.classList.add('font-Montserrat');
            nav.classList.add('font-semibold');
            nav.classList.add('fixed');
            nav.classList.add('w-full');
            nav.classList.add('z-50');
            nav.innerHTML = `<a href="../../index.html">
            <img class="h-12" src="../../utils/images/logo explorecost.png" alt="Logo Explorecost">
          </a>
          <div class="flex flex-row items-center justify-end gap-5 w-3/4">
            <div class="dropdown">
              <button class="dropdown-toggle text-primario" type="button" aria-expanded="false">
                Categorías
              </button>
              <ul class="dropdown-menu bg-stone-200">
                <li><a class="dropdown-item" href="../shop/cocina/cocina.html">Cocina</a></li>
                <li><a class="dropdown-item" href="../shop/frio/frio.html">Frío</a></li>
                <li><a class="dropdown-item" href="../shop/hosteleria/hosteleria.html">Hostelería</a></li>
                <li><a class="dropdown-item" href="../shop/mobiliario/mobiliario.html">Mobiliario</a></li>
              </ul>
            </div>
            <div class="relative w-3/5">
              <input id="search" type="text" name="q" value="" placeholder="Buscar artículo en el catálogo..."
                  class="input-text rounded-sm pl-4 w-full" maxlength="128" role="combobox" aria-haspopup="false"
                  aria-autocomplete="both" autocomplete="off" aria-expanded="false" control-id="ControlID-1">
              <div id="block" class="bg-stone-100 absolute left-0 right-0 mt-1 overflow-hidden rounded-md shadow-md">
                <p class="text-primario p-2">Presione Enter al finalizar</p>
              </div>
            <a href="../user/login.html">
              <img class="h-9" src="../../utils/images/iconoUsuario.svg" alt="Icono de usuario">
            </a>
            <a href="../shop/carrito.html">
              <img class="h-9" src="../../utils/images/iconoCarrito.svg" alt="Icono de carrito">
            </a>
          </div>`;
        } else {
            nav.classList.add('navbar');
            nav.classList.add('navbar-light');
            nav.classList.add('fixed-top');
            nav.classList.add('w-screen');
            nav.classList.add('font-Montserrat');
            nav.classList.add('font-semibold');
            nav.innerHTML = `<div class="container-fluid">
                  <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar"
                    aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="offcanvas offcanvas-start text-bg-light gap-4" tabindex="-1" id="offcanvasDarkNavbar"
                    aria-labelledby="offcanvasDarkNavbarLabel">
                    <div class="offcanvas-header justify-center">
                      <a href="../../index.html">
                        <img class="h-12" src="../../utils/images/reducción_explorecost.png" alt="Logo Explorecost">
                      </a>
                      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                      <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Categorías
                          </a>
                        </li>
                        <ul class="dropdown-menu dropdown-menu-light">
                        <li><a class="dropdown-item" href="../shop/cocina/cocina.html">Cocina</a></li>
                        <li><a class="dropdown-item" href="../shop/frio/frio.html">Frío</a></li>
                        <li><a class="dropdown-item" href="../shop/hosteleria/hosteleria.html">Hostelería</a></li>
                        <li><a class="dropdown-item" href="../shop/mobiliario/mobiliario.html">Mobiliario</a></li>
                        </ul>
                        <form class="d-flex flex justify-center items-center" role="search">
                          <input class="form-control me-2" type="search" placeholder="Buscar artículo..." aria-label="Search">
                          <button class="btn btn-dark bg-secundario" type="submit">Buscar</button>
                        </form>
                        <li class="nav-item">
                          <a class="nav-link" href="../user/login.html">Login</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="../shop/carrito.html">Carrito</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>`;
        }

        buscador();
    }

    // Ejecuta la función al cargar la página y al cambiar el tamaño de la pantalla
    window.onload = window.onresize = checkViewportWidth;
});