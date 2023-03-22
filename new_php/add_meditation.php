<?php
include './functions.php';

$request = $_POST;

$data = array(
    "name"=>$request['name_field'],
    "details"=>$request['details_field']
);

$response = array(); // define $response before checking if $data['name'] is empty

if(empty($data['name']) && !isset($_GET['update'])){
    $response['success'] = 0;
    $response['message'] = "Name is a required field";
} else {
    $attachment = false; // initialize $attachment variable

    if (isset($_FILES['audio_field']) && file_exists($_FILES['audio_field']['tmp_name']) && is_uploaded_file($_FILES['audio_field']['tmp_name'])) {
        $attachment = true;
        $type=$_FILES['audio_field']['type'];
        $temp_location=$_FILES['audio_field']['tmp_name'];

        $file_name = time()."_".$_FILES['audio_field']['name'];
        //Create the target folder
        $target_folder = "meditation_audios";
        if(!file_exists("../".$target_folder)){
            mkdir("../".$target_folder, 0777, true);
        }

        $final_location=$target_folder."/".$file_name;

        //upload the file to the target folder
        if(move_uploaded_file($temp_location, "../".$final_location)){

            $audio = $final_location;

            $data['audio'] = $audio;
        }
    } elseif(!isset($_GET['update'])) { // check if the file is not uploaded and it's not an update operation
        $response['success'] = 0;
        $response['message'] = "Audio is a required field";
    }
    
    if (isset($_FILES['image_field']) && file_exists($_FILES['image_field']['tmp_name']) && is_uploaded_file($_FILES['image_field']['tmp_name'])) {
        $attachment = true;
        $type=$_FILES['image_field']['type'];
        $temp_location=$_FILES['image_field']['tmp_name'];

        $file_name = time()."_".$_FILES['image_field']['name'];
        //Create the target folder
        $target_folder = "meditation_images";
        if(!file_exists("../".$target_folder)){
            mkdir("../".$target_folder, 0777, true);
        }

        $final_location=$target_folder."/".$file_name;

       
