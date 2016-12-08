<?php
//http://api.mkgalaxy.com/nodesApi.php?action=Search
class nodes_Search extends nodes_base implements nodes_implAction
{
  public function execute() {
    $request = $_GET;
    $return = array();
    $page = 0;
    if (!empty($request['page'])) {
      $page = $request['page'];  
    }
    $max = 25;
    if (!empty($request['max'])) {
      $max = $request['max'];  
    }
    $params = array();
    $params['q'] = !empty($request['q']) ? $request['q'] : null;
    
    //path
    if (!empty($request['path'])) {
      $params['path'] = $request['path'];
    }//end if
    
     
    $params['lat'] = !empty($request['lat']) ? $request['lat'] : null; //36.797 
    $params['lon'] = !empty($request['lon']) ? $request['lon'] : null; //-121.216 
    $params['radius'] = !empty($request['r']) ? $request['r'] : 30;
    
    if (isset($request['uid'])) {
      $params['uid'] = $request['uid'];
    }
    
    if (isset($request['orderBy']) && isset($request['orderType'])) {//valid values are distance, id, type valid values are ASC, DESC
      $params['orderBy'] = $request['orderBy'];
      $params['orderType'] = $request['orderType'];
    }
    
    if (isset($request['customOrder'])) {
      $params['customOrder'] = $request['customOrder'];
    }
    $params['parent_id']  = !empty($request['parent_id']) ? $request['parent_id'] : null;
    $data = $this->getAll($max, $page, $params);
   return $data;
  }//end om()
  
  
}