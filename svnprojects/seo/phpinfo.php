<?php
echo $_SERVER['HTTP_USER_AGENT'];
print_r($_GET);
echo $_SERVER['REQUEST_URI'];
echo '<pre>';
print_r($_SERVER);
echo '</pre>';
phpinfo();
?>