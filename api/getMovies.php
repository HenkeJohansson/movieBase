<?php

	include 'includes/connect.inc.php';

	$sql = "SELECT * FROM movies WHERE watched = 0";
	$result = $db->query($sql);

	$movies = array();

	foreach ($result as $row) {
		array_push($movies, $row);
	}

	
	echo json_encode($movies);
	