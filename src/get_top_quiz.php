<?php
// Default database credentials for local development
$host = '127.0.0.1';
$db   = 'lebron';
$user = 'root';       // Default XAMPP/MAMP user
$pass = '';           // Blank password by default
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

// PDO options
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    $views = [
        'quizEasy'   => 'top3_quiz_easy',
        'quizMedium' => 'top3_quiz_medium',
        'quizHard'   => 'top3_quiz_hard',
    ];

    $results = [];

    foreach ($views as $level => $viewName) {
        $stmt = $pdo->query("SELECT * FROM `$viewName`");
        $results[$level] = $stmt->fetchAll();
    }

    // Output results as JSON
    header('Content-Type: application/json');
    echo json_encode($results, JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
