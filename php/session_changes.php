<?php
	session_start();
	
	if ( isset($_REQUEST['css']) && ($_REQUEST['css']!='') ) $_SESSION['css'] = $_REQUEST['css'];
?>