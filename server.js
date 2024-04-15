// node server.js

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import morgan from 'morgan';
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

///////////////////////////////////////////////////////////

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
        });
  })

  //////////////////////////////////

  //Conexión a MySql
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

app.post('/db', (req, res) => {

  const {nombre, apellido, email, telefono, rubro, direccion, cPostal, nROI, nIVA} = req.body

  const query = 'INSERT INTO listadoVentas (nombre, apellido, email, telefono, rubro, direccion, codigo_postal, numero_ROI, numero_IVA) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [nombre, apellido, email, telefono, rubro, direccion, cPostal, nROI, nIVA], (error, results, fields) => {
    if (error) {
      console.error('Error al insertar datos:', error);
      res.status(500).send('Error al insertar datos en la base de datos');
      return;
    }
    console.log('Datos insertados correctamente');
    res.status(200).send('Datos insertados correctamente');
  });
});

  //////////////////////////////////

  const PORT = 5500;
  
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
