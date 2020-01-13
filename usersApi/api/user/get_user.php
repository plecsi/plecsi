<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,content-type");
 
// files needed to connect to database
include_once '../config/db.php';
include_once '../object/user.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate user object
$user = new UserData($db);
 
// check email existence here

 
// update() method will be here


// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
$user->user_id = $data->user_id;
$get_user = $user->getUser();
 
// generate json web token
include_once '../config/core.php';
include_once '../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../libs/php-jwt-master/src/ExpiredException.php';
include_once '../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;
 
// check if email exists and if password is correct
if($get_user){
 
    $token = array(
       "iss" => $iss,
       "aud" => $aud,
       "iat" => $iat,
       "nbf" => $nbf,
       "data" => array(
           "id" => $user->id,
           "user_id" => $user->user_id,
       )
    );

    // set response code
    http_response_code(200);
 
    // generate jwt
    $jwt = JWT::encode($token, $key);
	
    echo json_encode(
            array(
                "user_id" => $user->user_id,
                "user" => $user->nickname,
                "firstname"=> $user->firstname,
                "lastname" => $user->lastname,
                "nickname" => $user->nickname,
                "avatar" => $user->avatar,
                "permission" => $user->permission,
                "message" => "Successfull.",
                "token" => $jwt
            )
        );
 
}
 
// login failed
else{
 
    // set response code
    http_response_code(203);
 
    // tell the user login failed
echo json_encode(array("message" => "Something wrong. User isn't exist"));
}
?>