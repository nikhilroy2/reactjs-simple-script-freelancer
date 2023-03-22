<?php
include './functions.php';

$request = $params;

$data = array(
    "name"=>$request['name_field'],
    "details"=>$request['details_field']
);

if(empty($data['name']) && !isset($_GET['update'])){
    $response['success'] = 0;
    $response['message'] = "Name is a required field";
}else{
    if (file_exists($_FILES['audio_field']['tmp_name']) && is_uploaded_file($_FILES['audio_field']['tmp_name'])) {
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
    }else{
	$response['success'] = 0;
	$response['message'] = "Audio is a required field";
    }
    
//    $filename = "meditation_audios/".time().".mp3";
////    base64_to_($request['audio_field'], "../".$filename);
//    file_put_contents("../".$filename, base64_decode($request['audio_field']));
////    
//    $data['audio'] = $filename;



    if (file_exists($_FILES['image_field']['tmp_name']) && is_uploaded_file($_FILES['image_field']['tmp_name'])) {
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

	//upload the file to the target folder
	if(move_uploaded_file($temp_location, "../".$final_location)){

	    $image = $final_location;

	    $data['image'] = $image;
	}
    }else{
	$response['success'] = 0;
	$response['message'] = "Image is a required field";
    }
    
//    $filename = "meditation_images/".time().".jpg";
//    base64_to_jpeg($request['image_field'], "../".$filename);
////    
//    $data['image'] = $filename;

    $response = array();
    if(isset($_GET['update'])){
	$meditation_id = $_GET['update'];
	$db->update("meditations", $data, array("id"=>$meditation_id));
	$response['success'] = 1;
	$response['message'] = "Updated Successfully";
    }else{
	$db->insert("meditations", $data);
	$response['success'] = 1;
	$response['message'] = "Added Successfully";
    }
}



echo json_encode($response);