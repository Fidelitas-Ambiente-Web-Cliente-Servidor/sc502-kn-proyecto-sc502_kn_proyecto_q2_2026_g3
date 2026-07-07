document.getElementById("loginForm").addEventListener("submit", function (e) {

    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();
    const rol = document.getElementById("rol").value;
    const mensaje = document.getElementById("mensajeLogin");

    mensaje.textContent = "";

    if (correo === "") {
        mensaje.textContent = "Ingrese su correo electrónico.";
        return;
    }

    if (password === "") {
        mensaje.textContent = "Ingrese su contraseña.";
        return;
    }

    if (rol === "") {
        mensaje.textContent = "Seleccione un tipo de usuario.";
        return;
    }

    switch (rol) {

        case "donante":
            window.location.href = "panel-donante.html";
            break;

        case "beneficiario":
            window.location.href = "panel-beneficiario.html";
            break;

        case "administrador":
            window.location.href = "panel-administrativo.html";
            break;

        default:
            mensaje.textContent = "Rol no válido.";
    }

});