<?php


define('LISTING_TYPE_PERSON', 1);
define('LISTING_TYPE_PRODUCT', 2);
define('LISTING_TYPE_SERVICE', 3);
define('LISTING_TYPE_PHONE', 4);
define('LISTING_TYPE_EMAIL', 5);

function listingType() {
  $listingType = array('person' => LISTING_TYPE_PERSON, 'product' => LISTING_TYPE_PRODUCT, 'service' => LISTING_TYPE_SERVICE, 'phone' => LISTING_TYPE_PHONE, 'email' => LISTING_TYPE_EMAIL);
  return $listingType;
}



if (!function_exists('pr')) {
    function pr($d){
        echo '<pre>';
        print_r($d);
        echo '</pre>';
    }
}

function guid()
{
    mt_srand((double) microtime() * 10000);
    $charid = strtoupper(md5(uniqid(rand(), true)));
    $guid = substr($charid, 0, 8) . '-' .
            substr($charid, 8, 4) . '-' .
            substr($charid, 12, 4) . '-' .
            substr($charid, 16, 4) . '-' .
            substr($charid, 20, 12);
   return $guid;
}


include('conn.php');
include('general.php');

class Sample extends Models_General {
  
  public function test() {
    $d = array();
    $d['id'] = guid();
    $d['title'] = 'sample title';
    $d['created_dt'] = date('Y-m-d H:i:s');
    $d['updated_dt'] = date('Y-m-d H:i:s');
    $d['deleted'] = 0;
    $d['status'] = 1;
    $d['listing_type'] = LISTING_TYPE_PERSON;
    $d['data'] = json_encode(array('x' => 'y', 'age' => 44));
    pr($d);
    $this->addDetails('listings', $d);
    
    $query = "select * from listings";
    $return = $this->fetchRow($query);
    pr($return);
    
    $query = "select * from listings";
    $return = $this->fetchAll($query);
    pr($return);
    echo 'done';
  }
}

$Sample = new Sample();
$Sample->test();
?>