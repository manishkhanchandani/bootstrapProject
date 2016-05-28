<?php
define('IPSNIFF_URL', 'http://api.ipinfodb.com/v3/ip-city/?');
define('IPSNIFF_KEY', '0b3b2f8bd9f606ba8032ef0b9fbe054041788fb0f9d7c21214cd050a9b561845');

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


function iptocity($ip)
{
  $str = md5($ip);
  $folder = 'cache/iptocity_cache/'.substr($str, 0, 2);
  if (!is_dir($folder)) {
    mkdir($folder, 0755);
    chmod($folder, 0755);
  }
  $file = $folder.'/'.$str.'.txt';
  if (file_exists($file)) {
    return file_get_contents($file);
    exit;
  }

  $url = IPSNIFF_URL.'key='.IPSNIFF_KEY.'&ip='.$ip;
  $string = curlget($url);
  //$string = 'OK;;63.150.3.118;US;UNITED STATES;CALIFORNIA;SAN JOSE;95101;37.3169;-121.874;-08:00';
  $tmp = explode(';', $string);
  $arr = array();
  $arr['result']['ip'] = $ip;
  $arr['originalData'] = $tmp;
  $arr['xtras']['status'] = !empty($tmp[0]) ? trim($tmp[0]) : '';
  $arr['xtras']['text1'] = !empty($tmp[1]) ? trim($tmp[1]) : '';
  $arr['xtras']['ip'] = !empty($tmp[2]) ? trim($tmp[2]) : '';
  $arr['xtras']['countrycode'] = !empty($tmp[3]) ? trim($tmp[3]) : '';
  $arr['result']['country'] = !empty($tmp[4]) ? trim($tmp[4]) : '';
  $arr['result']['state'] = !empty($tmp[5]) ? trim($tmp[5]) : '';
  $arr['result']['city'] = !empty($tmp[6]) ? trim($tmp[6]) : '';
  $arr['result']['zip'] = !empty($tmp[7]) ? trim($tmp[7]) : '';
  $arr['result']['lat'] = !empty($tmp[8]) ? trim($tmp[8]) : '';
  $arr['result']['lon'] = !empty($tmp[9]) ? trim($tmp[9]) : '';
  $arr['xtras']['timezone'] = !empty($tmp[10]) ? trim($tmp[10]) : '';
  $arr['xtras']['url'] = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];
  $arr['xtras']['user_agent'] = $_SERVER['HTTP_USER_AGENT'];
  $arr['xtras']['referrer'] = !empty($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
  $details = json_encode($arr);
  file_put_contents($file, $details);
  return $details;
}

$ip = !empty($_GET['ip']) ? $_GET['ip'] : $_SERVER['REMOTE_ADDR'];
$ipDetails = iptocity($ip);
echo $ipDetails;
?>