<?php
/*
URLS
city data
http://bootstrap.mkgalaxy.com/svnprojects/horo/api.php?action=findcitybyid&city_id=100002

nearby cities
http://api.mkgalaxy.com/api.php?action=nearby&lat=37.3393857&lng=-121.8949555

cityMatch using lat and lng
http://bootstrap.mkgalaxy.com/svnprojects/horo/api.php?action=cityMatch&lat=37.3393857&lng=-121.8949555

find city
http://bootstrap.mkgalaxy.com/svnprojects/horo/api.php?action=findCity&q=san+jose

match
http://bootstrap.mkgalaxy.com/svnprojects/horo/api.php?action=match&from[dob]=1974-06-05+12:30:00&from[zone_h]=5&from[zone_m]=30&from[lon_h]=72&from[lon_m]=49&from[lat_h]=18&from[lat_m]=57&from[dst]=0&from[lon_e]=1&from[lat_s]=0&to[dob]=2016-01-08+17:30:00&to[zone_h]=8&to[zone_m]=0&to[lon_h]=121&to[lon_m]=13&to[lat_h]=37&to[lat_m]=48&to[dst]=1&to[lon_e]=0&to[lat_s]=0

matchMultiple
http://bootstrap.mkgalaxy.com/svnprojects/horo/api.php?action=matchMultiple&data[0][from][dob]=1974-06-05+12:30:00&data[0][from][zone_h]=5&data[0][from][zone_m]=30&data[0][from][lon_h]=72&data[0][from][lon_m]=49&data[0][from][lat_h]=18&data[0][from][lat_m]=57&data[0][from][dst]=0&data[0][from][lon_e]=1&data[0][from][lat_s]=0&data[0][to][dob]=2016-01-08+17:30:00&data[0][to][zone_h]=8&data[0][to][zone_m]=0&data[0][to][lon_h]=121&data[0][to][lon_m]=13&data[0][to][lat_h]=37&data[0][to][lat_m]=48&data[0][to][dst]=1&data[0][to][lon_e]=0&data[0][to][lat_s]=0


http://bootstrap.mkgalaxy.com/svnprojects/horo/api.php?action=matchMultiple&data[0][from][dob]=1974-06-05+12:30:00&data[0][from][zone_h]=5&data[0][from][zone_m]=30&data[0][from][lon_h]=72&data[0][from][lon_m]=49&data[0][from][lat_h]=18&data[0][from][lat_m]=57&data[0][from][dst]=0&data[0][from][lon_e]=1&data[0][from][lat_s]=0&data[0][to][dob]=2016-01-08+17:30:00&data[0][to][zone_h]=8&data[0][to][zone_m]=0&data[0][to][lon_h]=121&data[0][to][lon_m]=13&data[0][to][lat_h]=37&data[0][to][lat_m]=48&data[0][to][dst]=1&data[0][to][lon_e]=0&data[0][to][lat_s]=0&data[1][from][dob]=1974-06-05+12:30:00&data[1][from][zone_h]=5&data[1][from][zone_m]=30&data[1][from][lon_h]=72&data[1][from][lon_m]=49&data[1][from][lat_h]=18&data[1][from][lat_m]=57&data[1][from][dst]=0&data[1][from][lon_e]=1&data[1][from][lat_s]=0&data[1][to][dob]=2015-01-08+17:30:00&data[1][to][zone_h]=8&data[1][to][zone_m]=0&data[1][to][lon_h]=121&data[1][to][lon_m]=13&data[1][to][lat_h]=37&data[1][to][lat_m]=48&data[1][to][dst]=1&data[1][to][lon_e]=0&data[1][to][lat_s]=0

Naks
http://bootstrap.mkgalaxy.com/svnprojects/horo/api.php?action=naks&lat=18.96&lng=72.82&dob=1974-6-5+12:30


NaksMatch
http://bootstrap.mkgalaxy.com/svnprojects/horo/api.php?action=naksMatch&naks1=18&naks2=19


matchLatLng
http://bootstrap.mkgalaxy.com/svnprojects/horo/api.php?action=matchLatLng&from[dob]=1974-06-05+12:30:00&from[lat]=18.96&from[lng]=72.82&to[dob]=2016-01-20+11:30:00&to[lat]=37.8047&to[lng]=-121.22

matchCityId
http://bootstrap.mkgalaxy.com/svnprojects/horo/api.php?action=matchCityId&from[dob]=1974-06-05+12:30:00&from[city_id]=18638&to[dob]=2016-01-20+11:30:00&to[city_id]=144075


continuityLatLng
http://bootstrap.mkgalaxy.com/svnprojects/horo/api.php?action=continuityLatLng&noOfDays=5&from[dob]=1974-06-05+12:30:00&from[lat]=18.96&from[lng]=72.82&to[dob]=2016-01-20+11:30:00&to[lat]=37.8047&to[lng]=-121.22

*/
$return = array();
$return['success'] = 1;
try {
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json'); 
include('conn.php');
include('Kundali.class.php');
include('general.php');
$modelGeneral = new Models_General();
include('geo.php');

include('functions.php');
include('functions_horo.php');





// code starts here
  
  $action = isset($_GET['action']) ? $_GET['action'] : null;
  if (empty($action)) {
    throw new Exception('missing action');
  }

  switch ($action) {
    case 'findcitybyid':
      if (empty($_GET['city_id'])) {
        throw new Exception('city_id is missing'); 
      }
      $return['data'] = findCity($_GET['city_id']);
      break;
    case 'nearby':
      if (empty($_GET['lat'])) {
        throw new Exception('lat is missing'); 
      }
      if (empty($_GET['lng'])) {
        throw new Exception('lng is missing'); 
      }
      $return['data'] = nearbyCities($_GET['lat'], $_GET['lng']);
      break;
    case 'cityMatch':
      if (empty($_GET['lat'])) {
        throw new Exception('lat is missing'); 
      }
      if (empty($_GET['lng'])) {
        throw new Exception('lng is missing'); 
      }
      $data = array_values(nearbyCities($_GET['lat'], $_GET['lng'], $radius=100, $order='distance', $limit=1));
      if (empty($data[0])) {
        throw new Exception('no city found');
      }
      $return['data'] = $return['data'] = findCity($data[0]['cty_id']);
      break;
    case 'findCity':
      if (empty($_GET['q'])) {
        throw new Exception('search Term q is missing'); 
      }
      $return['data'] = findCitySearch($_GET['q']);
      break;
    case 'match':
      if (empty($_REQUEST['from'])) {
        throw new Exception('from is missing'); 
      }
      if (empty($_REQUEST['to'])) {
        throw new Exception('to is missing'); 
      }
      $return['data'] = match($_REQUEST['from'], $_REQUEST['to']);
      break;
    case 'matchMultiple':
      if (empty($_REQUEST['data'])) {
        throw new Exception('data is missing'); 
      }
      $res = array();
      foreach ($_REQUEST['data'] as $k => $v) {
         $res[$k] = match($v['from'], $v['to']);
      }
      $return['data'] = $res;
      break;
    case 'naks':
      if (empty($_GET['lat'])) {
        throw new Exception('lat is missing'); 
      }
      if (empty($_GET['lng'])) {
        throw new Exception('lng is missing'); 
      }
      if (empty($_GET['dob'])) {
        throw new Exception('dob is missing'); 
      }
      $data = array_values(nearbyCities($_GET['lat'], $_GET['lng'], $radius=100, $order='distance', $limit=1));
      if (empty($data[0])) {
        throw new Exception('no city found');
      }
      $data2 = $return['data'] = findCity($data[0]['cty_id']);
      $data2['dob'] = $_GET['dob'];
      $return['data'] = findHoroInfo($data2);
      break;
    case 'naksMatch':
      if (empty($_GET['naks1'])) {
        throw new Exception('naks1 is missing'); 
      }
      if (empty($_GET['naks2'])) {
        throw new Exception('naks2 is missing'); 
      }
      $return['data'] = getPoints($_GET['naks1'], $_GET['naks2']);
      break;
    case 'matchLatLng':
      if (empty($_GET['from']['lat'])) {
        throw new Exception('from lat is missing'); 
      }
      if (empty($_GET['from']['lng'])) {
        throw new Exception('from lng is missing'); 
      }
      if (empty($_GET['from']['dob'])) {
        throw new Exception('from dob is missing'); 
      }
      if (empty($_GET['to']['lat'])) {
        throw new Exception('to lat is missing'); 
      }
      if (empty($_GET['to']['lng'])) {
        throw new Exception('to lng is missing'); 
      }
      if (empty($_GET['to']['dob'])) {
        throw new Exception('to dob is missing'); 
      }
      $return['data']['points'] = array();
      $dataFrom = array_values(nearbyCities($_GET['from']['lat'], $_GET['from']['lng'], $radius=100, $order='distance', $limit=1));
      if (empty($dataFrom[0])) {
        throw new Exception('from city missing');
      }
      $dataFrom2 = $return['data']['from'] = findCity($dataFrom[0]['cty_id']);
      $dataFrom2['dob'] = $_GET['from']['dob'];
      $return['data']['from']['horo'] = findHoroInfo($dataFrom2);
      $dataTo = array_values(nearbyCities($_GET['to']['lat'], $_GET['to']['lng'], $radius=100, $order='distance', $limit=1));
      if (empty($dataTo[0])) {
        throw new Exception('to city missing');
      }
      $dataTo2 = $return['data']['to'] = findCity($dataTo[0]['cty_id']);
      $dataTo2['dob'] = $_GET['to']['dob'];
      $return['data']['to']['horo'] = findHoroInfo($dataTo2);
      $return['data']['points'] = getPoints($return['data']['from']['horo'][9], $return['data']['to']['horo'][9]);
      break;
    case 'matchCityId':
      if (empty($_GET['from']['city_id'])) {
        throw new Exception('from city_id is missing'); 
      }
      if (empty($_GET['from']['dob'])) {
        throw new Exception('from dob is missing'); 
      }
      if (empty($_GET['to']['city_id'])) {
        throw new Exception('to city_id is missing'); 
      }
      if (empty($_GET['to']['dob'])) {
        throw new Exception('to dob is missing'); 
      }
      
      $return['data']['points'] = array();
      $dataFrom2 = $return['data']['from'] = findCity($_GET['from']['city_id']);
      $dataFrom2['dob'] = $_GET['from']['dob'];
      $return['data']['from']['horo'] = findHoroInfo($dataFrom2);
      $dataTo2 = $return['data']['to'] = findCity($_GET['to']['city_id']);
      $dataTo2['dob'] = $_GET['to']['dob'];
      $return['data']['to']['horo'] = findHoroInfo($dataTo2);
      $return['data']['points'] = getPoints($return['data']['from']['horo'][9], $return['data']['to']['horo'][9]);
      break;
    
    case 'continuityLatLng':
      if (empty($_GET['from']['lat'])) {
        throw new Exception('from lat is missing'); 
      }
      if (empty($_GET['from']['lng'])) {
        throw new Exception('from lng is missing'); 
      }
      if (empty($_GET['from']['dob'])) {
        throw new Exception('from dob is missing'); 
      }
      if (empty($_GET['to']['lat'])) {
        throw new Exception('to lat is missing'); 
      }
      if (empty($_GET['to']['lng'])) {
        throw new Exception('to lng is missing'); 
      }
      if (empty($_GET['to']['dob'])) {
        throw new Exception('to dob is missing'); 
      }
      if (empty($_GET['noOfDays'])) {
        throw new Exception('noOfDays is missing'); 
      }
      $return['data']['points'] = array();
      $dataFrom = array_values(nearbyCities($_GET['from']['lat'], $_GET['from']['lng'], $radius=100, $order='distance', $limit=1));
      if (empty($dataFrom[0])) {
        throw new Exception('from city missing');
      }
      $dataFrom2 = $return['data']['from'] = findCity($dataFrom[0]['cty_id']);
      $dataFrom2['dob'] = $_GET['from']['dob'];
      $dataTo = array_values(nearbyCities($_GET['to']['lat'], $_GET['to']['lng'], $radius=100, $order='distance', $limit=1));
      if (empty($dataTo[0])) {
        throw new Exception('to city missing');
      }
      $dataTo2 = $return['data']['to'] = findCity($dataTo[0]['cty_id']);
      $dataTo2['dob'] = $_GET['to']['dob'];
      $return['data'] = continuity($dataFrom2, $dataTo2, $_GET['noOfDays']);
      $return['data2']['from'] = $dataFrom2;
      $return['data2']['to'] = $dataTo2;
      break;
    
  }
  
} catch (Exception $e) {
  $return['success'] = 0;
  $return['error'] = 1;
  $return['errorMessage'] = $e->getMessage();
}
$return['get'] = $_GET;
//$return['actions'] = array('findcitybyid' => array('city_id'), 'nearby' => array('lat', 'lng'), 'cityMatch' => array('lat', 'lng'), 'match' => array('from', 'to'), 'findCity' => array('q'), 'matchMultiple' => array('data'), 'naks' => array('lat', 'lng', 'dob'), 'naksMatch' => array('naks1', 'naks2'));
echo json_encode($return);