<?php
//http://api.mkgalaxy.com/handsome.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

try {
  include('init.php');
  //pre defined variables
  $return['success'] = 1;
  $return['url'] = !empty($_GET['url']) ? $_GET['url'] : '';
  $ip = !empty($_GET['ip']) ? $_GET['ip'] : $_SERVER['REMOTE_ADDR'];
  $return['data'] = iptocity($ip);
  mail('naveenkhanchandani@gmail.com', 'ip from '.$ip, var_export($return, 1));
} catch (Exception $e) {
  
}
echo 'Handsome';
exit;
?>