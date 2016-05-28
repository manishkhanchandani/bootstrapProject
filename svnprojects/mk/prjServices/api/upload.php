<?php

if (empty($_GET['uid'])) {
  echo 'No Uid';
  exit;
}

if (empty($_GET['id'])) {
  echo 'No Id';
  exit;
}

if ( empty( $_FILES ) ) {
  echo 'No files';
  exit;
}

$tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
$folder = '../images/userImages';
$folder = $folder.'/'.$_GET['uid'];
if (!is_dir($folder)) {
  mkdir($folder, 0777);
  chmod($folder, 0777);
}
$folder = $folder.'/'.$_GET['id'];
if (!is_dir($folder)) {
  mkdir($folder, 0777);
  chmod($folder, 0777);
}
$uploadPath = $folder.'/'. $_FILES[ 'file' ][ 'name' ];

move_uploaded_file( $tempPath, $uploadPath );

$answer = array( 'answer' => 'File transfer completed' );
$json = json_encode( $answer );

echo $json;

?>