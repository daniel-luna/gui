<?php
	include("../../php/config.php");
	session_start();
	
	$bd = 'gui'; //$_GET['bd_alias'];	

	$enlace = @mysql_connect($mysql[$bd]['host'] ,$mysql[$bd]['user'],$mysql[$bd]['password']);
	@mysql_select_db($mysql[$bd]['bd'], $enlace);
	@mysql_query ("SET NAMES 'utf8'");


	switch ($_GET['table'])
	{
		case 'noticia':
			$result	= mysql_query("SELECT * FROM `pro_noticias` WHERE `id` = " . $_GET['id_value'], $enlace);
			$row = array();
			if ( mysql_num_rows($result) > 0)  {
				$row = mysql_fetch_assoc($result);
				$row['id_tipo'] = (int)$row['id_tipo'];
			}
	
			break;
			
		default:
			$result	= mysql_query("", $enlace);
	}
	

	
	echo json_encode( array( 'data' => $row, 'success' => true ) );
?>