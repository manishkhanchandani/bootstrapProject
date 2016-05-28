<?php
define('SITEDIR', dirname(__FILE__));
define('COOKIE_FILE_PATH', SITEDIR.'/cache');


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
{ //http://ipinfo.io/206.208.102.250
 $str = md5($ip);
 $folder = 'cache/iptocityipinfo_io_cache/'.substr($str, 0, 2);
 if (!is_dir($folder)) {
   mkdir($folder, 0755);
   chmod($folder, 0755);
 }
 $file = $folder.'/'.$str.'.txt';
 if (file_exists($file)) {
   return file_get_contents($file);
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
 return $details;
}

$ip = !empty($_GET['ip']) ? $_GET['ip'] : $_SERVER['REMOTE_ADDR'];
$ipDetails = iptocity($ip);
echo $ipDetails;
?>