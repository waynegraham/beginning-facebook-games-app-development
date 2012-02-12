<?php
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4; */
require_once('AppInfo.php');
require_once('sdk/src/facebook.php');

if (!isset($_POST['score'])) {
  header('HTTP/1.1 403 Forbidden');
  die;
}

$score = $_POST['score'];
$user = $_POST['user_id'];

$facebook = new Facebook(array(
  'appId'  => AppInfo::appID(),
  'secret' => AppInfo::appSecret(),
));

$access_token = AppInfo::appID() . '|' . AppInfo::appSecret();

$payload = array('score' => $score, 'access_token' => $access_token);

$response = $facebook->api('/' . $user . '/scores', 'POST', $payload);

print_r($response);

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */

