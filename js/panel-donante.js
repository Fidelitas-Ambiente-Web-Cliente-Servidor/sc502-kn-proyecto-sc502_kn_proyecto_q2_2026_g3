const formDonacion = document.getElementById("formDonacion");
const tablaDonaciones = document.getElementById("tablaDonaciones");
const totalDonaciones = document.getElementById("totalDonaciones");
const mensajeDonacion = document.getElementById("mensajeDonacion");

function limpiarTexto(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

function claseEstado(estado) {
    if (estado === "Pendiente") {
        return "text-bg-warning";
    }

    if (estado === "Asignada") {
        return "text-bg-primary";
    }

    return "text-bg-success";
}

function agregarFilaDonacion(donacion) {
    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${limpiarTexto(donacion.producto)}</td>
        <td>${limpiarTexto(donacion.cantidad)}</td>
        <td>
            <span class="badge ${claseEstado(donacion.estado)}">
                ${limpiarTexto(donacion.estado)}
            </span>
        </td>
        <td>
            <button class="btn btn-sm btn-outline-secondary btn-ver" type="button">
                Ver
            </button>
        </td>
    `;

    fila.querySelector(".btn-ver").addEventListener("click", function () {
        document.getElementById("detalleProducto").textContent = donacion.producto;
        document.getElementById("detalleCantidad").textContent = donacion.cantidad;
        document.getElementById("detalleEstado").textContent = donacion.estado;
        document.getElementById("detalleFecha").textContent =
            donacion.fecha_vencimiento || "No especificada";
        document.getElementById("detalleUbicacion").textContent =
            donacion.ubicacion || "No especificada";
        document.getElementById("detalleComentario").textContent =
            donacion.comentario || "Sin comentario";

        const modal = new bootstrap.Modal(
            document.getElementById("modalDonacion")
        );

        modal.show();
    });

    tablaDonaciones.append(fila);
    totalDonaciones.textContent = tablaDonaciones.rows.length;
}

function cargarDonaciones() {
    fetch("listar_donaciones.php")
        .then(response => response.json())
        .then(data => {
            if (!data.ok) {
                return;
            }

            tablaDonaciones.innerHTML = "";

            data.donaciones.forEach(donacion => {
                agregarFilaDonacion(donacion);
            });

            if (data.donaciones.length === 0) {
                tablaDonaciones.innerHTML = `
                    <tr>
                        <td colspan="4" class="text-center text-muted">No hay donaciones registradas.</td>
                    </tr>
                `;
            }

            totalDonaciones.textContent = data.donaciones.length;
        });
}

formDonacion.addEventListener("submit", function (event) {
    event.preventDefault();

    const producto = document.getElementById("producto").value.trim();
    const cantidad = document.getElementById("cantidad").value.trim();
    const fecha = document.getElementById("fecha").value;
    const ubicacion = document.getElementById("ubicacion").value.trim();
    const comentario = document.getElementById("comentario").value.trim();

    if (producto === "" || cantidad === "" || fecha === "" || ubicacion === "") {
        mensajeDonacion.textContent = "Debe completar los campos obligatorios.";
        mensajeDonacion.className = "mensaje-error";
        return;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaVencimiento = new Date(fecha + "T00:00:00");

     if (fechaVencimiento < hoy) {
    mensajeDonacion.textContent = "La fecha de vencimiento no puede ser anterior a hoy.";
    mensajeDonacion.className = "mensaje-error";
    return;
     }

     const cantidadValida = /^\d+(\.\d+)?\s*(kg|g|cajas?|bolsas?|unidades?|paquetes?|litros?|l)?$/i;

    if (!cantidadValida.test(cantidad)) {
    mensajeDonacion.textContent =
        "Ingrese una cantidad válida. Ejemplo: 10 kg, 5 cajas o 20 unidades.";
    mensajeDonacion.className = "mensaje-error";
    return;
    }


    const datos = new FormData();
    datos.append("producto", producto);
    datos.append("cantidad", cantidad);
    datos.append("fecha", fecha);
    datos.append("ubicacion", ubicacion);
    datos.append("comentario", comentario);

    fetch("guardar_donacion.php", {
        method: "POST",
        body: datos,
    })
        .then(response => response.json())
        .then(data => {
            if (!data.ok) {
                mensajeDonacion.textContent = data.mensaje;
                mensajeDonacion.className = "mensaje-error";
                return;
            }

            cargarDonaciones();
            mensajeDonacion.textContent = data.mensaje;
            mensajeDonacion.className = "mensaje-exito";
            formDonacion.reset();
        })
        .catch(() => {
            mensajeDonacion.textContent = "No se pudo conectar con el servidor.";
            mensajeDonacion.className = "mensaje-error";
        });
});

cargarDonaciones();
