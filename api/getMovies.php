<?php

	include 'includes/connect.inc.php';


	$watched = $_GET['watched'];

	$sql = "SELECT * FROM movies WHERE watched = '$watched'";
	$result = $db->query($sql);

	$movies = array();

	foreach ($result as $row) {
		array_push($movies, $row);
	}

	
	echo json_encode($movies);
	