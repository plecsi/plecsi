<?php

class Categoryes{
	 // database connection and table name
    private $conn;
    private $table_name = "categories";
 
    // object properties
    public $id;
   
 
    // constructor
    public function __construct($db){
        $this->conn = $db;
    }
	
	function category(){
		//itt lesz a lekerdezes
	}
}

?>