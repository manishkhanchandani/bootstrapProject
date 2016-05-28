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
	
 	$conn = mysql_connect('localhost', 'consultl_user', 'passwords123') or die(mysql_error());
	mysql_select_db('consultl_forex', $conn) or die(mysql_error());

    include_once('firebase/firebaseLib.php');
    define('DEFAULT_URL', 'https://mycontacts12.firebaseio.com');
    define('DEFAULT_TOKEN', 'uPq4BLQKKvHqi83hfMFW0r4wvQFV6edFqdRJJl1Z');
    define('DEFAULT_PATH', '/horo');
    $firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);
	$arr = array();
    $result = array('success' => 1, 'msg' => '', 'arr' => $arr); 
} catch (Exception $e) {
    $result = array('success' => 0, 'msg' => $e->getMessage());    
}
$txt = json_encode($result);
echo $txt;
exit;
?>