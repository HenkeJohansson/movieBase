<?php

include 'includes/connect.inc.php';

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$name_original = $data['name_original'];
$plot = $data['plot'];
$year = $data['year'];
$imdb_id = $data['imdb_id'];
$imdb_poster = $data['imdb_poster'];
$imdb_rating = $data['imdb_rating'];
$imdb_votes = $data['imdb_votes'];
$length = $data['length'];
$genre = $data['genre'];
$director = $data['director'];
$writer = $data['writer'];
$actors = $data['actors'];
$watched = 0;

$sql = "INSERT INTO movies (name, name_original, plot, year, imdb_id, imdb_poster, imdb_rating, imdb_votes, length, genre, director, writer, actors, watched) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

try {
	$statement = $db->prepare($sql);
	$statement->execute(array($name, $name_original, $plot, $year, $imdb_id, $imdb_poster, $imdb_rating, $imdb_votes, $length, $genre, $director, $writer, $actors, $watched));
} catch(PDOException $e) {
	echo 'Kunde inte lägga till film till databasen';
	echo "Error $e";
}