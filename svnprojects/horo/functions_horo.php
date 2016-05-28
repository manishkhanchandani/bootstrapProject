<?php
function nearbyCities($lat, $lon, $radius=100, $order='distance', $limit=30)
{
  $geo = new Models_Geo();
  $nearby = $geo->get_nearby_cities($lat, $lon, $radius, $order, $limit);
  return $nearby;
}

  
function findCity($city_id, $nearbyResults=false)
{
  $geo = new Models_Geo();
  global $modelGeneral;
  $cityDetails = $geo->cityDetail($city_id);
  if (empty($cityDetails)) {
    return false;
  }
  $cityDetails['sql'] = $geo->sql;
  $lat = !empty($cityDetails['latitude']) ? $cityDetails['latitude']: null;
  $lon = !empty($cityDetails['longitude']) ? $cityDetails['longitude']: null;
  $radius = 30;
  $order = 'distance';
  $limit = 30;
  if ($nearbyResults) {
    if (empty($lat) || empty($lon)) {
      $cityDetails['nearby'] = array();
    } else {
      $cityDetails['nearby'] = $geo->get_nearby_cities($lat, $lon, $radius, $order, $limit);
    }
  }
  if (empty($cityDetails['extraDetails'])) {
    $etc = fetchCityXtraDetails($lat, $lon);
    if (!empty($etc)) {
      $d = array();
      $d['extraDetails'] = json_encode($etc);
      $d['lat_h'] = $etc['location']['lat_h'];
      $d['lat_m'] = $etc['location']['lat_m'];
      $d['lat_s'] = $etc['location']['lat_s'];
      $d['lon_h'] = $etc['location']['lon_h'];
      $d['lon_m'] = $etc['location']['lon_m'];
      $d['lon_e'] = $etc['location']['lon_e'];
      $d['zone_h'] = $etc['location']['zone_h'];
      $d['zone_m'] = $etc['location']['zone_m'];
      $d['dst'] = $etc['location']['dst'];
      $d['rawOffset'] = $etc['timezone']['rawOffset'];
      $d['dstOffset'] = $etc['timezone']['dstOffset'];
      $cityDetails = array_merge($cityDetails, $d);
      $where = sprintf('cty_id = %s', $modelGeneral->qstr($cityDetails['id']));
      $modelGeneral->updateDetails('geo_cities', $d, $where);
      $modelGeneral->clearCache($cityDetails['sql']);
    }
  } else {
    $etc = json_decode($cityDetails['extraDetails'], 1);
  }
  $cityDetails['etc'] = $etc;
  $cityDetails['url'] = HTTPPATH.'/city-'.url_name_v2($cityDetails['city']).'-'.$cityDetails['id'];
  $cityDetails['pageTitle'] = $cityDetails['city'].', '.$cityDetails['statename'].', '.$cityDetails['countryname'];
  return $cityDetails;
}


  function fetchCityXtraDetails($lat, $lon)
  {
    $etc = array();
    try {
      if (empty($lat) || empty($lon)) {
        throw new Exception('lat, lon empty');
      }
      $etc['timezone'] = getdetailsonlatlon($lat, $lon);
      if (empty($etc['timezone'])) {
        throw new Exception('empty details');
      }
      if ($etc['timezone']['rawOffset'] != $etc['timezone']['dstOffset']) {
        $etc['location']['dst'] = 1;
      } else {
        $etc['location']['dst'] = 0;
      }
      $etc['dd2dms'] = dd2dms($lat, $lon);
      $etc['location']['lat_h'] = $etc['dd2dms'][2];
      $etc['location']['lat_m'] = $etc['dd2dms'][4];
      $etc['location']['lat_s'] = ($etc['dd2dms'][0] == 'S') ? 1 : 0;
      $etc['location']['lon_h'] = $etc['dd2dms'][3];
      $etc['location']['lon_m'] = $etc['dd2dms'][5];
      $etc['location']['lon_e'] = ($etc['dd2dms'][1] == 'E') ? 1 : 0;
      $zones = makeTime(abs($etc['timezone']['rawOffset']));
      $etc['location']['zone_h'] = $zones[0];
      $etc['location']['zone_m'] = $zones[1];
    } catch (Exception $e) {
      $etc = array();
    }
    return $etc;
  }

  function makeTime($num) {
    $returnnum = array();
    if ($num) {
      $returnnum[0] = (int) $num;
      $num -= (int) $num; 
      $num *= 60;
      $returnnum[1] = (int) $num;
      $num -= (int) $num; 
      $num *= 60;
      $returnnum[2] = (int) $num;
    }
  
    return $returnnum;
  }
  
function getdetailsonlatlon($lat, $lon)
{
  $url = "http://wc5.org/api/v1/fetch.php?timezone=1&lat=".$lat."&lng=".$lon;
  $c = @file_get_contents($url);
  $json = json_decode($c, 1);
  return $json;
}
function dd2dms($lat, $lon)
	{
		$returnArr = array();
		if (substr($lat, 0, 1) == '-') {
			$ddLatVal = substr($lat, 1, (strlen($lat) - 1));
			$ddLatType = 'S';
		} else {
			$ddLatVal = $lat;
			$ddLatType = 'N';
		}
		$returnArr[0] = $ddLatType;
		if (substr($lon, 0, 1) == '-') {
			$ddLongVal = substr($lon, 1, (strlen($lon) - 1));
			$ddLonType = 'W';
		} else {
			$ddLongVal = $lon;
			$ddLonType = 'E';
		}
		$returnArr[1] = $ddLonType;
		// degrees = degrees
		$ddLatVals = explode('.', $ddLatVal);
		$dmsLatDeg = $ddLatVals[0];
		$returnArr[2] = $dmsLatDeg;
		
		$ddLongVals = explode('.', $ddLongVal);
		$dmsLongDeg = $ddLongVals[0];
		$returnArr[3] = $dmsLongDeg;
		
		// * 60 = mins
		$ddLatRemainder  = (float) ("0." . $ddLatVals[1]) * 60;
		$dmsLatMinVals   = explode('.', $ddLatRemainder);
		$dmsLatMin = $dmsLatMinVals[0];
		$returnArr[4] = $dmsLatMin;

		$ddLongRemainder  = (float) ("0." . $ddLongVals[1]) * 60;
		$dmsLongMinVals   = explode('.', $ddLongRemainder);
		$dmsLongMin = $dmsLongMinVals[0];
		$returnArr[5] = $dmsLongMin;
		
		// * 60 again = secs
		$ddLatMinRemainder = ("0." . $dmsLatMinVals[1]) * 60;
		$dmsLatSec   = round($ddLatMinRemainder);
		$returnArr[6] = $dmsLatSec;
    if (empty($dmsLongMinVals[1])) $dmsLongMinVals[1] = 0;
		$ddLongMinRemainder = ("0." . $dmsLongMinVals[1]) * 60;
		$dmsLongSec   = round($ddLongMinRemainder);
		$returnArr[7] = $dmsLongSec;
		return $returnArr;
	}


function getDateTime($date)
{
  $return = array();
  $tmp = explode(' ', $date);
  $date = $tmp[0];
  $time = $tmp[1];
  $tmp = explode('-', $date);
  $month = $tmp[1];
  $day = $tmp[2];
  $year = $tmp[0];
  $tmp = explode(':', $time);
  $hour = $tmp[0];
  $minute = $tmp[1];
  $return['day'] = $day;
  $return['month'] = $month;
  $return['year'] = $year;
  $return['hour'] = $hour;
  $return['minute'] = $minute;
  return $return;
}



function calculateDistance($latitude1, $longitude1, $latitude2, $longitude2) {
    $theta = $longitude1 - $longitude2;
    $miles = (sin(deg2rad($latitude1)) * sin(deg2rad($latitude2))) + (cos(deg2rad($latitude1)) * cos(deg2rad($latitude2)) * cos(deg2rad($theta)));
    $miles = acos($miles);
    $miles = rad2deg($miles);
    $miles = $miles * 60 * 1.1515;
    return $miles; 
}


function findHoroInfo($data)
{
  if (empty($data['dob'])) {
    return false;
  }
  $Kundali = new Library_Kundali();
  $fromDate = getDateTime($data['dob']);
  $returnArrFrom = $Kundali->precalculate($fromDate['month'], $fromDate['day'], $fromDate['year'], $fromDate['hour'], $fromDate['minute'], $data['zone_h'], $data['zone_m'], $data['lon_h'], $data['lon_m'], $data['lat_h'], $data['lat_m'], $data['dst'], $data['lon_e'], $data['lat_s']);
  return $returnArrFrom;
}

function match($from, $to)
{
  $d = array();
  $d['from'] = findHoroInfo($from);
  $d['to'] = findHoroInfo($to);
  $Kundali = new Library_Kundali();
  $d['points'] = $Kundali->getpoints($d['from'][9], $d['to'][9]);
  $d['results'] = $Kundali->interpret($d['points']);
  return $d;
}

function getPoints($naks1, $naks2) {
  $d = array();
  $Kundali = new Library_Kundali();
  $d['points'] = $Kundali->getpoints($naks1, $naks2);
  $d['results'] = $Kundali->interpret($d['points']);  
  return $d;
}


function findCitySearch($searchTerm) {
  $geo = new Models_Geo();
  $cities = $geo->findCityDetails($searchTerm, 1);
  return $cities;
  
}


function continuity($dataFrom2, $dataTo2, $noOfDays=5) {
  $fromDate = getDateTime($dataTo2['dob']);
  $date = $fromDate['year'].'-'.$fromDate['month'].'-'.$fromDate['day'];
  $past = '';
  $returnResult = array();
  $horo1 = findHoroInfo($dataFrom2);
  for($counter = 0; $counter < $noOfDays; $counter++) {
      $day = date('d', strtotime("$date +$counter day"));
      $month = date('m', strtotime("$date +$counter day"));
      $year = date('Y', strtotime("$date +$counter day"));
      for ($j = 0; $j < 24; $j = $j + 1) {
        $hour = $j;
        $dob = $year.'-'.$month.'-'.$day.' '.$hour.':00:00';
        $dataTo2['dob'] = $dob;
        $horo2 = findHoroInfo($dataTo2);
        $points = getPoints($horo1[9], $horo2[9]);
        if ($past == $horo2[9]) {
            continue;
        } else {
            $past = $horo2[9];
        }
        $returnResult[] = array('date' => $dob, 'result' => $points);
      }
  }
  return $returnResult;
}//end continuity
