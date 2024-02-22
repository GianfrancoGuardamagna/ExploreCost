document.addEventListener("DOMContentLoaded", async function () {


    const observador = new IntersectionObserver((entradas) => {
        // La lógica de la función de devolución de llamada del observador va aquí
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                primerCorte = ultimoCorte;
                ultimoCorte = ultimoCorte + 20;
                renderizadoProductos();

                // Obtén el nuevo último elemento y obsérvalo
                const enPantalla = document.querySelectorAll('#productos .producto');
                let nuevoUltimoItem = enPantalla[enPantalla.length - 1];
                observador.observe(nuevoUltimoItem);
                gestionCarrito();
            } else {
            }
        });
    }, {
        rootMargin: '0px 0px 300px 0px',
        threshold: 1.0,
    });


    // Renderizado de objetos
    const sectorItems = document.getElementById('productos');

    const baseDatos = '../../../resources/frio_exposicion_conservacion.json';
    const items = await fetch(baseDatos);
    const data = await items.json();

    let primerCorte = 0;
    let ultimoCorte = 20;

    async function renderizadoProductos() {

        const productosParaCrear = data.slice(primerCorte, ultimoCorte);

        productosParaCrear.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.className = 'col-span-1 flex items-center justify-around flex-col bg-slate-400 m-4 mt-8 p-4 w-72 h-full rounded-md producto';

            // Genera el contenido del producto (ajusta según la estructura de tu HTML)
            productoDiv.innerHTML = `<div class="h-32 w-fit">
            <img src="${producto.imagenes}"
            class="h-32 itemCard hover:h-36" alt="">
            </div>
            <div class="h-1/3 w-full flex items-center justify-evenly flex-col">
            <p class="text-info text-primario text-center">${producto.nombre}</p>
            <p class="text-info text-primario">$${producto.precio}</p>
            </div>
            <div class="flex items-center justify-center w-full">
            <button id="agregarCarrito" data-producto-id="${producto.id}" type="button"
            class="bg-terciario text-white itemCard w-4/6 hover:w-5/6 h-10 hover:h-12">Agregar al Carrito</button>
            </div>`

            // Agrega el producto al contenedor
            sectorItems.appendChild(productoDiv);
        });
    };

    await renderizadoProductos();

    const enPantalla = document.querySelectorAll('#productos .producto');
    let ultimoItem = enPantalla[enPantalla.length - 1];
    observador.observe(ultimoItem);

    gestionCarrito();

});