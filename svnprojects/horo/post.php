<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json'); 
$array = array('success' => 1, 'msg' => 'successfully submitted', 'post' => $_POST);
echo json_encode($array);
exit;
?>