// ==========================================
// PRODUCTOS DE CHEZ MARIE
// ==========================================

const productos = [
    // VIANDAS
    {
        id: "vianda-keto",
        nombre: "Hamburguesa Keto",
        categoria: "vianda",
        precio: 8500,
        imagen: "/imagenes/keto_vianda.jpeg"
    },
    {
        id: "vianda-cesar",
        nombre: "Ensalada César",
        categoria: "vianda",
        precio: 9000,
        imagen: "imagenes/lean_vianda.jpeg"
    },
    {
        id: "vianda-zucchini",
        nombre: "Tarta de zucchini",
        categoria: "vianda",
        precio: 7500,
        imagen: "/imagenes/low carb_ vianda.jpeg"
    },
    {
        id: "vianda-boniato",
        nombre: "Boniato con carne picada",
        categoria: "vianda",
        precio: 10000,
        imagen: "imagenes/muscle_vianda.jpeg"
    },

    // SHOTS
    {
        id: "shot-beet-boost",
        nombre: "Beet Boost",
        categoria: "shot",
        precio: 2500,
        imagen: "/imagenes/shot_ Beet boost.jpeg"
    },
    {
        id: "shot-green-reset",
        nombre: "Green Reset",
        categoria: "shot",
        precio: 2500,
        imagen: "imagenes/shot_Green reset.jpeg"
    },
    {
        id: "shot-mint-fresh",
        nombre: "Mint Fresh",
        categoria: "shot",
        precio: 2300,
        imagen: "imagenes/shot_mint fresh.jpeg"
    },
    {
        id: "shot-tropical-fresh",
        nombre: "Tropical Fresh",
        categoria: "shot",
        precio: 2800,
        imagen: "imagenes/shot_tropical fresh.jpeg"
    }
];

// Formatear los precios en pesos argentinos.
function formatearPrecio(precio) {
    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0
    }).format(precio);
}