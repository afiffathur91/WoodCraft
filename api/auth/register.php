<?php
// Tambahkan header CORS
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}

header('Content-Type: application/json');
require_once '../../database/config.php';

// Terima data dari form register
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Validasi input
        if (empty($data['username']) || empty($data['password']) || empty($data['email']) || empty($data['full_name'])) {
            throw new Exception('Semua field harus diisi');
        }

        // Cek apakah username sudah ada
        $stmt = $pdo->prepare('SELECT id FROM users WHERE username = ?');
        $stmt->execute([$data['username']]);
        if ($stmt->fetch()) {
            throw new Exception('Username sudah digunakan');
        }

        // Cek apakah email sudah ada
        $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
        $stmt->execute([$data['email']]);
        if ($stmt->fetch()) {
            throw new Exception('Email sudah digunakan');
        }

        // Hash password
        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

        // Insert user baru
        $stmt = $pdo->prepare('INSERT INTO users (username, password, email, full_name) VALUES (?, ?, ?, ?)');
        $stmt->execute([
            $data['username'],
            $hashedPassword,
            $data['email'],
            $data['full_name']
        ]);

        echo json_encode([
            'success' => true,
            'message' => 'Registrasi berhasil'
        ]);

    } catch (Exception $e) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => $e->getMessage()
        ]);
    }
} 