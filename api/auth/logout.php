<?php
header('Content-Type: application/json');
session_start();

// Hapus semua data session
session_unset();
session_destroy();

echo json_encode([
    'success' => true,
    'message' => 'Logout berhasil'
]); 