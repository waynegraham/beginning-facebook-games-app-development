<?php

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

function randomPicture($photos)
{
  $random = rand(0, count($photos));
  return $photos[$random];
}

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
    <link rel="stylesheet" href="stylesheets/screen.css" media="Screen" type="text/css" />
    <link rel="stylesheet" href="stylesheets/mobile.css"
      media="handheld, only screen and (max-width: 480px), only screen and (max-device-width: 480px)" 
      type="text/css" />

    <!--[if IEMobile]>
    <link rel="stylesheet" href="mobile.css" media="screen" type="text/css"  />
    <![endif]-->

    <meta property="og:title" content="<?php echo he($app_name); ?>" />
    <meta property="og:type" content="game" />
    <meta property="og:url" content="<?php echo AppInfo::getUrl(); ?>" />
    <meta property="og:image" content="<?php echo AppInfo::getUrl('/logo.png'); ?>" />
    <meta property="og:site_name" content="<?php echo he($app_name); ?>" />
    <meta property="og:description" content="Facebook Image Puzzle Game" />
    <meta property="fb:app_id" content="<?php echo AppInfo::appID(); ?>" />

    <script type="text/javascript" src="/javascript/jquery-1.7.1.min.js"></script>


<script type="text/javascript">
function logResponse(response) {
  if (console && console.log) {
    console.log('The response was', response);
  }
}

$(function(){
  // Set up so we handle click on the buttons
  $('#postToWall').click(function() {
    FB.ui({
      method : 'feed',
        link   : $(this).attr('data-url')
    },
    function (response) {
      // If response is null the user canceled the dialog
      if (response != null) {
        logResponse(response);
      }
    });
  });

  $('#sendToFriends').click(function() {
    FB.ui({
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
      <?php
} else {
      ?>
        <div>
          <h1>Welcome</h1>
          <div class="fb-login-button" data-scope="user_likes,user_photos"></div>
        </div>
      <?php
}
      ?>
    </header>

    <?php
if ($user_id) {
    ?>

    <section id="main" class="clearfix">
      <canvas id="game" width="600" height="400"></canvas>
    </section>

    <?php
}
    ?>

  <script src="javascript/puzzle.js"></script>

  <script>
    var imagePath = '<?php echo $src; ?>';
    init('game', imagePath, 3);
  </script>
  </body>
</html>
