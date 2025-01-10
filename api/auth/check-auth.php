<?php
// Pastikan tidak ada output sebelum header
ob_start();

// Tambahkan error reporting untuk debugging
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Set session parameters sebelum memulai session
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 0);
ini_set('session.cookie_samesite', 'Lax');
ini_set('session.gc_maxlifetime', 1800); // 30 menit
session_set_cookie_params([
    'lifetime' => 1800,
    'path' => '/',
    'domain' => 'localhost',
    'secure' => false,
    'httponly' => true,
    'samesite' => 'Lax'
]);

// Start session
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
function sendJsonResponse($status, $success, $isLoggedIn, $message = '', $user = null) {
    global $pdo;
    http_response_code($status);
    
    // Pastikan session masih valid sebelum mengirim response
    if ($isLoggedIn && isset($_SESSION['user_id'])) {
        try {
            $stmt = $pdo->prepare('SELECT id, username, email, full_name, role, address FROM users WHERE id = ?');
            $stmt->execute([$_SESSION['user_id']]);
            $user = $stmt->fetch();
            if (!$user) {
                $isLoggedIn = false;
                $message = 'User tidak ditemukan';
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
            $isLoggedIn = false;
            $message = 'Error saat memverifikasi user';
        }
    }

    $response = [
        'success' => $success,
        'isLoggedIn' => $isLoggedIn,
        'message' => $message
    ];
    
    if ($user !== null && $isLoggedIn) {
        $response['user'] = $user;
    }

    ob_end_clean();
    echo json_encode($response);
    exit();
}

try {
    require_once '../../database/config.php';

    // Jika tidak ada session, kembalikan response tidak login
    if (!isset($_SESSION['user_id'])) {
        sendJsonResponse(200, true, false, 'No active session');
        exit();
    }

    // Cek session timeout (30 menit)
    $timeout = 1800; // 30 menit dalam detik
    if (!isset($_SESSION['last_activity']) || (time() - $_SESSION['last_activity'] > $timeout)) {
        session_unset();
        session_destroy();
        sendJsonResponse(200, true, false, 'Session timeout');
        exit();
    }

    // Update last activity time
    $_SESSION['last_activity'] = time();

    // Verifikasi user dari database
    $stmt = $pdo->prepare('SELECT id, username, email, full_name, role, address FROM users WHERE id = ?');
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch();

    if ($user) {
        sendJsonResponse(200, true, true, '', $user);
    } else {
        // User tidak ditemukan di database
        session_unset();
        session_destroy();
        sendJsonResponse(200, true, false, 'User tidak ditemukan');
    }

} catch (PDOException $e) {
    error_log($e->getMessage());
    sendJsonResponse(200, false, false, 'Database error');
} catch (Exception $e) {
    error_log($e->getMessage());
    sendJsonResponse(200, false, false, $e->getMessage());
} catch (Error $e) {
    error_log($e->getMessage());
    sendJsonResponse(200, false, false, 'Server error');
} 