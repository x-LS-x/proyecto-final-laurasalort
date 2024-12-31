

console.log("ok");

const productos = [
    {
        nombre: "It",
        descripcion: "Derry es un pueblo maldito, donde un ente maligno despierta cada cierto tiempo para alimentarse del miedo de los habitantes, especialmente de los niños. Este ser, conocido como 'It', es capaz de adoptar diferentes formas, adaptándose a los miedos más profundos de cada víctima.",
        imagen: "imagenes/libros/it.png",
        precio: 26292

    },
    {
        nombre: "Carrie",
        descripcion: "Carrie White es una joven tímida y solitaria, objeto de burlas y crueldad por parte de sus compañeros de instituto. Aislada y con una madre fanática religiosa, Carrie vive una vida marcada por la incomprensión y el rechazo. Sin embargo, detrás de esa fachada frágil se esconde un poder oculto que cambiará su vida y la de todos los que la rodean.",
        imagen: "imagenes/libros/carrie.png",
        precio: 24199
        
    },
    {
        nombre: "El Resplandor",
        descripcion: "Jack Torrance, un escritor que busca inspiración, acepta un puesto como cuidador del hotel durante el invierno, junto a su esposa Wendy y su hijo Danny, un niño con habilidades psíquicas. A medida que la familia se adentra en las profundidades del Overlook, se desvelan secretos escalofriantes y fuerzas sobrenaturales que amenazan su cordura y su supervivencia.",
        imagen: "imagenes/libros/elresplandor.png",
        precio: 35512      
    },
    {
        nombre: "Misery",
        descripcion: "Paul Sheldon, sufre un terrible accidente automovilístico y es rescatado por una fanática enfermiza, Annie Wilkes. Aislado en una cabaña remota, Sheldon se encuentra a merced de una mujer obsesionada con sus novelas y dispuesta a hacer cualquier cosa por su autor favorito.",
        imagen: "imagenes/libros/misery.PNG",
        precio: 22244        
    },
    {
        nombre: "Cementerio de Animales",
        descripcion: "Una familia que se muda a una casa cerca de un misterioso cementerio en el bosque. Cuando la familia sufre una tragedia, el padre decide recurrir a las propiedades sobrenaturales del cementerio para traer de vuelta a su ser querido. Sin embargo, las consecuencias de desafiar la naturaleza son terribles y desatan fuerzas oscuras que ponen en peligro a toda la familia.",
        imagen: "imagenes/libros/cementeriodeanimales.png",
        precio: 34999        
    },
    {
        nombre: "Dolores Clairborne",
        descripcion: "Dolores Claiborne es una mujer de edad avanzada acusada del asesinato de su empleadora. A través de un largo interrogatorio, Dolores nos cuenta su historia, una vida marcada por la lucha, el sacrificio y oscuros secretos.",
        imagen: "imagenes/libros/doloresclairborne.png",
        precio: 22989        
    },
    {
        nombre: "Las Cuatro Estaciones I",
        descripcion: "Las cuatro estaciones es una colección de relatos cortos de Stephen King donde cada historia está conectada a una estación del año. Aunque son historias independientes, todas comparten el estilo de King: atmósferas inquietantes y personajes complejos. Algunos de los relatos más famosos son 'Rita Hayworth y la redención de Shawshank' (base de la película 'Cadena Perpetua') y 'El cuerpo' (inspiración para la película 'Cuenta conmigo').",
        imagen: "imagenes/libros/lascuatroestaciones1.png",
        precio: 32851     
    },
    {
        nombre: "La Milla Verde",
        descripcion: " En el bloque E, conviven los condenados a muerte. Paul Edgecomb, el jefe de los guardias, y sus compañeros se encargan de cuidar a estos hombres en sus últimos días.La llegada de John Coffey, un hombre negro de gran tamaño acusado de un crimen atroz, cambiará la vida de todos en el bloque.",
        imagen: "imagenes/libros/lamillaverde.png",
        precio: 25000 
    },
    {
        nombre: "La Zona Muerta",
        descripcion: "Johnny Smith, un joven profesor que, tras un grave accidente, despierta de un largo coma con una habilidad extraordinaria: puede tener visiones del futuro al tocar a alguien. Esta nueva habilidad convierte a Johnny en un hombre marcado, que debe lidiar con las implicaciones de conocer eventos que aún no han sucedido. A medida que utiliza su don, se enfrenta a dilemas morales cada vez más complejos y descubre un complot que amenaza a toda la nación.",
        imagen: "imagenes/libros/lazonamuerta.png",
        precio: 21189            
    }
];


let libros = "";

for (let indice = 0; indice < productos.length; indice++) {
    libros += ` 
                <div class="card-lib">
                    <img src="${productos[indice].imagen}" alt="${productos[indice].nombre}">
                    <h2>${productos[indice].nombre}</h2>                   
                    <p>${productos[indice].descripcion}</p>
                    <div class="precio-y-boton">
                        <h3 class="precio-libro">Precio: $${productos[indice].precio.toLocaleString()}</h3>
                        <button class="agregar-carrito" data-index="${indice}">Agregar al carrito</button>
                    </div>
                </div>`;
}

document.getElementById("contenedorLibros").innerHTML = libros;

const iconosCarrito = document.querySelectorAll(".agregar-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const mensajePagarCarrito = document.getElementById("mensajeCarrito");

let totalAPagar = 0;
let carrito = [];

iconosCarrito.forEach(icono => {
    icono.addEventListener("click", () => {
        const indice = icono.getAttribute('data-index');
        const producto = productos[indice];
        agregarAlCarrito(producto, 1); 
    });
});

function agregarAlCarrito(producto, cantidad) {
    const existe = carrito.find(item => item.producto.nombre === producto.nombre);
    if (existe) {
        existe.cantidad += cantidad;
    } else {
        carrito.push({ producto, cantidad });
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    totalAPagar = 0;

    carrito.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `${item.producto.nombre} - $${item.producto.precio.toLocaleString()} x ${item.cantidad} <button class="eliminar" data-nombre="${item.producto.nombre}">Eliminar</button>`;
        listaCarrito.appendChild(li);
        totalAPagar += item.producto.precio * item.cantidad;
    });

    totalCarrito.innerText = totalAPagar.toLocaleString();

    const botonesEliminar = document.querySelectorAll(".eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const nombre = e.target.dataset.nombre;
            carrito = carrito.filter(item => item.producto.nombre !== nombre);
            actualizarCarrito();
        });
    });
}

document.getElementById("vaciar-carrito").addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
});

// document.getElementById("boton-pagar").addEventListener("click", irAPagar);


document.getElementById("boton-pagar").addEventListener("click", () => {
    if (carrito.length > 0) {
        mensajePagarCarrito.innerText = "";  
        crearMensaje();  
        mostrarMensaje();  
    } else {
        mensajePagarCarrito.innerText = "No has seleccionado ningún producto";
    }
});


function crearMensaje() {
    if (!document.getElementById("miMensaje")) { 
        const mensajeHTML = `
        <div id="miMensaje" class="mensaje">
            <div class="mensaje-contenido">
                <span class="cerrar">&times;</span>
                <img src="./imagenes/mensajecompra.png" alt="Imagen de agradecimiento por la compra" class="imagen-mensaje">
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', mensajeHTML);
    }
}

function mostrarMensaje() {
    const mensaje = document.getElementById("miMensaje");
    const span = document.getElementsByClassName("cerrar")[0];

    mensaje.style.display = "block";

  
    span.onclick = function() {
        mensaje.style.display = "none";
    }

   
    window.onclick = function(event) {
        if (event.target == mensaje) {
            mensaje.style.display = "none";
        }
    }
}

