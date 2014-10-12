<?php
	include("../php/config.php");
	
	session_start();

	$enlace = @mysql_connect($mysql['gui']['host'] ,$mysql['gui']['user'],$mysql['gui']['password']);
	@mysql_select_db($mysql['gui']['bd'], $enlace);
	@mysql_query ("SET NAMES 'utf8'");

	include("../php/functions.php");
	
	$prj_alias	= $_GET["alias"];
	$query	= "SELECT gui_proyectos.id, gui_proyectos_nodos.alias AS grp_alias, gui_proyectos_nodos.titulo AS grp_title, gui_proyectos_nodos.id AS idNodo  
			   FROM gui_proyectos INNER JOIN gui_proyectos_nodos ON gui_proyectos.id = gui_proyectos_nodos.idProyecto
			   WHERE gui_proyectos.alias = '" . $prj_alias . "' AND gui_proyectos_nodos.idNodoPadre IS NULL";

	$result	= mysql_query($query, $enlace);
	$bPrimero = "";
	if (mysql_num_rows($result) > 0) {
		$json_data = "[";
		while ($row = mysql_fetch_assoc($result)) {
			$json_data=$json_data.$bPrimero."{cls:'file', children:";
			
			$query = "SELECT gui_proyectos_nodos.alias AS grp_alias, gui_proyectos_nodos.titulo AS grp_title
					  FROM gui_proyectos INNER JOIN gui_proyectos_nodos ON gui_proyectos.id = gui_proyectos_nodos.idProyecto
					  WHERE gui_proyectos.id = '".$row["id"]."' AND gui_proyectos_nodos.idNodoPadre = ".$row["idNodo"];
			$result_aux =  mysql_query($query, $enlace);
			$bPrimero_aux = "";
			if ( mysql_num_rows($result_aux) > 0 ) {
				$json_data = $json_data." [";
				while ( $row_aux = mysql_fetch_assoc($result_aux) ) {
					$json_data = $json_data . $bPrimero_aux . "{cls:'file', id:'" . $row_aux["grp_alias"]."', leaf:true, children:null, text:'" . utf8_encode( get_locale($prj_alias, $row_aux["grp_title"], $_GET["user_lang"]) ) . "'}";
					$bPrimero_aux = ",";
				}
				$json_data = $json_data . "], leaf:false, id:'fldr_" .$row["grp_alias"] . "'";
			} else {
				$json_data = $json_data . "null, leaf:true, id:'" . $row["grp_alias"] . "'";
			}
			$json_data = $json_data . ", text: '" . get_locale($prj_alias, $row["grp_title"], $_GET["user_lang"]) . "'}";
			$bPrimero = ", ";
		}
		$json_data = $json_data . "]";
		echo $json_data;
	}

?>