document.addEventListener("DOMContentLoaded", async function () {
  // //Logica buscador//
  async function buscador() {
    const search = document.getElementById("search");
    const block = document.getElementById("block");

    let items; // Variable para almacenar los items cargados desde el archivo JSON

    let rutaArticulos = "";

    if (
      document.title === "Mi Carrito" ||
      document.title === "Quienes Somos" ||
      document.title === "Avisos legales" ||
      document.title === "Devoluciones" ||
      document.title === "Lavado" ||
      document.title === "Cocina" ||
      document.title === "Frio" ||
      document.title === "Mobiliario" ||
      document.title === "Buscador"
    ) {
      rutaArticulos = "../../resources/ods.json";
    } else if (document.title === "Inicio") {
      rutaArticulos = "./resources/ods.json";
    } else {
      rutaArticulos = "../../resources/ods.json";
    }

    // Cargar y analizar el archivo JSON
    try {
      const response = await fetch(rutaArticulos);
      items = await response.json();
    } catch (error) {
      console.error("Error al cargar el archivo JSON:", error);
    }

    if (block !== null) {
      block.style.display = "none" //Setting inicial del block

      search.addEventListener("input", () => { //Aquí el block se transforma dependiendo del valor de 'search'
        if (search.value === "") {
          block.style.display = "none"
        }
        if (search.value !== "") {
          block.style.display = "block"
        }
      })
    }

    search.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {

        const searchTerm = search.value.toLowerCase()

        const resultados = items.filter((item) =>
          item.nombre.toLowerCase().includes(searchTerm)
        )

        search.value = "";

        sessionStorage.setItem("Busqueda", JSON.stringify(resultados))

        if (document.title === "Buscador" ||
          document.title === "Lavado" ||
          document.title === "Cocina" ||
          document.title === "Frio" ||
          document.title === "Mobiliario" ||
          document.title === "Mi Carrito") {

          window.location.assign("./buscador.html")

        } if (document.title === "Inicio") {

          // window.location.assign("./source/shop/buscador.html")

        } else {

          window.location.assign("../shop/buscador.html")

        }
      }
    });
  }

  // Verifica el ancho de la pantalla y realiza cambios en el nav
  function checkViewportWidth() {
    const nav = document.querySelector("nav");

    const windowWidth = window.innerWidth;

    const title = document.title;
    let rutaIconoLogo = "";
    let rutaIconoCarrito = "";
    let rutaLogo = "";
    let rutaCarrito = "";
    let rutaCocina = "";
    let rutaFrio = "";
    let rutaLavado = "";
    let rutaMobiliario = "";

    if (
      title === "Mi Carrito" ||
      title === "Quienes Somos" ||
      title === "Avisos legales" ||
      title === "Devoluciones" ||
      title === "Lavado" ||
      title === "Cocina" ||
      title === "Frio" ||
      title === "Mobiliario" ||
      title === "Buscador"
    ) {
      rutaIconoLogo = "../../utils/images/logoExplorecost.png";
      rutaIconoCarrito = "../../utils/images/iconoCarrito.svg";
      rutaLogo = "../../index.html";
      rutaCarrito = "../../source/shop/carrito.html";
      rutaCocina = "../../source/shop/cocina.html";
      rutaFrio = "../../source/shop/frio.html";
      rutaLavado = "../../source/shop/lavado.html";
      rutaMobiliario = "../../source/shop/mobiliario.html";
    } else if (title === "Inicio") {
      rutaIconoLogo = "./utils/images/logoExplorecost.png";
      rutaIconoCarrito = "./utils/images/iconoCarrito.svg";
      rutaLogo = "./index.html";
      rutaCarrito = "./source/shop/carrito.html";
      rutaCocina = "./source/shop/cocina.html";
      rutaFrio = "./source/shop/frio.html";
      rutaLavado = "./source/shop/lavado.html";
      rutaMobiliario = "./source/shop/mobiliario.html";
    } else {
      //Este else está tomando a todos los productos.html
      rutaIconoLogo = "../../utils/images/logoExplorecost.png";
      rutaIconoCarrito = "../../utils/images/iconoCarrito.svg";
      rutaLogo = "../../index.html";
      rutaCarrito = "../../source/shop/carrito.html";
      rutaCocina = "../../source/shop/cocina.html";
      rutaFrio = "../../source/shop/frio.html";
      rutaLavado = "../../source/shop/lavado.html";
      rutaMobiliario = "../../source/shop/mobiliario.html";
    }

    if (windowWidth > 768) {
      nav.classList.add("navbar");
      nav.classList.add("bg-stone-200");
      nav.classList.add("flex");
      nav.classList.add("flex-row");
      nav.classList.add("pl-6");
      nav.classList.add("pr-6");
      nav.classList.add("h-16");
      nav.classList.add("top-0");
      nav.classList.add("items-center");
      nav.classList.add("justify-between");
      nav.classList.add("font-Montserrat");
      nav.classList.add("font-semibold");
      nav.classList.add("fixed");
      nav.classList.add("w-full");
      nav.classList.add("z-50");
      nav.innerHTML = `<a href="${rutaLogo}">
            <img class="h-12" src=${rutaIconoLogo} alt="Logo Explorecost">
          </a>
          <div class="flex flex-row items-center justify-end gap-5 w-3/4">
            <div class="dropdown">
              <button class="dropdown-toggle text-primario" type="button" aria-expanded="false">
                Categorías
              </button>
              <ul class="dropdown-menu bg-stone-200">
                <li><a class="dropdown-item" href=${rutaCocina}>Cocina</a></li>
                <li><a class="dropdown-item" href=${rutaFrio}>Frío</a></li>
                <li><a class="dropdown-item" href=${rutaLavado}>Lavado</a></li>
                <li><a class="dropdown-item" href=${rutaMobiliario}>Mobiliario</a></li>
              </ul>
            </div>
            <div class="relative w-3/5">
              <input id="search" type="text" name="q" value="" placeholder="Buscar artículo en el catálogo..."
                  class="input-text rounded-sm pl-4 w-full" maxlength="128" role="combobox" aria-haspopup="false"
                  aria-autocomplete="both" autocomplete="off" aria-expanded="false" control-id="ControlID-1">
              <div id="block" class="bg-stone-100 absolute left-0 right-0 mt-1 overflow-hidden rounded-md shadow-md">
                <p class="text-primario p-2">Presione Enter al finalizar</p>
              </div>
            </div>
            <a href=${rutaCarrito}>
            <img class="h-9" src=${rutaIconoCarrito} alt="Icono de carrito">
            </a>
        </div>`;
    } else if (windowWidth <= 768) {
      nav.classList.add("navbar");
      nav.classList.add("navbar-light");
      nav.classList.add("fixed-top");
      nav.classList.add("w-screen");
      nav.classList.add("font-Montserrat");
      nav.classList.add("font-semibold");
      nav.innerHTML = `<div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar"
              aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-start text-bg-light gap-4" tabindex="-1" id="offcanvasDarkNavbar"
              aria-labelledby="offcanvasDarkNavbarLabel">
              <div class="offcanvas-header justify-center">
                <a href=${rutaLogo}>
                  <img class="h-12" src=${rutaIconoLogo} alt="Logo Explorecost">
                </a>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                  aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <div class="dropdown">
                <button class="dropdown-toggle text-primario" type="button" aria-expanded="false">
                  Categorías
                </button>
                <ul class="dropdown-menu bg-stone-200">
                <li><a class="dropdown-item" href=${rutaCocina}>Cocina</a></li>
                <li><a class="dropdown-item" href=${rutaFrio}>Frío</a></li>
                <li><a class="dropdown-item" href=${rutaLavado}>Lavado</a></li>
                <li><a class="dropdown-item" href=${rutaMobiliario}>Mobiliario</a></li>
                </ul>
              </div>
              <input id="search" type="text" name="q" value="" placeholder="Buscar..."
              class="input-text rounded-sm my-4 w-3/4 nav-item" maxlength="128" role="combobox" aria-haspopup="false"
              aria-autocomplete="both" autocomplete="off" aria-expanded="false" control-id="ControlID-1">
                  <li class="nav-item">
                    <a class="nav-link text-primario" href=${rutaCarrito}>Carrito</a>
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
