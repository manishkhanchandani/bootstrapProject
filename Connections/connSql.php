<?php
# FileName="Connection_php_mysql.htm"
# Type="MYSQL"
# HTTP="true"
$hostname_connSql = "localhost";
$database_connSql = "consultl_islam";
$username_connSql = "consultl_user";
$password_connSql = "passwords123";
$connSql = mysql_connect($hostname_connSql, $username_connSql, $password_connSql) or trigger_error(mysql_error(),E_USER_ERROR); 
?>