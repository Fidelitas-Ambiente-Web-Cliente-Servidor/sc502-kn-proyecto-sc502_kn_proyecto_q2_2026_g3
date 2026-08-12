<?php
require_once './config/database.php';

$mensajes = [];

try {
    $conexion = Database::conectar();
    $stmt = $conexion->query('SELECT nombre, correo, telefono, motivo, mensaje, fecha_registro
                              FROM mensajes_ayuda
                              ORDER BY id DESC');
    $mensajes = $stmt->fetchAll();
} catch (PDOException $error) {
    $errorConexion = 'No se pudieron cargar los mensajes.';
}
?>
<!DOCTYPE html>
<html lang="es">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FoodLink - Mensajes de Ayuda</title>
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
            rel="stylesheet">
        <link rel="stylesheet" href="./css/panel-ayuda.css">
    </head>

    <body>
        <div class="site-container">
            <nav class="app-navbar">
                <a href="panel-ayuda.html" class="navbar-brand-title">FoodLink</a>
                <div class="d-flex gap-2">
                    <a href="panel-ayuda.html" class="nav-link-page">Contacto y Ayuda</a>
                    <a href="panel-donante.html" class="nav-link-page">Panel Donante</a>
                </div>
            </nav>

            <main class="main-content">
                <section class="content-card faq-card">
                    <div class="section-header">
                        <span>Administración</span>
                        <h2>Mensajes recibidos</h2>
                        <p>Lista básica de solicitudes enviadas desde contacto y ayuda.</p>
                    </div>

                    <?php if (isset($errorConexion)): ?>
                        <p class="mensaje-error"><?= htmlspecialchars($errorConexion) ?></p>
                    <?php elseif (empty($mensajes)): ?>
                        <p class="text-muted">Todavía no hay mensajes registrados.</p>
                    <?php else: ?>
                        <div class="table-responsive">
                            <table class="table align-middle">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Correo</th>
                                        <th>Motivo</th>
                                        <th>Mensaje</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($mensajes as $fila): ?>
                                        <tr>
                                            <td><?= htmlspecialchars($fila['nombre']) ?></td>
                                            <td><?= htmlspecialchars($fila['correo']) ?></td>
                                            <td><?= htmlspecialchars($fila['motivo']) ?></td>
                                            <td><?= htmlspecialchars($fila['mensaje']) ?></td>
                                            <td><?= htmlspecialchars($fila['fecha_registro']) ?></td>
                                        </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    <?php endif; ?>
                </section>
            </main>
        </div>
    </body>

</html>
