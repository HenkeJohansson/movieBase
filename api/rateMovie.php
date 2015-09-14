<?php

	include 'includes/connect.inc.php';

	$data = json_decode(file_get_contents('php://input'), true);

	$my_rating = $data['my_rating'];
	$imdb_id = $data['imdb_id'];

	$sql = "UPDATE movies SET my_rating = ? WHERE imdb_id = '$imdb_id'";

	try {
		$statement = $db->prepare($sql);
		$statement->execute([$my_rating]);
	} catch(PDOException $e) {
		echo 'Kunde inte uppdatera filmen';
		echo "Error: $e";
	}