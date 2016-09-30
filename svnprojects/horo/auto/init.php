<?php
//header and include files
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json'); 
define('TIMESMALL', 900);
define('TIMEBIG', (60*60*24*365));


$return = array();
$return['success'] = 1;
  
include('connClasses.php');
include('general.php');
$Models_General = new Models_General();
include('functions.php');

//my autoloader
function myautoload($class_name) {
   $classPath = implode('/', explode('_', $class_name));
   if (file_exists($classPath.'.class.php')) {
    include_once $classPath . '.class.php';
   }
}
spl_autoload_register('myautoload', true);
?>