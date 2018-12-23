<?php
/**
 * Created by PhpStorm.
 * User: jacknouatin
 * Date: 22/12/2018
 * Time: 13:33
 */

$email   = htmlentities(trim($_POST['email']));
$name    = htmlspecialchars($_POST['name']);
$message = htmlspecialchars($_POST['message']);

$errors = [];

if(!empty($name) && !empty($email) && !empty($message)){

    $dest ="contact@agrifoodcenter.com";
    $subject = "AgriFood";
    $message =" 
      <strong> 
         $message
      </strong> 
   ";
    $header = "From: $email\n";
    $header.= "Cc: $dest\n";
    $header.= "Reply-To: $email\n";
    $header.= "Content-Type: text/html; charset=iso-8859-1";

    if(mail($dest,$subject,$message,$header)){

        $errors['fail'] = false;
        $errors['message'] = "Mail envoyé avec succès.";

    }else {

        $errors['fail'] = true;
        $errors['message'] = "Désolé, un problème est survenu lors de l'envoi";
    }

}else{

    $errors['fail'] = true;
    $errors['message'] = 'Désolé, tous les champs doivent être remplis';
}

echo json_encode($errors);
