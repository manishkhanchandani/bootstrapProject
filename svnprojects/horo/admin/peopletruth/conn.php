<?php

//adodb try
define('BASE_DIR', dirname(dirname(dirname(__FILE__))));

/*include(BASE_DIR.'/adodb/adodb.inc.php');

$ADODB_CACHE_DIR = BASE_DIR.'/cache/ADODB_cache';

//$connMainAdodb = &ADONewConnection('sqlite');
//$connMainAdodb->Connect(BASE_DIR.'/db/peopletruth.sqlite'); # sqlite will create if does not exist


//$path = urlencode(BASE_DIR.'/db/peopletruth.sqlite');
//$dsn = "sqlite://$path/?persist";  # persist is optional
//$connMainAdodb = ADONewConnection($dsn); 
//$connMainAdodb =&ADONewConnection('pdo');
//$connMainAdodb->Connect('sqlite:'.BASE_DIR.'/db/peopletruth.sqlite');
*/
try {
  $connMainAdodb = new PDO('sqlite:'.BASE_DIR.'/db/peopletruth.sqlite');
  // Set errormode to exceptions
  $connMainAdodb->setAttribute(PDO::ATTR_ERRMODE, 
                        PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    // Print PDOException message
    echo $e->getMessage();
}