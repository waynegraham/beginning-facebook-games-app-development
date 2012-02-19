<?php
require_once("libs/db_manager.php");

// protect from get
if(!isset($_POST['uid']) || ! isset($_POST['level']) || ! isset($_POST['completion_time'])) {
  header('HTTP/1.1 403 Forbidden');
  die;
}

// check server referrer
if(! strpos($_SERVER['HTTP_REFERER'], $_SERVER['SERVER_NAME'])) {
  header('HTTP/1.1 403 Forbidden');
  die;
}

// make sure only numbers are being passed
$uid = intval($_POST['uid']);
$level = intval($_POST['level']);
$completion_time = intval($_POST['completion_time']);

$sql = <<<SQL
INSERT INTO puzzle_tracker(uid, level, completion_time)
VALUES($uid, $level, $completion_time);
SQL;

$db = new DB_Manager();

$add_puzzle = $db->query($sql);

print_r($db->fetch_array($add_puzzle));

$db->close();

