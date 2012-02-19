<?php

require_once('../libs/db_manager.php');
require_once('../AppInfo.php');

if(!isset($_GET['id'])) {
  header('Location: /');
  exit();
}

$achievement_id = intval($_GET['id']);

$sql = <<<SQL
SELECT * 
FROM achievements
WHERE id = $achievement_id;
SQL;

$db = new DB_Manager();
$results = $db->query($sql);
$achievement = pg_fetch_array($results);

if(!sizeof($achievement) === 1) {
  header('Location: /');
  exit();
}

$url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
$image_url = 'http://' . $_SERVER['SERVER_NAME'] . $achievement['image'];
?>
<!doctype html>
<html lang="en">
<head>
<title><?php echo $achievement['title']; ?></title>
<meta property="og:type" content="game.achievement">
<meta property="og:url" content="<?php echo $url ?>">
<meta property="og:title" content="<?php echo $achievement['title']; ?>">
<meta property="og:locale" content="en_US">
<meta property="og:description" content="<?php echo $achievement['description']; ?>">
<meta property="og:image" content="<?php echo $image_url; ?>">
<meta property="game:points" content="<?php echo $achievement['points']; ?>">
<meta property="fb:app_id" content="<?php echo AppInfo::appID();?>">
</head>
<body>
<?php echo $achievement['description']; ?>
</body>
</html>

