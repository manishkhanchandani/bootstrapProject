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
    define('DEFAULT_PATH', '/cityFriendship');
    $firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);
    $communityId = base64_encode('community');
    $personalsId = base64_encode('personals');
    $categories = array(
        $communityId => array('name' => 'community', 'parent_id' => 0, 'sorting' => 1,
                'child' => array(
                    base64_encode('activities') => array('name' => 'activities', 'parent_id' => $communityId, 'sorting' => 0),
                    base64_encode('artists') => array('name' => 'artists', 'parent_id' => $communityId, 'sorting' => 0),
                    base64_encode('childcare') => array('name' => 'childcare', 'parent_id' => $communityId, 'sorting' => 0),
                    base64_encode('classes') => array('name' => 'classes', 'parent_id' => $communityId, 'sorting' => 0),
                    base64_encode('events') => array('name' => 'events', 'parent_id' => $communityId, 'sorting' => 0),
                    base64_encode('general') => array('name' => 'general', 'parent_id' => $communityId, 'sorting' => 0),
                    base64_encode('groups') => array('name' => 'groups', 'parent_id' => $communityId, 'sorting' => 0),
                    base64_encode('local news') => array('name' => 'local news', 'parent_id' => $communityId, 'sorting' => 0),
                    base64_encode('lost+found') => array('name' => 'lost+found', 'parent_id' => $communityId, 'sorting' => 0),
                    base64_encode('musicians') => array('name' => 'musicians', 'parent_id' => $communityId, 'sorting' => 0),
                    base64_encode('pets') => array('name' => 'pets', 'parent_id' => $communityId, 'sorting' => 0),
                    base64_encode('politics') => array('name' => 'politics', 'parent_id' => $communityId, 'sorting' => 0),
                    base64_encode('rideshare') => array('name' => 'rideshare', 'parent_id' => $communityId, 'sorting' => 0),
                    base64_encode('volunteers') => array('name' => 'volunteers', 'parent_id' => $communityId, 'sorting' => 0),
                )
            ),
        $personalsId => array('name' => 'personals', 'parent_id' => 0, 'sorting' => 2,
                'child' => array(
                    base64_encode('women seek men') => array('name' => 'women seek men', 'parent_id' => $personalsId, 'sorting' => 1),
                    base64_encode('men seek women') => array('name' => 'men seek women', 'parent_id' => $personalsId, 'sorting' => 5),
                    base64_encode('men seek men') => array('name' => 'men seek men', 'parent_id' => $personalsId, 'sorting' => 10),
                    base64_encode('women seek women') => array('name' => 'women seek women', 'parent_id' => $personalsId, 'sorting' => 15)
                )),
        base64_encode('housing') => array('name' => 'housing', 'parent_id' => 0, 'sorting' => 3),
        base64_encode('for sale') => array('name' => 'for sale', 'parent_id' => 0, 'sorting' => 4),
        base64_encode('services') => array('name' => 'services', 'parent_id' => 0, 'sorting' => 5),
        base64_encode('jobs') => array('name' => 'jobs', 'parent_id' => 0, 'sorting' => 6),
        base64_encode('gigs') => array('name' => 'gigs', 'parent_id' => 0, 'sorting' => 7),
        base64_encode('resumes') => array('name' => 'resumes', 'parent_id' => 0, 'sorting' => 8),
    );







    $firebase->set(DEFAULT_PATH . '/categories', $categories);
    $result = array('success' => 1, 'msg' => '', 'data' => $categories); 
} catch (Exception $e) {
    $result = array('success' => 0, 'msg' => $e->getMessage());    
}
$txt = json_encode($result);
echo $txt;
exit;
?>