<?php
	
	@include 'includes/connect.inc.php';

	$imdb_id = $_GET['imdb_id'];


	try {
		$statement = $db->prepare("SELECT * FROM movies WHERE imdb_id = ?");
		$statement->execute([$imdb_id]);
		$row = $statement->fetch(PDO::FETCH_ASSOC);
		echo json_encode($row);
	} catch(PDOException $e) {
		echo 'Det gick inte att hämta informationen';
		echo "Error: $e";
	}