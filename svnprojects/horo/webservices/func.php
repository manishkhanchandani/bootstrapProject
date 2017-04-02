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
                $arr['http_code'] = curl_getinfo ( $ch, CURLINFO_HTTP_CODE );
                $arr['errorNo'] = curl_errno($ch);
                $arr['errorMsg'] = curl_error($ch);
                $arr['return_headers'] = curl_getinfo($ch);
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

function iptocity($ip)
{ //http://ipinfo.io/206.208.102.250
  $str = md5($ip);
  $folder = '../cache/iptocityipinfo_io_cache/'.substr($str, 0, 2);
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
  //$arr['xtras']['url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];
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
