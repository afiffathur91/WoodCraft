<?php
// Pastikan tidak ada output sebelum header
ob_start();

// Tambahkan error reporting untuk debugging
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Start session di awal
session_start();

// Set header CORS - PENTING: Harus dikirim sebelum response apapun
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
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

    // Cek session timeout (30 menit)
    $timeout = 1800;
    if (!isset($_SESSION['user_id']) || !isset($_SESSION['last_activity']) || 
        (time() - $_SESSION['last_activity'] > $timeout)) {
        session_unset();
        session_destroy();
        sendJsonResponse(401, false, 'Sesi Anda telah berakhir. Silakan login kembali.');
    }

    // Update last activity time
    $_SESSION['last_activity'] = time();

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendJsonResponse(405, false, 'Method not allowed');
    }

    // Terima data dari form
    $json = file_get_contents('php://input');
    if (!$json) {
        sendJsonResponse(400, false, 'No data received');
    }

    $data = json_decode($json, true);
    if (!$data) {
        sendJsonResponse(400, false, 'Invalid JSON data');
    }

    // Validasi input
    if (empty($data['full_name']) || empty($data['email'])) {
        sendJsonResponse(400, false, 'Nama lengkap dan email harus diisi');
    }

    // Validasi email
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        sendJsonResponse(400, false, 'Format email tidak valid');
    }

    // Cek apakah email sudah digunakan oleh user lain
    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? AND id != ?');
    $stmt->execute([$data['email'], $_SESSION['user_id']]);
    if ($stmt->fetch()) {
        sendJsonResponse(400, false, 'Email sudah digunakan');
    }

    // Ambil data user saat ini untuk verifikasi password
    $stmt = $pdo->prepare('SELECT * FROM users WHERE id = ?');
    $stmt->execute([$_SESSION['user_id']]);
    $currentUser = $stmt->fetch();
    if (!$currentUser) {
        sendJsonResponse(404, false, 'User tidak ditemukan');
    }

    // Update user data
    $updateData = [];
    $params = [];
    
    // Update nama, email, dan alamat
    if (!empty($data['full_name'])) {
        $updateData[] = "full_name = ?";
        $params[] = $data['full_name'];
    }
    if (!empty($data['email'])) {
        $updateData[] = "email = ?";
        $params[] = $data['email'];
    }
    if (isset($data['address'])) {
        $updateData[] = "address = ?";
        $params[] = $data['address'];
    }

    // Update password jika ada
    if (!empty($data['current_password']) && !empty($data['new_password'])) {
        // Verifikasi password lama
        if (!password_verify($data['current_password'], $currentUser['password'])) {
            sendJsonResponse(400, false, 'Password saat ini tidak sesuai');
        }
        $updateData[] = "password = ?";
        $params[] = password_hash($data['new_password'], PASSWORD_DEFAULT);
    }

    // Tambahkan user_id ke parameter
    $params[] = $_SESSION['user_id'];

    if (!empty($updateData)) {
        $sql = "UPDATE users SET " . implode(', ', $updateData) . " WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        // Ambil data user yang sudah diupdate
        $stmt = $pdo->prepare('SELECT id, username, email, full_name, role, address FROM users WHERE id = ?');
        $stmt->execute([$_SESSION['user_id']]);
        $user = $stmt->fetch();

        if ($user) {
            sendJsonResponse(200, true, 'Profil berhasil diperbarui', $user);
        } else {
            sendJsonResponse(404, false, 'User tidak ditemukan');
        }
    } else {
        sendJsonResponse(400, false, 'Tidak ada data yang diupdate');
    }

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