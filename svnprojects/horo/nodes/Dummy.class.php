<?php
//http://api.mkgalaxy.com/nodesApi.php?action=Dummy
class nodes_Dummy extends nodes_base implements nodes_implAction
{
  public function execute() {
    pr($this->config);
    exit;
   return range(1,10);
  }//end om()
  
  
}