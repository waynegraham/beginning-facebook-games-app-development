<?php
require_once('FBUtils.php');
require_once('AppInfo.php');
require_once('utils.php');
?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">

  <title>Purchase Credits</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body>

  <div id="fb-root"></div>

  <p><a onclick="purchaseCredits(); return false;">Purchase Credits</a></p>

  <script src='http://connect.facebook.net/en_US/all.js'></script>
  <script>
    var app_id = '<?php echo AppInfo::appId(); ?>';

    FB.init({appId: app_id, status: true, cookie: true});
    
    function purchaseCredits() {
      var obj = {
        method: 'pay',
        credits_purchase: true,
        dev_purchase_params: {"shortcut":"offer"}
      };
      FB.ui(obj, callback);
    }

    var callback = function(data) {
      if (data['order_id']) {
        return true;
      } else {
        //handle errors here
        return false;
      }
    };

  </script>

</body>
</html>


