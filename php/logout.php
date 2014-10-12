<?php 
	session_start();
	session_unset();
	header( 'Location: /daniext/index.php' ) ;
?>