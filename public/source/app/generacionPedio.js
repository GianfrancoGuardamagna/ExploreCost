import carrito from './gestionPedido.js'

document.addEventListener("DOMContentLoaded",()=>{

    let botonPagar = document.getElementById("generarPedido")

    botonPagar.addEventListener('click',()=>{

        console.log(carrito)
        carrito.forEach(producto => {
            let cantidad = (producto.totalProducto)/(producto.precio)
            console.log(cantidad)
        })

    })

})