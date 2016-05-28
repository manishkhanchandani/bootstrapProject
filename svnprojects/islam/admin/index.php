<?php require_once('../../../Connections/connSql.php'); ?>
<?php
if (!function_exists("GetSQLValueString")) {
function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
{
  if (PHP_VERSION < 6) {
    $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
  }

  $theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);

  switch ($theType) {
    case "text":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;    
    case "long":
    case "int":
      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
      break;
    case "double":
      $theValue = ($theValue != "") ? doubleval($theValue) : "NULL";
      break;
    case "date":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;
    case "defined":
      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
      break;
  }
  return $theValue;
}
}

$currentPage = $_SERVER["PHP_SELF"];

$editFormAction = $_SERVER['PHP_SELF'];
if (isset($_SERVER['QUERY_STRING'])) {
  $editFormAction .= "?" . htmlentities($_SERVER['QUERY_STRING']);
}

if ((isset($_POST["MM_insert"])) && ($_POST["MM_insert"] == "form1")) {
  $insertSQL = sprintf("INSERT INTO chapters (book_id, chapter_num, `description`) VALUES (%s, %s, %s)",
                       GetSQLValueString($_POST['book_id'], "int"),
                       GetSQLValueString($_POST['chapter_num'], "int"),
                       GetSQLValueString($_POST['description'], "text"));

  mysql_select_db($database_connSql, $connSql);
  $Result1 = mysql_query($insertSQL, $connSql) or die(mysql_error());

  $insertGoTo = "index.php";
  if (isset($_SERVER['QUERY_STRING'])) {
    $insertGoTo .= (strpos($insertGoTo, '?')) ? "&" : "?";
    $insertGoTo .= $_SERVER['QUERY_STRING'];
  }
  header(sprintf("Location: %s", $insertGoTo));
}

$maxRows_Recordset1 = 10;
$pageNum_Recordset1 = 0;
if (isset($_GET['pageNum_Recordset1'])) {
  $pageNum_Recordset1 = $_GET['pageNum_Recordset1'];
}
$startRow_Recordset1 = $pageNum_Recordset1 * $maxRows_Recordset1;

mysql_select_db($database_connSql, $connSql);
$query_Recordset1 = "SELECT * FROM chapters ORDER BY id DESC";
$query_limit_Recordset1 = sprintf("%s LIMIT %d, %d", $query_Recordset1, $startRow_Recordset1, $maxRows_Recordset1);
$Recordset1 = mysql_query($query_limit_Recordset1, $connSql) or die(mysql_error());
$row_Recordset1 = mysql_fetch_assoc($Recordset1);

if (isset($_GET['totalRows_Recordset1'])) {
  $totalRows_Recordset1 = $_GET['totalRows_Recordset1'];
} else {
  $all_Recordset1 = mysql_query($query_Recordset1);
  $totalRows_Recordset1 = mysql_num_rows($all_Recordset1);
}
$totalPages_Recordset1 = ceil($totalRows_Recordset1/$maxRows_Recordset1)-1;

$queryString_Recordset1 = "";
if (!empty($_SERVER['QUERY_STRING'])) {
  $params = explode("&", $_SERVER['QUERY_STRING']);
  $newParams = array();
  foreach ($params as $param) {
    if (stristr($param, "pageNum_Recordset1") == false && 
        stristr($param, "totalRows_Recordset1") == false) {
      array_push($newParams, $param);
    }
  }
  if (count($newParams) != 0) {
    $queryString_Recordset1 = "&" . htmlentities(implode("&", $newParams));
  }
}
$queryString_Recordset1 = sprintf("&totalRows_Recordset1=%d%s", $totalRows_Recordset1, $queryString_Recordset1);
?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Untitled Document</title>
</head>

<body>
<h1>Admin</h1>
<form action="<?php echo $editFormAction; ?>" id="form1" name="form1" method="POST">
  <p>
    <label for="book_id">Book:</label>
    <select name="book_id" id="book_id">
      <option value="1">Quran</option>
      <option value="2" selected>Sahih Bukhari</option>
    </select>
  </p>
  <p>Chapter Number:
<input type="text" name="chapter_num" id="chapter_num">
  </p>
  <p>
    <label for="description">Description:<br>
    </label>
    <textarea name="description" cols="150" rows="20" id="description"></textarea>
  </p>
  <p>
    <input type="submit" name="submit" id="submit" value="Submit">
  </p>
  <input type="hidden" name="MM_insert" value="form1">
</form>
<h1>View Records</h1>
<p><a href="<?php printf("%s?pageNum_Recordset1=%d%s", $currentPage, max(0, $pageNum_Recordset1 - 1), $queryString_Recordset1); ?>">Previous</a> <a href="<?php printf("%s?pageNum_Recordset1=%d%s", $currentPage, min($totalPages_Recordset1, $pageNum_Recordset1 + 1), $queryString_Recordset1); ?>">Next</a></p>
<table width="100%" border="1" cellspacing="0" cellpadding="5">
  <tbody>
    <tr>
      <td><strong>ID</strong></td>
      <td><strong>Book ID</strong></td>
      <td><strong>Chapter Number</strong></td>
      <td><strong>Description</strong></td>
    </tr>
      <?php do { ?>
    <tr>
        <td valign="top"><?php echo $row_Recordset1['id']; ?></td>
        <td valign="top"><?php echo $row_Recordset1['book_id']; ?></td>
        <td valign="top"><?php echo $row_Recordset1['chapter_num']; ?></td>
        <td valign="top"><?php echo nl2br($row_Recordset1['description']); ?></td>
    </tr>
        <?php } while ($row_Recordset1 = mysql_fetch_assoc($Recordset1)); ?>
  </tbody>
</table>
<p>&nbsp;</p>
</body>
</html>
<?php
mysql_free_result($Recordset1);
?>
