<?php

    if (!function_exists('pr')) {
        function pr($d){
            echo '<pre>';
            print_r($d);
            echo '</pre>';
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
                $arr['http_code'] = curl_getinfo ( $ch, CURLINFO_HTTP_CODE );
                $arr['errorNo'] = curl_errno($ch);
                $arr['errorMsg'] = curl_error($ch);
                $arr['return_headers'] = curl_getinfo($ch);
                pr($arr);
		curl_close($ch);
		return $result;
	}
}
$requestUrl = 'https://test.salesforce.com/services/oauth2/token';
        $post = 'grant_type=password
                    &client_id=3MVG98RqVesxRgQ5INxb3OV48Up2o0FOvd2a20D0wWwJBA7VTow7hWacE2HMuqnO0oe33D1.cvGyIk9fOmbW2
                    &client_secret=4874918752988406919
                    &username=integration@shaklee.com.intdev
                    &password=$Shaklee1XFHw0DvNQr1iCbRfYu6DGfYu';





$result = curlget($requestUrl, 1, $post);
pr(json_decode($result, 1));
pr($result);
exit;