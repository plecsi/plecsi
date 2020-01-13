<?php
// 'user' object
class User{
 
    // database connection and table name
    private $conn;
    private $table_name = "users";
    // object properties
    public $id;
    public $user_id;
    public $email;
    public $password;
 
    // constructor
    public function __construct($db){
        $this->conn = $db;
    }
 
// create new user record
function create(){
 
    // insert query
    $query = "INSERT INTO " . $this->table_name . "
            SET
                firstname = :firstname,
                lastname = :lastname,
                nickname = :nickname,
                email = :email,
                password = :password";
 
    // prepare the query
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->firstname=htmlspecialchars(strip_tags($this->firstname));
    $this->lastname=htmlspecialchars(strip_tags($this->lastname));
    $this->nickname=htmlspecialchars(strip_tags($this->nickname));
    $this->email=htmlspecialchars(strip_tags($this->email));
    $this->password=htmlspecialchars(strip_tags($this->password));
 
    // bind the values
    $stmt->bindParam(':firstname', $this->firstname);
    $stmt->bindParam(':lastname', $this->lastname);
    $stmt->bindParam(':nickname', $this->nickname);
    $stmt->bindParam(':email', $this->email);
 
    // hash the password before saving to database
    $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
    $stmt->bindParam(':password', $password_hash);
 
    // execute the query, also check if query was successful
    if($stmt->execute()){
        return true;
    }
 
    return false;
}
 
// check if given email exist in the database
function emailExists(){
 
    // query to check if email exists
    $query = "SELECT a.id, a.password, a.permission, b.*
            FROM " . $this->table_name . " a
            left join users_data b
            on a.user_id = b.user_id
            WHERE a.email = ?
            LIMIT 0,1";
 
    // prepare the query
    $stmt = $this->conn->prepare( $query );
 
    // sanitize
    $this->email=htmlspecialchars(strip_tags($this->email));
 
    // bind given email value
    $stmt->bindParam(1, $this->email);
 
    // execute the query
    $stmt->execute();
 
    // get number of rows
    $num = $stmt->rowCount();
 
    // if email exists, assign values to object properties for easy access and use for php sessions
    if($num>0){
 
        // get record details / values
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
 
        // assign values to object properties
        $this->id = $row['id'];
        $this->user_id = $row['user_id'];
        $this->firstname = $row['firstname'];
        $this->lastname = $row['lastname'];
        $this->nickname = $row['nickname'];
        $this->avatar   = $row['avatar'];
        $this->permission = $row['permission'];
        $this->password = $row['password'];
 
        // return true because email exists in the database
        return true;
    }
 
    // return false if email does not exist in the database
    return false;
}
	// update a user record

public function update(){
    print_r($this);
    // if password needs to be updated
    $password_set=!empty($this->password) ? ", password = :password" : "";
 
    // if no posted password, do not update the password
    $query = "UPDATE " . $this->table_name . "
            SET 
                email = :email
                {$password_set}
            WHERE id = :id";
 
    // prepare the query
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    // $this->firstname=htmlspecialchars(strip_tags($this->firstname));
    // $this->lastname=htmlspecialchars(strip_tags($this->lastname));
    // $this->nickname=htmlspecialchars(strip_tags($this->nickname));
    $this->email=htmlspecialchars(strip_tags($this->email));
 
    // bind the values from the form
    // $stmt->bindParam(':firstname', $this->firstname);
    // $stmt->bindParam(':lastname', $this->lastname);
    // $stmt->bindParam(':nickname', $this->nickname);
    $stmt->bindParam(':email', $this->email);
 
    // hash the password before saving to database
    if(!empty($this->password)){
        $this->password=htmlspecialchars(strip_tags($this->password));
        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $password_hash);
    }
 
    // unique ID of record to be edited
    $stmt->bindParam(':id', $this->id);
 
    // execute the query
    if($stmt->execute()){
        print_r('pass update');
        return true;
    }
 
    return false;
}
	
}

class UserData{
    private $conn;

    private $table_user = "users_data";
 
    // object properties
   // public $id;
    public $user_id;
    public $firstname;
    // public $lastname;
    // public $nickname;
    // public $avatar;

    // constructor
    public function __construct($db){
        $this->conn = $db;
    }

    public function update(){
        $query = "UPDATE users_data 
                    SET firstname = :firstname,
                        lastname = :lastname,
                        nickname = :nickname,
                        avatar = :avatar 
                    WHERE user_id = :user_id";
        $stmt = $this->conn->prepare($query);
    
        $this->firstname=htmlspecialchars(strip_tags($this->firstname));
        $this->lastname=htmlspecialchars(strip_tags($this->lastname));
        $this->nickname=htmlspecialchars(strip_tags($this->nickname));
        $this->avatar=htmlspecialchars(strip_tags($this->avatar));
        $stmt->bindParam(':firstname', $this->firstname);
        $stmt->bindParam(':lastname', $this->lastname);
        $stmt->bindParam(':nickname', $this->nickname);
        $stmt->bindParam(':avatar', $this->avatar);
        $stmt->bindParam(':user_id', $this->user_id);
     //   $stmt->bindParam(':id', $this->id);
        
        if($stmt->execute()){
            return true;
        }
       
     
        return false;
     
    }
    function getUser(){
 
        // query to check if email exists
        $query = "SELECT a.id, a.password, a.permission, b.*
                FROM users a
                left join users_data b
                on a.user_id = b.user_id
                WHERE b.user_id = ?
                LIMIT 0,1";
     
        // prepare the query
        $stmt = $this->conn->prepare( $query );
     
        // sanitize
        $this->user_id=htmlspecialchars(strip_tags($this->user_id));
     
        // bind given email value
        $stmt->bindParam(1, $this->user_id);
     
        // execute the query
        $stmt->execute();
     
        // get number of rows
        $num = $stmt->rowCount();
     
        // if email exists, assign values to object properties for easy access and use for php sessions
        if($num>0){
     
            // get record details / values
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
     
            // assign values to object properties
            $this->id = $row['id'];
            $this->user_id = $row['user_id'];
            $this->firstname = $row['firstname'];
            $this->lastname = $row['lastname'];
            $this->nickname = $row['nickname'];
            $this->avatar   = $row['avatar'];
            $this->permission = $row['permission'];
            $this->password = $row['password'];
     
            // return true because email exists in the database
            return true;
        }
     
        // return false if email does not exist in the database
        return false;
    }

}