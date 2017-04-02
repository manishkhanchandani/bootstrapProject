<?php

$country = new Country();

if ($requestMethod === 'DELETE') {
  $return['data'] = 'delete';
} else if ($requestMethod === 'PUT') {
  $return['data'] =  'put';
} if ($requestMethod === 'POST') {
  $return['data'] =  'post';
} if ($requestMethod === 'GET') {
  if (isset($_GET['id'])) {
    //fetch one row
    $return['data'] = $country->getCountry($_GET['id']);
  } else if (isset($_GET['country'])) {
    //fetch one row
    $return['data'] = $country->getCountryByName($_GET['country']);
  } else{
    //fetch all countries
    $return['data'] = $country->getCountries();
  }
  
}
