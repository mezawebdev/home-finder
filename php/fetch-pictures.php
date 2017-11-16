<?php 

@include "connect.php";

$src = $_POST["src"];

$directory = '/var/www/ajaxform/';
$files = glob($directory . '*.jpg');

/*
if ( $files !== false ) {
    $filecount = count( $files );
    echo $filecount;
} else {
    echo 0;
}*/

json_encode(2);

?>