<?php

	include 'includes/connect.inc.php';

	$data = json_decode(file_get_contents('php://input'), true);

	$imdb_id = $data['imdb_id'];

	$sql = "UPDATE movies SET watched = 1 WHERE imdb_id = ?";

	try {
		$statement = $db->prepare($sql);
		$statement->execute([$imdb_id]);
	} catch(PDOException $e) {
		echo 'Kunde inte uppdatera filmen';
		echo "Error: $e";
	}