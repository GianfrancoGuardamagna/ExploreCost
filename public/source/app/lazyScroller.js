document.addEventListener("DOMContentLoaded", async function () {
  const observador = new IntersectionObserver(
    (entradas) => {
      // La lógica de la función de devolución de llamada del observador va aquí
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          primerCorte = ultimoCorte;
          ultimoCorte = ultimoCorte + 20
          renderizadoProductos()

          // Obtén el nuevo último elemento y obsérvalo
          const enPantalla = document.querySelectorAll("#productos .producto")
          let nuevoUltimoItem = enPantalla[enPantalla.length - 1]
          observador.observe(nuevoUltimoItem)
          gestionCarrito()
        }
      });
    },
    {
      rootMargin: "0px 0px 300px 0px",
      threshold: 1.0,
    }
  );

  // Renderizado de objetos
  const sectorItems = document.getElementById("productos")

  const baseDatos = "../../../resources/ods.json"
  const items = await fetch(baseDatos)
  const data = await items.json()

  function imagenes(data){
    data.forEach(producto => {
      let imagenes = producto.imagen
      if(Array.isArray(imagenes) && imagenes.length > 1){
        imagenes.forEach(link => {
          fetch(link)
          .then(response => {
            // console.log(response.status)
          })
        })
      }
    })
  }

  imagenes(data)

  let primerCorte = 0
  let ultimoCorte = 20

  async function renderizadoProductos() {
    const productosParaCrear = data.slice(primerCorte, ultimoCorte)

    productosParaCrear.forEach((producto) => {

      function CarreteImagenes(producto) {

        let html = ``

        if (typeof (producto.imagen) === 'object') {

          let cantidadImagenes = ((producto.imagen).length)

          function imagenes(cantidadImagenes,producto){

            let htmlImagen = ``

            for (let i = 1; i < cantidadImagenes; i++) {
              htmlImagen += `<div class="carousel-item">
              <img src="${producto.imagen[i]}" class="d-block w-100 h-32 itemCard" alt="producto ${producto.nombre}">
              </div>`
            }

            return htmlImagen
          }

          html = `<div id="${producto.codigo}" class="carousel slide">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="${producto.imagen[0]}" class="d-block w-100 h-32 itemCard" alt="producto ${producto.nombre}">
            </div>
            ${imagenes(cantidadImagenes,producto)}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#${producto.codigo}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#${producto.codigo}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>`

        } if (typeof (producto.imagen) === 'string') {
          html = `<img src="${producto.imagen}"
          class="h-32 itemCard" alt="imagen del producto ${producto.nombre}">`
        }

        return html
      }

      const productoDiv = document.createElement("div")
      productoDiv.className =
        "col-span-1 flex items-center justify-around flex-col bg-white mt-8 md:p-4 w-42 md:w-full h-full rounded-md producto"
      productoDiv.innerHTML = `<div class="h-32 w-fit">
            <a href="../productos/producto-${producto.id}.html">${CarreteImagenes(producto)}</a>
            </div>
            <div class="h-1/3 w-full flex items-center justify-evenly flex-col">
            <a href="../productos/producto-${producto.id}.html"><p class="md:text-3vh text-xs text-primario text-center">${producto.nombre}</p></a>
            <p class="md:text-info text-subinfo text-primario">$${producto.precioFinal}</p>
            </div>
            <div class="flex justify-center w-full">
            <button id="agregarCarrito" data-producto-id="${producto.id}" type="button"
            class="bg-terciario text-white itemCard w-full m-2 sm:mt-0 md:w-4/6 hover:w-5/6 h-10 hover:h-12">Agregar al Carrito</button>
            </div>`;
      // Agrega el producto al contenedor
      sectorItems.appendChild(productoDiv);
    });
  }

  await renderizadoProductos();

  const enPantalla = document.querySelectorAll("#productos .producto");
  let ultimoItem = enPantalla[enPantalla.length - 1];
  observador.observe(ultimoItem);

  gestionCarrito();

  async function gestionCarrito() {
    let botones = document.querySelectorAll("#agregarCarrito");
    const items = await fetch("../../../resources/ods.json");
    const productos = await items.json();
    let carrito = JSON.parse(localStorage.getItem("Carrito")) || [];

    function actualizarEstadoBotones() {
      botones.forEach((boton) => {
        let productoId = parseInt(boton.dataset.productoId);
        let estaEnCarrito = carrito.some((item) => item.id === productoId);
        if (estaEnCarrito) {
          boton.classList.remove("bg-terciario");
          boton.classList.add("bg-secundario");
          boton.textContent = "Quitar del carrito";
        } else {
          boton.classList.remove("bg-secundario");
          boton.classList.add("bg-terciario");
          boton.textContent = "Agregar al carrito";
        }
      })
    }

    actualizarEstadoBotones();

    botones.forEach((boton) => {
      boton.addEventListener("click", function (event) {
        event.preventDefault();
        const productoId = parseInt(boton.dataset.productoId);
        const producto = productos.find((item) => item.id === productoId);

        // Verificar si el producto ya está en el carrito
        const estaEnCarrito = carrito.some((item) => item.id === productoId);

        if (!estaEnCarrito) {
          carrito.push(producto);
        } else if (estaEnCarrito) {
          carrito = carrito.filter((item) => item.id !== productoId);
        }

        // Guardar el carrito actualizado en el localStorage
        localStorage.setItem("Carrito", JSON.stringify(carrito));

        actualizarEstadoBotones();
      });
    });
  }
});
