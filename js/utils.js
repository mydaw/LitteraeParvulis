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
            ARCHIVOS_CUENTOS.map(url => fetch(url).then(res => res.json()))
        );
        return listas.flat();
    } catch (error) {
        console.error("Error cargando archivos JSON:", error);
        return [];
    }
}
