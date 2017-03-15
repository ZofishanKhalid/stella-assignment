<?php session_start();

// include database and object files 
include_once '../config/database.php'; 
include_once '../objects/user.php'; 
 
// get database connection 
$database = new Database(); 
$db = $database->getConnection();
 
// instantiate user object
$user = new User($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));     
 
// set property of user to be edited
$user->email = $data->email;
$user->password = $data->password;
 
// get user info from database
$stmt = $user->getUser();
$num = $stmt->rowCount();

if ($num === 1){   
    $_SESSION['user']=true; 
    echo 'correct';
} else{ 
    $_SESSION['user']=false;     
    echo 'wrong';
}
 
?>