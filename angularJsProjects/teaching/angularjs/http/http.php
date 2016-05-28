<?php
echo 'post vars: ';
$data = file_get_contents("php://input");
print_r($data);
print_r($_POST);
?>