<?php 

if ($_SERVER['HTTP_X_FORWARDED_PROTO'] == "http" && $_SERVER['REMOTE_ADDR'] != '127.0.0.1') {
  header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
  exit();
}

require_once('FBUtils.php');
require_once('AppInfo.php');
require_once('utils.php');

function base64_url_decode($input) {
  return base64_decode(strtr($input, '-_', '+/'));
}
function parse_signed_request($signed_request, $app_secret) {
  list($encoded_sig, $payload) = explode('.', $signed_request, 2);

  // Decode the data
  $sig = base64_url_decode($encoded_sig);
  $data = json_decode(base64_url_decode($payload), true);

  if (strtoupper($data['algorithm']) !== 'HMAC-SHA256') {
    error_log('Unknown algorithm. Expected HMAC-SHA256');
    return null;
  }

  // Check signature
  $expected_sig = hash_hmac('sha256', $payload, $app_secret, $raw = true);

  if ($sig !== $expected_sig) {
    error_log('Bad Signed JSON signature!');
    return null;
  }

  return $data;
}

$appSecret = AppInfo::appSecret();

$data = array('content' => array());

// ensure the signed request is from Facebook
$request = parse_signed_request($_REQUEST['signed_request'], $appSecret);

if($request == NULL) {
  // handle unauthenticated request

}

$payload = $request['credits'];

$func = $_REQUEST['method'];
$order_id = $payload['order_id'];

if($func == 'payments_status_update') {
  $status = $payload['status'];

  // Add logic for validating and recording a purchase for your game here

  // move state from placed to settled to grant in-game item
  if($status == 'placed') {
    $next_state = 'settled';
    $data['content']['status'] = $next_state;
  }

  // compose returning data 
  $data['content']['order_id'] = $next_state;

} else if ($func == 'payments_get_items') {
  // remove escape characters
  $order_info = stripcslashes($payload['order_info']);
  $item_info = json_decode($order_info, true);

  // look up the item in the database, should return a title, price,
  // description, image_url and product_url
  //
  // For this example, the item array is manually set

  $item['title'] = 'Sword of Bludgeoning';
  $item['price'] = 5;
  $item['description'] = '+5 Hit';
  $item['image_url'] = 'http://www.yourdomain.com/images/fdb7a414a96660add08c40636e34b4fd.jpg';
  $item['product_url'] = 'http://www.yourdomain.com/images/fdb7a414a96660add08c40636e34b4fd.jpg';

  $data['content'] = array($item);
}

// required by api_fetch_reponse;
$data['method'] = $func;

echo json_decode($data);




