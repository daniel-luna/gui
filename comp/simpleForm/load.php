<?php
	include("../../php/config.php");
	
	session_start();
	
	if ( (!isset($_GET['bd_alias'])) || ($_GET['bd_alias']=='') ) {
	
	} else {
		//1. Abrimos conexión con el GUI
		$enlace = @mysql_connect($mysql['gui']['host'] ,$mysql['gui']['user'],$mysql['gui']['password']);
		@mysql_select_db($mysql['gui']['bd'], $enlace);
		@mysql_query ("SET NAMES 'utf8'");

		$result	= mysql_query("SELECT * FROM `com_editform` WHERE idComponente = '" . $_GET['com_id'] . "'", $enlace);
		if ( mysql_num_rows($result) <= 0) {
		
		} else {

			//2. Recuperamos datos de configuración
			$it = mysql_fetch_assoc($result);
			$sSQL = $it['sSQL'];

			mysql_close($enlace);

			//3. Cerramos GUI y abrimo conexión con la base de datos del cliente para traer los datos.
			$bd = $_GET['bd_alias'];	

			$enlace = @mysql_connect($mysql[$bd]['host'] ,$mysql[$bd]['user'],$mysql[$bd]['password']);
			@mysql_select_db($mysql[$bd]['bd'], $enlace);
			@mysql_query ("SET NAMES 'utf8'");

			$sSQL = str_replace("{lang}", $_SESSION["idioma"], $sSQL);
			$sSQL = str_replace("{id_value}", $_GET['id_value'], $sSQL);
			
			$result	= mysql_query($sSQL, $enlace);
			if ( mysql_num_rows($result) <= 0) {
			
			} else {
				$row = mysql_fetch_assoc($result);
				$arr = array( 'data' => $row, 'success' => true);
			}
			
		}
	}
	echo json_encode( $arr );
?>