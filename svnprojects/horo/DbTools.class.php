<?php
class DbTools extends Models_General {


  private function addPath($path) {
    $q = 'select * from paths WHERE url_path = ?';
    $res = $this->fetchRow($q, array($path), TIMEBIG);
    if (empty($res)) {
      $d = array();
      $d['url_path'] = $path;
      $this->addDetails('paths', $d);
      $res = $this->fetchRow($q, array($path), TIMEBIG);
    }
    
    return $res;
  }//end addPath($path)
  
  private function getPath($path) {
    $q = 'select * from paths WHERE url_path = ?';
    $res = $this->fetchRow($q, array($path), TIMEBIG);
    
    return $res;
  }//end addPath($path)
  
  private function addTags($id, $tags, $tableTag) {
    $returnTags = array();
    $d = array();
    $d['id'] = $id;
    $exp = explode(',', $tags);
    $exp = array_unique($exp);
    $arr['tags'] = array();
    if (!empty($exp)) {
      foreach ($exp as $v) {
        $d['tag'] = trim($v);
        if (empty($d['tag'])) continue;
        $returnTags[] = $d['tag'];
        $this->addDetails($tableTag, $d);
      }//end foreach
    }//end if

    return $returnTags;
  }//end addTags
  
  
  public function add($tableName, $tableTag, $params=array())
  {
    $arr = array();
    $data = $params['data'];
    if (!is_array($data)) {
      $data = json_decode($params['data'], 1);
    }
    $data['tagsSingle'] = isset($params['tags']) ? $params['tags'] : null;
    $arr['details'] = json_encode($data);
    
    if (!empty($params['saveIP'])) {
      $ip = !empty($params['ip']) ? $params['ip'] : $_SERVER['REMOTE_ADDR'];
      $q = 'select * from users_info WHERE ip = ?';
      $resIP = $this->fetchRow($q, array($ip), TIMEBIG);
      if (empty($resIP)) {
        $ipDetails = iptocity($ip);
        $d = array();
        $d['ip'] = $ip;
        $d['users_info'] = json_encode($ipDetails['result']);
        $this->addDetails('users_info', $d);
        $resIP = $this->fetchRow($q, array($ip), TIMEBIG);
      }
      $arr['users_info_id'] = $resIP['users_info_id'];
    }
    
    $arr['title'] = isset($params['title']) ? $params['title'] : null;
    $arr['description'] = isset($params['description']) ? $params['description'] : null;
    $arr['status'] = isset($params['status']) ? $params['status'] : 1;
    
    $arr['path'] = null;
    if (!empty($params['path'])) {
      $pathDetails = $this->addPath($params['path']);
      $arr['path'] = $pathDetails['path_id'];
    }//end if
    
    //check unique title
    if (!empty($params['cT'])) {//check title
      $q = 'select * from '.$tableName.' WHERE title = ? AND path = ?';
      $resCheck = $this->fetchRow($q, array($arr['title'], $arr['path']), TIMESMALL);
      if (!empty($resCheck)) {
        throw new Exception('Title already exists'); 
      }
    }
    
    $arr['deleted'] = isset($params['deleted']) ? $params['deleted'] : 0;
    $arr['admin_approved'] = isset($params['appr']) ? $params['appr'] : 1;
    $arr['created'] = date('Y-m-d H:i:s');
    $arr['updated'] = date('Y-m-d H:i:s');
    $arr['uid'] = UID;
    
    //searchable fields
    $arr['i1'] = isset($params['i1']) ? $params['i1'] : null;
    $arr['i2'] = isset($params['i2']) ? $params['i2'] : null;
    $arr['i3'] = isset($params['i3']) ? $params['i3'] : null;
    $arr['i4'] = isset($params['i4']) ? $params['i4'] : null;
    $arr['d1'] = isset($params['d1']) ? $params['d1'] : null;
    $arr['d2'] = isset($params['d2']) ? $params['d2'] : null;
    $arr['d3'] = isset($params['d3']) ? $params['d3'] : null;
    $arr['d4'] = isset($params['d4']) ? $params['d4'] : null;
    $arr['vc1'] = isset($params['vc1']) ? $params['vc1'] : null;
    $arr['vc2'] = isset($params['vc2']) ? $params['vc2'] : null;
    $arr['vc3'] = isset($params['vc3']) ? $params['vc3'] : null;
    $arr['vc4'] = isset($params['vc4']) ? $params['vc4'] : null;
    $arr['t1'] = isset($params['t1']) ? $params['t1'] : null;
    $arr['t2'] = isset($params['t2']) ? $params['t2'] : null;
    $arr['t3'] = isset($params['t3']) ? $params['t3'] : null;
    $arr['t4'] = isset($params['t4']) ? $params['t4'] : null;
    
    
    $arr['parent_id'] = isset($params['parent_id']) ? $params['parent_id'] : null;
    $arr['reference_id'] = isset($params['reference_id']) ? $params['reference_id'] : null;
    
    
    if (!empty($params['location']) && !empty($params['location']['place_id'])) {
      $q = 'select * from  locations WHERE place_id = ?';
      $resLoc = $this->fetchRow($q, array($params['location']['place_id']), TIMEBIG);
      if (empty($resLoc)) {
        $id = $this->addDetails('locations', $params['location']);
        $resLoc = $this->fetchRow($q, array($params['location']['place_id']), TIMEBIG);
      }
      $arr['location_id'] = $resLoc['location_id'];
      $arr['lat'] = $params['location']['latitude'];
      $arr['lng'] = $params['location']['longitude'];
    }
    //insert into main db
    $id = $this->addDetails($tableName, $arr);
    if (empty($id)) {
      throw new Exception('error in inserting'); 
    }
    $arr['id'] = $id;
    $arr['location'] = !empty($params['location']) ? $params['location'] : null;
    //insert into tags db
    if (!empty($params['tags'])) {
      $arr['tags'] = $this->addTags($id, $params['tags'], $tableTag);
      /*$d = array();
      $d['id'] = $id;
      $exp = explode(',', $params['tags']);
      $exp = array_unique($exp);
      $arr['tags'] = array();
      if (!empty($exp)) {
        foreach ($exp as $v) {
          $d['tag'] = trim($v);
          if (empty($d['tag'])) continue;
          $arr['tags'][] = $d['tag'];
          $this->addDetails($tableTag, $d);
        }//end foreach
      }//end if*/
    }//end if
      
    return $arr;   
  }//end add
  
  
  public function updateSingle($tableName, $tableTag, $id, $key, $paramsKey, $params)
  {
    $arr = array();
    $q = 'select * from '.$tableName.' WHERE id = ?';
    $res = $this->fetchRow($q, array($id), 0);
    if ($res['uid'] != UID) {
      throw new Exception('invalid user');
    }
    
    $details = json_decode($res['details'], true);
    
    if (empty($details[$key])) {
      $details[$key] = array();
    }
    
    $details[$key][$paramsKey] = $params;
    $arr['details'] = json_encode($details);
    
    $where = sprintf('id = %s', $this->qstr($id));
    $check = $this->updateDetails($tableName, $arr, $where);
    return $check;
  }

  public function update($tableName, $tableTag, $id, $params)
  {
    $arr = array();
    $q = 'select * from '.$tableName.' WHERE id = ?';
    $res = $this->fetchRow($q, array($id), 0);
    
    if ($res['uid'] != UID) {
      throw new Exception('invalid user');
    }
    $data = $params['data'];
    if (!is_array($data)) {
      $data = json_decode($params['data'], 1);
    }
    
    $details = json_decode($res['details'], true);
    $details['tagsSingle'] = isset($params['tags']) ? $params['tags'] : $details['tagsSingle'];
    $tmpData = array_merge($details, $data);

    $arr['details'] = json_encode($tmpData);
    
    if (!empty($params['saveIP'])) {
      $ip = !empty($params['ip']) ? $params['ip'] : $_SERVER['REMOTE_ADDR'];
      $q = 'select * from users_info WHERE ip = ?';
      $resIp = $this->fetchRow($q, array($ip), TIMEBIG);
      if (empty($resIp)) {
        $ipDetails = iptocity($ip);
        $d = array();
        $d['ip'] = $ip;
        $d['users_info'] = json_encode($ipDetails['result']);
        $this->addDetails('users_info', $d);
        $resIp = $this->fetchRow($q, array($ip), TIMEBIG);
      }
      $arr['users_info_id'] = $resIp['users_info_id'];
    }
    
    $arr['title'] = isset($params['title']) ? $params['title'] : $res['title'];
    $arr['description'] = isset($params['description']) ? $params['description'] : $res['description'];
    $arr['status'] = isset($params['status']) ? $params['status'] : $res['status'];

    $arr['path'] = $res['path'];
    if (!empty($params['path'])) {
      $pathDetails = $this->addPath($params['path']);
      $arr['path'] = $pathDetails['path_id'];
    }//end if
    
    $arr['deleted'] = isset($params['deleted']) ? $params['deleted'] : $res['deleted'];
    $arr['admin_approved'] = isset($params['appr']) ? $params['appr'] : $res['admin_approved'];
    $arr['updated'] = date('Y-m-d H:i:s');
    $arr['uid'] = UID;
    
    //searchable fields
    $arr['i1'] = isset($params['i1']) ? $params['i1'] : $res['i1'];
    $arr['i2'] = isset($params['i2']) ? $params['i2'] : $res['i2'];
    $arr['i3'] = isset($params['i3']) ? $params['i3'] : $res['i3'];
    $arr['i4'] = isset($params['i4']) ? $params['i4'] : $res['i4'];
    $arr['d1'] = isset($params['d1']) ? $params['d1'] : $res['d1'];
    $arr['d2'] = isset($params['d2']) ? $params['d2'] : $res['d2'];
    $arr['d3'] = isset($params['d3']) ? $params['d3'] : $res['d3'];
    $arr['d4'] = isset($params['d4']) ? $params['d4'] : $res['d4'];
    $arr['vc1'] = isset($params['vc1']) ? $params['vc1'] : $res['vc1'];
    $arr['vc2'] = isset($params['vc2']) ? $params['vc2'] : $res['vc2'];
    $arr['vc3'] = isset($params['vc3']) ? $params['vc3'] : $res['vc3'];
    $arr['vc4'] = isset($params['vc4']) ? $params['vc4'] : $res['vc4'];
    $arr['t1'] = isset($params['t1']) ? $params['t1'] : $res['t1'];
    $arr['t2'] = isset($params['t2']) ? $params['t2'] : $res['t2'];
    $arr['t3'] = isset($params['t3']) ? $params['t3'] : $res['t3'];
    $arr['t4'] = isset($params['t4']) ? $params['t4'] : $res['t4'];
    
    
    $arr['parent_id'] = isset($params['parent_id']) ? $params['parent_id'] : $res['parent_id'];
    $arr['reference_id'] = isset($params['reference_id']) ? $params['reference_id'] : $res['reference_id'];
    
    
    
    if (!empty($params['location']) && !empty($params['location']['place_id'])) {
      $q = 'select * from  locations WHERE place_id = ?';
      $resLoc = $this->fetchRow($q, array($params['location']['place_id']), TIMEBIG);
      if (empty($resLoc)) {
        $id = $this->addDetails('locations', $params['location']);
        $resLoc = $this->fetchRow($q, array($params['location']['place_id']), TIMEBIG);
      }
      $arr['location_id'] = $resLoc['location_id'];
      $arr['lat'] = $params['location']['latitude'];
      $arr['lng'] = $params['location']['longitude'];
    }
    //insert into main db
    $where = sprintf('id = %s', $this->qstr($id));
    $check = $this->updateDetails($tableName, $arr, $where);
    $arr['id'] = $id;
    $arr['location'] = !empty($params['location']) ? $params['location'] : null;
    
    //insert into tags db
    if (isset($params['tags'])) {
      $q = 'delete from '.$tableTag.' WHERE id = ?';
      $this->deleteDetails($q, array($id));
      $arr['tags'] = $this->addTags($id, $params['tags'], $tableTag);
      /*$d = array();
      $d['id'] = $id;
      $exp = explode(',', $params['tags']);
      $exp = array_unique($exp);
      $arr['tags'] = array();
      if (!empty($exp)) {
        foreach ($exp as $v) {
          $d['tag'] = trim($v);
          if (empty($d['tag'])) continue;
          $arr['tags'][] = $d['tag'];
          $this->addDetails($tableTag, $d);
        }
      }*/
    }//end if
    
    return $arr;
  }//end update
  
  public function delete($ids, $tableName, $tableTag) {
    $exp = explode(',', $ids);
    foreach ($exp as $id) {
      
      $q = 'select * from '.$tableName.' WHERE id = ?';
      $res = $this->fetchRow($q, array($id), 0);
      if ($res['uid'] != UID) {
        throw new Exception('invalid user');
      }
      $q = 'delete from '.$tableName.' WHERE id = ?';
      $this->deleteDetails($q, array($id));
      $q = 'delete from '.$tableTag.' WHERE id = ?';
      $this->deleteDetails($q, array($id));
    }
    return true;
  }//end delete
  
  public function getAll($tableName, $tableTag, $request, $noCache=false)
  {
    if ($noCache) {
      $cacheTime = 0;
    } else {
      $cacheTime = TIMESMALL;
    }
    
    
    $page = 0;
    if (!empty($request['page'])) {
      $page = $request['page'];  
    }
    $max = 100;
    if (!empty($request['max'])) {
      $max = $request['max'];  
    }
    $params = array();
    $params['status'] = 1;
    $params['q'] = !empty($request['q']) ? $request['q'] : null;
    
    //path
    if (isset($request['path'])) {
      $pathDetails = $this->getPath($request['path']);
      $params['path'] = !empty($pathDetails['path_id']) ? $pathDetails['path_id'] : 0;
    }//end if
    
     
    $params['lat'] = !empty($request['lat']) ? $request['lat'] : null; //36.797 
    $params['lon'] = !empty($request['lon']) ? $request['lon'] : null; //-121.216 
    $params['radius'] = !empty($request['r']) ? $request['r'] : 30;
    
    if (isset($request['uid'])) {
      $params['uid'] = $request['uid'];
    }
    if (isset($request['i1'])) {
      $params['i1'] = $request['i1'];
    }
    if (isset($request['i2'])) {
      $params['i2'] = $request['i2'];
    }
    if (isset($request['i3'])) {
      $params['i3'] = $request['i3'];
    }
    if (isset($request['i4'])) {
      $params['i4'] = $request['i4'];
    }
    if (isset($request['d1'])) {
      $params['d1'] = $request['d1'];
    }
    if (isset($request['d2'])) {
      $params['d2'] = $request['d2'];
    }
    if (isset($request['d3'])) {
      $params['d3'] = $request['d3'];
    }
    if (isset($request['d4'])) {
      $params['d4'] = $request['d4'];
    }
    if (isset($request['vc1'])) {
      $params['vc1'] = $request['vc1'];
    }
    if (isset($request['vc2'])) {
      $params['vc2'] = $request['vc2'];
    }
    if (isset($request['vc3'])) {
      $params['vc3'] = $request['vc3'];
    }
    if (isset($request['vc4'])) {
      $params['vc4'] = $request['vc4'];
    }
    if (isset($request['t1'])) {
      $params['t1'] = $request['t1'];
    }
    if (isset($request['t2'])) {
      $params['t2'] = $request['t2'];
    }
    if (isset($request['t3'])) {
      $params['t3'] = $request['t3'];
    }
    if (isset($request['t4'])) {
      $params['t4'] = $request['t4'];
    }
    
    if (isset($request['orderBy']) && isset($request['orderType'])) {//valid values are distance, id, type valid values are ASC, DESC
      $params['orderBy'] = $request['orderBy'];
      $params['orderType'] = $request['orderType'];
    }
    
    if (isset($request['customOrder'])) {
      $params['customOrder'] = $request['customOrder'];
    }
    
    
    
    $showUserInfo = !empty($request['showUserInfo']) ? $request['showUserInfo'] : null;
    $showLocation = !empty($request['showLocation']) ? $request['showLocation'] : null;
    
    
    $params['parent_id']  = !empty($request['parent_id']) ? $request['parent_id'] : null;
    $params['reference_id']  = !empty($request['reference_id']) ? $request['reference_id'] : null;
    
    $showTags = !empty($request['showTags']) ? $request['showTags'] : null;
    $data = getAll($tableName, $tableTag, $max, $page, $params, $cacheTime);
    if (!empty($data['results'])) {
      foreach ($data['results'] as $k => $v) {
        $data['results'][$k]['shortDesc'] = substr($v['description'], 0, 30).(strlen($v['description']) > 30 ? '...' : '');
        $data['results'][$k]['ago'] = ago(strtotime($v['created']));
        $data['results'][$k]['dateFormatted'] = date('M j', strtotime($v['created']));
        $data['results'][$k]['dateFormattedAll'] = date('M j, Y', strtotime($v['created']));
        if (!empty($request['nl2br'])) {
          $data['results'][$k]['description'] = nl2br($v['description']);
        }
        //$data['results'][$k]['title'] = stripslashes($v['title']);
        if ($showLocation) {
          $q = 'select * from locations WHERE location_id = ?';
          $res2 = $this->fetchRow($q, array($v['location_id']), $cacheTime);
          $data['results'][$k]['location'] = $res2;
        }
        if ($showUserInfo) {
          $q = 'select * from users_info WHERE users_info_id = ?';
          $res3 = $this->fetchRow($q, array($v['users_info_id']), $cacheTime);
          $res3['users_info_full'] = json_decode($res3['users_info'], 1);
          $data['results'][$k]['user_info'] = $res3;
        }
        if ($showTags) {
          $q = 'select * from '.$tableTag.' WHERE id = ?';
          $res4 = $this->fetchAll($q, array($v['id']), $cacheTime);
          $data['results'][$k]['tags'] = $res4;
        }
      }
    }
    return $data;  
  }//end getAll
  
  public function getOne($tableName, $tableTag, $id, $noCache=false)
  {
    if ($noCache) {
      $cacheTime = 0;
    } else {
      $cacheTime = TIMESMALL;
    }

    $q = 'select * from '.$tableName.' WHERE id = ?';
    $res = $this->fetchRow($q, array($id), $cacheTime);
    
    $res['shortDesc'] = substr($res['description'], 0, 30).(strlen($res['description']) > 30 ? '...' : '');
    $res['ago'] = ago(strtotime($res['created']));
    $res['dateFormatted'] = date('M j', strtotime($res['created']));
    $res['dateFormattedAll'] = date('M j, Y', strtotime($res['created']));
    
    $q = 'select * from locations WHERE location_id = ?';
    $res2 = $this->fetchRow($q, array($res['location_id']), $cacheTime);
    $q = 'select * from users_info WHERE users_info_id = ?';
    $res3 = $this->fetchRow($q, array($res['users_info_id']), $cacheTime);
    $res3['users_info_full'] = json_decode($res3['users_info'], 1);
    $q = 'select * from '.$tableTag.' WHERE id = ?';
    $res4 = $this->fetchAll($q, array($res['id']), $cacheTime);
    $data = array();
    $data = $res;
    $data['location'] = $res2;
    $data['user_info'] = $res3;
    $data['tags'] = $res4;
    return $data; 
  }//end getOne()
}
?>