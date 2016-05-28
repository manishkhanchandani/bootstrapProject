<?php
$result = array();
if (!empty($_POST)) {
	$result = $_POST;
	$result['type'] = 'post';
} else {
	$result = $_GET;
	$result['type'] = 'get';
}
echo json_encode($result);
?>