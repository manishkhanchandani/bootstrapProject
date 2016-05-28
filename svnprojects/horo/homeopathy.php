<?php
/*
API URLS


*/
try {
  include('init.php');
  //pre defined variables
  
  if (empty($_GET['action'])) {
    throw new Exception('empty action'); 
  }
  $res = validateAccessToken($_REQUEST['access_token']);
  $return['uid'] = null;
  if (!empty($res)) {
    define('UID', $res['uid']); 
    $return['uid'] = $res['uid'];
  }
  
  
  
  switch ($_GET['action']) {
    //http://bootstrap.mkgalaxy.com/svnprojects/horo/homeopathy.php?action=diseases
    case 'diseases':
      $Homeopathy = new Homeopathy();
      $diseases = $Homeopathy->getDiseases();
      $return['data'] = $diseases;
      break;
    //http://bootstrap.mkgalaxy.com/svnprojects/horo/homeopathy.php?action=queryDisease&disease_id=1
    case 'queryDisease':
      if (empty($_GET['disease_id'])) {
        throw new Exception('disease_id is missing'); 
      }
      $Homeopathy = new Homeopathy();
      $result = $Homeopathy->queryDisease($_GET['disease_id']);
      $return['data'] = $result;
      break;
    //http://bootstrap.mkgalaxy.com/svnprojects/horo/homeopathy.php?action=queryDiseaseAll
    case 'queryDiseaseAll':
      $Homeopathy = new Homeopathy();
      $result = $Homeopathy->queryDiseaseAll();
      $return['data'] = $result;
      break;
    //http://bootstrap.mkgalaxy.com/svnprojects/horo/homeopathy.php?action=findRemedy&disease_id=36&tongue_id=51&tcd_id=190
    //http://bootstrap.mkgalaxy.com/svnprojects/horo/homeopathy.php?action=findRemedy&disease_id=36&tongue_id=51
    //we should have either of pulse_id or tongue_id or tcd_id or combination of 1 and more
    case 'findRemedy':
      if (empty($_GET['disease_id'])) {
        throw new Exception('disease_id is missing'); 
      }
      if (empty($_GET['pulse_id']) && empty($_GET['tongue_id']) && empty($_GET['tcd_id'])) {
        throw new Exception('pulse or tongue or tcd is missing'); 
      }
      $Homeopathy = new Homeopathy();
      $result = $Homeopathy->findRemedy($_GET['disease_id'], $_GET['pulse_id'], $_GET['tongue_id'], $_GET['tcd_id']);
      $return['data'] = $result;
      break;
    default:
      break;
  }
  
} catch (Exception $e) {
  $return['success'] = 0;
  $return['error'] = 1;
  $return['errorMessage'] = $e->getMessage();
}

echo json_encode($return);