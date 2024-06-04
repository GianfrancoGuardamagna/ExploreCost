document.addEventListener("DOMContentLoaded", async function () {
  const observador = new IntersectionObserver(
    (entradas) => {
      // La lógica de la función de devolución de llamada del observador va aquí
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          primerCorte = ultimoCorte;
          ultimoCorte = ultimoCorte + 20
          renderizadoProductos(data)

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
  let sectorItems = document.getElementById("productos")

  const baseDatos = "../../../resources/ods.json"
  const items = await fetch(baseDatos)
  let data = await items.json()

  //Seccion
  if (document.title === "Cocina") {
    data = data.filter(item => item.seccion === "cocina")
  } if (document.title === "Frio") {
    data = data.filter(item => item.seccion === "frio")
  } if (document.title === "Lavado") {
    data = data.filter(item => item.seccion === "lavado")
  } if (document.title === "Mobiliario") {
    data = data.filter(item => item.seccion === "mobiliario")
  }

  let primerCorte = 0
  let ultimoCorte = 20

  async function renderizadoProductos(data) {

    const productosParaCrear = data.slice(primerCorte, ultimoCorte)

    productosParaCrear.forEach((producto) => {

      function CarreteImagenes(producto) {

        let html = ``

        if (typeof (producto.imagen) === 'object') {

          let cantidadImagenes = ((producto.imagen).length)

          function imagenes(cantidadImagenes, producto) {

            let htmlImagen = ``

            for (let i = 1; i < cantidadImagenes; i++) {
              htmlImagen += `<div class="carousel-item">
              <img src="${producto.imagen[i]}" class="d-block w-100 h-32 itemCard" alt="producto ${producto.nombre}">
              </div>`
            }

            return htmlImagen
          }

          html = `<div id="${producto.codigo}" class="carousel carousel-dark slide">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="${producto.imagen[0]}" class="d-block w-100 h-32 itemCard" alt="producto ${producto.nombre}">
            </div>
            ${imagenes(cantidadImagenes, producto)}
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

  await renderizadoProductos(data)

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

    actualizarEstadoBotones()

    botones.forEach((boton) => {
      boton.addEventListener("click", function (event) {
        event.preventDefault()
        const productoId = parseInt(boton.dataset.productoId);
        const producto = productos.find((item) => item.id === productoId)

        // Verificar si el producto ya está en el carrito
        const estaEnCarrito = carrito.some((item) => item.id === productoId)

        if (!estaEnCarrito) {
          carrito.push(producto);
        } else if (estaEnCarrito) {
          carrito = carrito.filter((item) => item.id !== productoId);
        }

        // Guardar el carrito actualizado en el localStorage
        localStorage.setItem("Carrito", JSON.stringify(carrito))

        actualizarEstadoBotones()
      })
    })
  }

  //FILTRO
  const botonFiltrado = document.querySelector('#botonFiltrado')
  const botonLimpiar = document.querySelector('#botonLimpiar')


  async function Filtrado() {

    let familia = document.getElementById('familia').value
    let medidaElement = document.getElementById('medida')
    let medida = medidaElement ? parseInt(medidaElement.value) : NaN
    let datita = []

    //Mobiliario Filtros
    if (document.title === "Mobiliario") {
      if (familia !== "" && !isNaN(medida)) {
        datita = data.filter(item => item.familia === familia && item.medida === medida)
      } else if (familia !== "" && isNaN(medida)) {
        datita = data.filter(item => item.familia === familia)
      } else if (familia === "" && !isNaN(medida)) {
        datita = data.filter(item => item.medida === medida)
      } else if (familia === "" && isNaN(medida)) {
        datita = data
      }
    }

    //Lavado Filtros
    if (document.title === "Lavado") {
      if (familia === "") {
        datita = data
      } else if (familia === "fregaderosCon") {
        datita = data.filter(item => item.familia === "fregaderos" && item.escurridor === true)
      } else if (familia === "fregaderosSin") {
        datita = data.filter(item => item.familia === "fregaderos" && item.escurridor === false)
      } else if (familia === "lavadoras") {
        datita = data.filter(item => item.familia === familia)
      }
    }

    //Cocina Filtros
    if (document.title === "Cocina") {
      let fuegos = parseInt(document.getElementById('fuegos').value)
      let horno = document.getElementById('horno').value
      let litros = parseInt(document.getElementById('litros').value)
      let combustion = document.getElementById('combustion').value
      let calidad = document.getElementById('calidad').value
      let tamaño = parseInt(document.getElementById('tamaño').value)
      let filtroCocinas = document.getElementById("filtroCocinas")
      let filtroFreidoras = document.getElementById("filtroFreidoras")
      let filtroPlanchas = document.getElementById("filtroPlanchas")

      if (familia === "") {
        datita = data
      } if (familia === "cocinas") {
        datita = data.filter(item => item.familia === familia)

        if (!filtroFreidoras.className.startsWith('hidden')) {
          filtroFreidoras.classList.add('hidden')
        }

        if (!filtroPlanchas.className.startsWith('hidden')) {
          filtroPlanchas.classList.add('hidden')
        }

        filtroCocinas.classList.replace('hidden', 'flex')

        if (isNaN(fuegos) && horno === "") {
          datita = datita
        }
        if (!isNaN(fuegos) && horno !== "") {
          if (horno === "true") {
            datita = data.filter(item => item.fuegos === fuegos && item.horno === true)
          } if (horno === "false") {
            datita = data.filter(item => item.fuegos === fuegos && item.horno === false)
          }
        } if (isNaN(fuegos) && horno !== "") {
          if (horno === "true") {
            datita = data.filter(item => item.horno === true)
          } if (horno === "false") {
            datita = data.filter(item => item.horno === false)
          }
        }
        if (!isNaN(fuegos) && horno === "") {
          datita = data.filter(item => item.fuegos === fuegos)
        }
      }

      if (familia === "freidoras") {
        datita = data.filter(item => item.familia === familia)

        if (!filtroCocinas.className.startsWith('hidden')) {
          filtroCocinas.classList.add('hidden')
        }

        if (!filtroPlanchas.className.startsWith('hidden')) {
          filtroPlanchas.classList.add('hidden')
        }

        filtroFreidoras.classList.replace('hidden', 'flex')

        if (isNaN(litros) && combustion === "") {
          datita = datita;
        }
        if (!isNaN(litros) && combustion !== "") {
          datita = datita.filter(item => item.medida === parseInt(litros) && item.combustion === combustion)
        }
        if (isNaN(litros) && combustion !== "") {
          datita = datita.filter(item => item.combustion === combustion);
        }
        if (!isNaN(litros) && combustion === "") {
          datita = datita.filter(item => item.medida === parseInt(litros));
        }
      }

      if (familia === "planchas") {
        datita = data.filter(item => item.familia === familia)

        if (!filtroCocinas.className.startsWith('hidden')) {
          filtroCocinas.classList.add('hidden')
        }

        if (!filtroFreidoras.className.startsWith('hidden')) {
          filtroFreidoras.classList.add('hidden')
        }

        filtroPlanchas.classList.replace('hidden', 'flex')

        if (isNaN(tamaño) && calidad === "") {
          datita = datita
        }
        else if (!isNaN(tamaño) && calidad !== "") {
          datita = datita.filter(item => item.medida === parseInt(tamaño) && item.material === calidad)
        }
        else if (isNaN(tamaño) && calidad !== "") {
          datita = datita.filter(item => item.material === calidad)
        }
        else if (!isNaN(tamaño) && calidad === "") {
          datita = datita.filter(item => item.medida === parseInt(tamaño))
        }
      }
    }

    if (document.title === "Frio") {
      let tipo = document.getElementById('tipo')
      let puertas = document.getElementById('puertas')
      let armariosMedidas = document.getElementById('armariosMedidas')
      let tipoSelect = document.getElementById('tipoSelect')
      let puertasSelect = parseInt(document.getElementById('puertasSelect').value)
      let armariosMedidasSelect = parseInt(document.getElementById('armariosMedidasSelect').value)

      if (familia === "") {
        datita = data
      } else if (familia === 'armarios') {
        datita = data.filter(item => item.familia === familia)
        tipo.classList.replace('hidden', 'flex')
        if (tipoSelect.value === '') {
          datita = data.filter(item => item.familia === familia)
        } else if (tipoSelect.value === 'expositor') {
          datita = data.filter(item => item.familia === familia && item.tipo === "expositor")

          if (armariosMedidas) {
            armariosMedidas.classList.replace('flex', 'hidden')
            armariosMedidasSelect.value = ''
          }
          puertas.classList.replace('hidden', 'flex')

          if (isNaN(puertasSelect)) {
            datita = data.filter(item => item.familia === familia && item.tipo === "expositor")
          } else if (!isNaN(puertasSelect)) {
            datita = data.filter(item => item.familia === familia && item.puertas === puertasSelect)
          }
        } else if (tipoSelect.value === 'conservacion') {
          datita = data.filter(item => item.familia === familia && item.tipo === 'congelacion')

          armariosMedidas.classList.replace('hidden', 'flex')
          if (puertas) {
            puertas.classList.replace('flex', 'hidden')
            puertasSelect.value = ''
          }

          if (isNaN(armariosMedidasSelect)) {
            datita = data.filter(item => item.familia === familia && item.tipo === 'congelacion')
          } else if (!isNaN(armariosMedidasSelect)) {
            datita = data.filter(item => item.familia === familia && item.medida === armariosMedidasSelect)
          }
        }
      } else if (familia !== 'armarios' && familia !== '') {
        datita = data.filter(item => item.familia === familia)
      }
    }

    sectorItems.innerHTML = ''

    await renderizadoProductos(datita)
    await gestionCarrito()
  }

  async function Limpieza() {
    let familia = document.getElementById('familia')
    let medida = document.getElementById('medida')
    let filtroCocinas = document.getElementById("filtroCocinas")
    let filtroFreidoras = document.getElementById("filtroFreidoras")
    let filtroPlanchas = document.getElementById("filtroPlanchas")
    let tipo = document.getElementById('tipo')
    let tipoSelect = document.getElementById('tipoSelect')
    let puertas = document.getElementById('puertas')
    let puertasSelect = document.getElementById('puertasSelect')
    let armariosMedidas = document.getElementById('armariosMedidas')
    let armariosMedidasSelect = document.getElementById('armariosMedidasSelect')


    if (familia) {
      familia.value = ''
    }
    if (medida) {
      medida.value = ''
    }
    if (filtroCocinas) {
      if (!filtroCocinas.className.startsWith('hidden')) {
        filtroCocinas.classList.add('hidden')
      }
      let fuegos = document.getElementById('fuegos')
      let horno = document.getElementById('horno')
      if (fuegos) {
        fuegos.value = ''
      } if (horno) {
        horno.value = ''
      }
    } if (filtroFreidoras) {
      if (!filtroFreidoras.className.startsWith('hidden')) {
        filtroFreidoras.classList.add('hidden')
      }
      let combustion = document.getElementById('combustion')
      let litros = document.getElementById('litros')
      if (fuegos) {
        combustion.value = ''
      } if (horno) {
        litros.value = ''
      }
    } if (filtroPlanchas) {
      if (!filtroPlanchas.className.startsWith('hidden')) {
        filtroPlanchas.classList.add('hidden')
      }
      let calidad = document.getElementById('calidad')
      let tamaño = document.getElementById('tamaño')
      if (calidad) {
        calidad.value = ''
      } if (tamaño) {
        tamaño.value = ''
      }
    } if (tipo) {
      tipo.classList.replace('flex', 'hidden')
      tipoSelect.value = ''
      if (puertas) {
        puertas.classList.replace('flex', 'hidden')
        puertasSelect.value = ''
      } if (armariosMedidas) {
        armariosMedidas.classList.replace('flex', 'hidden')
        armariosMedidasSelect.value = ''
      }
    }

    sectorItems.innerHTML = ''
    primerCorte = 0
    ultimoCorte = 20
    await renderizadoProductos(data)
    await gestionCarrito()

    const enPantalla = document.querySelectorAll("#productos .producto")
    let ultimoItem = enPantalla[enPantalla.length - 1]
    observador.observe(ultimoItem)

  }



  botonFiltrado.addEventListener('click', Filtrado)

  botonLimpiar.addEventListener('click', Limpieza)

  //

})