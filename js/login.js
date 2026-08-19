document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const correoInput = document.getElementById("correo");
    const passwordInput = document.getElementById("password");
    const mensaje = document.getElementById("mensajeLogin");

    mensaje.textContent = "";

    const correo = correoInput.value.trim();
    const password = passwordInput.value.trim();

    if (correo === "" || password === "") {
        mensaje.textContent = "Por favor ingrese su correo y contraseña.";
        return;
    }

    const formData = new FormData();
    formData.append("correo", correo);
    formData.append("password", password);

    try {
        // Ruta absoluta apuntando al controlador en PHP
        const response = await fetch("/Proyecto/controllers/loginController.php", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            const rol = data.rol.toLowerCase();

            switch (rol) {
                case "administrador":
                    window.location.href = "panel-administrativo.html";
                    break;
                case "beneficiario":
                    window.location.href = "panel-beneficiario.html";
                    break;
                case "donante":
                    window.location.href = "panel-donante.html";
                    break;
                default:
                    mensaje.textContent = "Rol no válido.";
            }
        } else {
            mensaje.textContent = data.message;
        }

    } catch (error) {
        console.error("Error:", error);
        mensaje.textContent = "Error al conectar con la base de datos o el controlador PHP.";
    }
});