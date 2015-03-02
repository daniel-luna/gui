<?php
	include ("php/config.php");
	
	$enlace = @mysql_connect($mysql['gui']['host'] , $mysql['gui']['user'], $mysql['gui']['password']);
	@mysql_select_db($mysql['gui']['bd'], $enlace);
	@mysql_query ("SET NAMES 'utf8'");
	
	//session_start();
	
	function get_language_info($idProyecto)
	{
		global $enlace;
		$sql_idioma = $_SESSION["idioma"];
		//1º miramos si el idioma que tiene el usuario se encuentra en el proyecto
		$idioma="";
		$sql="SELECT idIdioma FROM gui_proyectos_idiomas WHERE idProyecto = $idProyecto AND idIdioma = '$sql_idioma'";
		$result_idioma = mysql_query($sql, $enlace);
		//$num = mysql_num_rows($result_idioma);
		if (mysql_num_rows($result_idioma) === 1){ $idioma = " defLang: '" . $_SESSION["idioma"] . "'"; $sWhr = $_SESSION["idioma"]; }
		//2º si no está idioma del usuario en el proyecto, ponemos el idioma por defecto del proyecto
		if ($idioma == "") {
			$sql = "SELECT idIdioma FROM gui_proyectos_idiomas WHERE idProyecto = $idProyecto AND defecto = 'S'";
			$result_idioma = mysql_query($sql, $enlace);
			$row_idioma = mysql_fetch_assoc($result_idioma);
			$idioma = "defLang: '" . $row_idioma["idIdioma"] . "'";
			$sWhr = $row_idioma["idIdioma"];
		}
		
		//una vez cargado el idioma que se mostrará para ese proyecto-usuario, pasamos a cargar todos los idiomas del proyecto
		$col_idioma=""; $primero_idioma="";
		$sql="SELECT idIdioma FROM gui_proyectos_idiomas WHERE idProyecto = $idProyecto";
		$result_idioma = mysql_query($sql, $enlace);
		while ($row_idioma = mysql_fetch_assoc($result_idioma)) {
			$col_idioma=$col_idioma.$primero_idioma.$row_idioma["idIdioma"];
			$primero_idioma=",";
		}

		//para finalizar, obtenemos el nombre del proyecto en el idioma principal (proyecto-usuario)
		$sql="SELECT nombre FROM gui_proyectos_i18n WHERE idProyecto = $idProyecto AND idIdioma = '$sWhr'";
		$result_idioma = mysql_query($sql, $enlace);
		$nombre="";
		$row_idioma = mysql_fetch_assoc($result_idioma);
		$nombre=$row_idioma["nombre"]; //utf8_encode($row_idioma["nombre"]);
		
		$res = "prjName: '" . $nombre . "', " . $idioma . ", prjLang: '" . $col_idioma . "'";
		return $res;
	
	}
	
	/*
		{
			username: 'web',
			nombre: 'General, Administrador',
			admin: 'S',
			perfil: 'admin',
			idioma: 'ca_ES',
			imgs_path: '../photos/',
			sites:[
					{ prjAlias: 'bicis', dbName: 'bicis', prjName: 'Club Ciclista Cella', defLang: 'es_ES', prjLang: 'en_GB,es_ES'},
					{ prjAlias: 'gui', dbName: 'gui', prjName: 'Administració', defLang: 'ca_ES', prjLang: 'ca_ES,en_GB,es_ES'}
				  ]
		}
	*/
	
	function get_project_lang( $idProyecto ) {
		global $enlace;
		//
		$col_idioma=""; $primero_idioma="";
		$sql="SELECT idIdioma FROM gui_proyectos_idiomas WHERE idProyecto = $idProyecto";
		$result_idioma = mysql_query($sql, $enlace);
		while ($row_idioma = mysql_fetch_assoc($result_idioma)) {
			$col_idioma = $col_idioma . $primero_idioma . $row_idioma["idIdioma"];
			$primero_idioma = ",";
		}

		$sql="SELECT IFNULL(nombre, '') AS nombre FROM gui_proyectos_i18n WHERE idProyecto = $idProyecto AND idIdioma = '" . $_SESSION["idioma"] . "'";
		$result_idioma = mysql_query($sql, $enlace);
		$nombre = "";
		$row_idioma = mysql_fetch_assoc($result_idioma);
		$nombre = $row_idioma["nombre"];
		
		$res = "prjName: '" . $nombre . "', prjLang: '" . $col_idioma . "'";
		return $res;
	}
	
	//sites: alias, bbdd, titulo
	$sSesion="{username: '".$_SESSION["user"]."', nombre: '".$_SESSION["name"]."', admin: '".$_SESSION["admin"]."', perfil: '".$_SESSION["perfil"]."', idioma: '".$_SESSION["idioma"]."', imgs_path: '../photos/', css: '".$_SESSION["css"]."', sites: ";

	$sql=	"	SELECT gui_proyectos.id, gui_proyectos.alias, gui_proyectos.dbName
				FROM (gui_proyectos INNER JOIN gui_proyectos_usuarios ON gui_proyectos.id = gui_proyectos_usuarios.idProyecto)
					INNER JOIN gui_usuarios ON gui_proyectos_usuarios.idUsuario = gui_usuarios.idUsuario 
				WHERE username = '".$_SESSION["user"]."' AND gui_proyectos.id = 2";
	$result = mysql_query($sql, $enlace);

	$sSesion .= "[{prjAlias: 'app', " . get_project_lang(2) . "}";
	//if (($_SESSION["perfil"]=="admin") || ($_SESSION["perfil"]=="webmaster")) $sSesion .= ", {prjAlias: 'gui', " . get_project_lang(1) . "}";
	if ( $_SESSION["perfil"]=="webmaster" ) $sSesion .= ", {prjAlias: 'gui', " . get_project_lang(1) . "}";
	$sSesion .= "]}";
	
	//echo $sSesion;

	@mysql_close($enlace);

?>