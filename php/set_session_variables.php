<?php

session_start(); 

$_SESSION["city"] = $_POST["city"];
$_SESSION["tab"] = $_POST["tab"];

if (isset($_POST["priceMin"])) {
	$_SESSION["priceMin"] = $_POST["priceMin"];
} else {
	$_SESSION["priceMin"] = 0;
}

if (isset($_POST["priceMax"])) {
	$_SESSION["priceMax"] = $_POST["priceMax"];
} else {
	$_SESSION["priceMax"] = 0;
}

if (isset($_POST["beds"])) {
	$_SESSION["beds"] = $_POST["beds"];
} else {
	$_SESSION["beds"] = 0;
}

if (isset($_POST["baths"])) {
	$_SESSION["baths"] = $_POST["baths"];
} else {
	$_SESSION["baths"] = 0;
}

echo "\nSessions Variables Updated:\n".$_SESSION["city"]."\n".$_SESSION["priceMin"]."\n".$_SESSION["priceMax"]."\n".$_SESSION["priceMax"]."\n".$_SESSION["beds"]."\n".$_SESSION["baths"]."\n".$_SESSION["tab"]."\n";

?>