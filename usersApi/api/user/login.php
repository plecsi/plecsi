<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,content-type");
 
include_once '../config/db.php';
include_once '../object/user.php';
 
$database = new Database();
$db = $database->getConnection();
$user = new User($db);
$data = json_decode(file_get_contents("php://input"));
$user->email = $data->email;
$email_exists = $user->emailExists();
 
include_once '../config/core.php';
include_once '../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../libs/php-jwt-master/src/ExpiredException.php';
include_once '../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;
 
if($email_exists && password_verify($data->password, $user->password)){
    $token = array(
       "iss" => $iss,
       "aud" => $aud,
       "iat" => $iat,
       "nbf" => $nbf,
       "data" => array(
           "id" => $user->id,
           "user_id" => $user->user_id,
           "firstname" => $user->firstname,
           "lastname" => $user->lastname,
           "nickname" => $user->nickname,
           "avatar" => $user->avatar,
           "permission" => $user->permission,
           "email" => $user->email
       )
    );
    http_response_code(200);
    $jwt = JWT::encode($token, $key);
	
    echo json_encode(
            array(
                "user_id" => $user->user_id,
                "user" => $user->nickname,
                "avatar" => $user->avatar,
                "permission" => $user->permission,
                "message" => "Successful login.",
                "token" => $jwt
            )
        );
 
}
else{
    http_response_code(203);
    echo json_encode(array("message" => "Login failed."));
}
?>