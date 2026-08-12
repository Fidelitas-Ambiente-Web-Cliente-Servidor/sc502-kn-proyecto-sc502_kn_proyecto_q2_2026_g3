<?php
require_once './config/database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['ok' => false, 'mensaje' => 'Método no permitido.']);
    exit;
}

$nombre = trim($_POST['nombre'] ?? '');
$correo = trim($_POST['correo'] ?? '');
$telefono = trim($_POST['telefono'] ?? '');
$motivo = trim($_POST['motivo'] ?? '');
$mensaje = trim($_POST['mensaje'] ?? '');

if ($nombre === '' || $correo === '' || $motivo === '' || $mensaje === '') {
    echo json_encode(['ok' => false, 'mensaje' => 'Debe completar todos los campos requeridos.']);
    exit;
}

try {
    $conexion = Database::conectar();
    $sql = 'INSERT INTO mensajes_ayuda (nombre, correo, telefono, motivo, mensaje)
            VALUES (:nombre, :correo, :telefono, :motivo, :mensaje)';
    $stmt = $conexion->prepare($sql);
    $stmt->execute([
        ':nombre' => $nombre,
        ':correo' => $correo,
        ':telefono' => $telefono,
        ':motivo' => $motivo,
        ':mensaje' => $mensaje,
    ]);

    echo json_encode(['ok' => true, 'mensaje' => 'Mensaje guardado correctamente.']);
} catch (PDOException $error) {
    echo json_encode(['ok' => false, 'mensaje' => 'Error al guardar el mensaje.']);
}
