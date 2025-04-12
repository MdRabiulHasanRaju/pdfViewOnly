<?php
$file = 'Excel Book -Server IT Studio.pdf'; // Your PDF path

header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename="hidden.pdf"');
header('Content-Length: ' . filesize($file));

// Prevent caching
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");

readfile($file);
exit;
?>
