<?php
function pr($d) {
    echo '<pre>';
    print_r($d);
    echo '</pre>';    
}

$return = array();
$return[] = 'method: ';
$return[] = $_SERVER['REQUEST_METHOD'];


$return[] = 'GET: ';
$return[] = $_GET;

$return[] = 'POST: ';
$return[] = $_POST;

$data = file_get_contents("php://input");
$return[] = 'data: ';
$return[] = ($data);
echo json_encode($return);
?>