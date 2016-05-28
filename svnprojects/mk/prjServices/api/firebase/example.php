<?php

    if (!function_exists('pr')) {
        function pr($d){
            echo '<pre>';
            print_r($d);
            echo '</pre>';
        }
    }
    include_once('firebaseLib.php');
    define('DEFAULT_URL', 'https://mycontacts12.firebaseio.com');
    define('DEFAULT_TOKEN', 'uPq4BLQKKvHqi83hfMFW0r4wvQFV6edFqdRJJl1Z');
    define('DEFAULT_PATH', '/jobs');
    $firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);
    // --- storing an array ---
    $test = array(
        "foo" => "bar",
        "i_love" => "lamp",
        "id" => 42
    );
    $dateTime = new DateTime();
    $firebase->set(DEFAULT_PATH . '/' . $dateTime->format('c'), $test);
    
    // --- storing a string ---
    $firebase->set(DEFAULT_PATH . '/name/contact001', "John Doe");
    
    // --- reading the stored string ---
    $name = $firebase->get(DEFAULT_PATH . '/name/contact001');
    pr($firebase);
    pr($name);
    exit;
    // -- Firebase API commands
//https://github.com/ktamas77/firebase-php
$firebase->set($path, $value);   // stores data in Firebase
$value = $firebase->get($path);  // reads a value from Firebase
$firebase->delete($path);        // deletes value from Firebase
$firebase->update($path, $data); // updates data in Firebase
$firebase->push($path, $data);   // push data to Firebase

// -- Firebase PHP Library commands

$firebase->setToken($token);     // set up Firebase token
$firebase->setBaseURI($uri);     // set up Firebase base URI (root node)
$firebase->setTimeOut($seconds); // set up maximum timeout / request
    ?>