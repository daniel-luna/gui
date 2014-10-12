<?php
include("config.php");

$enlace = @mysql_connect($mysql['gui']['host'] ,$mysql['gui']['user'],$mysql['gui']['password']);
@mysql_select_db($mysql['gui']['bd'], $enlace);
@mysql_query ("SET NAMES 'utf8'");

	
$sql = sprintf("SELECT gui_usuarios.id, username, gui_usuarios.nombre, apellidos, gui_perfiles.alias AS perfil, gui_usuarios.idIdioma FROM gui_usuarios INNER JOIN gui_perfiles ON gui_usuarios.idPerfil=gui_perfiles.id WHERE username='%s' AND password='%s'",
		mysql_real_escape_string($_POST["loginUsername"]),
		mysql_real_escape_string($_POST["loginPassword"]));

$result = mysql_query($sql, $enlace);
if (is_resource($result) && mysql_num_rows($result) == 1){
	$row=mysql_fetch_assoc($result);
	if ($row["perfil"]=="admin" || $row["perfil"]=="webmaster") {
		$b=session_start();
		$_SESSION['user']	= $_POST["loginUsername"];
		$_SESSION['name']	= $row["apellidos"].", ".$row["nombre"];
		$_SESSION['admin']	= "S";
		$_SESSION['perfil']	= $row["perfil"];
		$_SESSION['idioma']	= $row["idIdioma"];

		echo "{success: true, admin: true, session_start: ".$b."}";
	} else {
		echo "{success: false, errors: { reason: 'No tiene permiso para acceder al administrador.' }}";
	}
} else {
    echo "{success: false, errors: { reason: 'Fallo en el login. Vuelva a intentarlo.' }}";
}
?>