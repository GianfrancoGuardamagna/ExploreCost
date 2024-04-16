document.addEventListener("DOMContentLoaded",()=>{

    let busqueda = JSON.parse(sessionStorage.getItem('Busqueda'))

    let divItems = document.getElementById('renderItems')

    busqueda.forEach((producto) => {
        const productoDiv = document.createElement("div");
        productoDiv.className = "col-span-1 flex items-center justify-around flex-col bg-slate-400 m-4 mt-8 p-4 w-72 h-full rounded-md producto";
        productoDiv.innerHTML = `<div class="h-32 w-fit">
              <a href="../productos/producto-${producto.id}.html"><img src="${producto.imagen}"
              class="h-32 itemCard hover:h-36" alt="imagen del producto ${producto.nombre}"></a>
              </div>
              <div class="h-1/3 w-full flex items-center justify-evenly flex-col">
              <a href="../productos/producto-${producto.id}.html"><p class="md:text-info text-subinfo text-primario text-center">${producto.nombre}</p></a>
              <p class="md:text-info text-subinfo text-primario">$${producto.precioFinal}</p>
              </div>
              <div class="flex items-center justify-center w-full">
              <button id="agregarCarrito" data-producto-id="${producto.id}" type="button"
              class="bg-terciario text-white itemCard w-4/6 hover:w-5/6 h-10 hover:h-12">Agregar al Carrito</button>
              </div>`;
        // Agrega el producto al contenedor
        divItems.appendChild(productoDiv);
      });
    

})