$(document).ready(function () {

    cargarCuentos().then(data => {
        const url = window.location.pathname;

        // Obtener la fecha de hoy en formato YYYY-MM-DD (local)
        const obtenerFechaHoy = () => {
            const today = new Date();
            return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        };

        // Página principal: mostrar cuento de hoy
        if (url.includes("index")) {
            const hoy = obtenerFechaHoy();
            const cuento = data.find(c => c.fecha === hoy);
            if (cuento) {
                const html = `
                    <div class="cuento-header">
                    <h2>${cuento.titulo}</h2>
                    <div class="info"><strong>${cuento.autor}</strong> – ${cuento.pais}, ${cuento.epoca}</div>
                    </div>
                    <div class="cuento-contenido">${cuento.contenido.replace(/\n/g, '<br>')}</div>`;
                $("#cuento-hoy").html(html);
            } else {
                $("#cuento-hoy").text("No hay cuento para hoy.");
            }
        }

        // Página del calendario
        else if (url.includes("calendario")) {
            const years = [...new Set(data.map(c => new Date(c.fecha).getFullYear()))].sort();

            const $tabs = $("#anio-tabs");
            const $content = $("#cal-tab-contenido");
            const months = [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ];

            const renderCalendarHtml = (year) => {
                let calendarioHtml = "";

                for (let m = 0; m < 12; m++) {
                    calendarioHtml += `<h4 class='mt-4'>${months[m]}</h4><div class='d-flex flex-wrap justify-content-center'>`;
                    let date = new Date(year, m, 1);
                    while (date.getMonth() === m) {
                        const fecha = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                        const cuento = data.find(c => c.fecha === fecha);
                        calendarioHtml += `<div class='cal-dia${cuento ? " con-cuento' title='" + cuento.titulo + " - " + cuento.autor + " [" + cuento.pais + ", " + cuento.epoca + "]' data-fecha='" + fecha + "' style='cursor:pointer" : "' style='cursor:default"}'>${date.getDate()}</div>`;
                        date.setDate(date.getDate() + 1);
                    }
                    calendarioHtml += "</div>";
                }

                return calendarioHtml;
            };

            $tabs.empty();
            $content.empty();

            years.forEach((year, i) => {
                $tabs.append(`
                    <li class="nav-item" role="presentation">
                        <button class="nav-link ${i === 0 ? "active" : ""}" id="tab-${year}" data-bs-toggle="tab" data-bs-target="#year-${year}" type="button" role="tab">
                            ${year}
                        </button>
                    </li>
                `);
                $content.append(`
                    <div class="tab-pane fade ${i === 0 ? "show active" : ""} anio-panel" id="year-${year}" role="tabpanel">
                        ${renderCalendarHtml(year)}
                    </div>
                `);
            });
        }

        // Página del buscador
        else if (url.includes("buscador")) {
            $("#busqueda").on("input", function () {
                const query = $(this).val().toLowerCase();
                $("#resultados").empty();
                data.forEach(c => {
                    if (
                        c.titulo.toLowerCase().includes(query) ||
                        c.autor.toLowerCase().includes(query) ||
                        c.pais.toLowerCase().includes(query) ||
                        c.epoca.toLowerCase().includes(query)
                    ) {
                        $("#resultados").append(`<li class='list-group-item cuento-link' data-fecha="${c.fecha}">
                            <strong>${c.titulo}</strong> por ${c.autor} <em>(${c.pais}, ${c.epoca})</em>
                        </li>`);
                    }
                });
            });
        }

        // Cuento aleatorio
        $(document).on("click", ".btn-aleatorio", function () {
            const random = data[Math.floor(Math.random() * data.length)];
            window.location.href = `cuento.html?fecha=${random.fecha}`;
        });

        // Navegar desde calendario
        $(document).on("click", ".cal-dia.con-cuento", function () {
            const fecha = $(this).data("fecha");
            window.location.href = `cuento.html?fecha=${fecha}`;
        });

        // Navegar desde el buscador
        $(document).on("click", ".cuento-link", function () {
            const fecha = $(this).data("fecha");
            window.location.href = `cuento.html?fecha=${fecha}`;
        });
    });
});
