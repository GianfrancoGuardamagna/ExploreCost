import fs from 'fs';

const archivos = [
    'C:/Users/gguar/Desktop/ExploreCost/public/resources/cocina_churros.json',
    'C:/Users/gguar/Desktop/ExploreCost/public/resources/cocina_coccion_auxiliar.json',
    'C:/Users/gguar/Desktop/ExploreCost/public/resources/cocina_cocinas_calientes.json',
    'C:/Users/gguar/Desktop/ExploreCost/public/resources/cocina_freidoras.json',
    'C:/Users/gguar/Desktop/ExploreCost/public/resources/cocina_preparacion_alimentos.json',
    'C:/Users/gguar/Desktop/ExploreCost/public/resources/frio_congelacion_preparacion.json',
    'C:/Users/gguar/Desktop/ExploreCost/public/resources/frio_exposicion_conservacion.json',
    'C:/Users/gguar/Desktop/ExploreCost/public/resources/frio_preparacion_frio.json',
    'C:/Users/gguar/Desktop/ExploreCost/public/resources/hosteleria_cafeteria.json',
    'C:/Users/gguar/Desktop/ExploreCost/public/resources/hosteleria_lavado.json',
    'C:/Users/gguar/Desktop/ExploreCost/public/resources/mobiliario_entorno_trabajo.json',
    'C:/Users/gguar/Desktop/ExploreCost/public/resources/mobiliario_gestion_comercio.json'];

const nombres = [];

archivos.forEach(archivo => {
    const contenido = fs.readFileSync(archivo, 'utf-8');
    const productosEnArchivo = JSON.parse(contenido);

    productosEnArchivo.forEach(productos => {

        if (!nombres.includes(productos.nombre)) {
            const coincidencias = archivos.filter(otroArchivo => {
                if (otroArchivo !== archivo) {
                    const otroContenido = fs.readFileSync(otroArchivo, 'utf-8');
                    const productosEnOtroArchivo = JSON.parse(otroContenido);
                    return productosEnOtroArchivo.some(otroProducto => otroProducto.nombre === productos.nombre);
                }
                return false;
            });

            if (coincidencias.length > 0) {
                nombres.push({
                    nombre: productos.nombre,
                    id: productos.id,
                    archivosCoincidentes: [archivo, ...coincidencias]
                });
            }
        }
    });
});



//console.log(nombres);

let trueCount = 0;
let falseCount = 0;

nombres.forEach(item => {
    const presente = item.archivosCoincidentes.includes('C:/Users/gguar/Desktop/ExploreCost/public/resources/cocina_cocinas_calientes.json');

    if (presente) {
        trueCount++;
    } else {
        falseCount++;
    }
});

console.log(`Total de true: ${trueCount}`);
console.log(`Total de false: ${falseCount}`);

//node public\source\app\puliendoBase.js