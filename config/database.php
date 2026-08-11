<?php

class Database
{
    private static string $host = 'localhost';
    private static string $dbname = 'foodlink_db';
    private static string $user = 'root';
    private static string $password = '';

    public static function conectar(): PDO
    {
        $dsn = 'mysql:host=' . self::$host . ';dbname=' . self::$dbname . ';charset=utf8mb4';

        try {
            return new PDO($dsn, self::$user, self::$password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
        } catch (PDOException $error) {
            die('Error de conexión: ' . $error->getMessage());
        }
    }
}
