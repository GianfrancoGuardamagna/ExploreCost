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
});

let mail = {
    from: process.env.CORREO,
    to: process.env.CORREO,
    subject: "Compra Web",
    text: "Primera prueba Mailer",
    html: "<h5>Primera prueba Node</h5>",
}

transporter.sendMail(mail, (err, info)=>{
    if(err){
        console.log(`error en el envío: ${err}`)
    }else{
        console.log('email enviado, ' + info)
    }
})
