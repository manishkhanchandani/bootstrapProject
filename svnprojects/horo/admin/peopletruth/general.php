<?php
class App_base
{
    protected $_connMain;

    public $return = array();
    
    public function __construct()
    {
        global $connMainAdodb;
        $this->_connMain = $connMainAdodb;
    }

    public function qstr($value)
    {
        return ($value);
    }

    public function setDebug($value)
    {
      
    }

}

class Models_General extends App_base
{
    public $sql;
  

    public function addDetails($tableName, $data=array())
    {
      if (empty($data)) {
        return false;
      }
      
      $fields = array(); $fieldString = '';
      $params = array(); $paramsString = '';
      $values = array(); $valuesString = '';
      
      foreach ($data as $k => $v) {
        $fields[] = $k;
        $params[] = ':'.$k;
        $values[] = $v;
      }
      $fieldString = implode(', ', $fields);
      $paramsString = implode(', ', $params);
      $valuesString = implode(', ', $values);
      
      $insert = "INSERT INTO $tableName ($fieldString) 
                VALUES ($paramsString)";
      $stmt = $this->_connMain->prepare($insert);
 
      // Bind parameters to statement variables
      foreach ($params as $k => $v) {
        $stmt->bindParam($v, $values[$k]);
      }
      //execute
      $stmt->execute();
      return true;
    }

  
  public function fetchRow($query, $params=array())
  {
    $result = $this->_connMain->query($query);
    if (empty($result)) {
      return false;
    }

    foreach($result as $row) {
      return $row;
    }
  }
  
  public function fetchAll($query, $params=array())
  {
    $result = $this->_connMain->query($query);
    if (empty($result)) {
      return false;
    }

    $return = array();
    foreach($result as $row) {
      $return[] = $row;
    }
    
    return $return;
  }
  
}
?>