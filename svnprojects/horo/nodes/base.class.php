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

  
  protected function getAll($max=100, $page=0, $params=array(), $cacheTime=900)
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
      $distance = ", (ROUND(
	DEGREES(ACOS(SIN(RADIANS(".GetSQLValueString($lat, 'double').")) * SIN(RADIANS(a.node_lat)) + COS(RADIANS(".GetSQLValueString($lat, 'double').")) * COS(RADIANS(a.node_lat)) * COS(RADIANS(".GetSQLValueString($lon, 'double')." -(a.node_lng)))))*60*1.1515,2)) as distance";
      $distanceWhere = " AND (ROUND(
	DEGREES(ACOS(SIN(RADIANS(".GetSQLValueString($lat, 'double').")) * SIN(RADIANS(a.node_lat)) + COS(RADIANS(".GetSQLValueString($lat, 'double').")) * COS(RADIANS(a.node_lat)) * COS(RADIANS(".GetSQLValueString($lon, 'double')." -(a.node_lng)))))*60*1.1515,2)) <= ".GetSQLValueString($radius, 'double');
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
    $key = md5($_SERVER['QUERY_STRING']);
    $return = array('key' => $key, 'results' => $results, 'max' => (int) $max, 'page' => (int) $page, 'totalRows' => (int) $totalRows_rsView, 'totalPages' => (int) $totalPages_rsView, 'start' => (int) $startRow_rsView, 'pageNum_rsView' => (int) $pageNum_rsView, 'params' => $params, 'sql1' => $sql1, 'sql2' => $sql2);

    //save to firebase
    $this->firebase->set($this->defaultPath . '/'.date('Y-m-d').'/'.date('h').'/'.$key, $return);

    return $return;
  }
  
}