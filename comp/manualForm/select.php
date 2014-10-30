<?php
	include("../../php/config.php");
	session_start();
	
	
	$bd = 'gui'; //$_GET['bd_alias'];	

	$enlace = @mysql_connect($mysql[$bd]['host'] ,$mysql[$bd]['user'],$mysql[$bd]['password']);
	@mysql_select_db($mysql[$bd]['bd'], $enlace);
	@mysql_query ("SET NAMES 'utf8'");

	//$sSQL = str_replace("{lang}", $_SESSION["idioma"], $sSQL);
	//$sSQL = str_replace("{id_value}", $_GET['id_value'], $sSQL);
	
			
	if ( $_GET['action'] == 'load') {
		switch ($_GET['table'])
		{
			case 'tipos_noticia':
				$result	= mysql_query("SELECT id, descripcion AS descr FROM `pro_tipos_noticia`", $enlace);
				break;
				
			default:
				$result	= mysql_query("", $enlace);
		}
		
		if ( mysql_num_rows($result) <= 0) {
			$arr[] = array( 'data' => 'empty', 'success' => true);
		} else {
			$arr_data = array();
			while ( $row = mysql_fetch_assoc($result) ) {
				$arr_data[] = $row;
			}
			//$arr[] = array( 'data' => $arr_data, 'success' => true);
		}
	
		
	}
	
	echo json_encode( array( 'data' => $arr_data ) );
?>