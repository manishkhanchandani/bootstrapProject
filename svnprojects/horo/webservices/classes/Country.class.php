<?php

class Country extends General 
{
  
  public function getCountries($cacheTime=900) {
    $sql = 'select country_id as id, country from countries order by country';
    $result = $this->fetchAll($sql, array(), $cacheTime);
    return $result;
  }
  
  public function getCountry($id, $cacheTime=900) {
    $sql = 'select country_id as id, country from countries WHERE country_id = ?';
    $result = $this->fetchRow($sql, array($id), $cacheTime);
    return $result;
  }
  
  public function getCountryByName($country, $cacheTime=900) {
    $sql = 'select country_id as id, country from countries WHERE country = ?';
    $result = $this->fetchRow($sql, array($country), $cacheTime);
    return $result;
  }
  
}//end class