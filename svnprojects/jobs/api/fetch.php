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
    include_once('firebase/firebaseLib.php');
    define('DEFAULT_URL', 'https://mycontacts12.firebaseio.com');
    define('DEFAULT_TOKEN', 'uPq4BLQKKvHqi83hfMFW0r4wvQFV6edFqdRJJl1Z');
    define('DEFAULT_PATH', '/jobs');
    $firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);
    

    if (empty($_GET['location'])) {
        throw new Exception('empty location');
    }
    if (!empty($_GET['q'])) {
        $kw = strtolower($_GET['q']);
    }
    $startRow_rsView = 0;
    if (!empty($_GET['start'])) {
        $startRow_rsView = $_GET['start'];
    }

    $location = $_GET['location'];
    $url = 'http://api.indeed.com/ads/apisearch?publisher=5171288687589967&l='.urlencode($location).'&sort=&radius=100&st=&jt=&start='.$startRow_rsView.'&limit=25&fromage=&filter=&latlong=1&co=us&chnl=&userip='.$_SERVER['REMOTE_ADDR'].'&v=2';//&format=json
    if (!empty($kw)) {
      $url .= '&q='.urlencode($kw);
    }
    $dir = 'cache/'.date('Y-m-d');
    if (!is_dir($dir)) {
        mkdir($dir, 0755); 
        chmod($dir, 0755);    
    }
    $file = $dir.'/file_'.md5($location.date('Y-m-d').$startRow_rsView.$kw).'.txt';
    if (file_exists($file)) {
        $txt = file_get_contents($file);
        echo $txt;
        exit;
    }
    $res = curlget($url);
    $results = simplexml_load_string($res);
    $return = array();
    $return['query'] = sprintf("%s", $results->query);
    $query = base64_encode($return['query']);
    if (empty($return['query'])) {
        $return['query'] = 'empty'; 
        $query = $return['query'];
    }
    $return['url'] = $url;
    $return['location'] = sprintf("%s", $results->location);
    $return['totalresults'] = sprintf("%s", $results->totalresults);
    $return['start'] = sprintf("%s", $results->start);
    $return['end'] = sprintf("%s", $results->end);
    $return['radius'] = sprintf("%s", $results->radius);
    $return['pageNumber'] = sprintf("%s", $results->pageNumber);
    if ($return['totalresults'] > 0) {
        foreach ($results->results->result as $k => $v) {
            $date = sprintf("%s", $v->date);
            $jobkey = sprintf("%s", $v->jobkey);
            $country = base64_encode(strtolower(sprintf("%s", $v->country)));
            $city = base64_encode(strtolower(sprintf("%s", $v->city)));
            $state = base64_encode(strtolower(sprintf("%s", $v->state)));
            $biz = array(
                'jobtitle' => sprintf("%s", $v->jobtitle),
                'company' => sprintf("%s", $v->company),
                'city' => sprintf("%s", $v->city),
                'state' => sprintf("%s", $v->state),
                'country' => sprintf("%s", $v->country),
                'formattedLocation' => sprintf("%s", $v->formattedLocation),
                'source' => sprintf("%s", $v->source),
                'date' => $date,
                'timestamp' => strtotime($date),
                //'timestampDate' => date('r', strtotime($date)),
                'snippet' => sprintf("%s", $v->snippet),
                'url' => sprintf("%s", $v->url),
                'latitude' => sprintf("%s", $v->latitude),
                'longitude' => sprintf("%s", $v->longitude),
                'jobkey' => $jobkey,
                'sponsored' => sprintf("%s", $v->sponsored),
                'expired' => sprintf("%s", $v->expired),
                'indeedApply' => sprintf("%s", $v->indeedApply),
                'formattedLocationFull' => sprintf("%s", $v->formattedLocationFull),
                'formattedRelativeTime' => sprintf("%s", $v->formattedRelativeTime),
                'custom_date' => date('Y-m-d H:i:s', strtotime($date))
            );
            $return['results'][$jobkey] = $biz;
            $firebase->set(DEFAULT_PATH . '/listing/'.$jobkey, $biz);
            $firebase->set(DEFAULT_PATH . '/locations/country/'.$country, strtolower(sprintf("%s", $v->country)));
            $firebase->set(DEFAULT_PATH . '/locations/state/'.$state, strtolower(sprintf("%s", $v->state)));
            $firebase->set(DEFAULT_PATH . '/locations/city/'.$city, strtolower(sprintf("%s", $v->city)));
            $firebase->set(DEFAULT_PATH . '/keywords/'.$query, $return['query']);
            $firebase->set(DEFAULT_PATH . '/keywordwise/'.$query.'/'.$jobkey, true);
            $firebase->set(DEFAULT_PATH . '/countrywise/'.$country.'/'.$query.'/'.$jobkey, true);
            $firebase->set(DEFAULT_PATH . '/statewise/'.$country.'/'.$state.'/'.$query.'/'.$jobkey, true);
            $firebase->set(DEFAULT_PATH . '/citywise/'.$country.'/'.$state.'/'.$city.'/'.$query.'/'.$jobkey, true);
        }
    }
    $result = array('success' => 1, 'msg' => '', 'data' => $return); 
} catch (Exception $e) {
    $result = array('success' => 0, 'msg' => $e->getMessage());    
}
$txt = json_encode($result);
file_put_contents($file, $txt);
echo $txt;
exit;
?>