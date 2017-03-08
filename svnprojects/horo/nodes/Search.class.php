<?php
//http://api.mkgalaxy.com/nodesApi.php?action=Search
//https://4157ff7b.servage-customer.net/nodesApi.php?action=Search
class nodes_Search extends nodes_base implements nodes_implAction
{
  public function execute() {
    $request = $_GET;
    $return = array();
    $page = 0;
    if (!empty($request['page'])) {
      $page = $request['page'];  
    }
    $max = 3;
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
    $params['radius'] = !empty($request['r']) ? $request['r'] : 10000;
    
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
  
  
  
  protected function getAll($max=100, $page=0, $params=array(), $cacheTime=10)
  {
    $searchTerm = !empty($params['q']) ? $params['q'] : '';
    $lat = !empty($params['lat']) ? $params['lat'] : '';
    $lon = !empty($params['lon']) ? $params['lon'] : '';
    $radius = !empty($params['radius']) ? $params['radius'] : 30;
    if (!empty($params['path'])) {
      $path = $params['path'];
    }
    $distance = '';
    $distanceWhere = '';
    $order = ' ORDER BY a.node_created DESC';
    
    
    if (!empty($lat) && !empty($lon)) {
      $lat = (double) $lat;
      $lon = (double) $lon;
      $distance = ", (ROUND(
	DEGREES(ACOS(SIN(RADIANS(".$lat.")) * SIN(RADIANS(a.node_lat)) + COS(RADIANS(".$lat.")) * COS(RADIANS(a.node_lat)) * COS(RADIANS(".$lon." -(a.node_lng)))))*60*1.1515,2)) as distance";
      $distanceWhere = " AND (ROUND(
	DEGREES(ACOS(SIN(RADIANS(".$lat.")) * SIN(RADIANS(a.node_lat)) + COS(RADIANS(".$lat.")) * COS(RADIANS(a.node_lat)) * COS(RADIANS(".$lon." -(a.node_lng)))))*60*1.1515,2)) <= ".$radius;
      $order = ' ORDER BY distance ASC, a.node_created DESC';
    }
    
    if (isset($params['orderBy']) && isset($params['orderType'])) {
      if ($params['orderBy'] !== 'distance') {
        $params['orderBy'] = 'a.'.$params['orderBy']; 
      }
      $order = ' ORDER BY '.$params['orderBy'].' '.$params['orderType'];
    }
    
    
    if (isset($params['customOrder'])) {
      $order = ' ORDER BY '.$params['customOrder'];
    }
  
    $page = (int) $page;
    $maxRows_rsView = (int) $max;
    $pageNum_rsView = $page;
    $startRow_rsView = $pageNum_rsView * $maxRows_rsView;
    $query_rsView = 'select *, a.node_id as id '.$distance.' FROM nodes as a WHERE a.node_deleted = 0 '.$distanceWhere;
    if (!empty($path)) {
      $query_rsView .= ' AND a.node_group_id = '.$this->qstr($path);
    }
    if (!empty($params['uid'])) {
      $query_rsView .= ' AND a.uid = '.$this->qstr($params['uid']);
    }
    if (!empty($searchTerm)) {
      $query_rsView .= ' AND a.node_data LIKE '.$this->qstr('%'.$searchTerm.'%');
    }
    
    if (!empty($params['parent_id'])) {
      $query_rsView .= ' AND a.parent_id = '.$this->qstr($params['parent_id']);
    }

    $query_rsView .= $order;
    $query_limit_rsView = sprintf("%s LIMIT %d, %d", $query_rsView, $startRow_rsView, $maxRows_rsView);

    $results = $this->fetchAll($query_limit_rsView, array(), $cacheTime);
    if (!empty($results)) {
        foreach ($results as $k => $res) {
            $results[$k]['node_data'] = json_decode($results[$k]['node_data'], true);
        }
    }//end if
    
    $sql1 = $this->sql;

    $queryTotalRows = 'select COUNT(distinct a.node_id) AS cnt FROM nodes as a WHERE a.node_deleted = 0 '.$distanceWhere;
    if (!empty($path)) {
      $queryTotalRows .= ' AND a.node_group_id = '.$this->qstr($path);
    }
    if (!empty($params['uid'])) {
      $queryTotalRows .= ' AND a.uid = '.$this->qstr($params['uid']);
    }
    if (!empty($searchTerm)) {
      $queryTotalRows .= ' AND a.node_data LIKE '.$this->qstr('%'.$searchTerm.'%');
    }
    
    if (!empty($params['parent_id'])) {
      $queryTotalRows .= ' AND a.parent_id = '.$this->qstr($params['parent_id']);
    }

    $rowCountResult = $this->fetchRow($queryTotalRows, array(), $cacheTime);

    $sql2 = $this->sql;
    $totalRows_rsView = $rowCountResult['cnt'];
    $totalPages_rsView = ceil($totalRows_rsView/$maxRows_rsView)-1;
    
    $getData = $_GET;
    if (!empty($getData['min'])) unset($getData['min']);
    if (!empty($getData['hour'])) unset($getData['hour']);
    if (!empty($getData['date'])) unset($getData['date']);
    $query = http_build_query($getData);
    $key = md5($query);
    $return = array('key' => $key, 'results' => $results, 'max' => (int) $max, 'page' => (int) $page, 'totalRows' => (int) $totalRows_rsView, 'totalPages' => (int) $totalPages_rsView, 'start' => (int) $startRow_rsView, 'pageNum_rsView' => (int) $pageNum_rsView, 'params' => $params, 'sql1' => $sql1, 'sql2' => $sql2);
    $return['queryString'] = $_SERVER['QUERY_STRING'];
    $return['queryString2'] = $query;
    //save to firebase
    
    $minute = (!empty($_GET['min']) ? $_GET['min'] : date('i'));
    $min = '';
    if ($minute < 15) $min = '0';
    else if ($minute >= 15 && $minute < 30) $min = '15';
    else if ($minute >= 30 && $minute < 45) $min = '30';
    else if ($minute >= 45 && $minute <= 59) $min = '45';
    $min = 0;
    $h = (!empty($_GET['hour']) ? $_GET['hour'] : date('G'));
    $h = intval($h);
    $min = intval($min);
    $date = (!empty($_GET['date']) ? $_GET['date'] : date('Y-n-j'));
    
    //$p = '/'.$date.'/hour_'.$h.'/minute_'.$min.'/'.$key;
    //$p = '/'.$key;
    $p = '/'.$date.'/'.$key;
    //$return['hour'] = $h;
    //$return['min'] = $min;
    $return['path'] = $p;
    $return['cacheTime'] = $cacheTime;


    $this->firebase->set($this->defaultNodesPath . $p, $return);

    return $return;
  }//end getAll()
  
}