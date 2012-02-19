<?php

/**
 * This sample app is provided to kickstart your experience using Facebook's
 * resources for developers.  This sample app provides examples of several
 * key concepts, including authentication, the Graph API, and FQL (Facebook
 * Query Language). Please visit the docs at 'developers.facebook.com/docs'
 * to learn more about the resources available to you
 */

// Provides access to app specific values such as your app id and app secret.
// Defined in 'AppInfo.php'
require_once('AppInfo.php');

// Enforce https on production
if (substr(AppInfo::getUrl(), 0, 8) != 'https://' && $_SERVER['REMOTE_ADDR'] != '127.0.0.1') {
  header('Location: https://'. $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
  exit();
}

// This provides access to helper functions defined in 'utils.php'
require_once('utils.php');
require_once('libs/db_manager.php');

function randomPicture($photos)
{
  $random = rand(0, count($photos));
  return $photos[$random];
}

/*****************************************************************************
 *
 * The content below provides examples of how to fetch Facebook data using the
 * Graph API and FQL.  It uses the helper functions defined in 'utils.php' to
 * do so.  You should change this section so that it prepares all of the
 * information that you want to display to the user.
 *
 ****************************************************************************/

require_once('sdk/src/facebook.php');

$facebook = new Facebook(array(
  'appId'  => AppInfo::appID(),
  'secret' => AppInfo::appSecret(),
));

$user_id = $facebook->getUser();
if ($user_id) {
  try {
    // Fetch the viewer's basic information
    $basic = $facebook->api('/me');
  } catch (FacebookApiException $e) {
    // If the call fails we check if we still have a user. The user will be
    // cleared if the error is because of an invalid accesstoken
    if (!$facebook->getUser()) {
      header('Location: '. AppInfo::getUrl($_SERVER['REQUEST_URI']));
      exit();
    }
  }

  // And this returns 16 of your photos.
  $photos = idx($facebook->api('/me/photos?limit=16'), 'data', array());
  $image = randomPicture($photos);
  $src = $image['source'];

 }

// Fetch the basic info of the app that they are using
$app_info = $facebook->api('/'. AppInfo::appID());

$app_name = idx($app_info, 'name', '');

?>
<!DOCTYPE html>
<html xmlns:fb="http://ogp.me/ns/fb#" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=yes" />

    <title><?php echo he($app_name); ?></title>
    <link href='http://fonts.googleapis.com/css?family=Slackey' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="stylesheets/screen.css" media="Screen" type="text/css" />
    <link rel="stylesheet" href="stylesheets/mobile.css" media="handheld, only screen and (max-width: 480px), only screen and (max-device-width: 480px)" type="text/css" />

    <!--[if IEMobile]>
    <link rel="stylesheet" href="mobile.css" media="screen" type="text/css"  />
    <![endif]-->

    <!-- These are Open Graph tags.  They add meta data to your  -->
    <!-- site that facebook uses when your content is shared     -->
    <!-- over facebook.  You should fill these tags in with      -->
    <!-- your data.  To learn more about Open Graph, visit       -->
    <!-- 'https://developers.facebook.com/docs/opengraph/'       -->
    <meta property="og:title" content="<?php echo he($app_name); ?>" />
    <meta property="og:type" content="game" />
    <meta property="og:url" content="<?php echo AppInfo::getUrl(); ?>" />
    <meta property="og:image" content="<?php echo AppInfo::getUrl('/logo.png'); ?>" />
    <meta property="og:site_name" content="<?php echo he($app_name); ?>" />
    <meta property="og:description" content="Facebook Image Puzzle" />
    <meta property="fb:app_id" content="<?php echo AppInfo::appID(); ?>" />

<script type="text/javascript" src="/javascript/jquery-1.7.1.min.js"></script>

<style>
  #main {
  width: 92%;
  max-width: 100%;
  *zoom: 1;
  margin: auto;
  padding-top: 2em;
  padding-bottom: 1.3em;
}

#game {
  margin: auto;
  display: block;
}

#splash {
  width: 600px;
  height: 400px;
  margin: auto;
  display: block;
  text-align: center;
  border: 1px solid #c0c0c0;
  padding-top: 2em;
  background: #77D5FB;
}

#splash h1 {
  background: none repeat scroll 0 0 #E5592E;
  border-radius: 2px 2px 2px 2px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.55);
  color: #FFFFFF;
  font-family: 'Slackey',serif;
  font-size: 3em;
  height: 1.2em;
  padding-top: 25px;
  position: relative;
  text-shadow: 0 2px 1px rgba(0, 0, 0, 0.5);
}

#splash ul {
  margin-top: 2.2em;
  text-align: left;
  margin-left: 8em;
  font-size: 2em;
}

#splash li {
  line-height: 1.4em;
  font-family: 'Slackey', serif;
  color: #fff;
  text-shadow: 0 2px 1px rgba(0, 0, 0, 0.5);
}

#splash li:hover {
  color: #E5D9D5;
  cursor: pointer;
}
</style>

    <script type="text/javascript">
      function logResponse(response) {
        if (console && console.log) {
          console.log('The response was', response);
        }
      }

      $(function(){
        // Set up so we handle click on the buttons
        $('#postToWall').click(function() {
          FB.ui(
            {
              method : 'feed',
              link   : $(this).attr('data-url')
            },
            function (response) {
              // If response is null the user canceled the dialog
              if (response != null) {
                logResponse(response);
              }
            }
          );
        });

        $('#sendToFriends').click(function() {
          FB.ui(
            {
              method : 'send',
              link   : $(this).attr('data-url')
            },
            function (response) {
              // If response is null the user canceled the dialog
              if (response != null) {
                logResponse(response);
              }
            }
          );
        });

        $('#sendRequest').click(function() {
          FB.ui(
            {
              method  : 'apprequests',
              message : $(this).attr('data-message')
            },
            function (response) {
              // If response is null the user canceled the dialog
              if (response != null) {
                logResponse(response);
              }
            }
          );
        });
      });
    </script>

    <!--[if IE]>
      <script type="text/javascript">
        var tags = ['header', 'section'];
        while(tags.length)
          document.createElement(tags.pop());
      </script>
    <![endif]-->
  </head>
  <body>
    <div id="fb-root"></div>
    <script type="text/javascript">
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '<?php echo AppInfo::appID(); ?>', // App ID
          channelUrl : '//<?php echo $_SERVER["HTTP_HOST"]; ?>/channel.html', // Channel File
          status     : true, // check login status
          cookie     : true, // enable cookies to allow the server to access the session
          xfbml      : true // parse XFBML
        });

        // Listen to the auth.login which will be called when the user logs in
        // using the Login button
        FB.Event.subscribe('auth.login', function(response) {
          // We want to reload the page now so PHP can read the cookie that the
          // Javascript SDK sat. But we don't want to use
          // window.location.reload() because if this is in a canvas there was a
          // post made to this page and a reload will trigger a message to the
          // user asking if they want to send data again.
          window.location = window.location;
        });

        FB.Canvas.setAutoGrow();
      };

      // Load the SDK Asynchronously
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    </script>

    <header class="clearfix">
      <?php if (isset($basic)) { ?>
      <p id="picture" style="background-image: url(https://graph.facebook.com/<?php echo he($user_id); ?>/picture?type=normal)"></p>

      <div>
        <h1>Welcome, <strong><?php echo he(idx($basic, 'name')); ?></strong></h1>
        <p class="tagline">
          This is your app
          <a href="<?php echo he(idx($app_info, 'link'));?>" target="_top"><?php echo he($app_name); ?></a>
        </p>

        <div id="share-app">
          <p>Share your app:</p>
          <ul>
            <li>
              <a href="#" class="facebook-button" id="postToWall" data-url="<?php echo AppInfo::getUrl(); ?>">
                <span class="plus">Post to Wall</span>
              </a>
            </li>
            <li>
              <a href="#" class="facebook-button speech-bubble" id="sendToFriends" data-url="<?php echo AppInfo::getUrl(); ?>">
                <span class="speech-bubble">Send Message</span>
              </a>
            </li>
            <li>
              <a href="#" class="facebook-button apprequests" id="sendRequest" data-message="Test this awesome app">
                <span class="apprequests">Send Requests</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <?php } else { ?>
      <div>
        <h1>Welcome</h1>
        <div class="fb-login-button" data-scope="user_likes,user_photos,publish_actions"></div>
      </div>
      <?php } ?>
    </header>

    <?php if ($user_id): ?>

      <section id="main">
        <div id="splash">
          <h1>Image Puzzle</h1>
          <ul id="level">
            <li data-level="3">Easy</li>
            <li data-level="4">Medium</li>
            <li data-level="5">Hard</li>
          </ul>
        </div>

        <canvas id="game" width="600" height="400" style="display:none"></canvas>
      </section>

      <script src="javascript/puzzle.js"></script>

      <script>

        var imagePath = '<?php echo $src; ?>';

        $('#level li').click(function() {
          'use strict';

          $('#splash').hide();

          var level = $(this).attr('data-level');

          init('game', imagePath, level);

          score.uid = <?php echo $user_id; ?>;

          $('#game').show();
          startTimer();
        });
      </script>

    <?php
//$access_token = AppInfo::appID() . '|' . AppInfo::appSecret();

//$payload = array(
  //'achievement' => 'http://yourapplication.com/achivements/show.php?id=1',
  //'access_token' => $access_token
//);

//$response = $facebook->api('/' . $user_id . '/achievements', 'POST', $payload);
    ?>
    <?php endif; ?>

  </body>
</html>

