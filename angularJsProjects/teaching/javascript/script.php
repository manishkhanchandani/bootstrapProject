<?php
$result = array();
if (!empty($_POST)) {
	$result = $_POST;
	$result['type'] = 'post';
	echo json_encode($result);	
} else {
	$result = $_GET;
	$result['type'] = 'get';
	echo json_encode($result);	
}
?>