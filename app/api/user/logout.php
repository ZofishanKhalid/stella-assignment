<?php session_start();

// Destroy user session and log out user
    $_SESSION['user']=false; 
    session_destroy();
    session_commit();
    echo "user logged out.";

?>