<?php
	include('config.php');
	
	session_start();

	$enlace = @mysql_connect($mysql['gui']['host'] ,$mysql['gui']['user'],$mysql['gui']['password']);
	@mysql_select_db($mysql['gui']['bd'], $enlace);
	@mysql_query ("SET NAMES 'utf8'");

	include('functions.php');
	
	$component = $_POST['component'];
	$query	= "SELECT gui_proyectos_nodos.id, gui_proyectos.alias, listado, edicion FROM gui_proyectos_nodos INNER JOIN gui_proyectos ON gui_proyectos_nodos.idProyecto = gui_proyectos.id WHERE gui_proyectos_nodos.alias = '$component'";

	$result	= mysql_query($query, $enlace);
	if (mysql_num_rows($result) > 0) {
		$row = mysql_fetch_assoc($result);
		
		if ($_POST['action'] == 'list') $componente = $row['listado'];
		if ($_POST['action'] == 'edit') $componente = $row['edicion'];
		
		$alias = $row['alias'];
		$query	= "SELECT * FROM " . $componente . " WHERE idComponente = '" . $row['id'] . "'";
		//if ($componente == 'com_listgrid_adv') $query .= " AND porDefecto = 1";

		$row_arr = array();
		$result	= mysql_query($query, $enlace);
		if ( mysql_num_rows($result) > 0) {
		
			//$row = mysql_fetch_assoc($result);
			$primero = 1;
			while ( $row = mysql_fetch_assoc($result) )
			{

				foreach ( $row as $key=>$value )
				{
					$row[$key] = str_replace("{lang}", $_POST['lang'], $value);
			
					if ($key == 'titulo') $row[$key] = get_locale ($alias, $value, $_POST['lang']);
					if ($key == 'Columnas' ) {
						$arr = json_decode($value);
						foreach ( $arr as $iterator) {
							if (isset($iterator->text) && $iterator->text != '') $iterator->text = get_locale ($alias, $iterator->text, $_POST['lang']);
						}
						$row[$key] = json_encode($arr);
					}
				}
				unset($row['sSQL']); unset($row['sSelect']); unset($row['sFrom']); //unset($row['sWhere']);
				
				//$row['all_data'][] = $row;
				
				if ( $primero == 1 )
				{
					$row_d['idComponente'] = $row['idComponente'];
					$row_d['lang'] = $_POST['lang'];
					$row_d['prj_alias'] = $alias;
					$row_d['com_alias'] = $component;
					$row_d['col_langs'] = array('user_lang'=>$_POST['lang'], 'col_lang'=>$_POST['col_langs']);
					$row_d['componente'] = $componente;
					$row_d['res'] = 'success';
				
					//$row_arr[] = $row;
					$row_arr[] = array_merge($row, $row_d);
				}
				$primero = 0;
				
				if ( $componente == 'com_listgrid_adv') $row_arr[0]['all_data'][] = $row;

			}
			
			echo json_encode($row_arr);
			exit();
		}
	}
	
	$row['res'] = 'error';
	echo json_encode($row);
?>