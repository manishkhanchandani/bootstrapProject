<?php
//header and include files
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json'); 
define('TIMESMALL', 900);
define('TIMEBIG', (60*60*24*365));

include('connApi.php');
include('general.php');
include('functionsApi.php');
include_once('firebase/firebaseLib.php');

//my autoloader
function myautoload($class_name) {
   $classPath = implode('/', explode('_', $class_name));
   if (file_exists($classPath.'.class.php')) {
    include_once $classPath . '.class.php';
   }
}
spl_autoload_register('myautoload', true);

try { 
  $return = array();
  $return['success'] = 1;
  

  if (empty($_GET['action'])) {
    throw new Exception('empty action');
  }
  
  $className = 'nodes_'.$_GET['action'];
  $classPath = implode('/', explode('_', $className));

  if (!file_exists($classPath.'.class.php')) {
    throw new Exception('file does not exist');
  }
  
  $class = new $className();
  $return['data'] = $class->execute();
  
} catch (Exception $e) {
  $return['success'] = 0;
  $return['error'] = $e->getMessage();
}
echo json_encode($return);
?>