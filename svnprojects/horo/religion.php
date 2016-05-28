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
    case 'saveReligion':
      ///religion/all
      ///religion/sections/id
      $DbTools = new DbTools();
      $_REQUEST['path'] = '/religion/all';
      $arr = $DbTools->add($tableName, $tableTag, $_REQUEST);
      if (empty($arr['id'])) {
        throw new Exception('could not create, please try again later');  
      }
      $id = $arr['id'];
      $d = array();
      $d['path'] = '/religion/sections/'.$id;
      $d['title'] = 'General';
      $d['appr'] = 1;
      $arr2 = $DbTools->add($tableName, $tableTag, $d);
      $arr['sections'] = $arr2;
      $return['data'] = $arr;
      break;
    default:
      break;
  }
  
} catch (Exception $e) {
  $return['success'] = 0;
  $return['error'] = 1;
  $return['errorMessage'] = $e->getMessage();
}
$return['get'] = $_GET;
$return['post'] = $_POST;
echo json_encode($return);