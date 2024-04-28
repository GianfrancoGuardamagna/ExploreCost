document.addEventListener("DOMContentLoaded",()=>{

    let busqueda = JSON.parse(sessionStorage.getItem('Busqueda'))

    if(busqueda === null || busqueda.length === 0){

      let main = document.getElementById('main')
      main.className = "h-screen bg-slate-300 overflow-scroll py-6 flex items-center justify-center"

      main.innerHTML = "<div class='text-primario font-Montserrat text-info flex items-center justify-center'><h2>Lo sentimos pero no encontramos ningun artículo...</h2></div>"

      sessionStorage.clear()
    }else{

    let divItems = document.getElementById('renderItems')

    busqueda.forEach((producto) => {
        const productoDiv = document.createElement("div");
        productoDiv.className = "col-span-1 flex items-center justify-around flex-col bg-slate-400 mt-8 md:p-4 w-42 md:w-full h-full rounded-md producto";
        productoDiv.innerHTML = `<div class="h-32 w-fit">
        <a href="../productos/producto-${producto.id}.html"><img src="${producto.imagen}"
        class="h-32 itemCard" alt="imagen del producto ${producto.nombre}"></a>
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
        divItems.appendChild(productoDiv);
      })
      sessionStorage.clear()
    }

})