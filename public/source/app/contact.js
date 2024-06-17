import nodemailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.CORREO,
        pass: process.env.APPKEY,
    },
    authMethod: "LOGIN"
})

const objetoContacto = JSON.parse(process.argv[2])

let mail = {
    from: process.env.CORREO,
    to: process.env.CORREO,
    subject: "Contacto Web",
    text: "Formulario Contacto",
    html: `
<h1>Detalles del contacto:</h1>
<p>Nombre: ${objetoContacto.Nombre}</p>
<p>Email: ${objetoContacto.Correo}</p>
<p>Telefono: ${objetoContacto.Telefono}</p>
<p>Comentario: ${objetoContacto.Comentario}</p>
`,
}

transporter.sendMail(mail, (err, info) => {
    if (err) {
        console.log(`error en el envío: ${err}`)
    } else {
        console.log('email enviado, ' + info)
    }
})