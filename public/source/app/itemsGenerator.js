import fs from 'fs';
import {JSDOM} from 'jsdom';

//Este script fué creado para generar los productos en la página correspondiente

//node public\source\app\itemsGenerator.js

// Lee el HTML existente
const htmlExistente = fs.readFileSync('public/source/shop/mobiliario/mobiliarioCompleto.html', 'utf-8');

// Lee el archivo JSON
const datosJSON = fs.readFileSync('public/resources/mobiliario_entorno_trabajo.json', 'utf-8');
const listaDeProductos = JSON.parse(datosJSON);

// Crea un objeto DOM desde el HTML existente
const dom = new JSDOM(htmlExistente);
const document = dom.window.document;

// Encuentra el contenedor donde deseas agregar los productos (ajusta el selector según tu HTML)
const contenedorProductos = document.querySelector('#productos');

// Limita la creación de elementos a los primeros 60 productos
const productosParaCrear = listaDeProductos.slice(0, 20);

// Genera HTML para cada producto y lo agrega al contenedor
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
    contenedorProductos.appendChild(productoDiv);
});

// // Agrega el cuarto elemento siempre igual
// const cuartoElementoDiv = document.createElement('div');
// cuartoElementoDiv.className = 'col-span-1 flex items-center justify-center flex-col bg-slate-400 m-4 mt-8 p-4 w-72 h-full rounded-md';

// // Genera el contenido del cuarto elemento (ajusta según la estructura de tu HTML)
// cuartoElementoDiv.innerHTML = `<div class="h-24 w-fit">
//   <img id="verMas" src="../../../utils/images/simboloMas.png" class="h-24 itemCard hover:h-28"
//     alt="Ver mas">
// </div>
// <div class="h-1/3 w-full flex items-center justify-evenly flex-col">
//   <p class="text-subtitle text-primario text-center">Ver más</p>
// </div>
// </div>`;

// // Agrega el cuarto elemento al contenedor
// contenedorProductos.appendChild(cuartoElementoDiv);

// Guarda el HTML actualizado en el archivo
fs.writeFileSync('public/source/shop/mobiliario/mobiliarioCompleto.html', dom.serialize());

console.log('ListoKalisto');
