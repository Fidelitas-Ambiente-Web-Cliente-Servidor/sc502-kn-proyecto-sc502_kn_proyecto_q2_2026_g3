function cambiarTab(viewId, tabId) {
    document.querySelectorAll('.panel-vista').forEach(view => {
        view.classList.add("vista-oculta");
        view.classList.remove("vista-visible");
    });

    document.querySelectorAll('.nav-link-custom').forEach(tab => {
        tab.classList.remove('active');
    });

    document.getElementById(viewId).classList.remove("vista-oculta");
    document.getElementById(viewId).classList.add("vista-visible");

    document.getElementById(tabId).classList.add('active');
}

function botonLogout() {
    if (confirm("¿Está seguro de que desea cerrar su sesión en la plataforma administrativa de FoodLink?")) {
        alert("Sesión finalizada correctamente. Redirigiendo al portal de autenticación pública...");
    }
}

function enviarCrearUsuario(event) {
    event.preventDefault();
    const name = document.getElementById('newUserName').value;
    const email = document.getElementById('newUserEmail').value;
    const role = document.getElementById('newUserRole').value;

    const tableBody = document.getElementById('usersTableBody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td>
        <span class="fw-bold d-block">${name}</span>
        <span class="text-muted small">${email}</span>
    </td>
    <td><span class="badge-custom status-pending">${role}</span></td>
    <td class="text-end">
        <button class="btn btn-outline-secondary btn-sm border-0" disabled><i class="bi bi-pencil"></i></button>
    </td>
    `;
    tableBody.prepend(newRow);
    alert(`Cuenta asignada con éxito a ${name}.`);
    document.getElementById('createUserForm').reset();
}