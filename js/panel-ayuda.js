const formAyuda = document.getElementById("formAyuda");
const mensajeAyuda = document.getElementById("mensajeAyuda");

formAyuda.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const motivo = document.getElementById("motivo").value;
    const mensaje = document.getElementById("mensaje").value.trim();

    if (nombre === "" || correo === "" || motivo === "" || mensaje === "") {
        mensajeAyuda.textContent = "Debe completar todos los campos requeridos.";
        mensajeAyuda.className = "mensaje-error";
        return;
    }

    const datos = new FormData();
    datos.append("nombre", nombre);
    datos.append("correo", correo);
    datos.append("telefono", telefono);
    datos.append("motivo", motivo);
    datos.append("mensaje", mensaje);

    fetch("guardar_mensaje.php", {
        method: "POST",
        body: datos,
    })
        .then(response => response.json())
        .then(data => {
            mensajeAyuda.textContent = data.mensaje;
            mensajeAyuda.className = data.ok ? "mensaje-exito" : "mensaje-error";

            if (data.ok) {
                formAyuda.reset();
            }
        })
        .catch(() => {
            mensajeAyuda.textContent = "No se pudo conectar con el servidor.";
            mensajeAyuda.className = "mensaje-error";
        });
});
