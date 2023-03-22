include './functions.php';

$request = $params;

$data = array(
    "name" => $request['name_field'],
    "inhale" => $request['inhale_field'],
    "hold1" => $request['hold_1_field'],
    "exhale" => $request['exhale_field'],
    "hold2" => $request['hold_2_field'],
    "cycles" => $request['number_of_cycles_field']
);

if (empty($data['name']) && !isset($_GET['update'])) {
    $response['success'] = 0;
    $response['message'] = "Name is a required field";
} else {
    if (isset($request['image_field'])) {
        $filename = "timer_images/".time().".jpg";
        base64_to_jpeg($request['image_field'], "../".$filename);
        $data['image'] = $filename;
    }

    $response = array();
    if (isset($_GET['update'])) {
        $timer_id = $_GET['update'];
        $existingData = $db->get("timers", array("id" => $timer_id));
        if (isset($existingData['image']) && !isset($request['image_field'])) {
            $data['image'] = $existingData['image'];
        }
        $db->update("timers", $data, array("id" => $timer_id));
        $response['success'] = 1;
        $response['message'] = "Updated Successfully";
    } else {
        $db->insert("timers", $data);
        $response['success'] = 1;
        $response['message'] = "Added Successfully";
    }
}

echo json_encode($response);
