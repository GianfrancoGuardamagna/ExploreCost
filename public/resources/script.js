import fs from 'fs';

fs.readFile('./ods.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }

    let datita = JSON.parse(data);

    datita.forEach(item => {

        if(item.seccion === "cocina"){
            console.log(item.nombre)
    }
    })

})
