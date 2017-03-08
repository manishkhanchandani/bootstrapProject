<?php

if (!function_exists('pr')) {
    function pr($d){
        echo '<pre>';
        print_r($d);
        echo '</pre>';
    }
}


include_once('../../firebase/firebaseLib.php');

$config = array(
      'apiKey' => 'AIzaSyDnERUhALUFNxWZsjaLpT4_nqIYW2i2jDU',
      'authDomain' => 'mkgxy-3d7ce.firebaseapp.com',
      'databaseURL' => 'https://mkgxy-3d7ce.firebaseio.com/',
      'storageBucket' => 'mkgxy-3d7ce.appspot.com',
      'serviceAccount' => 'firebase-adminsdk-32l4p@mkgxy-3d7ce.iam.gserviceaccount.com',
      'secret' => 'rqojl9kJCy679BcI4zvpGsl6uZqq5SGl5KdvVDAm'
  );

$defaultPath = 'quiz';


$firebase = new \Firebase\FirebaseLib($config['databaseURL'], $config['secret']);

if (!empty($_POST['topic']) && !empty($_POST['subject'])) {
  $topic = trim($_POST['topic']);
  $subject = trim($_POST['subject']);
  $p = '/subjects/'.$subject.'/topics';
  $firebase->push($defaultPath . $p, $topic);
} else if (!empty($_POST['subject'])) {
  $subject = trim($_POST['subject']);
  $p = '/subjects';
  $return = array(base64_encode(strtolower($subject)) => array('name' => $subject));
  $firebase->update($defaultPath . $p, $return);
}

function getSubjects() {
  global $firebase, $defaultPath;
  $p = '/subjects';
  $return = $firebase->get($defaultPath . $p);
  return json_decode($return, true);
}


$subjects = getSubjects();
?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Manage Quiz</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link href="style.css" rel="stylesheet" type="text/css">
</head>

<body>
<?php include('nav.php'); ?>

<div class="container">




  <div class="row">
    <div class="col-md-12">
      <h1>Manage the Quiz</h1>
      <div class="row">
        <div class="col-md-6">
          
          <h3>Add Subjects</h3>
          <form method="post">
            <div class="form-group">
                <label for="subject">Subject Name</label>
                <input type="text" class="form-control" id="subject" name="subject" placeholder="Enter Subject" required>
            </div>
            <button type="submit" class="btn btn-default">Submit</button>
          </form>
          
        </div>
        <div class="col-md-6">
          
          <h3>Add Topics</h3>
          <form method="post">
            <div class="form-group">
                <label for="subject">Topic Name</label>
                <input type="text" class="form-control" id="topic" name="topic" placeholder="Enter Topic" required>
            </div>
            <div class="form-group">
                <label for="subject">Subject Name</label>
                <select name="subject" id="subject" class="form-control">
                    <option value="">Select subject</option>
                   <?php foreach($subjects as $k => $v) { ?>}
                    <option value="<?php echo $k; ?>" <?php if (!empty($_POST['subject']) && ($_POST['subject'] === $k || $_POST['subject'] === $v['name'])) { echo ' selected'; } ?> ><?php echo $v['name']; ?></option>
                  <?php } ?>
                </select>
            </div>
            <button type="submit" class="btn btn-default">Submit</button>
          </form>
          
        </div>
        
        
      </div>
      
      <div class="row">
        <div class="col-md-12">
          
          
          <h3>View Subjects</h3>
          <?php if (!empty($subjects)) { ?>
          <ul class="list-group">
            <?php foreach ($subjects as $key => $value) { ?>

              <li class="list-group-item"><a href="quiz.php?key=<?php echo $key; ?>&subject=<?php echo $value['name']; ?>"><?php echo $value['name']; ?></a>
                <?php if (!empty($value['topics'])) { ?>
                   <ul>
                   <?php
                    foreach ($value['topics'] as $k => $v) {
                     ?>
                     <li><?php echo $v; ?> - <a href="quiz.php?key=<?php echo $key; ?>&subject=<?php echo $value['name']; ?>&k=<?php echo $k; ?>&topic=<?php echo $v; ?>">Add Quiz</a></li>
                     <?php
                    }
                  ?>
                 </ul>
                 <?php
                  }
                ?>
              </li>
            <?php } ?>
            </ul>
          <?php } ?>
          
        </div>
        
        
      </div>
      
      
    </div>
  </div>

</div> <!-- /container -->
</body>
</html>