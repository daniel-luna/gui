<?php

function get_locale ( $aliasProyecto, $clave, $language ) {
	global $enlace;
	//Función para devolver una traducción en el idioma pedido.
	//Si no se encuentra la traducción se devuelve la $clave como traducción.
	
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