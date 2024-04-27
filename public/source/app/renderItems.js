async function checkViewportWidth(){
const windowWidth = window.innerWidth
const render = document.getElementById("render")
const items = await fetch("../../../resources/ods.json") //basedatos
const productos = await items.json() //datos manejables
let producto = productos.find((product) => product.nombre === document.title)

if(windowWidth > 768){
render.innerHTML = `<section class="h-full flex flex-col justify-start items-center py-24 gap-4">
    <div class="flex flex-row gap-4 p-4 items-start justify-around">
        <div class="flex flex-col gap-4 items-start w-3/6">
            <h1 class="font-Montserrat text-primario text-info text-start">${producto.nombre}</h1>
            <p
                class="font-Montserrat text-primario text-3vh text-center">
                Codigo: ${producto.codigo}</p>
            <p class="font-Montserrat text-primario text-center text-info">
                Precio: ${producto.precioFinal}€</p>
            <div class="flex justify-start w-full">
                <button id="agregarCarrito" data-producto-id="${producto.id}" type="button"
                    class="bg-terciario text-white itemCard w-4/6 hover:w-5/6 h-10 hover:h-12">Agregar al
                    Carrito</button>
            </div>
            <ul class="list-disc flex flex-col items-start font-Montserrat text-primario text-3vh w-full pl-10">
                <li>Iva incluido</li>
                <li>Porte gratis</li>
                <li>Producto nuevo</li>
                <li>Garantía de un año en piezas</li>
            </ul>
        </div>
        <img src="https://img.freepik.com/vector-gratis/esquema-color-rayo_78370-517.jpg"
            alt="Imagen del producto ESTANTERIA DE PARED DE ACERO INOXIDABLE DE 800 x 300 mm" class="w-2/6">
    </div>
        <p class="font-Montserrat text-3vh text-primario px-10">Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Sed, doloremque dolore dicta hic molestias iusto sunt quibusdam
            labore sapiente nemo architecto recusandae magnam unde earum nam ad aliquam voluptate velit deserunt cumque
            suscipit eveniet incidunt amet! Repellat, reiciendis id labore error corporis aut ipsum vero? Natus suscipit
            illum, corporis possimus modi ad optio nam assumenda minima. Accusamus pariatur non, ipsa totam deserunt
            facere
            explicabo distinctio tenetur molestias quae, rem, laborum possimus sunt recusandae minus modi ipsam
            cupiditate
            error esse laudantium quis animi. Dolor, tenetur? Consectetur possimus architecto dicta quidem, ea autem
            tempora
            itaque beatae distinctio nulla, magni nam impedit eum aut commodi reiciendis, voluptates cumque sit. Eaque
            voluptates quibusdam facere quam quidem praesentium commodi amet sunt, itaque explicabo assumenda mollitia
            asperiores doloribus voluptatem molestias ratione quae. Modi dolorem voluptate obcaecati, adipisci in
            expedita
            fuga iste, alias numquam voluptatem nostrum eum officiis vero omnis voluptates ducimus eaque maxime voluptas
            sunt facilis?</p>
</section>`
}if(windowWidth <= 768){ render.innerHTML=`<section class="h-full flex flex-col justify-start items-center py-24 gap-8">
    <div class="flex flex-col items-center justify-center gap-4">
        <h1 class="font-Montserrat text-primario text-3vh font-medium text-center px-4">${producto.nombre}</h1>
        <p class="font-Montserrat text-primario text-subinfo font-normal text-center">Codigo: ${producto.codigo}</p>
        <p class="font-Montserrat text-primario text-3vh font-normal text-center">Precio: ${producto.precioFinal}€</p>
        <div class="flex items-center justify-center w-full">
            <button id="agregarCarrito" data-producto-id="${producto.id}" type="button"
                class="bg-terciario text-white itemCard w-4/6 hover:w-5/6 h-10 hover:h-12">Agregar al Carrito</button>
        </div>
    </div>
    <img src="https://img.freepik.com/vector-gratis/esquema-color-rayo_78370-517.jpg"
        alt="Imagen del producto ESTANTERIA DE PARED DE ACERO INOXIDABLE DE 800 x 300 mm" class="w-3/4 h-auto">
    <div class="flex flex-col gap-4">
        <ul
            class="list-disc flex flex-col items-start font-Montserrat text-primario font-normal text-3vh w-full pl-10">
            <li>Iva incluido</li>
            <li>Porte gratis</li>
            <li>Producto nuevo</li>
            <li>Garantía de un año en piezas</li>
        </ul>
        <p class="font-Montserrat text-primario px-10 text-subinfo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
            doloremque dolore dicta hic molestias iusto sunt quibusdam labore sapiente nemo architecto recusandae magnam
            unde earum nam ad aliquam voluptate velit deserunt cumque suscipit eveniet incidunt amet! Repellat,
            reiciendis id labore error corporis aut ipsum vero? Natus suscipit illum, corporis possimus modi ad optio
            nam assumenda minima. Accusamus pariatur non, ipsa totam deserunt facere explicabo distinctio tenetur
            molestias quae, rem, laborum possimus sunt recusandae minus modi ipsam cupiditate error esse laudantium quis
            animi. Dolor, tenetur? Consectetur possimus architecto dicta quidem, ea autem tempora itaque beatae
            distinctio nulla, magni nam impedit eum aut commodi reiciendis, voluptates cumque sit. Eaque voluptates
            quibusdam facere quam quidem praesentium commodi amet sunt, itaque explicabo assumenda mollitia asperiores
            doloribus voluptatem molestias ratione quae. Modi dolorem voluptate obcaecati, adipisci in expedita fuga
            iste, alias numquam voluptatem nostrum eum officiis vero omnis voluptates ducimus eaque maxime voluptas sunt
            facilis?</p>
    </div>
    </section>`
    }
    }
    // Ejecuta la función al cargar la página y al cambiar el tamaño de la pantalla
    window.onload = window.onresize = checkViewportWidth()