<?php

	@include 'includes/connect.inc.php';

	if ( $_SERVER['REQUEST_METHOD'] == 'GET' ) {

		try {
			$statement = $db->prepare("SELECT imdb_id FROM movies");
			$statement->execute();
			$rows = $statement->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode($rows);
		} catch(PDOException $e) {
			echo 'Det gick inte att hämta filmerna';
			echo "Error: $e";
		}

	} else if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
		
		$data = json_decode(file_get_contents('php://input'), true);
		
		$imdb_id = $data['imdb_id'];
		$new_backdrop = $data['updateInfo']['backdrop'];
		$new_poster = $data['updateInfo']['poster'];
		$new_imdb_rating = $data['updateInfo']['imdb_rating'];
		$new_imdb_votes = $data['updateInfo']['imdb_votes'];
		$time_updated = date("Y-m-d H:i:s");
		
		$sql_update = "UPDATE movies SET movieDb_poster = ?, movieDb_backdrop = ?, imdb_rating = ?, imdb_votes = ?, updated = ? WHERE imdb_id = ?";

		try {
			$statement = $db->prepare($sql_update);
			$statement->execute(array($new_poster, $new_backdrop, $new_imdb_rating, $new_imdb_votes, $time_updated, $imdb_id));
		} catch(PDOException $e) {
			echo 'Det gick inte att uppdatera filmen<br>';
			echo "Error $e";
		}

	}