document.addEventListener("DOMContentLoaded", function () {

  // Verifica si hay un parámetro de éxito en la URL
  const urlParams = new URLSearchParams(window.location.search);
  const registroExitoso = urlParams.get('registroExitoso');

  if (registroExitoso === 'true') {
    // Muestra el toast indicando que el registro fue exitoso
    Toastify({
      text: "Usuario registrado con éxito",
      duration: 2000,
      close: true,
      gravity: "bottom",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #29235C, #1D71B8)",
      },
    }).showToast();
  }


  const botonIngresar = document.getElementById("botonIngresar");

  botonIngresar.addEventListener("click", function (event) {
    event.preventDefault();
    enviarDatos();
  });

  // Función para enviar datos al servidor
  function enviarDatos() {
    // Capturar datos del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validar que los campos no estén vacíos
    if (!email || !password) {
      Toastify({
        text: "Por favor complete los campos",
        duration: 2000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #29235C, #1D71B8)",
        },
        // onClick: function(){} // Callback after click
      }).showToast();
      return;
    }

    // Crear objeto con los datos
    const datos = {
      email: email,
      password: password,
    };

    // Realizar la solicitud POST al servidor
    fetch('/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.success) {
          sessionStorage.setItem('userToken', data.token)
          window.location.href = '/'
        } if (data.success === false || data.error === 'Usuario no registrado') {
          Toastify({
            text: "Email o contraseña inválida",
            duration: 2000,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #29235C, #1D71B8)",
            },
            // onClick: function(){} // Callback after click
          }).showToast();
          return;
        }
      })
      .catch(error => {
        console.error('Error en la solicitud:', JSON.parse(error));
        Toastify({
          text: "Error en el servidor, informe a atención al cliente",
          duration: 2000,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #29235C, #1D71B8)",
          },
          // onClick: function(){} // Callback after click
        }).showToast();
      });

  }


  const togglePassword = document.getElementById("togglePassword");
  const password = document.getElementById("password");

  togglePassword.addEventListener('click', () => {
    if (password.type === 'password') {
      password.type = 'text';
      togglePassword.src = '../../utils/images/mostrarContrasenia.svg';
    } else {
      password.type = 'password';
      togglePassword.src = '../../utils/images/noMostrarContrasenia.svg';
    }
  });
});