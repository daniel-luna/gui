<?php

function get_locale ( $aliasProyecto, $clave, $language ) {
	global $enlace;
	//Funci�n para devolver una traducci�n en el idioma pedido.
	//Si no se encuentra la traducci�n se devuelve la $clave como traducci�n.
	
	$sql = sprintf("SELECT $language FROM gui_locales WHERE aliasProyecto = '%s' AND clave = '%s'",
			mysql_real_escape_string($aliasProyecto),
			mysql_real_escape_string($clave));

	$result = mysql_query($sql, $enlace);
	if (is_resource($result) && mysql_num_rows($result) == 1){
		$row=mysql_fetch_assoc($result);
		$clave = $row[$language];
	}
	
	return $clave;
}

?>