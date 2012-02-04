<?php
require_once('FBUtils.php');
require_once('AppInfo.php');
require_once('utils.php');

$token = FBUtils::login(AppInfo::getHome());

if($token) {
  $basic = FBUtils::fetchFromFBGraph("me?access_token");

}

?>

<html>
<head>
  <meta charset="utf-8">
  <title><<?php echo(idx($app_info, 'name')) ?></title>
  <link rel="stylesheet" href="stylesheets/screen.css" media="screen">
<script>
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latLng = position.coords.latitude + ", " + position.coords.longitude;
      console.log("LatLng: " + latLng);
  }, errorHandler);
}</script>
</head>

<body>

</body>
</html>
