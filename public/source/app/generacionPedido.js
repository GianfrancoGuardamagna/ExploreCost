import carrito from "./gestionPedido.js";

let objetoPedido = {}

document.addEventListener("DOMContentLoaded", () => {
  let botonPagar = document.getElementById("generarPedido");

  botonPagar.addEventListener("click", () => {
    let nombre = "";
    let apellido = "";
    let email = "";
    let telefono = "";
    let rubro = "";
    let direccion = "";
    let cPostal = "";
    let nROI = "";
    let nIVA = "";
    const { value: formValues } = Swal.fire({
      title: "Complete los datos del pedido",
      html: `
              <label>Nombre</label>
              <input id="swal-input1" class="swal2-input">
              <label>Apellido</label>
              <input id="swal-input2" class="swal2-input">
              <label>Email</label>
              <input id="swal-input3" class="swal2-input">
              <label>Telefono</label>
              <input id="swal-input4" class="swal2-input">
              <label>Rubro</label>
              <select id="swal-input5" class="swal2-select">
              <option class="swal2-option">Elija su rubro...</option>
              <option>Cocina Móvil</option>
              <option>Comedores Industriales</option>
              <option>Hotel</option>
              <option>Catering</option>
              <option>Supermercado</option>
              <option>Bar</option>
              <option>Carnicería</option>
              <option>Pollo Frito</option>
              <option>Panaderia</option>
              <option>Restaurante Asiático</option>
              <option>Heladería</option>
              <option>Cafetería</option>
              <option>Restaurante</option>
              <option>Fast Food</option>
              <option>Kebab</option>
              <option>Pizzería</option>
              <option>Otro...</option>
              </select>
              <label>Dirección</label>
              <input id="swal-input6" class="swal2-input">
              <label>C.Postal</label>
              <input id="swal-input7" class="swal2-input">
              <label>Nº ROI</label>
              <input id="swal-input8" class="swal2-input">
              <label>Nº IVA</label>
              <input id="swal-input9" class="swal2-input">
            `,
      focusConfirm: false,
      preConfirm: () => {
        nombre = document.getElementById("swal-input1").value;
        apellido = document.getElementById("swal-input2").value;
        email = document.getElementById("swal-input3").value;
        telefono = document.getElementById("swal-input4").value;
        rubro = document.getElementById("swal-input5").value;
        direccion = document.getElementById("swal-input6").value;
        cPostal = document.getElementById("swal-input7").value;
        nROI = document.getElementById("swal-input8").value;
        nIVA = document.getElementById("swal-input9").value;
      },
    }).then((formValues) => {
      if (formValues) {
        Swal.fire({
          title: "Corrobore sus datos",
          html: `<ul>
          <li><strong>Nombre:</strong> ${nombre}</li>
          <li><strong>Apellido:</strong> ${apellido}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Teléfono:</strong> ${telefono}</li>
          <li><strong>Rubro:</strong> ${rubro}</li>
          <li><strong>Dirección:</strong> ${direccion}</li>
          <li><strong>Código Postal:</strong> ${cPostal}</li>
          <li><strong>Nº ROI:</strong> ${nROI}</li>
          <li><strong>Nº IVA:</strong> ${nIVA}</li>
        </ul>`,
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            for (let item of carrito) {
              item.cantidad = item.totalProducto / item.precioFinal;
            }
            objetoPedido = {
              nombre,
              apellido,
              email,
              telefono,
              rubro,
              direccion,
              cPostal,
              nROI,
              nIVA,
              carrito,
            }
          }
          fetch("/generar-pedido", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(objetoPedido),
          })
          fetch("/db", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(objetoPedido),
          })
            .then(response => response.json())
            .then(data => {
              if(data.id){
                window.location.href = `/index.html?purchaseid=${data.id}`
              }
            })
        })
      }
    })
  })//cierre EventListner boton
})//cierre EventListner DOM
