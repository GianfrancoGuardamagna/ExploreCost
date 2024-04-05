// node server.js

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// import mysql from 'mysql2';
import dotenv from 'dotenv';
import morgan from 'morgan';
// import jwt from 'jsonwebtoken';
import { spawn } from 'child_process';

dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
// Configuración de captura de datos
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Configuración para servir archivos estáticos desde la carpeta
app.use(express.static(join(__dirname, 'public')));

// Define a custom format
const customFormat = ':method :url :status :res[content-length] - :response-time';

// Use the custom format
app.use(morgan(customFormat));

//Conexión a MySql
// const connection = mysql.createPool({
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER_REGISTER,
//   password: process.env.DB_PASSWORD_REGISTER
// });

  // Validacion de usuario

  // app.post('/auth', (req,res)=>{

  //   const {email,password} = req.body

  //   const credentials = {email: email,password: password}
  //   const accessToken = generateAccessToken(credentials)
  //   res.status(200).json({
  //     success: true,
  //     token: accessToken,
  //   })
  // })

  // function generateAccessToken(credentials){
  //   return jwt.sign(credentials,process.env.KEY, {expiresIn: '90m'})
  // }

  // function validateToken(req,res,next){
  //   const accessToken = req.headers[accessToken]
  //   jwt.verify(accessToken, process.env.KEY,(err,user)=>{
  //     if(err){
  //       res.send('Acceso denegado, token expirado o incorrecto')
  //     }else{
  //       next()
  //     }
  //   })
  // }

  // app.get('/jsonwebtoken', validateToken,(req,res)=>{
  //   res.json({
  //     usuario: 'Gianfranco',
  //     direccion: 'Avenida Siempre Viva 7332',
  //     key: process.env.KEY
  //   })
  // })

  var objetoPedidoCache

  app.post('/generar-pedido', (req, res) => {
    objetoPedidoCache = req.body;
    res.redirect('/mailing')
  })

  app.get('/mailing',(req,res)=>{
    if (!objetoPedidoCache) {
          res.status(400).send('No hay datos de pedido para enviar.');
          return;
        }
      
        const childProcess = spawn('node', ['./public/source/app/mailing.js', JSON.stringify(objetoPedidoCache)]);
      
        childProcess.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });
      
        childProcess.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
        });
      
        childProcess.on('close', (code) => {
          console.log(`Child process exited with code ${code}`);
          res.redirect('/');
        });
  })

  // app.get('/mailing', (req, res) => {
  //   if (!objetoPedidoCache) {
  //     res.status(400).send('No hay datos de pedido para enviar.');
  //     return;
  //   }
  
  //   const childProcess = spawn('node', ['./public/source/app/mailing.js', JSON.stringify(objetoPedidoCache)]);
  
  //   childProcess.stdout.on('data', (data) => {
  //     console.log(`stdout: ${data}`);
  //   });
  
  //   childProcess.stderr.on('data', (data) => {
  //     console.error(`stderr: ${data}`);
  //   });
  
  //   childProcess.on('close', (code) => {
  //     console.log(`Child process exited with code ${code}`);
  //     res.redirect('/');
  //   });
  // });

  //////////////////////////////////

  const PORT = 5500;
  
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
