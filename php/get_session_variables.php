<?php

session_start();

function getVariables() {
	$variables = array();

	array_push($variables, $_SESSION["city"]);
	array_push($variables, $_SESSION["tab"]);

	if (isset($_SESSION["priceMin"]) && !empty($_SESSION["priceMin"])) {
		array_push($variables, $_SESSION["priceMin"]);
	}

	if (isset($_SESSION["priceMax"]) && !empty($_SESSION["priceMax"])) {
		array_push($variables, $_SESSION["priceMax"]);
	}

	if (isset($_SESSION["beds"]) && !empty($_SESSION["beds"])) {
		array_push($variables, $_SESSION["beds"]);
	}

	if (isset($_SESSION["baths"]) && !empty($_SESSION["baths"])) {
		array_push($variables, $_SESSION["beds"]);
	}

	return $variables;
}

echo json_encode(getVariables());

?>