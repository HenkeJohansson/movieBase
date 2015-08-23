<?php

	@include 'includes/connect.inc.php';

	$watched = $_GET['watched'];


	try {
		$statement = $db->prepare("SELECT * FROM movies WHERE watched = ?");
		$statement->execute([$watched]);
		$rows = $statement->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode($rows);
	} catch(PDOException $e) {
		echo 'Det gick inte att hämta filmerna';
		echo "Error: $e";
	}