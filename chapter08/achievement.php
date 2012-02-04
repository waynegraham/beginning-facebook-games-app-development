<?php

// Enforce https on production
if ($_SERVER['HTTP_X_FORWARDED_PROTO'] == "http" && $_SERVER['REMOTE_ADDR'] != '127.0.0.1') {
  header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
  exit();
}

/**
 * This sample app is provided to kickstart your experience using Facebook's
 * resources for developers.  This sample app provides examples of several
 * key concepts, including authentication, the Graph API, and FQL (Facebook
 * Query Language). Please visit the docs at 'developers.facebook.com/docs'
 * to learn more about the resources available to you
 */

// Provides access to Facebook specific utilities defined in 'FBUtils.php'
require_once('FBUtils.php');
// Provides access to app specific values such as your app id and app secret.
// Defined in 'AppInfo.php'
require_once('AppInfo.php');
// This provides access to helper functions defined in 'utils.php'
require_once('utils.php');

/*****************************************************************************
 *
 * The content below provides examples of how to fetch Facebook data using the
 * Graph API and FQL.  It uses the helper functions defined in 'utils.php' to
 * do so.  You should change this section so that it prepares all of the
 * information that you want to display to the user.
 *
 ****************************************************************************/

$LIMIT = 15;

// Log the user in, and get their access token
//$token = FBUtils::login(AppInfo::getHome());
//if ($token) {

  // Fetch the viewer's basic information, using the token just provided
 // $basic = FBUtils::fetchFromFBGraph("me?access_token=$token");
 // $my_id = assertNumeric(idx($basic, 'id'));

// Fetch the basic info of the app that they are using
//
//
//
function currentPage()
{
  $pageURL = "http";
  
  if($_SERVER["HTTPS"] == "on") {
    $pageURL .= "s";
  }

  $pageURL .= "://";

  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];

  return $pageURL;
}
?>

<!-- This following code is responsible for rendering the HTML   -->
<!-- content on the page.  Here we use the information generated -->
<!-- in the above requests to display content that is personal   -->
<!-- to whomever views the page.  You would rewrite this content -->
<!-- with your own HTML content.  Be sure that you sanitize any  -->
<!-- content that you will be displaying to the user.  idx() by  -->
<!-- default will remove any html tags from the value being      -->
<!-- and echoEntity() will echo the sanitized content.  Both of  -->
<!-- these functions are located and documented in 'utils.php'.  -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">

    <!-- We get the name of the app out of the information fetched -->
    <title><?php //echo(idx($app_info, 'name')) ?></title>
    <link rel="stylesheet" href="stylesheets/screen.css" media="screen">

    <!-- These are Open Graph tags.  They add meta data to your  -->
    <!-- site that facebook uses when your content is shared     -->
    <!-- over facebook.  You should fill these tags in with      -->
    <!-- your data.  To learn more about Open Graph, visit       -->
    <!-- 'https://developers.facebook.com/docs/opengraph/'       -->
    <meta property="og:site_name" content="LiquidFoot Games"/>

    <meta property="og:url"         content="<?php echo currentPage();?>">
    <meta property="og:title"       content="Liquidfoot Games">
    <meta property="og:type"        content="game.achievement"> 
    <meta property="og:title"       content="All Time High Score"> 
    <meta property="og:description" content="All time high score for game X"> 
    <meta property="og:image"       content="http://ogp.me/logo.png">
    <meta property="og:locale"      content="en_US">
    <?php echo('<meta property="fb:app_id" content="' . AppInfo::appID() . '" />'); ?>
  </head>
  <body>

    <h1>All Time High Score Achievement</h1>
    <p>You set the all time higest score</p>
  
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js"></script>

  </body>
</html>

