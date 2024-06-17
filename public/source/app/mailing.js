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

const objetoPedido = JSON.parse(process.argv[2])

let mail = {
    from: process.env.CORREO,
    to: [process.env.CORREOTEST,objetoPedido.email],
    subject: "Compra Web",
    text: "Primera prueba Mailer",
    html: `
    <h1>Detalles del pedido:</h1>
    <p>Nombre: ${objetoPedido.nombre}</p>
    <p>Apellido: ${objetoPedido.apellido}</p>
    <p>Email: ${objetoPedido.email}</p>
    <p>Telefono: ${objetoPedido.telefono}</p>
    <p>Rubro: ${objetoPedido.rubro}</p>
    <p>Direccion: ${objetoPedido.direccion}</p>
    <p>Codigo Postal: ${objetoPedido.cPostal}</p>
    <p>Numero de ROI: ${objetoPedido.nROI}</p>
    <p>Numero de IVA: ${objetoPedido.nIVA}</p>
    <ul>
            ${objetoPedido.carrito.map(item => `
                <li>
                    <p>Nombre: ${item.nombre}</p>
                    <p>Precio: ${item.precioFinal}</p>
                    <p>ID: ${item.id}</p>
                    <p>Codigo: ${item.codigo}</p>
                    <p>Imagen: ${item.imagen}</p>
                    <p>Cantidad: ${item.cantidad}</p>
                    <p>Monto total: ${item.totalProducto}</p>
                </li>
            `).join('')}
        </ul>
`,
}

transporter.sendMail(mail, (err, info)=>{
    if(err){
        console.log(`error en el envío: ${err}`)
    }else{
        console.log('email enviado, ' + info)
    }
})
