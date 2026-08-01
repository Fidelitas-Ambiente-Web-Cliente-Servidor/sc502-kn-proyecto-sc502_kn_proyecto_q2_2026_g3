const formDonacion = document.getElementById("formDonacion");
const tablaDonaciones = document.getElementById("tablaDonaciones");
const totalDonaciones = document.getElementById("totalDonaciones");
const mensajeDonacion = document.getElementById("mensajeDonacion");

formDonacion.addEventListener("submit", function (event) {
    event.preventDefault();

    const producto = document.getElementById("producto").value.trim();
    const cantidad = document.getElementById("cantidad").value.trim();
    const fecha = document.getElementById("fecha").value;
    const ubicacion = document.getElementById("ubicacion").value.trim();

    if (producto === "" || cantidad === "" || fecha === "" || ubicacion === "") {
        mensajeDonacion.textContent = "Debe completar los campos obligatorios.";
        mensajeDonacion.className = "mensaje-error";
        return;
    }

    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${producto}</td>
        <td>${cantidad}</td>
        <td><span class="badge text-bg-success">Disponible</span></td>
        <td><button class="btn btn-sm btn-outline-secondary" type="button">Ver</button></td>
    `;

    tablaDonaciones.prepend(fila);
    totalDonaciones.textContent = tablaDonaciones.rows.length;
    mensajeDonacion.textContent = "Donación registrada correctamente.";
    mensajeDonacion.className = "mensaje-exito";
    formDonacion.reset();
});
