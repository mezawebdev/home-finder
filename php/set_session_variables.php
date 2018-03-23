<?php

session_start(); 

$_SESSION["city"] = $_POST["city"];
$_SESSION["priceMin"] = $_POST["priceMin"];
$_SESSION["priceMax"] = $_POST["priceMax"];
$_SESSION["beds"] = $_POST["beds"];
$_SESSION["baths"] = $_POST["baths"];
$_SESSION["tab"] = $_POST["tab"];

echo "Sessions Variables Updated:\n".$_SESSION["city"]."\n".$_SESSION["priceMin"]."\n".$_SESSION["priceMax"]."\n".$_SESSION["priceMax"]."\n".$_SESSION["beds"]."\n".$_SESSION["baths"]."\n";

?>