<?php
try {
  define("LOG_FILE", "./ipn_".date('Y-m-d').".log");
  include_once('../firebase/firebaseLib.php');
  define('DEFAULT_URL', 'https://mkgxy.firebaseio.com/projects');
  define('DEFAULT_TOKEN', 'vIthuXgIYof6rBxZknp2Y5XR0fLRwKT5ZFIclunM');
  define('MAIN_PATH', '/forex');
  $firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);
  include_once('../functions.php');
  error_log(date('[Y-m-d H:i e] '). "post  ".var_export($_POST, 1). PHP_EOL, 3, LOG_FILE);
  error_log(date('[Y-m-d H:i e] '). "get  ".var_export($_GET, 1). PHP_EOL, 3, LOG_FILE);
  pr($_GET);
  if (!empty($_GET)) {
    $record = $_GET;
    $path = MAIN_PATH . '/' . $_GET['currency'] .'/'.date('Y-m-d').'/'.$_GET['period'];
    $firebase->set($path, $record);
  }
} catch (Exception $e) {
  
}