<?php
require_once('../../../../Connections/connBayAreaCont.php'); 
include('../functions.php');
$Models_General = new Models_General();

$result = array();
try {
  if (empty($_REQUEST['question'])) {
    throw new Exception('empty question'); 
  }
  if (empty($_REQUEST['name'])) {
    throw new Exception('empty name'); 
  }
  if (empty($_REQUEST['email'])) {
    throw new Exception('empty email'); 
  }
  
  $data = array();
  $data['question'] = $_REQUEST['question'];
  $data['name'] = $_REQUEST['name'];
  $data['email'] = $_REQUEST['email'];
  $data['status'] = 0;
  $id = $Models_General->addDetails('askquestion', $data);
  $result = array('success' => 1, 'msg' => 'Question submitted successfully', 'id' => $id, 'data' => $data); 
  mail($_REQUEST['email'], 'New Question Submitted on '.SITEURL, "\n\nFrom Name: ".$_REQUEST['name']."\n\nFrom Email: ".$_REQUEST['email']."\n\nQuestion: ".$_REQUEST['question'], 'From:'.FROMNAME.'<'.FROMEMAIL.'>');
  mail(ADMINEMAIL, 'New Question Submitted on '.SITEURL, "\n\nFrom Name: ".$_REQUEST['name']."\n\nFrom Email: ".$_REQUEST['email']."\n\nQuestion: ".$_REQUEST['question']."\n\nhttp://".SITEURL, 'From:'.FROMNAME.'<'.FROMEMAIL.'>');
} catch (Exception $e) {
  $result = array('success' => 0, 'msg' => $e->getMessage()); 
}
echo json_encode($result);
?>