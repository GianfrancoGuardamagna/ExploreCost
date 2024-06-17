document.addEventListener("DOMContentLoaded", () => {

    let boton = document.getElementById('botonContacto')

    boton.addEventListener('click', () => {
        let nombre = document.getElementById('nombre').value
        let correo = document.getElementById('correo').value
        let telefonoInput = document.getElementById('telefono').value
        let telefonoNumber = parseInt(telefonoInput)
        let comentario = document.getElementById('comentario').value

        if (nombre !== '' && correo !== '' && !isNaN(telefonoNumber) && comentario !== '') {

            let objetoContacto = {
                'Nombre': nombre,
                'Correo': correo,
                'Telefono': telefonoNumber,
                'Comentario': comentario
            }

            fetch('/contact', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(objetoContacto),
            })
            .then(response => response.json())
            .then(data => {
                    
                    nombre = ''
                    correo = ''
                    telefonoInput = ''
                    comentario = ''

                    Swal.fire({
                        title: "Mensaje enviado con éxito",
                        html: `<p>Gracias por comunicarse con ExploreCost, un miembro de nuestro equipo se pondrá en contacto a la brevedad...</p>`,
                        showCancelButton: true,
                        })
                    .then(
                        setTimeout(()=>{
                            window.location.href = `/index.html`
                        },2500)
                    )
            })

                

        } else {
            Swal.fire({
                title: "Error en un campo",
                html: `<p>Porfavor complete todos los campos, y tenga presente que los datos deben ser válidos</p>`,
                showCancelButton: true,
                })
        }

    })
})