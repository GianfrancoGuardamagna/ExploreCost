document.addEventListener("DOMContentLoaded", () => {
    // Obtener el carrito del localStorage
    let carrito = JSON.parse(localStorage.getItem('Carrito')) || [];

    // Obtener el contenedor donde se mostrarán las cards
    const carritoContainer = document.getElementById('carrito-container');

    const carritoVacio = document.getElementById('carritoVacio');

    // Función para crear una card para un producto
    function crearCardProducto(producto) {
        const card = document.createElement('div');
        card.classList.add('h-32');
        card.classList.add('w-4/5');
        card.classList.add('bg-slate-400');
        card.classList.add('flex');
        card.classList.add('flex-row');
        card.classList.add('p-4');
        card.classList.add('rounded-md');
        card.classList.add('items-center');
        card.classList.add('gap-4');
        card.classList.add('justify-start');
        card.classList.add(`carritoCard`);
        // Personaliza la card según tus necesidades, por ejemplo:
        card.innerHTML = `
            <div class="h-full w-3/5 flex flex-row gap-4">
                <img src="${producto.imagenes}">
                <div class="flex flex-col font-Montserrat items-start justify-evenly font-bold">
                    <h2>${producto.nombre}</h2>
                    <h2>$<span class='costo' id='costo' data-precio="${producto.precio}">${producto.precio}</span></h2>
                </div>
            </div>
            <div class="flex flex-col items-center justify-center gap-2">
                <label class="font-Montserrat text-primario text-3vh font-semibold" for="cantidad">Cantidad:</label>
                <input type="number" data-cantidad='${producto.id}' class="w-16 text-center border rounded px-2 py-1 cantidad" value="1" min="1">
            </div>
            <button class="bg-terciario text-white font-Montserrat h-12 w-32" data-producto-id="${producto.id}">Eliminar</button>
        `;


        // Agregar evento al botón de eliminar
        const botonEliminar = card.querySelector('button')
        botonEliminar.addEventListener('click', () => {
            carrito = carrito.filter(item => item.id !== producto.id)
            localStorage.setItem('Carrito', JSON.stringify(carrito))
            // Remover la card del DOM
            carritoContainer.removeChild(card)
            carroVacio()
        });

        return card;
    }

    //Renderizado de productos en carro
    let itemsId = []
    function firstRender (){
        carrito.forEach(producto => {
            itemsId.push(producto.id)
            carritoContainer.appendChild(crearCardProducto(producto))
        })
    }
    firstRender()

    const divTotal = document.getElementById(`divTotal`);

    //Modifica el DOM por si no hay productos que mostrar
    function carroVacio() {
        if (carrito.length === 0) {
            carritoVacio.style.display = 'initial';
            divTotal.style.display = `none`;
        } else if (carrito.length > 0) {
            carritoVacio.style.display = 'none';
            divTotal.style.display = `flex`;
        }
    }

    carroVacio();
})
