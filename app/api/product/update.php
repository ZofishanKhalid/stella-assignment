<?php session_start();
// include database and object files 
include_once '../config/database.php'; 
include_once '../objects/product.php'; 
 
// get database connection 
$database = new Database(); 
$db = $database->getConnection();
 
// prepare product object
$product = new Product($db);
 
// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));     
 
// set ID property of product to be edited
$product->id = $data->id;

//every product must have a name and a price. 
 //Description is not necessarily required
if($data->name=='null' || $data->name=="" || $data->price=='null' || $data->price=="")
    {	         
        echo 'failed';
    }
    //if Fields are not empty then update product
    else{
        // set product property values
        $product->name = $data->name;
        $product->price = $data->price;
        $product->description = $data->description;
        
        // update the product
        if($product->update()){
            echo "updated";
        }
        
        // tell user if unable to update the product
        else{
            echo "failed";
        }
    }        
                
?>