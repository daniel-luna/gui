<?php
	include("../php/config.php");

	session_start();

	$enlace = @mysql_connect($mysql['gui']['host'] ,$mysql['gui']['user'],$mysql['gui']['password']);
	@mysql_select_db($mysql['gui']['bd'], $enlace);
	@mysql_query ("SET NAMES 'utf8'");


	$query	= "SELECT * FROM com_listgrid WHERE idComponente = '" . $_REQUEST['id'] . "'";
	$result	= mysql_query($query, $enlace);
	if ( mysql_num_rows($result) > 0) {
		
		$it = mysql_fetch_assoc($result);
		$query = str_replace("{lang}", $_REQUEST['lang'], $it['sSQL']);
			
		if (isset($_GET['filter'])) {
			
			eval('$trad = array(' . $it['mapeadoPHP'] . ');');

			$comparision = array( 'eq' => '=', 'gt' => '>', 'lt' => '<' );
			$sWhr = "";
			foreach ($_GET['filter'] as $filter)
			{

				if ( $filter['data']['type'] == 'string')
					$sWhr .= " AND " . $trad[$filter['field']] . " LIKE '%" . $filter['data']['value'] . "%'" ;
					
				if ( $filter['data']['type'] == 'numeric')
					$sWhr .= " AND " . $trad[$filter['field']] . " " . $comparision[$filter['data']['comparison']] . "'" . $filter['data']['value'] . "'" ;
			}
			
			$query = $query . $sWhr;
		}

		$result	= mysql_query($query, $enlace);
		if ( mysql_num_rows($result) > 0) {
			$row['total'] = mysql_num_rows($result);
			while ($it = mysql_fetch_assoc($result)) $row['data'][] = $it;
		} else {
			$row['total'] = 0;
		}
	} else {
		$row['total'] = 0;
	}
	echo json_encode($row);
?>