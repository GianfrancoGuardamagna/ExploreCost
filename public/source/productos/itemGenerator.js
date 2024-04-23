import fs from "fs";

// Lee el archivo JSON
fs.readFile("./public/resources/ods.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error al leer el archivo JSON:", err);
    return;
  }

  // Parsea el JSON
  const productos = JSON.parse(data);

  // Itera sobre cada producto
  productos.forEach((producto) => {
    const { codigo, nombre, precioFinal, imagen, id, descripcion } = producto;

    // Genera el contenido HTML para la página
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href="../../utils/images/favicon.ico"
          type="image/x-icon"
        />
        <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />
        <link rel="stylesheet" href="../css/styles.css" />
        <link rel="stylesheet" href="../css/ownStyles.css" />
        <title>${nombre}</title>
      </head>
      <body id="body">
        <nav></nav>
        <main class="bg-slate-300">
            <section class="h-full flex flex-col justify-start items-center py-24 gap-4">
                <img src="${imagen}" alt="Imagen del producto ${nombre}" class="w-3/5">
                <h1 class="text-3vh text-center p-4">${nombre}</h1>
                <p>Codigo: ${codigo}</p>
                <p class="text-subinfo">Precio: ${precioFinal}€</p>
                <div class="flex items-center justify-center w-full">
                    <button id="agregarCarrito" data-producto-id="${id}" type="button"
                      class="bg-terciario text-white itemCard w-4/6 hover:w-5/6 h-10 hover:h-12">Agregar al Carrito</button>
                  </div>
                <ul class="list-disc flex flex-col items-center">
                    <li>Iva incluido</li>
                    <li>Porte gratis</li>
                    <li>Producto nuevo</li>
                    <li>Garantía de un año en piezas</li>
                </ul>
                <div id="descripcion">${descripcion}</div>
            </section>
        </main>
        <footer>
          <section class="h-8">
            <div class="flex flex-row w-full bg-stone-200 justify-evenly">
              <div class="m-4 flex flex-col">
                <p>
                  Todos los derechos reservados, <strong>ATIUM HOS S.L.®</strong>
                </p>
                <p>Calle La Orotava, 11 - 29006 Málaga - Málaga</p>
                <p><strong>Telefono: </strong>+34 951 492 842</p>
                <p>
                  <strong>Correo Electrónico: </strong>info@maquinariayhosteleria.es
                </p>
              </div>
              <div class="m-4">
                <ul class="flex flex-col">
                  <li>
                    <a href="../../source/footer/somos.html">
                      <p>¿Quienes Somos?</p>
                    </a>
                  </li>
                  <li>
                    <a href="../../source/footer/legales.html">
                      <p>Avisos Legales</p>
                    </a>
                  </li>
                  <li>
                    <a href="../../source/footer/devoluciones.html">
                      <p>Envíos y Devoluciónes</p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </footer>
        <script src="../app/carrito.js"></script>
        <script src="../app/navbar.js"></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
          crossorigin="anonymous"
        ></script>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
      </body>
    </html>    
    `;

    // Escribe el contenido HTML en un archivo
    fs.writeFile(`producto-${id}.html`, htmlContent, (err) => {
      if (err) {
        console.error(
          `Error al escribir el archivo para el producto ${id}:`,
          err
        );
        return;
      }
      console.log(`Archivo producto-${id}.html generado exitosamente.`);
    });
  });
});
