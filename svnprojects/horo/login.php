<?php
/*
API URLS
Login
http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=login&saveIP=1&username=nkhanchandani&password=password

Register
http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=register&saveIP=1&email=manishkk74@gmail.com&password=password&uid=123&username=nkhanchandani&user_details={"x":"y","a":"b"}

or 
http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=register&saveIP=1&email=manishkk74@gmail.com&password=password&uid=123&username=nkhanchandani&user_details[x]=y&user_details[a]=b

validateToken
http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=validateToken&access_token=f3ae704b50edf789361a4ba72ae2a36a

Logout
http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=logout&uid=123&access_token=f3ae704b50edf789361a4ba72ae2a36a
*/
try {
  include('init.php');
  //pre defined variables
  
  if (empty($_GET['action'])) {
    throw new Exception('empty action'); 
  }
  
  if (!empty($_REQUEST['password'])) {
    $_REQUEST['password'] = md5($_REQUEST['password']);  
  }
  
  switch ($_GET['action']) {
    case 'login':
      //http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=login&saveIP=1&username=nkhanchandani&password=password
      //http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=login&saveIP=1&username=manishkk74@gmail.com&password=password
      
      $q = 'select * from users as u WHERE (u.email = ? OR u.username = ? or uid = ?) AND u.password = ?';
      $res = $Models_General->fetchRow($q, array($_REQUEST['username'], $_REQUEST['username'], $_REQUEST['username'], $_REQUEST['password']), 0);
      
      if (empty($res)) {
        throw new Exception('invalid username/email/uid and password');  
      }
      
      $q = 'delete from access_tokens WHERE uid = ?';
      $Models_General->deleteDetails($q, array($res['uid']));
      
      
      $arr2 = array();
      $arr2['uid'] = $res['uid'];
      $arr2['token'] = md5($res['uid'].time());
      $arr2['created'] = date('Y-m-d H:i:s');
      if (!empty($_REQUEST['saveIP'])) {
          $ip = !empty($_REQUEST['ip']) ? $_REQUEST['ip'] : $_SERVER['REMOTE_ADDR'];
          $q = 'select * from users_info WHERE ip = ?';
          $resIP = $Models_General->fetchRow($q, array($ip), TIMEBIG);
          if (empty($resIP)) {
            $ipDetails = iptocity($ip);
            $d = array();
            $d['ip'] = $ip;
            $d['users_info'] = json_encode($ipDetails['result']);
            $Models_General->addDetails('users_info', $d);
            $resIP = $Models_General->fetchRow($q, array($ip), TIMEBIG);
          }
          $arr2['users_info_id'] = $resIP['users_info_id'];
        }
      $Models_General->addDetails('access_tokens', $arr2);
      
      $return['data'] = $arr2;
      $return['data']['valid'] = validateAccessToken($arr2['token']);
      if (!empty($res['user_details'])) {
       $return['data']['user_details'] = json_decode($res['user_details'], true); 
      }
      $return['data']['user_created'] = $res['user_created'];
      $return['data']['email'] = $res['email'];
      $return['data']['username'] = $res['username'];
      break;
    case 'register':
      //http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=register&saveIP=1&email=manishkk74@gmail.com&password=password&uid=123&username=nkhanchandani&user_details={"x":"y","a":"b"}
      if (empty($_REQUEST['username'])) {
        throw new Exception('empty username');
      }
      if (empty($_REQUEST['email'])) {
        throw new Exception('empty email');
      }
      if (empty($_REQUEST['password'])) {
        throw new Exception('empty password');
      }
      $customUid = false;
      if (empty($_REQUEST['uid'])) {
        $_REQUEST['uid'] = guid();
        $customUid = true;
      }
      
      $q = 'select * from users as u WHERE (u.email = ? OR u.username = ? OR u.uid = ?)';
      $res = $Models_General->fetchRow($q, array($_REQUEST['email'], $_REQUEST['username'], $_REQUEST['uid']), 60);
      
      if (!empty($res)) {
        throw new Exception('Username or email or uid already exists, Please try again.');
      }
      
      $q = 'delete from access_tokens WHERE uid = ?';
      $Models_General->deleteDetails($q, array($_REQUEST['uid']));
      $arr = array();
      $arr['uid'] = $_REQUEST['uid'];
      $arr['username'] = $_REQUEST['username'];
      $arr['email'] = $_REQUEST['email'];
      $arr['password'] = $_REQUEST['password'];
      if (!empty($_REQUEST['user_details'])) {
        if (is_array($_REQUEST['user_details'])) {
          $arr['user_details'] = json_encode($_REQUEST['user_details']);
        } else {
          $arr['user_details'] = $_REQUEST['user_details'];
        }
      }
      $arr['user_created'] = date('Y-m-d H:i:s');
      
      $arr2 = array();
      $arr2['uid'] = $_REQUEST['uid'];
      $arr2['token'] = md5($_REQUEST['uid'].time());
      $arr2['created'] = date('Y-m-d H:i:s');
      if (!empty($_REQUEST['saveIP'])) {
          $ip = !empty($_REQUEST['ip']) ? $_REQUEST['ip'] : $_SERVER['REMOTE_ADDR'];
          $q = 'select * from users_info WHERE ip = ?';
          $res = $Models_General->fetchRow($q, array($ip), TIMEBIG);
          if (empty($res)) {
            $ipDetails = iptocity($ip);
            $d = array();
            $d['ip'] = $ip;
            $d['users_info'] = json_encode($ipDetails['result']);
            $Models_General->addDetails('users_info', $d);
            $res = $Models_General->fetchRow($q, array($ip), TIMEBIG);
          }
          $arr['users_info_id'] = $res['users_info_id'];
          $arr2['users_info_id'] = $arr['users_info_id'];
        }
      $Models_General->addDetails('access_tokens', $arr2);
      $Models_General->addDetails('users', $arr);
      unset($arr['password']);
      $return['data'] = $arr;
      $return['data']['token'] = $arr2;
      $return['data']['valid'] = validateAccessToken($arr2['token']);
      $return['data']['customUid'] = $customUid;
      if (!empty($arr['user_details'])) {
       $return['data']['user_details'] = json_decode($arr['user_details'], true); 
      }
      break;
    
    case 'validateToken':
      //http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=validateToken&access_token=f3ae704b50edf789361a4ba72ae2a36a
      $data = validateAccessToken($_REQUEST['access_token']);
      if (empty($data)) {
        throw new Exception('invalid token'); 
      }
      $return['data'] = $data;
      break;
    case 'logout':
      //http://bootstrap.mkgalaxy.com/svnprojects/horo/login.php?action=logout&uid=123&access_token=f3ae704b50edf789361a4ba72ae2a36a
      if (empty($_REQUEST['uid'])) {
        throw new Exception('empty uid');
      }
      
      if (!empty($_REQUEST['access_token'])) {
        $q = 'select * from access_tokens WHERE token = ?';
        $Models_General->clearCache($q, array($_REQUEST['access_token']));
      }
      
      $res = getAccessToken($_REQUEST['uid']);
      if (!empty($res)) {
        $q = 'select * from access_tokens WHERE token = ?';
        $Models_General->clearCache($q, array($res['token']));
      }
      
      $q = 'delete from access_tokens WHERE uid = ?';
      $Models_General->deleteDetails($q, array($_REQUEST['uid']));
      
      $return['data']['id'] = $_REQUEST['uid'];
      $return['data']['access_token'] = $_REQUEST['access_token'];
      break;
  }
  
} catch (Exception $e) {
  $return['success'] = 0;
  $return['error'] = 1;
  $return['errorMessage'] = $e->getMessage();
}
$return['get'] = $_GET;
$return['post'] = $_POST;
echo json_encode($return);