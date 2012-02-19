<?php

require_once('../libs/db_manager.php');
require_once('../AppInfo.php');
require_once('../sdk/src/facebook.php');

if (!isset($_POST['score'])) {
  header('HTTP/1.1 403 Forbidden');
  die;
}

$achievement = intval($_POST['id']);
$user = $_POST['user_id'];

$facebook = new Facebook(array(
  'appId' => AppInfo::appId(),
  'secret' => AppInfo::appSecret()
));


$access_token = AppInfo::appId() . '|' . AppInfo::appSecret();
$graph_target = '/' . AppInfo::appID() . '/achievements';
$achievement_prefix = 'http://' . $_SERVER['SERVER_NAME'] . '/achievements/show.php?id=';


$db = new DB_Manager();

$sql = <<<SQL
SELECT *
FROM achievements
SQL;

while($row = pg_fetch_array($db->query($sql)) {
  $id = $row['id'];
  

  $payload = array('achivement' => '', 'access_token' => $access_token);

  $response = $facebook->api($graph_target, 'POST', $payload);

  print_r($response);
}



