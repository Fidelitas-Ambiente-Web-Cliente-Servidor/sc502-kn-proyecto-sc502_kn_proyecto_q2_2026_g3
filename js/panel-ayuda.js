const formAyuda = document.getElementById("formAyuda");
const mensajeAyuda = document.getElementById("mensajeAyuda");

formAyuda.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const motivo = document.getElementById("motivo").value;
    const mensaje = document.getElementById("mensaje").value.trim();

    if (nombre === "" || correo === "" || motivo === "" || mensaje === "") {
        mensajeAyuda.textContent = "Debe completar todos los campos requeridos.";
        mensajeAyuda.className = "mensaje-error";
        return;
    }

    mensajeAyuda.textContent = "Mensaje enviado correctamente. El equipo de soporte lo revisará pronto.";
    mensajeAyuda.className = "mensaje-exito";
    formAyuda.reset();
});
