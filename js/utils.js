// utils.js

// Lista de archivos solo una vez
const ARCHIVOS_CUENTOS = [
    "data/2025_01_latinoamericana.json",
    "data/2025_02_siglo_de_oro.json",
    "data/2025_03_mundo_antiguo.json",
    "data/2025_04_europa_medieval.json",
    "data/2025_05_premio_nobel.json"
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

