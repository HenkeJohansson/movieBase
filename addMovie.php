<?php

	include 'includes/connect.inc.php';

	$data = json_decode(file_get_contents('php://input'), true);

	$name = $data['name'];
	$name_original = $data['name_original'];
	$plot = $data['plot'];
	$year = $data['year'];
	$imdb_id = $data['imdb_id'];
	$movieDb_poster = $data['movieDb_poster'];
	$movieDb_backdrop = $data['movieDb_backdrop'];
	$imdb_rating = $data['imdb_rating'];
	$imdb_votes = $data['imdb_votes'];
	$length = $data['length'];
	$genre = $data['genre'];
	$director = $data['director'];
	$writer = $data['writer'];
	$actors = $data['actors'];
	$watched = 0;

	$sql_search = "SELECT imdb_id FROM movies WHERE imdb_id = ?";

	$statement = $db->prepare($sql_search);
	$statement->execute(array($imdb_id));
	$imdb_id_check = $statement->fetchColumn();

	if ($imdb_id_check === false) {

		$sql_insert = "INSERT INTO movies (name, name_original, plot, year, imdb_id, movieDb_poster, movieDb_backdrop, imdb_rating, imdb_votes, length, genre, director, writer, actors, watched) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

		try {
			$statement = $db->prepare($sql_insert);
			$statement->execute(array($name, $name_original, $plot, $year, $imdb_id, $movieDb_poster, $movieDb_backdrop, $imdb_rating, $imdb_votes, $length, $genre, $director, $writer, $actors, $watched));
		} catch(PDOException $e) {
			echo 'Kunde inte lägga till film till databasen<br>';
			echo "Error $e";
		}

	} else {
		http_response_code(409);
		json_encode(array('error' => 'Filmen fanns redan i databasen'));
	}