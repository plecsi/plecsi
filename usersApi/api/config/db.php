<?php

class Database{
 
    private $host = "localhost";
    private $db_name = "dbname";
    private $username = "dbuser";
    private $password = "dbpassword";
	private $port = "8888";
    public $conn;
 
    //db connection
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>