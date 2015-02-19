<?php
	include("../php/config.php");

	session_start();

	$enlace = @mysql_connect($mysql['gui']['host'] ,$mysql['gui']['user'],$mysql['gui']['password']);
	@mysql_select_db($mysql['gui']['bd'], $enlace);
	@mysql_query ("SET NAMES 'utf8'");


	$query	= "SELECT * FROM com_listgrid_adv WHERE idComponente = '" . $_REQUEST['id'] . "' AND id = '" . $_REQUEST['idReg'] . "'";
	$result	= mysql_query($query, $enlace);
	if ( mysql_num_rows($result) > 0) {
		
		$it = mysql_fetch_assoc($result);

		$sWhr = '';
		if ( isset($it['sWhere']) && ($it['sWhere'] != '')) {

$objwhr=json_decode($it['sWhere']);


			foreach ($objwhr as $item ) {
				//[{"operand": "", "op_par": "(", "field": "url", "condition": "LIKE", "value": "%google%", "cl_par": ")" }]

			//echo "<pre>";
			//print_r($item);
			//echo "</pre>";

				$sWhr .=  $item->operand . ' ' . $item->op_par . ' ' . $item->field . ' ' . $item->condition . ' ' . ( $item->value != '' ? '\'' . $item->value . '\'' : '' ) . ' ' . $item->cl_par . ' ';

			}

			$sWhr = "WHERE 1 AND " . $sWhr;
		}

		$query = str_replace("{lang}", $_REQUEST['lang'], $it['sSelect'] . ' ' . $it['sFrom'] . ' ' . $sWhr);
			
		if (isset($_GET['filter'])) {

			$comparision = array( 'eq' => '=', 'gt' => '>', 'lt' => '<' );
			$sWhr = "";
			foreach ($_GET['filter'] as $filter)
			{

				if ( $filter['data']['type'] == 'string')
					$sWhr .= " AND " . $filter['field'] . " LIKE '%" . $filter['data']['value'] . "%'" ;
					
				if ( $filter['data']['type'] == 'numeric')
					$sWhr .= " AND " . $filter['field'] . " " . $comparision[$filter['data']['comparison']] . "'" . $filter['data']['value'] . "'" ;
					
				if ( $filter['data']['type'] == 'date') {
					if ($filter['data']['value'] != '') {
						$date_value = date("Y-m-d", strtotime($filter['data']['value']));
						$sWhr .= " AND " . $filter['field'] . " " . $comparision[$filter['data']['comparison']] . "'$date_value'" ;
					}
				}
					
			}
			$query = $query . $sWhr;
			
		}
		// SOLO PARA DEBUG!!!!!
		$row['sql'] = ' DEBUG MODE - ' . $query;
		
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