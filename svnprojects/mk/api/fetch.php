<?php
try {
 
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
    
    
    if (!function_exists('pr')) {
        function pr($d){
            echo '<pre>';
            print_r($d);
            echo '</pre>';
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



    include_once('firebase/firebaseLib.php');
    define('DEFAULT_URL', 'https://mycontacts12.firebaseio.com');
    define('DEFAULT_TOKEN', 'uPq4BLQKKvHqi83hfMFW0r4wvQFV6edFqdRJJl1Z');
    define('DEFAULT_PATH', '/api');
    $firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);
    //http://bootstrap.mkgalaxy.com/svnprojects/mk/api/fetch.php?action=get&path=/test/test1
	  $arr = array();
    if (empty($_GET['action'])) {
      throw new Exception('empty action'); 
    }
    if (empty($_GET['path'])) {
      throw new Exception('empty path'); 
    }
    
    $path = DEFAULT_PATH.$_GET['path'];
    header('Content-Type: application/json');
    
    switch ($_GET['action']) {
      case 'set':
        if (empty($_REQUEST['data'])) {
          throw new Exception('empty data'); 
        }
        $data = $_REQUEST['data'];
        if (!is_array($data)) {
          $data = json_decode($_REQUEST['data'], 1);
        }
        if (!empty($_REQUEST['saveIP'])) {
          $ip = !empty($_REQUEST['ip']) ? $_REQUEST['ip'] : $_SERVER['REMOTE_ADDR'];
          $ipDetails = iptocity($ip);
          if (!empty($ipDetails['result'])) {
            $data['currentLocation'] = $ipDetails['result']; 
          }
        }
        $firebase->set($path, $data);   // stores data in Firebase
        break;
      case 'get':
        $arr = $firebase->get($path);  // reads a value from Firebase
        $arr = json_decode($arr, 1);
        break;
      case 'delete':
        $firebase->delete($path);        // deletes value from Firebase
        break;
      case 'update':
        if (empty($_REQUEST['data'])) {
          throw new Exception('empty data'); 
        }
        $data = $_REQUEST['data'];
        if (!is_array($data)) {
          $data = json_decode($_REQUEST['data'], 1);
        }
        if (!empty($_REQUEST['saveIP'])) {
          $ip = !empty($_REQUEST['ip']) ? $_REQUEST['ip'] : $_SERVER['REMOTE_ADDR'];
          $ipDetails = iptocity($ip);
          if (!empty($ipDetails['result'])) {
            $data['currentLocation'] = $ipDetails['result'];
          }
        }
        $firebase->update($path, $data); // updates data in Firebase
        break;
      case 'push':
        if (empty($_REQUEST['data'])) {
          throw new Exception('empty data'); 
        }
        $data = $_REQUEST['data'];
        if (!is_array($data)) {
          $data = json_decode($_REQUEST['data'], 1);
        }
        if (!empty($_REQUEST['saveIP'])) {
          $ip = !empty($_REQUEST['ip']) ? $_REQUEST['ip'] : $_SERVER['REMOTE_ADDR'];
          $ipDetails = iptocity($ip);
          if (!empty($ipDetails['result'])) {
            $data['currentLocation'] = $ipDetails['result']; 
          }
        }
        $firebase->push($path, $data);   // push data to Firebase 
        break;
    }
    $result = array('success' => 1, 'arr' => $arr); 
} catch (Exception $e) {
    $result = array('success' => 0, 'msg' => $e->getMessage());    
}
$txt = json_encode($result);
echo $txt;
exit;
?>