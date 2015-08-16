<?php

include 'includes/connect.inc.php';

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$genre = $data['genre'];
$rating = $data['rating'];
$year = $data['year'];

$sql = "INSERT INTO movies (name, genre, rating, year) VALUES (?,?,?,?)";

try {
	$statement = $db->prepare($sql);
	$statement->execute(array($name, $genre, $rating, $year));
} catch(PDOException $e) {
	echo 'Kunde inte lägga till film till databasen';
	echo "Error $e";
}