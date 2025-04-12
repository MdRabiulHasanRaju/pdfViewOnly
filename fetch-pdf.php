<?php
// session_start();

// Only allow logged-in users
// if (!isset($_SESSION['user_logged_in'])) {
//     http_response_code(403);
//     exit('Access denied');
// }

// Whitelist of allowed PDF filenames (for security!)
$allowed_files = [
    'Excel Book -Server IT Studio.pdf',
    'doc2.pdf',
    'manual.pdf',
    'intro.pdf'
];

// Get the filename from query string
$filename = basename($_GET['file'] ?? '');

if (!in_array($filename, $allowed_files)) {
    http_response_code(404);
    exit('File not found or not allowed');
}

$file_path = __DIR__ . "/pdfs/" . $filename;

if (!file_exists($file_path)) {
    http_response_code(404);
    exit('File not found');
}

// Output PDF securely
header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename="' . $filename . '"');
header('Content-Length: ' . filesize($file_path));
readfile($file_path);
exit;
?>



