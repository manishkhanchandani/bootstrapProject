<?php

# FileName="Connection_php_mysql.htm"
# Type="MYSQL"
# HTTP="true"
$hostname_connMain = "localhost";
$database_connMain = "consultl_mkgxymain";
$username_connMain = "consultl_user";
$password_connMain = "passwords123";
$connMain = mysql_connect($hostname_connMain, $username_connMain, $password_connMain) or trigger_error(mysql_error(),E_USER_ERROR);
mysql_select_db($database_connMain, $connMain) or die('could not select db');
$dsn_connMain = 'mysql:dbname='.$database_connMain.';host='.$hostname_connMain;

//adodb try
include('adodb/adodb.inc.php');

$ADODB_CACHE_DIR = 'cache/ADODB_cache';
$connMainAdodb = ADONewConnection('mysql');
$connMainAdodb->Connect($hostname_connMain, $username_connMain, $password_connMain, $database_connMain);
//$connAdodb->LogSQL();consultl_user, passwords123



if (!function_exists("GetSQLValueString")) {
function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
{
  if (PHP_VERSION < 6) {
    $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
  }

  $theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);

  switch ($theType) {
    case "text":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;    
    case "long":
    case "int":
      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
      break;
    case "double":
      $theValue = ($theValue != "") ? doubleval($theValue) : "NULL";
      break;
    case "date":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;
    case "defined":
      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
      break;
  }
  return $theValue;
}
}


if (!function_exists('curlget')) {
	function curlget($url, $post=0, $POSTFIELDS='') {
		$https = 0;
		if (substr($url, 0, 5) === 'https') {
			$https = 1;
		}

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);  
		if (!empty($post)) {
			curl_setopt($ch, CURLOPT_POST, 1); 
			curl_setopt($ch, CURLOPT_POSTFIELDS,$POSTFIELDS);
		}

		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_COOKIEFILE, COOKIE_FILE_PATH);
		curl_setopt($ch, CURLOPT_COOKIEJAR,COOKIE_FILE_PATH);
		if (!empty($https)) {
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
		}

		$result = curl_exec($ch); 
		curl_close($ch);
		return $result;
	}
}


function makecityurl($city_id, $city)
{
  return '/city-'.$this->url_name_v2($city).'-'.$city_id;
}
	
function get_nearby_cities($lat, $lon, $radius=30, $order='distance', $limit=30)
{
	global $connMainAdodb;
	$connMainAdodb->Execute("SET NAMES utf8");
	$sql = sprintf("select c.*, co.name as country, s.name as state, (ROUND(
DEGREES(ACOS(SIN(RADIANS(".GetSQLValueString($lat, 'double').")) * SIN(RADIANS(c.latitude)) + COS(RADIANS(".GetSQLValueString($lat, 'double').")) * COS(RADIANS(c.latitude)) * COS(RADIANS(".GetSQLValueString($lon, 'double')." -(c.longitude)))))*60*1.1515,2)) as distance from geo_cities as c LEFT JOIN geo_states as s ON c.sta_id = s.sta_id LEFT JOIN geo_countries as co ON c.con_id = co.con_id WHERE (ROUND(
DEGREES(ACOS(SIN(RADIANS(".GetSQLValueString($lat, 'double').")) * SIN(RADIANS(c.latitude)) + COS(RADIANS(".GetSQLValueString($lat, 'double').")) * COS(RADIANS(c.latitude)) * COS(RADIANS(".GetSQLValueString($lon, 'double')." -(c.longitude)))))*60*1.1515,2)) <= ".GetSQLValueString($radius, 'int')." ORDER BY ".$order." LIMIT ".$limit);
	$recordSet = $connMainAdodb->Execute($sql);
	$return = array();
	$i = 0;
	while (!$recordSet->EOF) {
		$return[$i] = $recordSet->fields;
		$return[$i]['location'] = $recordSet->fields['name'].', '.$recordSet->fields['state'].', '.$recordSet->fields['country'];
		$i++;
		$recordSet->MoveNext();
	}
	return $return;
}


function iptocity($ip)
{
	define('IPSNIFF_URL', 'http://api.ipinfodb.com/v3/ip-city/?');
	define('IPSNIFF_KEY', '0b3b2f8bd9f606ba8032ef0b9fbe054041788fb0f9d7c21214cd050a9b561845');

	$url = IPSNIFF_URL.'key='.IPSNIFF_KEY.'&ip='.$ip;
	$string = curlget($url);
	//$string = 'OK;;63.150.3.118;US;UNITED STATES;CALIFORNIA;SAN JOSE;95101;37.3169;-121.874;-08:00';
	$tmp = explode(';', $string);
	$arr['status'] = !empty($tmp[0]) ? trim($tmp[0]) : '';
	$arr['text1'] = !empty($tmp[1]) ? trim($tmp[1]) : '';
	$arr['ip'] = !empty($tmp[2]) ? trim($tmp[2]) : '';
	$arr['countrycode'] = !empty($tmp[3]) ? trim($tmp[3]) : '';
	$arr['country'] = !empty($tmp[4]) ? trim($tmp[4]) : '';
	$arr['state'] = !empty($tmp[5]) ? trim($tmp[5]) : '';
	$arr['city'] = !empty($tmp[6]) ? trim($tmp[6]) : '';
	$arr['zip'] = !empty($tmp[7]) ? trim($tmp[7]) : '';
	$arr['lat'] = !empty($tmp[8]) ? trim($tmp[8]) : '';
	$arr['lon'] = !empty($tmp[9]) ? trim($tmp[9]) : '';
	$arr['timezone'] = !empty($tmp[10]) ? trim($tmp[10]) : '';
	$arr['url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];
	$arr['user_agent'] = $_SERVER['HTTP_USER_AGENT'];
	$arr['referrer'] = !empty($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';

	//$email[] = 'auto@wc5.org';
	//$from = 'From: system<system@'._base_domain.'>';
	//$msg = var_export($arr, 1);
	//foreach ($email as $to) {
	  //mail2($to, 'IP Check', $msg, $from);
	//}
	
	return $arr;
}

function pr($d) {
	echo '<pre>';
	print_r($d);
	echo '</pre>';	
}

try {
	if (empty($_GET['action'])) {
		throw new Exception('missing action');	
	}
	
	$data = array();
	switch ($_GET['action']) {
		case 'nearbycities':
			if (empty($_GET['lat'])) {
				throw new Exception('missing latitude');	
			}
			if (empty($_GET['lng'])) {
				throw new Exception('missing longitude');	
			}
			$data = get_nearby_cities($_GET['lat'], $_GET['lng'], $radius=30, $order='distance', $limit=30);
			break;
		default:
			throw new Exception('action not defined');
			break;
	}
	$result = array('success' => 1, 'data' => $data);
} catch (Exception $e) {
	$result = array('success' => 0, 'msg' => $e->getMessage());	
}
echo json_encode($result);
?>