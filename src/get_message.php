<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$mysqli = new mysqli("localhost", "root", "", "lebron");

if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $mysqli->connect_error]);
    exit;
}

// Fetch messages
$query = "SELECT name, message FROM guestbook_messages ORDER BY id DESC";
$result = $mysqli->query($query);

if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => "Query failed: " . $mysqli->error]);
    $mysqli->close();
    exit;
}

$messages = [];

while ($row = $result->fetch_assoc()) {
    $messages[] = [
        'name' => htmlspecialchars($row['name']),
        'message' => htmlspecialchars($row['message'])
    ];
}

header('Content-Type: application/json');
echo json_encode($messages);

$mysqli->close();
?>
