<?php
# FileName="Connection_php_mysql.htm"
# Type="MYSQL"
# HTTP="true"
$hostname_connBayAreaCont = "localhost";
$database_connBayAreaCont = "consultl_bayareacontractor";
$username_connBayAreaCont = "consultl_user";
$password_connBayAreaCont = "passwords123";
$connBayAreaCont = mysql_connect($hostname_connBayAreaCont, $username_connBayAreaCont, $password_connBayAreaCont) or trigger_error(mysql_error(),E_USER_ERROR); 

mysql_select_db($database_connBayAreaCont, $connBayAreaCont) or die('could not select db');
$dsn_connBayAreaCont = 'mysql:dbname='.$database_connBayAreaCont.';host='.$hostname_connBayAreaCont;

//adodb try
define('BASE_DIR', dirname(dirname(__FILE__)));
$site_path = BASE_DIR.'/svnprojects/projects/bayareacontractor';
include($site_path.'/adodb/adodb.inc.php');

$ADODB_CACHE_DIR = $site_path.'/cache/ADODB_cache';
$connBayAreaContAdodb = ADONewConnection('mysql');
$connBayAreaContAdodb->Connect($hostname_connBayAreaCont, $username_connBayAreaCont, $password_connBayAreaCont, $database_connBayAreaCont);
//$connAdodb->LogSQL();consultl_user, passwords123
?>