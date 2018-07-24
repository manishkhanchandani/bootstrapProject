<?php

include('functions.php');

if (!empty($_POST['terms'])) {
	print_r($_POST);
	$r = iptocity($_SERVER['REMOTE_ADDR']);
	print_r($r);
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Terms &amp; Conditions</title>
</head>

<body>
<h1>Terms and Conditions For Group "Vax vs AntiVax"</h1>
<form id="form1" name="form1" method="post" action="">
    Your Name as on Facebook: 
    <label>
    <input name="name" type="text" id="name" size="55" />
    </label>
    <p>
        <label>
        <input name="terms" type="checkbox" id="terms" value="1" />
        </label>
    I agree to terms and conditions of the group</p>
    <p>
        <label>
        <input type="submit" name="Submit" value="Submit" />
        </label>
</p>
</form>
<p>&nbsp;</p>
</body>
</html>
