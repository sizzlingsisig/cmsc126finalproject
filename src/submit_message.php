<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$mysqli = new mysqli("localhost", "root", "", "lebron");

if ($mysqli->connect_error) {
    die("DB connection failed: " . $mysqli->connect_error);
}

$name = $_POST['name'] ?? '';
$message = $_POST['message'] ?? '';

if (!$name || !$message) {
    echo "Missing name or message.";
    exit;
}

$stmt = $mysqli->prepare("INSERT INTO guestbook_messages (name, message) VALUES (?, ?)");
$stmt->bind_param("ss", $name, $message);

if ($stmt->execute()) {
    echo "Success: message saved!";
} else {
    echo "Database insert failed: " . $stmt->error;
}

$stmt->close();
$mysqli->close();
?>
