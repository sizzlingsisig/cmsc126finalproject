<?php
header('Content-Type: application/json');

$mysqli = new mysqli("localhost", "root", "", "lebron");
if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'DB connection failed: ' . $mysqli->connect_error]);
    exit;
}

// Validate POST input
if (!isset($_POST['polloptionid']) || !is_numeric($_POST['polloptionid'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid or missing polloptionid']);
    exit;
}

$polloptionid = (int)$_POST['polloptionid'];

// Check if a vote row exists for this poll_option_id
$sql_check = "SELECT votes FROM poll_votes WHERE poll_option_id = ?";
$stmt_check = $mysqli->prepare($sql_check);
$stmt_check->bind_param('i', $polloptionid);
$stmt_check->execute();
$result_check = $stmt_check->get_result();

if ($result_check->num_rows > 0) {
    // Exists, increment votes
    $sql_update = "UPDATE poll_votes SET votes = votes + 1 WHERE poll_option_id = ?";
    $stmt_update = $mysqli->prepare($sql_update);
    $stmt_update->bind_param('i', $polloptionid);
    if ($stmt_update->execute()) {
        echo json_encode(['success' => true, 'message' => 'Vote recorded']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update votes: ' . $mysqli->error]);
    }
    $stmt_update->close();
} else {
    // No record, insert new
    $sql_insert = "INSERT INTO poll_votes (poll_option_id, votes) VALUES (?, 1)";
    $stmt_insert = $mysqli->prepare($sql_insert);
    $stmt_insert->bind_param('i', $polloptionid);
    if ($stmt_insert->execute()) {
        echo json_encode(['success' => true, 'message' => 'Vote recorded']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to insert vote: ' . $mysqli->error]);
    }
    $stmt_insert->close();
}

$stmt_check->close();
$mysqli->close();
?>
