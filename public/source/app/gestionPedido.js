let carrito = JSON.parse(localStorage.getItem('Carrito')) || []

document.addEventListener('DOMContentLoaded', () => {

    let spanTotal = document.getElementById('costoTotal')

    //Inicializacion del total
    let totalInicial = []
    carrito.forEach(producto => {
        totalInicial.push(producto.precio)
        producto.totalProducto = producto.precio
    })
    totalInicial = totalInicial.reduce((total, numero) => total + numero, 0)
    spanTotal.innerText = totalInicial.toFixed(2)

    //Corrección del total considerando la cantidad
    let inputs = document.getElementsByClassName('cantidad');
    let cantidadActual = Array.from(inputs).map(input => input.value)
    function gestionTotal() {

        for (let i = 0; i < carrito.length; i++) {

            inputs[i].addEventListener('change', () => {

                // Maneja costo y cantidad con los inputs
                let productId = parseInt(inputs[i].dataset.cantidad)
                let product = carrito.filter(item => item.id === productId)
                let productCost = product[0].precio
                let currentProductCost = (productCost * (inputs[i].value))

                carrito[i].totalProducto = currentProductCost

                let precioTotal = carrito.reduce((total, item) => total + item.totalProducto, 0)

                spanTotal.innerText = precioTotal

                cantidadActual[i] = inputs[i].value;
            })
        }

    }
    gestionTotal()
})

export default carrito