<?php
/*******************************************************************************
dani luna - config.php
File contents: Webgeneral config data
*******************************************************************************/

/*** SERVER base config ***/
setlocale(LC_TIME, 'es_ES.utf8');
date_default_timezone_set('Europe/Madrid');

$password_secret_key ='Me encanta el olor del Napalm por la mañana';

/*** Databases Info ***/
$mysql['gui']['host'] 		= "localhost";
$mysql['gui']['user'] 		= "root";
$mysql['gui']['password'] 	= "";   
$mysql['gui']['bd'] 		= "gui";

$mysql['app']['host'] 		= "localhost";
$mysql['app']['user'] 		= "root";
$mysql['app']['password'] 	= "";   
$mysql['app']['bd'] 		= "gui";

?>