<?php
// Pastikan tidak ada output sebelum header
ob_start();

// Tambahkan error reporting untuk debugging
error_reporting(E_ALL);
ini_set('display_errors', 0); // Matikan display error agar tidak mengganggu JSON

// Start session di awal
session_start();

// Set cookie parameters untuk session
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 0);
ini_set('session.cookie_samesite', 'Lax');
session_set_cookie_params([
    'lifetime' => 3600,
    'path' => '/',
    'domain' => 'localhost',
    'secure' => false,
    'httponly' => true,
    'samesite' => 'Lax'
]);

// Tambahkan header CORS
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    ob_end_clean();
    exit();
}

// Function untuk mengirim JSON response
function sendJsonResponse($status, $success, $message, $data = null) {
    http_response_code($status);
    $response = [
        'success' => $success,
        'message' => $message
    ];
    if ($data !== null) {
        $response['user'] = $data;
    }
    ob_end_clean();
    echo json_encode($response);
    exit();
}

try {
    require_once '../../database/config.php';

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendJsonResponse(405, false, 'Method not allowed');
    }

    // Terima data dari form login
    $json = file_get_contents('php://input');
    if (!$json) {
        sendJsonResponse(400, false, 'No data received');
    }

    $data = json_decode($json, true);
    if (!$data) {
        sendJsonResponse(400, false, 'Invalid JSON data');
    }

    // Validasi input
    if (empty($data['username']) || empty($data['password'])) {
        sendJsonResponse(400, false, 'Username dan password harus diisi');
    }

    // Cari user berdasarkan username
    $stmt = $pdo->prepare('SELECT * FROM users WHERE username = ?');
    $stmt->execute([$data['username']]);
    $user = $stmt->fetch();

    // Cek apakah user ditemukan dan password cocok
    if (!$user || !password_verify($data['password'], $user['password'])) {
        sendJsonResponse(401, false, 'Username atau password salah');
    }

    // Buat session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['last_activity'] = time();

    // Hapus password dari response
    unset($user['password']);

    // Regenerate session ID untuk keamanan
    session_regenerate_id(true);

    // Kirim response sukses
    sendJsonResponse(200, true, 'Login berhasil', $user);

} catch (PDOException $e) {
    error_log($e->getMessage());
    sendJsonResponse(500, false, 'Database error');
} catch (Exception $e) {
    error_log($e->getMessage());
    sendJsonResponse(400, false, $e->getMessage());
} catch (Error $e) {
    error_log($e->getMessage());
    sendJsonResponse(500, false, 'Server error');
} 