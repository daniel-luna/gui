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
			
		case 'evento':
			$result	= mysql_query("SELECT * FROM `pro_eventos` WHERE `id` = " . $_GET['id_value'], $enlace);
			$row = array();
			if ( mysql_num_rows($result) > 0)  {
				$row = mysql_fetch_assoc($result);
			}
			break;
			
		case 'enlace':
			$result	= mysql_query("SELECT * FROM `pro_enlaces` WHERE `id` = " . $_GET['id_value'], $enlace);
			$row = array();
			if ( mysql_num_rows($result) > 0)  {
				$row = mysql_fetch_assoc($result);
			}
			break;
		
		case 'fotografias': 
			$result	= mysql_query("SELECT * FROM `pro_fotografias` WHERE `id` = " . $_GET['id_value'], $enlace);
			$row = array();
			if ( mysql_num_rows($result) > 0)  {
				$row = mysql_fetch_assoc($result);
			}
			break;

		case 'carreras': 
			$result	= mysql_query("SELECT * FROM `pro_carreras` WHERE `id` = " . $_GET['id_value'], $enlace);
			$row = array();
			if ( mysql_num_rows($result) > 0)  {
				$row = mysql_fetch_assoc($result);
			}
			break;
			
		case 'tipos_noticia': 
			$result	= mysql_query("SELECT * FROM `pro_tipos_noticia` WHERE `id` = " . $_GET['id_value'], $enlace);
			$row = array();
			if ( mysql_num_rows($result) > 0)  {
				$row = mysql_fetch_assoc($result);
			}
			break;
			
			
		default:
			$result	= mysql_query("", $enlace);
	}
	
	$row['table'] = $_GET['table'];
	$row['id_value'] = $_GET['id_value'];

	
	echo json_encode( array( 'data' => $row, 'success' => true ) );
?>