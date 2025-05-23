<?php
$mysqli = new mysqli("localhost", "root", "", "lebron");
if ($mysqli->connect_error) {
    http_response_code(500);
    echo "DB connection failed: " . $mysqli->connect_error;
    exit;
}

$sql = "
    SELECT 
        p.id AS poll_id, p.question, 
        po.id AS polloptionid, po.option_text, 
        IFNULL(pv.votes, 0) AS votes
    FROM polls p
    JOIN poll_options po ON p.id = po.poll_id
    LEFT JOIN poll_votes pv ON po.id = pv.poll_option_id
    ORDER BY p.id, po.id
";

$result = $mysqli->query($sql);

if (!$result) {
    http_response_code(500);
    echo "DB query failed: " . $mysqli->error;
    exit;
}

$polls = [];
while ($row = $result->fetch_assoc()) {
    $pid = $row['poll_id'];
    if (!isset($polls[$pid])) {
        $polls[$pid] = [
            "poll_index" => (int)$pid,
            "question" => $row['question'],
            "options" => []
        ];
    }
    $polls[$pid]["options"][] = [
        "id" => (int)$row['polloptionid'],
        "text" => $row['option_text'],
        "votes" => (int)$row['votes']
    ];
}

header('Content-Type: application/json');
echo json_encode(array_values($polls)); // reindex array

$mysqli->close();
?>
