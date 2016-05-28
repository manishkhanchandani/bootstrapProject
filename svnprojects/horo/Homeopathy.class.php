<?php
class Homeopathy extends Models_General {

  public function getDiseases($cacheTime=36000)
  {
    $q = 'select * from tcd_diseases';
    $res = $this->fetchAll($q, array(), $cacheTime);
    return $res;
  }
  
  public function queryDisease($disease_id, $cacheTime=36000)
  {
    $q = 'select * from homeopathy where disease_id = ?';
    $res = $this->fetchAll($q, array($disease_id), $cacheTime);
    $return = array();
    if (!empty($res)) {
      foreach ($res as $k => $v) {
        $return[$k] = $v;
        $return[$k]['title'] = $v['tongue'].' (Pulse: '.$v['pulse'].')';
        $return[$k]['remedies'] = json_decode($v['remedies'], 1);
      }
    }
    return $return;
  }
  
  
  
  public function queryDiseaseAll($cacheTime=36000)
  {
    $q = 'select * from homeopathy order by disease_id';
    $res = $this->fetchAll($q, array(), $cacheTime);
    $return = array();
    if (!empty($res)) {
      foreach ($res as $k => $v) {
        $return['hom'][$v['disease_id']][$v['id']] = $v;
        $return['hom'][$v['disease_id']][$v['id']]['title'] = $v['tongue'].' (Pulse: '.$v['pulse'].')';
        $return['hom'][$v['disease_id']][$v['id']]['remedies'] = json_decode($v['remedies'], 1);
      }
    }
    
    
    $q = 'select * from tcd_diseases';
    $res = $this->fetchAll($q, array(), $cacheTime);
    if (!empty($res)) {
      foreach ($res as $k => $v) {
        $return['diseases'][$v['disease_id']] = $v;
      }
    }
    
    return $return;
  }
  
  public function findRemedy($disease_id, $pulse_id=null, $tongue_id=null, $tcd_id=null, $cacheTime=36000)
  {
    $params = array();
    $params[] = $disease_id;
    $q = 'select * from homeopathy where disease_id = ?';
    if (!empty($pulse_id)) {
     $q .= ' AND pulse_id = ?'; 
      $params[] = $pulse_id;
    }
    if (!empty($tongue_id)) {
     $q .= ' AND tongue_id = ?'; 
      $params[] = $tongue_id;
    }
    if (!empty($tcd_id)) {
     $q .= ' AND tcd_id = ?'; 
      $params[] = $tcd_id;
    }
    $res = $this->fetchAll($q, $params, $cacheTime);
    $return = array();
    if (!empty($res)) {
      foreach ($res as $k => $v) {
        $return[$k] = $v;
        $return[$k]['title'] = $v['tongue'].' (Pulse: '.$v['pulse'].')';
        $return[$k]['remedies'] = json_decode($v['remedies'], 1);
      }
    }
    return $return;
  }
  
}
?>