<?php
require_once './config/database.php';

header('Content-Type: application/json');

try {
    $conexion = Database::conectar();
    $stmt = $conexion->query('SELECT producto, cantidad, estado FROM donaciones ORDER BY id DESC');
    $donaciones = $stmt->fetchAll();

    echo json_encode(['ok' => true, 'donaciones' => $donaciones]);
} catch (PDOException $error) {
    echo json_encode(['ok' => false, 'donaciones' => []]);
}
