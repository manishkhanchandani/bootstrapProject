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
    define('DEFAULT_PATH', '/projectServices');
    $firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);
    $id = '-K2rCSL9u724o0pyj6Jh';
    $user_id = 'google:112913147917981568678';
    $path = DEFAULT_PATH . '/users/'.$user_id;
    $userData = json_decode($firebase->get($path), 1);
    $path = DEFAULT_PATH . '/postingPending/'.$id;
    $postingData = json_decode($firebase->get($path), 1);
    if (empty($postingData)) {
      echo 'empty posting data';
      exit;
    }
    $path = DEFAULT_PATH . '/locations/'.$postingData['location_id'];
    $locationData = json_decode($firebase->get($path), 1);
    //insertion
    $path = DEFAULT_PATH . '/posting/'.$id;
    $firebase->set($path, $postingData);
    $path = DEFAULT_PATH . '/users/'.$user_id.'/ownedProfiles/'.$id;
    $firebase->set($path, true);
    $path = DEFAULT_PATH . '/browsePostings/citywise/'.base64_encode($locationData['country']).'/'.base64_encode($locationData['state']).'/'.base64_encode($locationData['city']).'/'.base64_encode($postingData['category']).'/'.$id;
    $firebase->set($path, true);
    $path = DEFAULT_PATH . '/browsePostings/statewise/'.base64_encode($locationData['country']).'/'.base64_encode($locationData['state']).'/'.base64_encode($postingData['category']).'/'.$id;
    $firebase->set($path, true);
    $path = DEFAULT_PATH . '/browsePostings/countrywise/'.base64_encode($locationData['country']).'/'.'/'.base64_encode($postingData['category']).'/'.$id;
    $firebase->set($path, true);
    $path = DEFAULT_PATH . '/browsePostings/countywise/'.base64_encode($locationData['country']).'/'.base64_encode($locationData['state']).'/'.base64_encode($locationData['county']).'/'.base64_encode($postingData['category']).'/'.$id;
    $firebase->set($path, true);
    
    //deleting
    $path = DEFAULT_PATH . '/postingPending/'.$id;
    $firebase->delete($path);
    $path = DEFAULT_PATH . '/users/'.$user_id.'/ownedPendingProfiles/'.$id;
    $firebase->delete($path);
    echo 'user data';
    pr ($userData);
    echo 'postingData';
    pr ($postingData);
    echo 'locationData';
    pr ($locationData);
    exit;
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