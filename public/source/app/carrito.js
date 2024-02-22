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
                    <h2>$<span id='costo' data-precio="${producto.precio}">${producto.precio}</span></h2>
                </div>
            </div>
            <div class="flex flex-col items-center justify-center gap-2">
                <label class="font-Montserrat text-primario text-3vh font-semibold" for="cantidad">Cantidad:</label>
                <input type="number" class="w-16 text-center border rounded px-2 py-1 cantidad" value="1" min="1">
            </div>
            <button class="bg-terciario text-white font-Montserrat h-12 w-32" data-producto-id="${producto.id}">Eliminar</button>
        `;

        // Agregar evento al botón de eliminar
        const botonEliminar = card.querySelector('button');
        botonEliminar.addEventListener('click', () => {
            carrito = carrito.filter(item => item.id !== producto.id);
            localStorage.setItem('Carrito', JSON.stringify(carrito));
            // Remover la card del DOM
            carritoContainer.removeChild(card);
            mostrarTotales();
            controlCantidad();
            carroVacio();
        });

        return card;
    }

    // Crear y agregar las cards al contenedor
    carrito.forEach(producto => {
        const cardProducto = crearCardProducto(producto);
        carritoContainer.appendChild(cardProducto);
        console.log(producto.precio) //Aca esta capturado el precio
    });

    const divTotal = document.getElementById(`divTotal`);


    function carroVacio() {
        if (carrito.length === 0) {
            carritoVacio.style.display = 'initial';
            divTotal.style.display = `none`;
        } else {
            carritoVacio.style.display = 'none';
            divTotal.style.display = `flex`;
        }
    };

    carroVacio();

    const spanTotal = document.getElementById(`costoTotal`);

    // function mostrarTotales() {

    //     let valores = [];
    //     let total;

    //     let cantidadInput = document.querySelectorAll('#cantidad');

    //     let costoIndividual = document.querySelectorAll('#costo');

    //     costoIndividual.forEach(costo => {
    //         valorTotal = parseFloat(costo.innerText);
    //         //valores.push(valorTotal);
    //         cantidadInput.forEach(cantidad => {

    //             cantidad.addEventListener('input', () => {
    //                 unidades = cantidad.value;
    //                 console.log(unidades,parseFloat(costo.innerText))
    //                 console.log(unidades*valor)
    //             });
    
    //         });
    //     });

    //     total = valores.reduce((acc, val) => acc + val, 0);

    //     spanTotal.innerText = total;

    // };
    function mostrarTotales() {
        const spanTotal = document.getElementById('costoTotal');
        let total = 0;
    
        const cantidadInputs = document.querySelectorAll('.carritoCard .cantidad'); // Cambiado aquí
        const costoSpans = document.querySelectorAll('.carritoCard .costo');
    
        cantidadInputs.forEach((cantidadInput, index) => {
            cantidadInput.addEventListener('input', () => {
                let cantidad = parseFloat(cantidadInput.value);
                let precio = parseFloat(costoSpans[index].innerText);
                total = calcularTotal(index, cantidad, precio);
                console.log('Total actualizado:', total);
                spanTotal.innerText = total;
            });
        });
    
        function calcularTotal(index, cantidad, precio) {
            carrito[index].cantidad = cantidad;
            localStorage.setItem('Carrito', JSON.stringify(carrito));
    
            return carrito.reduce((acc, item) => acc + item.cantidad * item.precio, 0);
        }
    }
    
    mostrarTotales();
    });
