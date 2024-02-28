// node server.js

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import morgan from 'morgan';

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
const connectionRegister = mysql.createPool({
  host: '178.211.133.37',
  database: process.env.DB_NAME,
  user: process.env.DB_USER_REGISTER,
  password: process.env.DB_PASSWORD_REGISTER
});

const connectionLogin = mysql.createPool({
  host: '178.211.133.37',
  database: process.env.DB_NAME,
  user: process.env.DB_USER_LOGIN,
  password: process.env.DB_PASSWORD_LOGIN
});


// Conexión a login
app.post("/validar", async function (req, res) {

  const capture = req.body;
  console.log(capture);

  let email = capture.email;
  let password = capture.password;

  if (!email) {
    res.json({ success: false, error: 'Sin Correo' });
    return
  } if (!password) {
    res.json({ success: false, error: 'Sin Contraseña' });
    return
  }

  const login = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';

  connectionLogin.query(login, [email, password], (err, results) => {
    if (err) {
      res.json({ success: false, error: 'Error en el servidor' });
      return;
    }

    if (results.length > 0) {
      // El usuario existe, puedes hacer algo aquí, como iniciar sesión
      res.json({ success: true, message: 'Usuario válido' });
    } else {
      // El usuario no existe
      res.json({ success: false, error: 'Usuario no registrado' });
    }
  });
});

  //Conexion a register
  app.post("/registro", async function (req, res) {
    const capture = req.body;

    let email = capture.email;
    let password = capture.password;
    let nombre = capture.nombre;
    let apellido = capture.apellido;
    let rubro = capture.rubro;
    let direccion = capture.direccion;
    let codigoPostal = capture.codigoPostal;
    let telefono = capture.telefono;
    let movil = capture.movil;
    let roi = capture.roi;
    let iva = capture.iva;

    if (!email || !password || !nombre || !apellido || rubro === 'Elija su rubro...' || !direccion || !codigoPostal || !telefono || !movil || !roi || !iva) {
      res.status(400).json({ success: false, message: 'Datos incompletos', status: 400 });
      return;
    }

    const validation = 'SELECT email FROM usuarios WHERE email = ?';

    connectionRegister.query(validation, email, (err, results) => {
      if (err) {
        res.status(500).json({ success: false, message: 'Error en el servidor', status: 500 });
        return;
      } else if (results.length > 0) {
        // Usuario ya existe
        res.status(409).json({ success: false, message: 'El usuario ya está registrado', status: 409 });
        return;
      } else if (results.length === 0) {
        // El email está disponible
        const register = 'INSERT INTO usuarios (email, password, nombre, apellido, rubro, direccion, codigoPostal, telefono, movil, roi, iva) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        connectionRegister.query(register, [email, password, nombre, apellido, rubro, direccion, codigoPostal, telefono, movil, roi, iva], (err) => {
          if (err) {
            console.error('Error al realizar la consulta:', err);
            res.status(500).json({ success: false, message: 'Error interno del servidor al registrar el usuario', status: 500 });
          } else {
            res.status(200).json({ success: true, message: 'Usuario registrado correctamente', status: 200 });
          }
        });
      }
    });
  });

  const PORT = 5500;
  // Configuración de otras rutas si es necesario
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
