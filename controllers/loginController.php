<?php
header('Content-Type: application/json');

require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $correo = $_POST['correo'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($correo) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Complete todos los campos.']);
        exit;
    }

    try {
        $db = Database::conectar();

        $stmt = $db->prepare("
            SELECT u.id, u.nombre, u.contrasena, r.nombre AS rol 
            FROM usuarios u 
            INNER JOIN roles r ON u.rol_id = r.id 
            WHERE u.correo = :correo
        ");
        $stmt->execute([':correo' => $correo]);
        $usuario = $stmt->fetch();

        if ($usuario && $usuario['contrasena'] === $password) {
            echo json_encode([
                'success' => true,
                'rol' => $usuario['rol']
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Correo o contraseña incorrectos.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error de BD: ' . $e->getMessage()]);
    }
}
