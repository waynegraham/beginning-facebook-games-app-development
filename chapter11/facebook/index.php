<?php

// Enforce https on production
if ($_SERVER['HTTP_X_FORWARDED_PROTO'] == "http" && $_SERVER['REMOTE_ADDR'] != '127.0.0.1') {
  header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
  exit();
}

require_once('FBUtils.php');
require_once('AppInfo.php');
require_once('utils.php');

function randomPicture($pictures)
{
  $random = rand(0, count($pictures));
  echo $random;
  return $pictures[$random];
}


$token = FBUtils::login(AppInfo::getHome());
if ($token) {

  $basic = FBUtils::fetchFromFBGraph("me?access_token=$token");
  $my_id = assertNumeric(idx($basic, 'id'));

  // Fetch the basic info of the app that they are using
  $app_id = AppInfo::appID();
  $app_info = FBUtils::fetchFromFBGraph("$app_id?access_token=$token");

  $pictures = array_values(
    idx(FBUtils::fetchFromFBGraph("me/photos?access_token=$token&limit=50"), 'data', null, false)
  );

  $image = randomPicture($pictures);

  $src = $image['source'];

  // This formats our home URL so that we can pass it as a web request
  $encoded_home = urlencode(AppInfo::getHome());
  $redirect_url = $encoded_home . 'close.php';

  $send_url = "https://www.facebook.com/dialog/send?redirect_uri=$redirect_url&display=popup&app_id=$app_id&link=$encoded_home";
  $post_to_wall_url = "https://www.facebook.com/dialog/feed?redirect_uri=$redirect_url&display=popup&app_id=$app_id";
} else {
  // Stop running if we did not get a valid response from logging in
  exit("Invalid credentials");
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">

    <title><?php echo(idx($app_info, 'name')) ?></title>
    <link rel="stylesheet" href="stylesheets/screen.css" media="screen">

    <meta property="og:title" content="<?php echo(idx($app_info, 'name'));?>"/>
    <meta property="og:type" content="game"/>
    <meta property="og:url" content="<?php echo 'https://' . $_SERVER['SERVER_NAME']; ?>"/>
    <meta property="og:image" content=""/>
    <meta property="og:site_name" content="Image Puzzle for Facebook"/>
    <?php echo('<meta property="fb:app_id" content="' . AppInfo::appID() . '" />'); ?>
    <script>
      function popup(pageURL, title,w,h) {
        var left = (screen.width/2)-(w/2);
        var top = (screen.height/2)-(h/2);
        var targetWin = window.open(
          pageURL,
          title,
          'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left
          );
      }
    </script>
    <!--[if IE]>
      <script>
        var tags = ['header', 'section'];
        while(tags.length)
          document.createElement(tags.pop());
      </script>
    <![endif]-->
  </head>
  <body>
    <header class="clearfix">

      <p id="picture" style="background-image: url(https://graph.facebook.com/me/picture?type=normal&access_token=<?php echoEntity($token) ?>)"></p>

      <div>
        <h1>Welcome, <strong><?php echo idx($basic, 'name'); ?></strong></h1>
        <p class="tagline">
You are playing Image Puzzle
                    <a href="<?php echo(idx($app_info, 'link'));?>"><?php echo(idx($app_info, 'name')); ?></a>
        </p>
        <div id="share-app">
          <p>Share the app:</p>
          <ul>
            <li>
              <a href="#" class="facebook-button" onclick="popup('<?php echo $post_to_wall_url ?>', 'Post to Wall', 580, 400);">
                <span class="plus">Post to Wall</span>
              </a>
            </li>
            <li>
              <a href="#" class="facebook-button speech-bubble" onclick="popup('<?php echo $send_url ?>', 'Send', 580, 400);">
                <span class="speech-bubble">Send to Friends</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <section>

      <div id="main">
        <canvas id="game" width="600" height="400"></canvas>
      </div> 
    </section>

    <script src="javascripts/puzzle.js"></script>

    <script>
      var imagePath = '<?php echo $src ?>';
      init('game', imagePath, 3);
    </script>
  </body>
</html>
