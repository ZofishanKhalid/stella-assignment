<?php session_start();
// include database and object file
include_once '../config/database.php';
include_once '../objects/product.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate product object
$product = new Product($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
$product->name = $data->name;
$product->price = $data->price;
$product->description = $data->description;
$product->created = date('Y-m-d H:i:s');
 
 //every product must have a name and a price. 
 //Description is not necessarily required
if($data->name=='null' || $data->name=="" || $data->price=='null' || $data->price=="" )
    {	         
        echo 'failed';
    }
    // if Fields are not empty
    else{
        // create the product
        if($product->create()){
            echo "created";
        }
        
        // if unable to create the product, tell the user
        else{
            echo "failed";
        }
    }
?>