// utils.js

// Lista de archivos solo una vez
const ARCHIVOS_CUENTOS = [
    "data/cuentos.json",
    "data/cuento_01.json"
   
];

// Función reutilizable para cargar todos los cuentos
async function cargarCuentos() {
    try {
        const listas = await Promise.all(
            ARCHIVOS_CUENTOS.map(async (url) => {
                try {
                    const res = await fetch(url);
                    if (!res.ok) {
                        throw new Error(`Error HTTP ${res.status}`);
                    }
                    return await res.json();
                } catch (err) {
                    console.error(`Error cargando el archivo: ${url}`, err);
                    return []; // Devuelve lista vacía si falla
                }
            })
        );
        return listas.flat();
    } catch (error) {
        console.error("Error inesperado al cargar los archivos JSON:", error);
        return [];
    }
}

