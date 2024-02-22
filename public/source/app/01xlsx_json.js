import XLSX from 'xlsx';
import fs from 'fs';

// 2
// Archivo creado para generar un Json con los productos

// function Producto(nombre, precio, imagenes, codigo) {
//     Producto.counter = (Producto.counter || 2000) + 1;
//     this.id = Producto.counter;
//     this.nombre = nombre;
//     this.precio = precio;
//     this.imagenes = imagenes;
//     this.codigo = codigo;
// }

// function leerExcel(nombreArchivo, callback) {
//     const workbook = XLSX.readFile(nombreArchivo);

//     workbook.SheetNames.forEach(sheetName => {
//         const sheet = workbook.Sheets[sheetName];
//         const data = XLSX.utils.sheet_to_json(sheet, { header: ["nombre", "precio", "imagenes", "codigo"] });
//         const listaDeProductos = data.slice(1).map(item => new Producto(item.nombre, item.precio, item.imagenes, item.codigo));
//         const datosJSON = JSON.stringify(listaDeProductos, null, 2);
//         const nombreArchivoJSON = `cocina_${sheetName}.json`;
//         fs.writeFileSync(nombreArchivoJSON, datosJSON);
//         console.log(`Archivo JSON creado en: ${process.cwd()}/${nombreArchivoJSON}`);
//         if (typeof callback === 'function') {
//             callback(listaDeProductos, sheetName);
//         }
//     });
// }

// leerExcel('public/resources/COCINA.xlsx', (productos, nombreHoja) => {
//     console.log(`Productos de la hoja ${nombreHoja} finalizados`);
// });


//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// El siguiente script es para unir los json creados


//node public\source\app\xlsx_json.js

// Lista de archivos JSON a unir
// const archivosAUnir = [
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/cocina_churros.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/cocina_coccion_auxiliar.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/cocina_cocinas_calientes.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/cocina_freidoras.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/cocina_preparacion_alimentos.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/frio_congelacion_preparacion.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/frio_exposicion_conservacion.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/frio_preparacion_frio.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/hosteleria_cafeteria.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/hosteleria_lavado.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/mobiliario_entorno_trabajo.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/mobiliario_gestion_comercio.json'
// ];

// // Array para almacenar los objetos de los archivos JSON
// let objetosAUnir = [];

// // Leer y parsear cada archivo JSON
// archivosAUnir.forEach(archivo => {
//     const contenido = fs.readFileSync(archivo, 'utf-8');
//     const objetosEnArchivo = JSON.parse(contenido);
//     objetosAUnir = objetosAUnir.concat(objetosEnArchivo);
// });

// // Ordenar los objetos por el número de id
// objetosAUnir.sort((a, b) => a.id - b.id);

// // Convertir el array resultante a formato JSON
// const jsonFinal = JSON.stringify(objetosAUnir, null, 2);

// // Escribir el JSON final en un nuevo archivo
// fs.writeFileSync('articulosJson.json', jsonFinal);

// console.log('Archivos JSON unidos con éxito.');

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// El siguiente Script fué creado para normalizar los nombres y los precios de los productos de cada JSON

const archivosATransformar = [
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/cocina_churros.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/cocina_coccion_auxiliar.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/cocina_cocinas_calientes.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/cocina_freidoras.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/cocina_preparacion_alimentos.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/frio_congelacion_preparacion.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/frio_exposicion_conservacion.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/frio_preparacion_frio.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/hosteleria_cafeteria.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/hosteleria_lavado.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/mobiliario_entorno_trabajo.json',
    // 'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/mobiliario_gestion_comercio.json',
    'C:/Users/Gianfranco/Desktop/ExploreCost/web/public/resources/articulosJson.json'
];

archivosATransformar.forEach(archivoJSON => {
    // Leer y parsear el archivo JSON
    const contenido = fs.readFileSync(archivoJSON, 'utf-8');
    const objetosEnArchivo = JSON.parse(contenido);

    // Aplicar transformaciones a cada objeto en el array
    objetosEnArchivo.forEach(objeto => {
        objeto.nombre = objeto.nombre.charAt(0).toUpperCase() + objeto.nombre.slice(1).toLowerCase();
        // objeto.precio = objeto.precio.toFixed(2);
        objeto.precio = Number(objeto.precio);
    });

    // Convertir el array resultante a formato JSON
    const jsonTransformado = JSON.stringify(objetosEnArchivo, null, 2);

    // Sobrescribir el archivo JSON existente
    fs.writeFileSync(archivoJSON, jsonTransformado);

    console.log(`Archivo JSON transformado y sobrescrito en: ${archivoJSON}`);
});

console.log('Transformaciones completadas en todos los archivos.');