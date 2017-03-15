<?php 
class User{ 
    // database connection and table name 
    private $conn; 
    private $table_name = "users"; 
 
    // object properties 
    public $id; 
    public $name; 
    public $email;
    public $password;
 
    // constructor with $db as database connection 
    public function __construct($db){ 
        $this->conn = $db;
    }

// Create User
function createUser(){
     
    // query to insert record
    $query = "INSERT INTO ". $this->table_name . " SET name=:name, password=:password, email=:email";
     
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // posted values - sanitize
    $this->name=htmlspecialchars(strip_tags($this->name));
    $this->email=htmlspecialchars(strip_tags($this->email));
    $this->password=htmlspecialchars(strip_tags($this->password));
   
    // bind values
    $stmt->bindParam(":name", $this->name);
    $stmt->bindParam(":email", $this->email);
    $stmt->bindParam(":password", $this->password);
     
    // execute query
    if($stmt->execute()){
        return true;
    }else{
        echo "<pre>";
            print_r($stmt->errorInfo());
        echo "</pre>";
 
        return false;
    }
}

// Get user information from database
function getUser()
{
    // query to read single record
    $query = "SELECT *  FROM " . $this->table_name . " WHERE email = :email AND password =:password LIMIT 1";
 
    // prepare query
    $stmt = $this->conn->prepare($query);

    // posted values
    $this->email=htmlspecialchars(strip_tags($this->email));
    $this->password=htmlspecialchars(strip_tags($this->password));

    // bind user info to be updated
    $stmt->bindParam(':email', $this->email);
    $stmt->bindParam(':password', $this->password);

    // run query
    $stmt->execute();

    return $stmt;
}

// Validate If User is already registered in the database
function checkUser()
{
    // query to read single record
    $query = "SELECT *  FROM " . $this->table_name . " WHERE email = :email LIMIT 1";
 
    // prepare query statement
    $stmt = $this->conn->prepare( $query );

    // posted values
    $this->email=htmlspecialchars(strip_tags($this->email));

    // bind user info
    $stmt->bindParam(':email', $this->email);

    //run query
    $stmt->execute();

    return $stmt;
}

} //User Class End
?>