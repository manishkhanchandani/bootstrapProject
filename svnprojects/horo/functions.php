<?php

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


function ago($time)
{
   $periods = array("second", "minute", "hour", "day", "week", "month", "year", "decade");
   $lengths = array("60","60","24","7","4.35","12","10");

   $now = time();

       $difference     = $now - $time;
       $tense         = "ago";

   for($j = 0; $difference >= $lengths[$j] && $j < count($lengths)-1; $j++) {
       $difference /= $lengths[$j];
   }

   $difference = round($difference);

   if($difference != 1) {
       $periods[$j].= "s";
   }

   return "$difference $periods[$j] 'ago' ";
}

function url_name_v2($name='')
{
	if (empty($name)) {
		return $name;
	}

	$patterns = array();
	$patterns[0] = "/\s+/";
	$patterns[1] = '/[^A-Za-z0-9]+/';
	$replacements = array();
	$replacements[0] = "-";
	$replacements[1] = '-';
	ksort($patterns);
	ksort($replacements);
	$output = preg_replace($patterns, $replacements, $name);
	$output = strtolower($output);
	return $output;
}//end list_name_url()


function makecityurl($city_id, $city)
{
  return HTTPPATH.'/city-'.url_name_v2($city).'-'.$city_id;
}



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


  function getQueryString()
  {
    $queryString_rsView = "";
    if (!empty($_SERVER['QUERY_STRING'])) {
      $params = explode("&", $_SERVER['QUERY_STRING']);
      $newParams = array();
      foreach ($params as $param) {
        if (stristr($param, "pageNum_rsView") == false && 
            stristr($param, "totalRows_rsView") == false) {
          array_push($newParams, $param);
        }
      }
      if (count($newParams) != 0) {
        $queryString_rsView = "&" . htmlentities(implode("&", $newParams));
      }
    }
    $queryString_rsView = sprintf("&totalRows_rsView=%d%s", $totalRows_rsView, $queryString_rsView); 
    return $queryString_rsView;
  }

  function getAll($tableName, $tagsTable, $max=100, $page=0, $params=array(), $cacheTime = 900)
  {
    $status = !empty($params['status']) ? (int) $params['status'] : 1;
    $searchTerm = !empty($params['q']) ? $params['q'] : '';
    $lat = !empty($params['lat']) ? $params['lat'] : '';
    $lon = !empty($params['lon']) ? $params['lon'] : '';
    $radius = !empty($params['radius']) ? $params['radius'] : 30;
    if (isset($params['path'])) {
      $path = !empty($params['path']) ? $params['path'] : 0;
    }
    $distance = '';
    $distanceWhere = '';
    $order = ' ORDER BY a.id DESC';
    
    
    if (!empty($lat) && !empty($lon)) {
      $distance = ", (ROUND(
	DEGREES(ACOS(SIN(RADIANS(".GetSQLValueString($lat, 'double').")) * SIN(RADIANS(a.lat)) + COS(RADIANS(".GetSQLValueString($lat, 'double').")) * COS(RADIANS(a.lat)) * COS(RADIANS(".GetSQLValueString($lon, 'double')." -(a.lng)))))*60*1.1515,2)) as distance";
      $distanceWhere = " AND (ROUND(
	DEGREES(ACOS(SIN(RADIANS(".GetSQLValueString($lat, 'double').")) * SIN(RADIANS(a.lat)) + COS(RADIANS(".GetSQLValueString($lat, 'double').")) * COS(RADIANS(a.lat)) * COS(RADIANS(".GetSQLValueString($lon, 'double')." -(a.lng)))))*60*1.1515,2)) <= ".GetSQLValueString($radius, 'double');
      $order = ' ORDER BY distance ASC, a.id DESC';
    }
    
    if (isset($params['orderBy']) && isset($params['orderType'])) {
      if ($params['orderBy'] !== 'distance') {
        $params['orderBy'] = 'a.'.$params['orderBy']; 
      }
      $order = ' ORDER BY '.$params['orderBy'].' '.$params['orderType'];
    }
    
    
    if (isset($params['customOrder'])) {
      $order = ' ORDER BY '.$params['customOrder'];
    }
  
    $Models_General = new Models_General();
    //$Models_General->setDebug(1);
    $page = (int) $page;
    $maxRows_rsView = $max;
    $pageNum_rsView = $page;
    $startRow_rsView = $pageNum_rsView * $maxRows_rsView;
    $query_rsView = 'select *, a.id as id '.$distance.' FROM '.$tableName.' as a LEFT JOIN '.$tagsTable.' as b ON a.id = b.id WHERE a.status = '.$status.' AND a.deleted = 0'.$distanceWhere;
    if (!empty($searchTerm)) {
      $query_rsView .= ' AND (b.tag LIKE '.$Models_General->qstr('%'.$searchTerm.'%').' OR a.title '.$Models_General->qstr('%'.$searchTerm.'%').' LIKE OR a.description LIKE '.$Models_General->qstr('%'.$searchTerm.'%').')';
    }
    if (isset($path)) {
      $query_rsView .= ' AND a.path = '.$Models_General->qstr($path);
    }
    if (!empty($params['uid'])) {
      $query_rsView .= ' AND a.uid = '.$Models_General->qstr($params['uid']);
    }

    if (!empty($params['i1'])) {
      $query_rsView .= ' AND a.i1 = '.$Models_General->qstr($params['i1']);
    }
    if (!empty($params['i2'])) {
      $query_rsView .= ' AND a.i2 = '.$Models_General->qstr($params['i2']);
    }
    if (!empty($params['i3'])) {
      $query_rsView .= ' AND a.i3 = '.$Models_General->qstr($params['i3']);
    }
    if (!empty($params['i4'])) {
      $query_rsView .= ' AND a.i4 = '.$Models_General->qstr($params['i4']);
    }
    if (!empty($params['d1'])) {
      $query_rsView .= ' AND a.d1 = '.$Models_General->qstr($params['d1']);
    }
    if (!empty($params['d2'])) {
      $query_rsView .= ' AND a.d2 = '.$Models_General->qstr($params['d2']);
    }
    if (!empty($params['d3'])) {
      $query_rsView .= ' AND a.d3 = '.$Models_General->qstr($params['d3']);
    }
    if (!empty($params['d4'])) {
      $query_rsView .= ' AND a.d4 = '.$Models_General->qstr($params['d4']);
    }
    if (!empty($params['vc1'])) {
      $query_rsView .= ' AND a.vc1 LIKE '.$Models_General->qstr('%'.$params['vc1'].'%');
    }
    if (!empty($params['vc2'])) {
      $query_rsView .= ' AND a.vc2 LIKE '.$Models_General->qstr('%'.$params['vc2'].'%');
    }
    if (!empty($params['vc3'])) {
      $query_rsView .= ' AND a.vc3 LIKE '.$Models_General->qstr('%'.$params['vc3'].'%');
    }
    if (!empty($params['vc4'])) {
      $query_rsView .= ' AND a.vc4 LIKE '.$Models_General->qstr('%'.$params['vc4'].'%');
    }
    if (!empty($params['t1'])) {
      $query_rsView .= ' AND a.t1 LIKE '.$Models_General->qstr('%'.$params['t1'].'%');
    }
    if (!empty($params['t2'])) {
      $query_rsView .= ' AND a.t2 LIKE '.$Models_General->qstr('%'.$params['t2'].'%');
    }
    if (!empty($params['t3'])) {
      $query_rsView .= ' AND a.t3 LIKE '.$Models_General->qstr('%'.$params['t3'].'%');
    }
    if (!empty($params['t4'])) {
      $query_rsView .= ' AND a.t4 LIKE '.$Models_General->qstr('%'.$params['t4'].'%');
    }
    
    if (!empty($params['parent_id'])) {
      $query_rsView .= ' AND a.parent_id = '.$Models_General->qstr($params['parent_id']);
    }
    if (!empty($params['reference_id'])) {
      $query_rsView .= ' AND a.reference_id = '.$Models_General->qstr($params['reference_id']);
    }
    
    $query_rsView .= ' GROUP BY a.id';
    $query_rsView .= $order;
    $query_limit_rsView = sprintf("%s LIMIT %d, %d", $query_rsView, $startRow_rsView, $maxRows_rsView);
    $results = $Models_General->fetchAll($query_limit_rsView, array(), $cacheTime);
    $sql1 = $Models_General->sql;
    $queryTotalRows = 'select COUNT(distinct a.id) AS cnt FROM '.$tableName.' as a LEFT JOIN '.$tagsTable.' as b ON a.id = b.id WHERE a.status = '.$status.' AND a.deleted = 0'.$distanceWhere;
    if (!empty($searchTerm)) {
      $queryTotalRows .= ' AND b.tag LIKE '.$Models_General->qstr('%'.$searchTerm.'%');
    }
    if (isset($path)) {
      $queryTotalRows .= ' AND a.path = '.$Models_General->qstr($path);
    }
    if (!empty($params['uid'])) {
      $queryTotalRows .= ' AND a.uid = '.$Models_General->qstr($params['uid']);
    }
    if (!empty($params['i1'])) {
      $queryTotalRows .= ' AND a.i1 = '.$Models_General->qstr($params['i1']);
    }
    if (!empty($params['i2'])) {
      $queryTotalRows .= ' AND a.i2 = '.$Models_General->qstr($params['i2']);
    }
    if (!empty($params['i3'])) {
      $queryTotalRows .= ' AND a.i3 = '.$Models_General->qstr($params['i3']);
    }
    if (!empty($params['i4'])) {
      $queryTotalRows .= ' AND a.i4 = '.$Models_General->qstr($params['i4']);
    }
    if (!empty($params['d1'])) {
      $queryTotalRows .= ' AND a.d1 = '.$Models_General->qstr($params['d1']);
    }
    if (!empty($params['d2'])) {
      $queryTotalRows .= ' AND a.d2 = '.$Models_General->qstr($params['d2']);
    }
    if (!empty($params['d3'])) {
      $queryTotalRows .= ' AND a.d3 = '.$Models_General->qstr($params['d3']);
    }
    if (!empty($params['d4'])) {
      $queryTotalRows .= ' AND a.d4 = '.$Models_General->qstr($params['d4']);
    }
    if (!empty($params['vc1'])) {
      $queryTotalRows .= ' AND a.vc1 LIKE '.$Models_General->qstr('%'.$params['vc1'].'%');
    }
    if (!empty($params['vc2'])) {
      $queryTotalRows .= ' AND a.vc2 LIKE '.$Models_General->qstr('%'.$params['vc2'].'%');
    }
    if (!empty($params['vc3'])) {
      $queryTotalRows .= ' AND a.vc3 LIKE '.$Models_General->qstr('%'.$params['vc3'].'%');
    }
    if (!empty($params['vc4'])) {
      $queryTotalRows .= ' AND a.vc4 LIKE '.$Models_General->qstr('%'.$params['vc4'].'%');
    }
    if (!empty($params['t1'])) {
      $queryTotalRows .= ' AND a.t1 LIKE '.$Models_General->qstr('%'.$params['t1'].'%');
    }
    if (!empty($params['t2'])) {
      $queryTotalRows .= ' AND a.t2 LIKE '.$Models_General->qstr('%'.$params['t2'].'%');
    }
    if (!empty($params['t3'])) {
      $queryTotalRows .= ' AND a.t3 LIKE '.$Models_General->qstr('%'.$params['t3'].'%');
    }
    if (!empty($params['t4'])) {
      $queryTotalRows .= ' AND a.t4 LIKE '.$Models_General->qstr('%'.$params['t4'].'%');
    }
    
    if (!empty($params['parent_id'])) {
      $queryTotalRows .= ' AND a.parent_id = '.$Models_General->qstr($params['parent_id']);
    }
    if (!empty($params['reference_id'])) {
      $queryTotalRows .= ' AND a.reference_id = '.$Models_General->qstr($params['reference_id']);
    }
    $rowCountResult = $Models_General->fetchRow($queryTotalRows, array(), $cacheTime);
    $sql2 = $Models_General->sql;
    $totalRows_rsView = $rowCountResult['cnt'];
    $totalPages_rsView = ceil($totalRows_rsView/$maxRows_rsView)-1;
    $return = array('results' => $results, 'max' => (int) $max, 'page' => (int) $page, 'totalRows' => (int) $totalRows_rsView, 'totalPages' => (int) $totalPages_rsView, 'start' => (int) $startRow_rsView, 'pageNum_rsView' => (int) $pageNum_rsView, 'params' => $params, 'sql1' => $sql1, 'sql2' => $sql2);
    return $return;
  }
  
  
function iptocity($ip)
{ //http://ipinfo.io/206.208.102.250
  $str = md5($ip);
  $folder = 'cache/iptocityipinfo_io_cache/'.substr($str, 0, 2);
  if (!is_dir($folder)) {
    mkdir($folder, 0755);
    chmod($folder, 0755);
  }
  $file = $folder.'/'.$str.'.txt';
  if (file_exists($file)) {
    return json_decode(file_get_contents($file), 1);
    exit;
  }

  $url = 'http://ipinfo.io/'.$ip;
  $string = curlget($url);
  $arr = array();
  $data = json_decode($string, 1);
  $arr['result']['ip'] = $data['ip'];
  $arr['result']['city'] = $data['city'];
  $arr['result']['region'] = $data['region'];
  $arr['result']['country'] = $data['country'];
  $tmp = explode(',', $data['loc']);
  $arr['result']['lat'] = $tmp[0];
  $arr['result']['lng'] = $tmp[1];
  $arr['result']['postal'] = $data['postal'];
  $arr['originalData'] = $data;
  $arr['xtras']['url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];
  $arr['xtras']['user_agent'] = $_SERVER['HTTP_USER_AGENT'];
  $arr['xtras']['referrer'] = !empty($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
  $arr['xtras']['date'] = date('r');
  $details = json_encode($arr);
  file_put_contents($file, $details);
  return $arr;
}


    if (!function_exists('pr')) {
        function pr($d){
            echo '<pre>';
            print_r($d);
            echo '</pre>';
        }
    }
    
  function validateAccessToken($token) {
    global $Models_General;
    $q = 'select * from access_tokens WHERE token = ?';
    $res = $Models_General->fetchRow($q, array($token), TIMESMALL);
    if (empty($res)) return false;
    return $res;
  }
  
  function getAccessToken($uid) {
    global $Models_General;
    $q = 'select * from access_tokens WHERE uid = ?';
    $res = $Models_General->fetchRow($q, array($uid), TIMESMALL);
    if (empty($res)) return false;
    return $res;
  }
  
  
function guid()
{
    mt_srand((double) microtime() * 10000);
    $charid = strtoupper(md5(uniqid(rand(), true)));
    $guid = substr($charid, 0, 8) . '-' .
            substr($charid, 8, 4) . '-' .
            substr($charid, 12, 4) . '-' .
            substr($charid, 16, 4) . '-' .
            substr($charid, 20, 12);
   return $guid;
}
