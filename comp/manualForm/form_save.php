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
			$f=explode("/", $_POST['fecha']); $d = $f[2] . '-' . $f[1] . '-' . $f[0];
			if ( $_POST['id_value'] > 0 )
				$result	= mysql_query("UPDATE `pro_noticias` SET `titulo` = '" . $_POST['titulo'] . "', `descripcion` = '" . $_POST['descripcion'] . "', `breve` = '" . $_POST['breve'] . "', `id_tipo` = '" . $_POST['id_tipo'] . "', `fecha` = '" . $d . "' WHERE `id` = " . $_POST['id_value'], $enlace);
			else
				$result	= mysql_query("INSERT INTO `pro_noticias` (`titulo`, `descripcion`, `breve`, `id_tipo` `fecha`) VALUES ('" . $_POST['titulo'] . "', '" . $_POST['descripcion'] . "', '" . $_POST['breve'] . "', '" . $_POST['id_tipo'] . "', '" . $d . "')" , $enlace);

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

		case 'fotografias': 
			$folder_name = $_POST['id_value'];
			if ( $_POST['id_value'] > 0 ) {
				$result	= mysql_query("UPDATE `pro_fotografias` SET `titulo` = '" . $_POST['titulo'] . "', `descripcion` = '" . $_POST['descripcion'] . "' WHERE `id` = " . $_POST['id_value'], $enlace);
			} else {
				$result	= mysql_query("INSERT INTO `pro_fotografias` (`titulo`, `descripcion`) VALUES ('" . $_POST['titulo'] . "', '" . $_POST['descripcion'] . "')" , $enlace);
				$folder_name = mysql_insert_id();
			}
			$info = pathinfo($_FILES['foto']['name']);
			$folder_path = '../../files/photos/' .$folder_name; // .$info;
			
			if ( !file_exists($folder_path) || !is_dir($folder_path) ) {
				mkdir($folder_path . '/');   
				chmod($folder_path . '/', 0755); 
			} else {
				$files = glob($folder_path . '/*'); // get all file names
				foreach($files as $file){ // iterate files
				  if(is_file($file)) unlink($file); // delete file
				}
			}

			move_uploaded_file( $_FILES['foto']['tmp_name'], $folder_path . '/' . $_FILES['foto']['name']);
			$result	= mysql_query("UPDATE `pro_fotografias` SET `foto` = '" . $_FILES['foto']['name'] . "' WHERE `id` = " . $folder_name, $enlace);


			break;
			
		case 'carreras': 
			$f=explode("/", $_POST['fecha']); $d = $f[2] . '-' . $f[1] . '-' . $f[0];

			$folder_name = $_POST['id_value'];
			if ( $_POST['id_value'] > 0 ) {
				$result	= mysql_query("UPDATE `pro_carreras` SET `nombre` = '" . $_POST['nombre'] . "', `fecha` = '$d', `clasificacion` = '" . $_POST['clasificacion'] . "', `alojamientos` = '" . $_POST['alojamientos'] . "', `reglamento` = '" . $_POST['reglamento'] . "' WHERE `id` = " . $_POST['id_value'], $enlace);
			} else {
				$result	= mysql_query("INSERT INTO `pro_carreras` (`nombre`, `fecha`, `clasificacion`, `alojamientos`, `reglamento`) VALUES ('" . $_POST['nombre'] . "', '$d', '" . $_POST['clasificacion'] . "', '" . $_POST['alojamientos'] . "', '" . $_POST['reglamento'] . "')" , $enlace);
				$folder_name = mysql_insert_id();
			}
			
			if ( isset($_FILES['cartel']['name']) && $_FILES['cartel']['name']!= '' ) {
				$info = pathinfo($_FILES['cartel']['name']);
				$folder_path = '../../files/carreras/' .$folder_name; // .$info;
			
				if ( !file_exists($folder_path) || !is_dir($folder_path) ) {
					mkdir($folder_path . '/');   
					chmod($folder_path . '/', 0755); 
				} else {
					$files = glob($folder_path . '/*'); // get all file names
					foreach($files as $file){ // iterate files
					  if(is_file($file)) unlink($file); // delete file
					}
				}

				move_uploaded_file( $_FILES['cartel']['tmp_name'], $folder_path . '/' . $_FILES['cartel']['name']);
				$result	= mysql_query("UPDATE `pro_carreras` SET `cartel` = '" . $_FILES['cartel']['name'] . "' WHERE `id` = " . $folder_name, $enlace);
			}

			break;
			
		case 'tipos_noticia':
			if ( $_POST['id_value'] > 0 )
				$result	= mysql_query("UPDATE `pro_tipos_noticia` SET `descripcion` = '" . $_POST['descripcion'] . "' WHERE `id` = " . $_POST['id_value'], $enlace);
			else
				$result	= mysql_query("INSERT INTO `pro_tipos_noticia` (`descripcion`) VALUES ('" . $_POST['descripcion'] . "')" , $enlace);

			break;
			
			
			
		default:
			$result	= mysql_query("", $enlace);
	}
	

	
	//echo json_encode( array( 'data' => $row, 'success' => true ) );
	echo json_encode( array( 'success' => true ) );
?>