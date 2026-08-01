CREATE DATABASE IF NOT EXISTS foodlink_db;

USE foodlink_db;

CREATE TABLE IF NOT EXISTS donaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto VARCHAR(100) NOT NULL,
    cantidad VARCHAR(50) NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    ubicacion VARCHAR(150) NOT NULL,
    comentario TEXT,
    estado VARCHAR(30) DEFAULT 'Disponible',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mensajes_ayuda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(30),
    motivo VARCHAR(80) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
