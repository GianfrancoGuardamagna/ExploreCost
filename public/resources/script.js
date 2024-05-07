import fs from 'fs'

fs.readFile('./ods.json', 'utf-8', (err, data) => {

    let datos = JSON.parse(data)

    fs.readdir('../utils/images/carpeta_de_imagenes', 'utf-8', (err, files) => {

        files.forEach(archivo => {

            datos.forEach(element => {

                if (archivo === element.codigo) {

                    const rutaImages = `../utils/images/carpeta_de_imagenes/${archivo}`

                    fs.readdir(rutaImages, 'utf-8', (err, images) => {

                        let nuevaRuta = `${rutaImages}/${images}`

                        if (images.length > 1) {

                            let arrayImages = []

                            images.forEach(item => {

                                arrayImages.push(`../${rutaImages}/${item}`)

                            })

                            element.imagen = arrayImages

                        } else {

                            element.imagen = nuevaRuta

                        }

                        fs.writeFile('./ods.json', JSON.stringify(datos, null, 2), 'utf-8', (err) => {

                            if (err) {
                    
                                console.error("Error al escribir en el archivo JSON:", err)
                                return
                    
                            }
                    
                        })

                    })

                }

            })

        })

    })

})


