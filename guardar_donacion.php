<?php
require_once './config/database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['ok' => false, 'mensaje' => 'Método no permitido.']);
    exit;
}

$producto = trim($_POST['producto'] ?? '');
$cantidad = trim($_POST['cantidad'] ?? '');
$fecha = trim($_POST['fecha'] ?? '');
$ubicacion = trim($_POST['ubicacion'] ?? '');
$comentario = trim($_POST['comentario'] ?? '');

if ($producto === '' || $cantidad === '' || $fecha === '' || $ubicacion === '') {
    echo json_encode(['ok' => false, 'mensaje' => 'Debe completar los campos obligatorios.']);
    exit;
}

try {
    $conexion = Database::conectar();
    $sql = 'INSERT INTO donaciones (producto, cantidad, fecha_vencimiento, ubicacion, comentario, estado)
            VALUES (:producto, :cantidad, :fecha, :ubicacion, :comentario, :estado)';
    $stmt = $conexion->prepare($sql);
    $stmt->execute([
        ':producto' => $producto,
        ':cantidad' => $cantidad,
        ':fecha' => $fecha,
        ':ubicacion' => $ubicacion,
        ':comentario' => $comentario,
        ':estado' => 'Disponible',
    ]);

    echo json_encode(['ok' => true, 'mensaje' => 'Donación guardada correctamente.']);
} catch (PDOException $error) {
    echo json_encode(['ok' => false, 'mensaje' => 'Error al guardar la donación.']);
}
