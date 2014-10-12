<?php
	session_start();
	if ( ! isset($_SESSION['user']) || ($_SESSION['user'] == ''))  header( 'Location: php/login.php' );

	include('php/app.php');
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8" />
	<title>GUI</title>
	<link rel="stylesheet" href="extjs/resources/css/ext-all-neptune.css"/>
	<script type="text/javascript" src="extjs/ext-all-debug.js"></script>
	<script type="text/javascript" src="extjs/locale/ext-lang-<?php echo $_SESSION['idioma'];?>.js"></script>
	
	<!-- para el grid con filtro.... -->
	<link rel="stylesheet" type="text/css" href="extjs/src/ux/grid/css/GridFilters.css" />
	<link rel="stylesheet" type="text/css" href="extjs/src/ux/grid/css/RangeMenu.css" />
	<script type="text/javascript" src="extjs/src/ux/grid/FiltersFeature.js"></script>
	<script type="text/javascript" src="extjs/src/ux/grid/filter/Filter.js"></script>
	<script type="text/javascript" src="extjs/src/ux/grid/filter/StringFilter.js"></script>
	<script type="text/javascript" src="extjs/src/ux/grid/filter/ListFilter.js"></script>
	<script type="text/javascript" src="extjs/src/ux/grid/filter/BooleanFilter.js"></script>
	<script type="text/javascript" src="extjs/src/ux/grid/filter/NumericFilter.js"></script>
	<script type="text/javascript" src="extjs/src/ux/grid/filter/DateFilter.js"></script>
	<script type="text/javascript" src="extjs/src/ux/grid/menu/RangeMenu.js"></script>

	<!-- solo de ejemplo. petar cuando se tenga que hacer algo -->
	<script type="text/javascript" src="js/chartSamples.js"></script>

	<script type="application/javascript">
		var GUIobj = <?php echo $sSesion;?>;
	</script>
	<script type="application/javascript" src="app.js"></script>
</head>
<body>

</body>
</html>