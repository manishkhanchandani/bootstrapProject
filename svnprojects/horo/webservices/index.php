<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json'); 

include_once('constants.php');

//my autoloader
function myautoload($class_name) {
   $classPath = 'classes/'.implode('/', explode('_', $class_name));

   if (file_exists($classPath.'.class.php')) {
    include_once $classPath . '.class.php';
   }
}

spl_autoload_register('myautoload', true);

$return = array();
$return['success'] = 1;

//variables
$return['data'] = array();
$_reserve = array();
$get = $_GET;
if (isset($get['p'])) unset($get['p']);
$post = $_POST;
$postJson = file_get_contents('php://input');
$requestMethod = $_SERVER['REQUEST_METHOD'];
$return['requestMethod'] = $requestMethod;

if(empty($postJson)) $postJson = array();
else $postJson = json_decode($postJson, 1);

try {
  include('conn.php');
  include('func.php');
  
  $General = new General();
  
  $defaultPage = 'home';
  $page = $defaultPage;
  if (!empty($_GET['p'])) {
    $page = $_GET['p'];
  }
  $page = 'modules/'.$page.'.php';
  if (!file_exists($page)) {
    $page = 'modules/'.$defaultPage.'.php';
  }
  
  include_once($page);
  //get ip and location details of the user
  //$_reserve['ip'] = iptocity($_SERVER['REMOTE_ADDR']);
} catch (Exception $e) {
  $return['success'] = 0;
  $return['error'] = 1;
  $return['errorMessage'] = $e->getMessage();
}
$return['get'] = $get;
$return['post'] = $post;
$return['postJson'] = $postJson;
$return['_reserve'] = $_reserve;
echo json_encode($return);
?>