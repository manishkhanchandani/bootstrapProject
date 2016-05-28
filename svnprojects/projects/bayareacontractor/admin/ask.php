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
try {
  if (isset($_POST['MM_Update']) && !empty($_POST['answer']) && !empty($_POST['id'])) {
    $paramsData = array();
    $paramsData['answer'] = $_POST['answer'];
    $paramsData['status'] = 1;
    $where = sprintf('id = %s', $Models_General->qstr($_POST['id']));
    $Models_General->updateDetails('askquestion', $paramsData, $where);
    
    mail($_POST['email'], 'New Answer Submitted For Your Question on '.SITEURL, "\n\nQuestion: ".$_REQUEST['question']."\n\nAnswer: ".$_POST['answer'], 'From:'.FROMNAME.'<'.FROMEMAIL.'>');
  }
  
  if (isset($_GET['delete'])) {
    $paramsData = array();
    $paramsData['deleted'] = 1;
    $where = sprintf('id = %s', $Models_General->qstr($_GET['id']));
    $Models_General->updateDetails('askquestion', $paramsData, $where);
  }
  
  $status = 0;
  if (!empty($_GET['status'])) {
    $status = $_GET['status'];
  }
  $data = $Models_General->ask($max, $page, $status, 0);
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
<title>Questions & Answers</title>
<link href="../css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="../css/style.css" rel="stylesheet" type="text/css">
</head>

<body class="body">
<div class="container">
<h1>Questions &amp; Answers</h1>
<p><a href="index.php">Home</a> | <a href="ask.php">Pending Questions</a> | <a href="ask.php?status=1">Answered Questions</a></p>
<?php if ($status == 1) { ?>
<h3>Answered Questions</h3>
<?php } else if ($status == 0) { ?>
<h3>Pending Questions</h3>
<?php } ?>
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
      <td><strong>Question</strong></td>
      <td><strong>Date</strong></td>
      <td><strong>Asked By</strong></td>
      <td><strong>Delete</strong></td>
    </tr>
    <?php foreach ($data['results'] as $k => $v) { ?>
    <tr>
      <td><strong><?php echo $v['id']; ?></strong></td>
      <td><strong>Q: <?php echo $v['question']; ?></strong></td>
      <td><strong><?php echo $v['created_dt']; ?></strong></td>
      <td><strong><?php echo $v['name']; ?> (<?php echo $v['email']; ?>)</strong></td>
      <td><strong><a href="ask.php?pageNum_rsView=<?php echo $pageNum_rsView; ?>&status=<?php echo $status; ?>&delete=1&id=<?php echo $v['id']; ?>" onClick="var a = confirm('do you really want to delete this question?'); return a;">Delete</a></strong></td>
    </tr>
    <tr>
      <td colspan="5"><form id="form1" name="form1" method="post">
        <textarea name="answer" rows="5" id="answer" style="width: 100%" placeholder="Answer this question" required><?php echo $v['answer']; ?></textarea>
        <input type="submit" name="MM_Update" id="MM_Update" value="Answer It">
        <input type="hidden" name="id" id="id" value="<?php echo $v['id']; ?>">
        <input type="hidden" name="name" id="name" value="<?php echo $v['name']; ?>">
        <input type="hidden" name="email" id="email" value="<?php echo $v['email']; ?>">
      </form></td>
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