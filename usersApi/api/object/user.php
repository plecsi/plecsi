<?php

class User{
    private $conn;
    private $table_name = "users";
   
    public $id;
    public $user_id;
    public $email;
    public $password;
 
 
    public function __construct($db){
        $this->conn = $db;
    }
 
function create(){
    $query = "INSERT INTO " . $this->table_name . "
            SET
                firstname = :firstname,
                lastname = :lastname,
                nickname = :nickname,
                email = :email,
                password = :password";
 
    $stmt = $this->conn->prepare($query);
 
    $this->firstname=htmlspecialchars(strip_tags($this->firstname));
    $this->lastname=htmlspecialchars(strip_tags($this->lastname));
    $this->nickname=htmlspecialchars(strip_tags($this->nickname));
    $this->email=htmlspecialchars(strip_tags($this->email));
    $this->password=htmlspecialchars(strip_tags($this->password));
 
    $stmt->bindParam(':firstname', $this->firstname);
    $stmt->bindParam(':lastname', $this->lastname);
    $stmt->bindParam(':nickname', $this->nickname);
    $stmt->bindParam(':email', $this->email);
 
    $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
    $stmt->bindParam(':password', $password_hash);
 
    if($stmt->execute()){
        return true;
    }
 
    return false;
}
	
function emailExists(){
    $query = "SELECT a.id, a.password, a.permission, b.*
            FROM " . $this->table_name . " a
            left join users_data b
            on a.user_id = b.user_id
            WHERE a.email = ?
            LIMIT 0,1";
    $stmt = $this->conn->prepare( $query );
 
    $this->email=htmlspecialchars(strip_tags($this->email));
    $stmt->bindParam(1, $this->email);
    $stmt->execute();
    $num = $stmt->rowCount();
 
    if($num>0){
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
 
        $this->id = $row['id'];
        $this->user_id = $row['user_id'];
        $this->firstname = $row['firstname'];
        $this->lastname = $row['lastname'];
        $this->nickname = $row['nickname'];
        $this->avatar   = $row['avatar'];
        $this->permission = $row['permission'];
        $this->password = $row['password'];
 
        return true;
    }
 
    return false;
}

public function update(){
    $password_set=!empty($this->password) ? ", password = :password" : "";
 
    $query = "UPDATE " . $this->table_name . "
            SET 
                email = :email
                {$password_set}
            WHERE id = :id";

    $stmt = $this->conn->prepare($query);
    $this->email=htmlspecialchars(strip_tags($this->email));
    $stmt->bindParam(':email', $this->email);

    if(!empty($this->password)){
        $this->password=htmlspecialchars(strip_tags($this->password));
        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $password_hash);
    }

    $stmt->bindParam(':id', $this->id);

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

    public $user_id;
    public $firstname;
    // public $lastname;
    // public $nickname;
    // public $avatar;

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
        
        if($stmt->execute()){
            return true;
        }
       
     
        return false;
     
    }
    function getUser(){

        $query = "SELECT a.id, a.password, a.permission, b.*
                FROM users a
                left join users_data b
                on a.user_id = b.user_id
                WHERE b.user_id = ?
                LIMIT 0,1";

        $stmt = $this->conn->prepare( $query );

        $this->user_id=htmlspecialchars(strip_tags($this->user_id));
        $stmt->bindParam(1, $this->user_id);
        $stmt->execute();
        $num = $stmt->rowCount();

        if($num>0){
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->id = $row['id'];
            $this->user_id = $row['user_id'];
            $this->firstname = $row['firstname'];
            $this->lastname = $row['lastname'];
            $this->nickname = $row['nickname'];
            $this->avatar   = $row['avatar'];
            $this->permission = $row['permission'];
            $this->password = $row['password'];

            return true;
        }
        return false;
    }

}