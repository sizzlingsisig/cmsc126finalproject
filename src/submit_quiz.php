<?php
// Database config - change to your actual DB credentials
$host = "localhost";
$dbname = "lebron";
$username = "root";
$password = "";

// Connect to database
$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Validate and sanitize POST data
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user = trim($_POST["username"]);
    $score = intval($_POST["score"]);
    $quizLevel = $_POST["quiz_level"];

    // Basic validation
    if (empty($user) || !in_array($quizLevel, ["quizEasy", "quizMedium", "quizHard"])) {
        echo "Invalid input.";
        exit;
    }

    // Prepare and bind statement to avoid SQL injection
    $stmt = $conn->prepare("INSERT INTO quiz_submissions (username, score, quiz_level) VALUES (?, ?, ?)");
    $stmt->bind_param("sis", $user, $score, $quizLevel);

    if ($stmt->execute()) {
        echo "Quiz submission saved successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Invalid request method.";
}

$conn->close();
?>
