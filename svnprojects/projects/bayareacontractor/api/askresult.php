<?php
require_once('../../../../Connections/connBayAreaCont.php'); 
include('../functions.php');
$Models_General = new Models_General();

$result = array();
try {
  $page = 0;
  if (!empty($_GET['page'])) {
    $page = $_GET['page'];
  }
  $max = 5;
  $data = $Models_General->ask($max, $page, 1, 0);
  $result = array('success' => 1, 'data' => $data); 
} catch (Exception $e) {
  $result = array('success' => 0, 'msg' => $e->getMessage()); 
}

echo json_encode($result);
?>