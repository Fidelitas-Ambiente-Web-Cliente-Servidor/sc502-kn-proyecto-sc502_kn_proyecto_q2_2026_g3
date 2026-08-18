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

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('donante', 'beneficiario', 'administrador') NOT NULL,
    estado VARCHAR(20) DEFAULT 'Activo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO donaciones (producto, cantidad, fecha_vencimiento, ubicacion, comentario, estado) VALUES
('Pan integral', '15 bolsas', '2026-08-20', 'Supermercado La Esperanza', 'Retirar antes de las 5:00 p.m.', 'Disponible'),
('Frijoles', '30 kg', '2026-09-01', 'Supermercado La Esperanza', 'Producto empacado y listo para retirar.', 'Pendiente'),
('Verduras mixtas', '12 cajas', '2026-08-15', 'Supermercado La Esperanza', 'Mantener refrigerado.', 'Asignada');

INSERT INTO mensajes_ayuda (nombre, correo, telefono, motivo, mensaje) VALUES
('Marcela Alfaro', 'm.alfaro@foodlink.com', '8888-8888', 'Consulta general', 'Deseo coordinar una donación para esta semana.');

INSERT INTO usuarios (nombre, correo, password, rol) VALUES
('Donante Prueba', 'donante@foodlink.com', '1234', 'donante'),
('Beneficiario Prueba', 'beneficiario@foodlink.com', '1234', 'beneficiario'),
('Administrador Prueba', 'admin@foodlink.com', '1234', 'administrador');
