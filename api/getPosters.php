<?php

	@include 'includes/connect.inc.php';

	try {
		$statement = $db->prepare("SELECT movieDb_poster FROM movies");
		$statement->execute();
		$rows = $statement->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode($rows);
	} catch(PDOException $e) {
		echo 'Det gick inte att hämta filmerna';
		echo "Error: $e";
	}