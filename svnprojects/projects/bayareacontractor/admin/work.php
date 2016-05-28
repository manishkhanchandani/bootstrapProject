<?php
require_once('../../../../Connections/connBayAreaCont.php'); 
include('../functions.php');
$Models_General = new Models_General();


$max = 5;
$page = 0;
if (isset($_GET['pageNum_rsView'])) {
  $page = $_GET['pageNum_rsView'];
}

$totalRows_rsView = 0;
$totalPages_rsView = 0;
$maxRows_rsView = $max;
$pageNum_rsView = $page;
$startRow_rsView = $pageNum_rsView * $maxRows_rsView;


$result = array();

$insertError = null;
try {
  if (isset($_POST['MM_Insert'])) {
    if (empty($_FILES['beforeFile']['name'])) {
      $insertError = 'Please choose before work image';
    } else if (empty($_FILES['afterFile']['name'])) {
      $insertError = 'Please choose after work image';
    }
    
    if (empty($insertError)) {
      $arr = array();
      $arr['before_image'] = 's'.time().'_b_'.$_FILES['beforeFile']['name'];
      $arr['after_image'] = 's'.time().'_a_'.$_FILES['afterFile']['name'];
      move_uploaded_file($_FILES['beforeFile']['tmp_name'], '../images/'.$arr['before_image']);
      move_uploaded_file($_FILES['afterFile']['tmp_name'], '../images/'.$arr['after_image']);
      $Models_General->addDetails('works', $arr);
      $insertError = 'Record Added Successfully';
    }
  }
  
  if (isset($_GET['delete'])) {
    $query_rsView = 'select * FROM works WHERE work_id = ?';
    $rs = $Models_General->fetchRow($query_rsView, array($_GET['id']), 0);
    if ($rs) {
      $query_rsView = 'delete FROM works WHERE work_id = ?';
      $Models_General->deleteDetails($query_rsView, array($_GET['id']));
      if (file_exists('../images/'.$rs['before_image'])) unlink('../images/'.$rs['before_image']);
      if (file_exists('../images/'.$rs['after_image'])) unlink('../images/'.$rs['after_image']);
    }
  }
  
  $data = $Models_General->work($max, $page, 0);
  $totalRows_rsView = isset($data['totalRows']) ? $data['totalRows'] : 0;
  $totalPages_rsView = isset($data['totalPages']) ? $data['totalPages'] : 0;
  
  $queryString_rsView = "";
  if (!empty($_SERVER['QUERY_STRING'])) {
    $params = explode("&", $_SERVER['QUERY_STRING']);
    $newParams = array();
    foreach ($params as $param) {
      if (stristr($param, "pageNum_rsView") == false && 
          stristr($param, "totalRows_rsView") == false) {
        array_push($newParams, $param);
      }
    }
    if (count($newParams) != 0) {
      $queryString_rsView = "&" . htmlentities(implode("&", $newParams));
    }
  }
  $queryString_rsView = sprintf("&totalRows_rsView=%d%s", $totalRows_rsView, $queryString_rsView);
  $result = array('success' => 1, 'data' => $data); 
} catch (Exception $e) {
  $result = array('success' => 0, 'msg' => $e->getMessage()); 
}
?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Work</title>
<link href="../css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="../css/style.css" rel="stylesheet" type="text/css">
</head>

<body class="body">
<div class="container">
<h1>My Works</h1>
<p><a href="index.php">Home</a> | <a href="work.php">Work</a></p>
<h3>Add New Work</h3>
<?php if (!empty($insertError)) { ?><div class="alert-danger"><?php echo $insertError; ?></div><?php } ?>
<form method="post" enctype="multipart/form-data" name="form2" id="form2">
  <p>
    <label for="beforeFile">Image Before Work:</label>
    <input type="file" name="beforeFile" id="beforeFile">
  </p>
  <p>
    <label for="afterFile">Image After Work:</label>
    <input type="file" name="afterFile" id="afterFile">
  </p>
  <p>
    <input type="submit" name="submit" id="submit" value="Create New Work">
    <input type="hidden" name="MM_Insert" id="MM_Insert" value="1">
  </p>
</form>
<p>&nbsp;</p>
<?php if (!empty($data) && isset($data['totalRows']) && $data['totalRows'] > 0) { ?>

<p> Records <?php echo ($startRow_rsView + 1) ?> to <?php echo min($startRow_rsView + $maxRows_rsView, $totalRows_rsView) ?> of <?php echo $totalRows_rsView ?></p>
<div class="row">
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <ul class="pagination">
      <?php if ($pageNum_rsView > 0) { // Show if not first page ?>
      <li>
        <a href="<?php printf("%s?pageNum_rsView=%d%s", $currentPage, 0, $queryString_rsView); ?>"><<</a>
      </li>
      <?php } // Show if not first page ?>
      <?php if ($pageNum_rsView > 0) { // Show if not first page ?>
      <li>
        <a href="<?php printf("%s?pageNum_rsView=%d%s", $currentPage, max(0, $pageNum_rsView - 1), $queryString_rsView); ?>"><</a>
      </li>
      <?php } // Show if not first page ?>
      <?php if ($pageNum_rsView < $totalPages_rsView) { // Show if not last page ?>
      <li>
        <a href="<?php printf("%s?pageNum_rsView=%d%s", $currentPage, min($totalPages_rsView, $pageNum_rsView + 1), $queryString_rsView); ?>">></a>
      </li>
      <?php } // Show if not last page ?>
      <?php if ($pageNum_rsView < $totalPages_rsView) { // Show if not last page ?>
      <li>
        <a href="<?php printf("%s?pageNum_rsView=%d%s", $currentPage, $totalPages_rsView, $queryString_rsView); ?>">>></a>
      </li>
      <?php } // Show if not last page ?>
    </ul>
</div>
</div>

<table class="table table-striped">
  <tbody>
    <tr>
      <td><strong>ID</strong></td>
      <td><strong>Before Work</strong></td>
      <td><strong>After Work</strong></td>
      <td><strong>Delete</strong></td>
    </tr>
    <?php foreach ($data['results'] as $k => $v) { ?>
    <tr>
      <td><strong><?php echo $v['work_id']; ?></strong></td>
      <td><img src="../images/<?php echo $v['before_image']; ?>" width="100" height="100"></td>
      <td><img src="../images/<?php echo $v['after_image']; ?>" width="100" height="100"></td>
      <td><strong><a href="work.php?pageNum_rsView=<?php echo $pageNum_rsView; ?>&delete=1&id=<?php echo $v['work_id']; ?>" onClick="var a = confirm('do you really want to delete this work?'); return a;">Delete</a></strong></td>
    </tr>
    <?php } ?>
  </tbody>
</table>


<p> Records <?php echo ($startRow_rsView + 1) ?> to <?php echo min($startRow_rsView + $maxRows_rsView, $totalRows_rsView) ?> of <?php echo $totalRows_rsView ?></p>

<hr>

<div class="row">
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <ul class="pagination">
      <?php if ($pageNum_rsView > 0) { // Show if not first page ?>
      <li>
        <a href="<?php printf("%s?pageNum_rsView=%d%s", $currentPage, 0, $queryString_rsView); ?>"><<</a>
      </li>
      <?php } // Show if not first page ?>
      <?php if ($pageNum_rsView > 0) { // Show if not first page ?>
      <li>
        <a href="<?php printf("%s?pageNum_rsView=%d%s", $currentPage, max(0, $pageNum_rsView - 1), $queryString_rsView); ?>"><</a>
      </li>
      <?php } // Show if not first page ?>
      <?php if ($pageNum_rsView < $totalPages_rsView) { // Show if not last page ?>
      <li>
        <a href="<?php printf("%s?pageNum_rsView=%d%s", $currentPage, min($totalPages_rsView, $pageNum_rsView + 1), $queryString_rsView); ?>">></a>
      </li>
      <?php } // Show if not last page ?>
      <?php if ($pageNum_rsView < $totalPages_rsView) { // Show if not last page ?>
      <li>
        <a href="<?php printf("%s?pageNum_rsView=%d%s", $currentPage, $totalPages_rsView, $queryString_rsView); ?>">>></a>
      </li>
      <?php } // Show if not last page ?>
    </ul>
</div>
</div>
<?php } else { ?>
<p>No Record Found.</p>
<?php } ?>
</div>
</body>
</html>