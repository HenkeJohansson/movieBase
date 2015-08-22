<?php
	
	@include 'includes/connect.inc.php';

	$imdb_id = $_GET['imdb_id'];

	$sql = "SELECT * FROM movies WHERE imdb_id = '$imdb_id'";
	$result = $db->query($sql);

	$movies = array();

	foreach ($result as $row) {
		array_push($movies, $row);
	}

	
	echo json_encode($movies);