<?php
	include("../../php/config.php");
	
	session_start();

	if ( (!isset($_GET['bd_alias'])) || ($_GET['bd_alias']=='') ) exit();
	$bd = $_GET['bd_alias'];

	$enlace = @mysql_connect($mysql[$bd]['host'] ,$mysql[$bd]['user'],$mysql[$bd]['password']);
	@mysql_select_db($mysql[$bd]['bd'], $enlace);
	@mysql_query ("SET NAMES 'utf8'");

	$from = $_GET['tbl_name'];
	if ( isset($_GET['from']) && ($_GET['from']!='')) $from = $_GET['from'];

	//$query = 'SELECT ' . $_GET['id_field'] . ' AS ' . $_GET['lst_alias'] . ', ' . $_GET['desc_field'] . ' AS descr FROM ' . $from . ' ';
	$query = 'SELECT ' . $_GET['id_field'] . ' AS id, ' . $_GET['desc_field'] . ' AS descr FROM ' . $from . ' ';
	if ( isset($_GET['where_filter']) && $_GET['where_filter'] != '' ) $query .= ' WHERE ' . str_replace("{lang}", $_SESSION["idioma"], $_GET['where_filter']);

	$result	= mysql_query($query, $enlace);
	$row['success'] = true;
	if ( mysql_num_rows($result) > 0) {
		while ($it = mysql_fetch_assoc($result)) $row['data'][] = $it;
	}

	echo json_encode( $row );
?>