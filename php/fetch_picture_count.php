<?php 

//@include "connect.php";

$src = $_POST["src"];

$directory = $src;
$files = glob($directory . '*.jpg');

/*
if ( $files !== false ) {
    $filecount = count( $files );
    echo $filecount;
} else {
    echo 0;
}
*/

echo 5;

?>