<?php
	include "pass.inc.php";
	try {
		$db = new PDO($database, $username, $userpass);
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$db->exec('SET NAMES "utf8"');
	} catch(PDOException $e) {
		echo "<br>Det gick <span style='color:red;'>inte</span> att kontakta databasen<br>";
		echo $e;
		exit ();
	}
?>