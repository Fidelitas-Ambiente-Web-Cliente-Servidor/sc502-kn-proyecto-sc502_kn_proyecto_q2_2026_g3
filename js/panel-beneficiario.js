function switchView(viewId, tabId) {
    document.querySelectorAll('.beneficiary-view').forEach(view => view.style.display = 'none');
    document.querySelectorAll('.nav-link-custom').forEach(tab => tab.classList.remove('active'));
    
    // Validamos que los elementos existan antes de modificar sus propiedades
    const activeView = document.getElementById(viewId);
    const activeTab = document.getElementById(tabId);
    
    if (activeView) activeView.style.display = 'block';
    if (activeTab) activeTab.classList.add('active');
    
    window.scrollTo(0, 0);
}

function handleLogout() {
    if (confirm("¿Está seguro de que desea cerrar su sesión en la plataforma de FoodLink?")) {
        alert("Sesión finalizada correctamente. Redirigiendo al portal de autenticación pública...");
        // window.location.href = 'login.html'; // Descomenta esto cuando tengas la ruta lista
    }
}

function handleSupportSubmit(event) {
    event.preventDefault(); // Evita que la página se recargue
    alert('Ticket de incidencia registrado con éxito. Nuestro equipo se pondrá en contacto pronto.');
    event.target.reset(); // Limpia los campos del formulario
}