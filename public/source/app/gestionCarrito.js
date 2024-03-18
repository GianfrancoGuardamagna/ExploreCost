// Define una función que encapsula tu código
async function gestionCarrito() {
    const botones = document.querySelectorAll('#agregarCarrito');
    const items = await fetch('../../../resources/articulosJson.json');
    const productos = await items.json();
    let carrito = JSON.parse(localStorage.getItem('Carrito')) || [];

    function actualizarEstadoBotones() {
        botones.forEach(boton => {
            const productoId = parseInt(boton.dataset.productoId);
            const estaEnCarrito = carrito.some(item => item.id === productoId);

            if (estaEnCarrito) {
                boton.classList.remove("bg-terciario");
                boton.classList.add("bg-secundario");
                boton.textContent = 'Quitar del carrito';
            } else {
                boton.classList.remove("bg-secundario");
                boton.classList.add("bg-terciario");
                boton.textContent = 'Agregar al carrito';
            }
        });
    }

    // Al cargar la página, actualizar el estado de los botones
    actualizarEstadoBotones();

    botones.forEach(boton => {
        boton.addEventListener("click", function (event) {
            event.preventDefault();
            const productoId = parseInt(boton.dataset.productoId);
            const producto = productos.find(item => item.id === productoId);

            // Verificar si el producto ya está en el carrito
            const estaEnCarrito = carrito.some(item => item.id === productoId);

            if (!estaEnCarrito) {
                carrito.push(producto);
            } else if (estaEnCarrito) {
                carrito = carrito.filter(item => item.id !== productoId);
            }

            // Guardar el carrito actualizado en el localStorage
            localStorage.setItem('Carrito', JSON.stringify(carrito));

            // Actualizar el estado de los botones después de agregar/quitar un producto
            actualizarEstadoBotones();
        });
    });
}

// Llama a la función cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", gestionCarrito);
