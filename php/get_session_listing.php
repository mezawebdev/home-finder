<?php 

session_start();

if (isset($_SESSION["currentListing"])) {
	echo $_SESSION["currentListing"];
}

?>