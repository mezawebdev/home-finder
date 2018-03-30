<?php

session_start(); 

$_SESSION["city"] = $_POST["city"];
$_SESSION["tab"] = $_POST["tab"];

if (isset($_POST["priceMin"]) && !empty($_SESSION["priceMin"])) {
	$_SESSION["priceMin"] = $_POST["priceMin"];
}

if (isset($_POST["priceMax"]) && !empty($_SESSION["priceMax"])) {
	$_SESSION["priceMax"] = $_POST["priceMax"];
}

if (isset($_POST["beds"]) && !empty($_SESSION["beds"])) {
	$_SESSION["beds"] = $_POST["beds"];
}

if (isset($_POST["baths"]) && !empty($_SESSION["baths"])) {
	$_SESSION["baths"] = $_POST["baths"];
}

echo "\nSessions Variables Updated:\n".$_SESSION["city"]."\n".$_SESSION["priceMin"]."\n".$_SESSION["priceMax"]."\n".$_SESSION["priceMax"]."\n".$_SESSION["beds"]."\n".$_SESSION["baths"]."\n".$_SESSION["tab"]."\n";

?>