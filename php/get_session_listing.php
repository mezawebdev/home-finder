<?php 

session_start();

if (isset($_SESSION["currentListing"]) && !empty($_SESSION["currentListing"])) {
	echo $_SESSION["currentListing"];
}

?>