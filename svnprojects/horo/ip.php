<?php


try {
  include('init.php');
  //pre defined variables
  $return['success'] = 1;
  $ip = !empty($_GET['ip']) ? $_GET['ip'] : $_SERVER['REMOTE_ADDR'];
  $return['data'] = iptocity($ip);
} catch (Exception $e) {
  $return['success'] = 0;
  $return['error'] = 1;
  $return['errorMessage'] = $e->getMessage();
}

echo json_encode($return);
?>