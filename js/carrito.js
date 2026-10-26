// ==========================================
// CONFIGURACIÓN DEL CARRITO
// ==========================================

const CLAVE_CARRITO = "chezMarieCarrito";

let carrito = cargarCarrito();


// ==========================================
// CARGAR Y GUARDAR EL CARRITO
// ==========================================

function cargarCarrito() {
    try {
        const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);

        if (!carritoGuardado) {
            return [];
        }

        const datos = JSON.parse(carritoGuardado);

        if (!Array.isArray(datos)) {
            return [];
        }

        return datos.filter(item => {
            return productos.some(producto => producto.id === item.id)
                && Number.isInteger(item.cantidad)
                && item.cantidad > 0;
        });

    } catch (error) {
        console.error("No se pudo cargar el carrito:", error);
        return [];
    }
}


function guardarCarrito() {
    localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(carrito)
    );
}


// ==========================================
// AGREGAR PRODUCTOS
// ==========================================

function agregarProducto(idProducto) {
    const producto = productos.find(item => item.id === idProducto);

    if (!producto) {
        console.error("No se encontró el producto:", idProducto);
        return;
    }

    const productoEnCarrito = carrito.find(
        item => item.id === idProducto
    );

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            cantidad: 1
        });
    }

    guardarCarrito();

    actualizarContadorCarrito();

    mostrarMensaje(
        `${producto.nombre} se agregó al carrito.`
    );
}


// ==========================================
// ELIMINAR UNA UNIDAD
// ==========================================

function eliminarProducto(idProducto) {
    const productoEnCarrito = carrito.find(
        item => item.id === idProducto
    );

    if (!productoEnCarrito) {
        return;
    }

    if (productoEnCarrito.cantidad > 1) {
        productoEnCarrito.cantidad--;
    } else {
        carrito = carrito.filter(
            item => item.id !== idProducto
        );
    }

    guardarCarrito();

    actualizarContadorCarrito();

    renderizarCarrito();
}


// ==========================================
// QUITAR TODAS LAS UNIDADES DE UN PRODUCTO
// ==========================================

function quitarProducto(idProducto) {
    carrito = carrito.filter(
        item => item.id !== idProducto
    );

    guardarCarrito();

    actualizarContadorCarrito();

    renderizarCarrito();
}


// ==========================================
// CALCULAR EL TOTAL DE UNIDADES
// ==========================================

function obtenerCantidadTotal() {
    return carrito.reduce(
        (total, item) => total + item.cantidad,
        0
    );
}


// ==========================================
// CALCULAR EL IMPORTE TOTAL
// ==========================================

function calcularTotal() {
    return carrito.reduce((total, item) => {
        const producto = productos.find(
            producto => producto.id === item.id
        );

        if (!producto) {
            return total;
        }

        return total + producto.precio * item.cantidad;

    }, 0);
}


// ==========================================
// ACTUALIZAR EL CONTADOR DEL CARRITO
// ==========================================

function actualizarContadorCarrito() {
    const contador = document.getElementById("contador-carrito");

    if (contador) {
        contador.textContent = obtenerCantidadTotal();
    }
}


// ==========================================
// MOSTRAR MENSAJES
// ==========================================

function mostrarMensaje(mensaje) {
    const elemento = document.getElementById("mensaje-carrito");

    if (elemento) {
        elemento.textContent = mensaje;
    }
}


// ==========================================
// MOSTRAR EL CONTENIDO DEL CARRITO
// ==========================================

function renderizarCarrito() {
    const contenedor = document.getElementById("productos-carrito");
    const totalElemento = document.getElementById("total-carrito");
    const mensajeVacio = document.getElementById("carrito-vacio");

    if (!contenedor || !totalElemento) {
        return;
    }

    contenedor.replaceChildren();

    if (carrito.length === 0) {
        if (mensajeVacio) {
            mensajeVacio.hidden = false;
        }

        totalElemento.textContent = formatearPrecio(0);

        actualizarContadorCarrito();

        return;
    }

    if (mensajeVacio) {
        mensajeVacio.hidden = true;
    }

    carrito.forEach(item => {
        const producto = productos.find(
            producto => producto.id === item.id
        );

        if (!producto) {
            return;
        }

        const subtotal = producto.precio * item.cantidad;

        const fila = document.createElement("article");
fila.className = "producto-carrito";

// Imagen del producto
const imagen = document.createElement("img");
imagen.src = producto.imagen;
imagen.alt = producto.nombre;
imagen.className = "imagen-producto-carrito";

// Nombre del producto
const nombre = document.createElement("h3");
nombre.textContent = producto.nombre;

        const cantidad = document.createElement("p");
        cantidad.textContent = `Cantidad: ${item.cantidad}`;

        const precio = document.createElement("p");
        precio.textContent = `Precio unitario: ${formatearPrecio(producto.precio)}`;

        const subtotalElemento = document.createElement("p");
        subtotalElemento.textContent = `Subtotal: ${formatearPrecio(subtotal)}`;

     // Botón para disminuir la cantidad
const botonMenos = document.createElement("button");
botonMenos.type = "button";
botonMenos.textContent = "−";
botonMenos.className = "boton-cantidad";

botonMenos.setAttribute(
    "aria-label",
    `Quitar una unidad de ${producto.nombre}`
);

botonMenos.addEventListener("click", () => {
    eliminarProducto(producto.id);
});


// Botón para aumentar la cantidad
const botonMas = document.createElement("button");
botonMas.type = "button";
botonMas.textContent = "+";
botonMas.className = "boton-cantidad";

botonMas.setAttribute(
    "aria-label",
    `Agregar una unidad de ${producto.nombre}`
);

botonMas.addEventListener("click", () => {
    agregarProducto(producto.id);
    renderizarCarrito();
});


// Botón para quitar el producto completo
const botonQuitar = document.createElement("button");
botonQuitar.type = "button";
botonQuitar.textContent = "Quitar producto";
botonQuitar.className = "boton-quitar";

botonQuitar.addEventListener("click", () => {
    quitarProducto(producto.id);
});


// Contenedor para mantener los tres botones juntos
const controles = document.createElement("div");
controles.className = "controles-producto";

controles.append(
    botonMenos,
    botonMas,
    botonQuitar
);

fila.append(
    imagen,
    nombre,
    cantidad,
    precio,
    subtotalElemento,
    controles
);

        contenedor.appendChild(fila);
    });

    totalElemento.textContent = formatearPrecio(calcularTotal());

    actualizarContadorCarrito();
}


// ==========================================
// INICIALIZACIÓN
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    renderizarCarrito();

    document.querySelectorAll("[data-agregar-carrito]").forEach(boton => {
        boton.addEventListener("click", () => {
            agregarProducto(boton.dataset.agregarCarrito);
        });
    });
});