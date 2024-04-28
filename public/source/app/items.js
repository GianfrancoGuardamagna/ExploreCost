document.addEventListener("DOMContentLoaded", async () => {
    //Lógica que maneja el sistema de botones
    const items = await fetch("../../../resources/ods.json") //basedatos
    const productos = await items.json() //datos manejables
    let botones = document.querySelectorAll("#agregarCarrito") //botones

    let carrito = JSON.parse(localStorage.getItem("Carrito")) || [] // Carro de compras

    function actualizarEstadoBotones() {

        botones.forEach(boton => {
            let productoId = parseInt(boton.dataset.productoId) //ID del botón
            let producto = productos.find((item) => item.id === productoId) //busca el producto que le corresponde al id del botón
            let estaEnCarrito = carrito.some((item) => item.id === productoId)

            if (estaEnCarrito) {
                boton.classList.remove("bg-terciario")
                boton.classList.add("bg-secundario")
                boton.textContent = "Quitar del Carrito"
            } if (!estaEnCarrito) {
                boton.classList.remove("bg-secundario")
                boton.classList.add("bg-terciario")
                boton.textContent = "Agregar al Carrito"
            }
        })

    }

    botones.forEach(boton => {

        boton.addEventListener("click", function (event) {
            event.preventDefault()
    
            let productoId = parseInt(boton.dataset.productoId) //ID del botón
            let producto = productos.find((item) => item.id === productoId) //busca el producto que le corresponde al id del botón
            let estaEnCarrito = carrito.some((item) => item.id === productoId)
    
            if (!estaEnCarrito) {
                carrito.push(producto)
            } else if (estaEnCarrito) {
                carrito = carrito.filter((item) => item.id !== productoId)
            }
    
            // Guardar el carrito actualizado en el localStorage
            localStorage.setItem("Carrito", JSON.stringify(carrito))
            actualizarEstadoBotones()
        })    

    })
    
    actualizarEstadoBotones()
})//Cierra función madre
