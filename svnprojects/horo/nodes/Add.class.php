<?php
//http://api.mkgalaxy.com/nodesApi.php?action=Add
//https://4157ff7b.servage-customer.net/nodesApi.php?action=Add
class nodes_Add extends nodes_base implements nodes_implAction
{
  public function execute() {
    $data = json_decode(file_get_contents('php://input'), TRUE);
    $data['node_data'] = json_encode($data['node_data']);
    if (empty($data['node_id'])) {
        throw new Exception('empty data');
    }
    if (!empty($_GET['date'])) {
        $p = '/'.$date;
        $this->firebase->delete($this->defaultNodesPath . $p);
    }//end if
    
    $this->addDetails('nodes', $data);
    return $data;
  }//end execute()
  
}