<?php
class nodes_base extends Models_General
{
  protected $config = array(
      'apiKey' => 'AIzaSyDnERUhALUFNxWZsjaLpT4_nqIYW2i2jDU',
      'authDomain' => 'mkgxy-3d7ce.firebaseapp.com',
      'databaseURL' => 'https://mkgxy-3d7ce.firebaseio.com/',
      'storageBucket' => 'mkgxy-3d7ce.appspot.com',
      'serviceAccount' => 'firebase-adminsdk-32l4p@mkgxy-3d7ce.iam.gserviceaccount.com',
      'secret' => 'rqojl9kJCy679BcI4zvpGsl6uZqq5SGl5KdvVDAm'
  );
  
  protected $defaultPath = 'nodes';
  
  protected $firebase;
  
  public function __construct() {
    parent::__construct();
    $this->firebase = new \Firebase\FirebaseLib($this->config['databaseURL'], $this->config['secret']);
  }

  
}