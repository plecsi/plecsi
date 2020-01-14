<?php

class Categoryes{
    private $conn;
    private $table_name = "categories";
 
    public $id;
   
    public function __construct($db){
        $this->conn = $db;
    }
	
	function category(){
		//itt lesz a lekerdezes
	}
}

?>