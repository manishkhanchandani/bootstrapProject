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
	
	$query = "select * from getpoints";
	$res = mysql_query($query, $conn);
	$getPoints = array();
	while ($rec = mysql_fetch_array($res)) {
		$getPoints['num_'.$rec['from_number']]['num_'.$rec['to_number']] = $rec['points'];
	}
    $firebase->set(DEFAULT_PATH . '/getPoints', $getPoints);
	
	$naks = array("num_01" => "Aswini",	"num_02" => "Bharani", "num_03" => "Krittika", "num_03b" => "Krittika", "num_04" => "Rohini", "num_05" => "Mrigsira", "num_05b" => "Mrigsira", "num_06" => "Ardra", "num_07" => "Punarvasu", "num_07b" => "Punarvasu",
	"num_08" => "Pushya",	"num_09" => "Aslesha",	"num_10" => "Magha", "num_11" => "P.Phalguni","num_12" => "U.Phalguni", "num_12b" => "U.Phalguni",	"num_13" => "Hasta", "num_14" => "Chitra", "num_14b" => "Chitra",	"num_15" => "Swati", "num_16" => "Vishakha", "num_16b" => "Vishakha",
	"num_17" => "Anuradha", "num_18" => "Jyeshtha", "num_19" => "Mula", "num_20" => "P.Shadya",	"num_21" => "U.Shadya",	"num_21b" => "U.Shadya", "num_22" => "Shravana", "num_23" => "Dhanishtha", "num_23b" => "Dhanishtha",
	"num_24" => "Shatbisha",	 "num_25" => "P.Phadra",	 "num_25b" => "P.Phadra", "num_26" => "U.Phadra", "num_27" => "Revati");
    $firebase->set(DEFAULT_PATH . '/nakshtras', $naks);
    $result = array('success' => 1, 'msg' => '', 'getPoints' => $getPoints, 'naks' => $naks); 
} catch (Exception $e) {
    $result = array('success' => 0, 'msg' => $e->getMessage());    
}
$txt = json_encode($result);
echo $txt;
exit;
?>