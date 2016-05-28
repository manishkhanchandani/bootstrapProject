<?php
define('SITEURL', 'www.thebayareacontractor.com');
define('FROMNAME', 'Administrator');
define('FROMEMAIL', 'mkgxy@mkgalaxy.com');
define('ADMINEMAIL', 'manishkk74@gmail.com');


if (!function_exists("GetSQLValueString")) {
function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
{
  if (PHP_VERSION < 6) {
    $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
  }

  $theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);

  switch ($theType) {
    case "text":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;    
    case "long":
    case "int":
      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
      break;
    case "double":
      $theValue = ($theValue != "") ? doubleval($theValue) : "NULL";
      break;
    case "date":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;
    case "defined":
      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
      break;
  }
  return $theValue;
}
}


if (!function_exists('curlget')) {
	function curlget($url, $post=0, $POSTFIELDS='') {
		$https = 0;
		if (substr($url, 0, 5) === 'https') {
			$https = 1;
		}

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);  
		if (!empty($post)) {
			curl_setopt($ch, CURLOPT_POST, 1); 
			curl_setopt($ch, CURLOPT_POSTFIELDS,$POSTFIELDS);
		}

		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_COOKIEFILE, COOKIE_FILE_PATH);
		curl_setopt($ch, CURLOPT_COOKIEJAR,COOKIE_FILE_PATH);
		if (!empty($https)) {
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
		}

		$result = curl_exec($ch); 
		curl_close($ch);
		return $result;
	}
}


if (!function_exists('pr')) {
function pr($d){
	echo '<pre>';
	print_r($d);
	echo '</pre>';
}
}

class Models_General
{
  
    protected $_connMain;
 
    public $sql;
    
    public function __construct()
    {
        global $connBayAreaContAdodb;
        $this->_connMain = $connBayAreaContAdodb;
        $this->_connMain->SetFetchMode(ADODB_FETCH_ASSOC);
        if (!empty($_GET['debug']) && $_GET['debug'] == 1) {
          $this->_connMain->debug = true;
        }
        //$this->_connMain->debug = true;
    }

    public function addDetails($tableName, $data=array())
    {
      $insertSQL = $this->_connMain->AutoExecute($tableName, $data, 'INSERT');
      $id = $this->_connMain->Insert_ID();
      return $id;
    }

    public function updateDetails($tableName, $data=array(), $where='')
    {
      if (empty($where)) {
          throw new Exception('could not update');
      }
      $updateSQL = $this->_connMain->AutoExecute($tableName, $data, 'UPDATE', $where);
      return true;
    }

    public function deleteDetails($query, $params=array())
    {
      $delete = $this->_connMain->Execute($query, $params);
      return true;
    }

  public function getDetails($tableName, $cache=1, $params=array(), $cacheTime=300)
  {
    if (empty($cacheTime)) {
        $cacheTime = !empty($params['cacheTime']) ? $params['cacheTime'] : '300';
    }
    if (!empty($params['query']) && isset($params['parameters'])) {
      $this->sql = $params['query'];

      if ($cache) {
        $result = $this->_connMain->CacheExecute($cacheTime, $params['query'], $params['parameters']);
      } else {
        $result = $this->_connMain->Execute($params['query'], $params['parameters']);
      }
    } else {
      $where = !empty($params['where']) ? $params['where'] : '';
      $group = !empty($params['group']) ? $params['group'] : '';
      $order = !empty($params['order']) ? $params['order'] : '';
      $fields = !empty($params['fields']) ? $params['fields'] : '*';
      $limit = !empty($params['limit']) ? $params['limit'] : '';
      $sql = "SELECT $fields FROM $tableName WHERE 1 $where $group $order $limit";
      $this->sql = $sql;
      if ($cache) {
        $result = $this->_connMain->CacheExecute($cacheTime, $sql);
      } else {
        $result = $this->_connMain->Execute($sql);
      }
    }
    $return = array();
    while (!$result->EOF) {
        $return[] = $result->fields;
        $result->MoveNext();
     }
    return $return;
  }

  public function clearCache($sql, $inputArr=array())
  {
      $this->_connMain->CacheFlush($sql, $inputArr);
      return true;
  }
  
  public function fetchRow($query, $params, $cacheTime=300)
  {
    $data = array();
    $data['query'] = $query;
    $data['parameters'] = $params;
    $row = $this->getDetails('', ($cacheTime > 0), $data, $cacheTime);
    if (!empty($row)) {
      $row = $row[0];
    }
    return $row;
  }
  
  public function fetchAll($query, $params, $cacheTime=300)
  {
    $data = array();
    $data['query'] = $query;
    $data['parameters'] = $params;
    $result = $this->getDetails('', ($cacheTime > 0), $data, $cacheTime);
    return $result;
  }
  
  public function qstr($v)
  {
    return $this->_connMain->qstr($v);
  }
  
  
  public function ask($max=25, $page=0, $status=1, $cacheTime = 300)
  {
    $page = (int) $page;
    $maxRows_rsView = $max;
    $pageNum_rsView = $page;
    $startRow_rsView = $pageNum_rsView * $maxRows_rsView;
    $query_rsView = 'select * FROM askquestion WHERE status = '.$status.' AND deleted = 0 ORDER BY id DESC';
    $query_limit_rsView = sprintf("%s LIMIT %d, %d", $query_rsView, $startRow_rsView, $maxRows_rsView);
    $results = $this->fetchAll($query_limit_rsView, array(), $cacheTime);
    $queryTotalRows = 'select COUNT(*) AS cnt from askquestion WHERE status = '.$status. ' AND deleted = 0';
    $rowCountResult = $this->fetchRow($queryTotalRows, array(), $cacheTime);
    $totalRows_rsView = $rowCountResult['cnt'];
    $totalPages_rsView = ceil($totalRows_rsView/$maxRows_rsView)-1;
    $return = array('results' => $results, 'max' => $max, 'page' => $page, 'totalRows' => $totalRows_rsView, 'totalPages' => $totalPages_rsView, 'start' => $startRow_rsView, 'pageNum_rsView' => $pageNum_rsView);
    return $return;
  }
  
  
  public function work($max=25, $page=0, $cacheTime = 300)
  {
    $page = (int) $page;
    $maxRows_rsView = $max;
    $pageNum_rsView = $page;
    $startRow_rsView = $pageNum_rsView * $maxRows_rsView;
    $query_rsView = 'select * FROM works ORDER BY work_id DESC';
    $query_limit_rsView = sprintf("%s LIMIT %d, %d", $query_rsView, $startRow_rsView, $maxRows_rsView);
    $results = $this->fetchAll($query_limit_rsView, array(), $cacheTime);
    $queryTotalRows = 'select COUNT(*) AS cnt from works';
    $rowCountResult = $this->fetchRow($queryTotalRows, array(), $cacheTime);
    $totalRows_rsView = $rowCountResult['cnt'];
    $totalPages_rsView = ceil($totalRows_rsView/$maxRows_rsView)-1;
    $return = array('results' => $results, 'max' => $max, 'page' => $page, 'totalRows' => $totalRows_rsView, 'totalPages' => $totalPages_rsView, 'start' => $startRow_rsView, 'pageNum_rsView' => $pageNum_rsView);
    return $return;
  }
}
?>