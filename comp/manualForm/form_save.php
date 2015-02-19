<?php
	include("../../php/config.php");
	session_start();
	
	$bd = 'gui'; //$_GET['bd_alias'];	

	$enlace = @mysql_connect($mysql[$bd]['host'] ,$mysql[$bd]['user'],$mysql[$bd]['password']);
	@mysql_select_db($mysql[$bd]['bd'], $enlace);
	@mysql_query ("SET NAMES 'utf8'");


	switch ($_POST['table'])
	{
		case 'noticia':
			$result	= mysql_query("SELECT * FROM `pro_noticias` WHERE `id` = " . $_POST['id_value'], $enlace);
			$row = array();
			if ( mysql_num_rows($result) > 0)  {
				$row = mysql_fetch_assoc($result);
				$row['id_tipo'] = (int)$row['id_tipo'];
			}
			break;
			
		case 'evento':
			$f=explode("/", $_POST['fecha']); $d = $f[2] . '-' . $f[1] . '-' . $f[0];
			if ( $_POST['id_value'] > 0 )
				$result	= mysql_query("UPDATE `pro_eventos` SET `titulo` = '" . $_POST['titulo'] . "', `descripcion` = '" . $_POST['descripcion'] . "', `fecha` = '" . $d . "' WHERE `id` = " . $_POST['id_value'], $enlace);
			else
				$result	= mysql_query("INSERT INTO `pro_eventos` (`titulo`, `descripcion`, `fecha`) VALUES ('" . $_POST['titulo'] . "', '" . $_POST['descripcion'] . "', '" . $d . "')" , $enlace);

			break;
			
		case 'enlace':
			if ( $_POST['id_value'] > 0 )
				$result	= mysql_query("UPDATE `pro_enlaces` SET `descripcion` = '" . $_POST['descripcion'] . "', `url` = '" . $_POST['url'] . "' WHERE `id` = " . $_POST['id_value'], $enlace);
			else
				$result	= mysql_query("INSERT INTO `pro_eventos` (`descripcion`, `url`) VALUES ('" . $_POST['descripcion'] . "', '" . $_POST['url'] . "')" , $enlace);

			break;
			
		default:
			$result	= mysql_query("", $enlace);
	}
	

	
	//echo json_encode( array( 'data' => $row, 'success' => true ) );
	echo json_encode( array( 'success' => true ) );
?>