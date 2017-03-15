<?php session_start();
// include database and object file
include_once '../config/database.php';
include_once '../objects/user.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate user object
$user = new User($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set user property values
$user->name = $data->name;
$user->email = $data->email;
$user->password = $data->password;

// create the user
$stmt = $user->checkUser();
$num = $stmt->rowCount();

// if user exists
if ($num > 0){    
    echo 'exists';
} else
{
        // create the user
        if($user->createUser()){
             $_SESSION['user']=true; 
            echo "success";
        }
        // if unable to create the user, tell the user
        else{
             $_SESSION['user']=false; 
            echo "failed.";
        }
}

 
?>