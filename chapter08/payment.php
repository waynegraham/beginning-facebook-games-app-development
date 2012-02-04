<?php

if ($_SERVER['HTTP_X_FORWARDED_PROTO'] == "http" && $_SERVER['REMOTE_ADDR'] != '127.0.0.1') {
  header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
  exit();
}

require_once('FBUtils.php');
require_once('AppInfo.php');
require_once('utils.php');
?>
<html>
<head>
<title>Facebook Credits Page</title>
</head>
<body>
  <div id="fb-root"></div>
<script src="http://connect.facebook.net/en_US/all.js"></script>

  <p><a onclick="placeOrder(); return false;">Buy Sword</a></p>

<p><?php echo AppInfo::appId(); ?></p>

<script>
  FB.init({
    app_id: '<?php echo AppInfo::appId(); ?>',
      status: true, 
      cookie: true
  });

  function placeOrder() {
    var order_info = '123456'; // id that points to a database record

    var obj = {
      method: 'pay',
      order_info: order_info,
      purchase_type: 'item',
      dev_purchase_params: {'oscif': true}
    };

    FB.ui(obj, callback);
  }

  var callback = function(data) {
    if(data['order_id']) {
      return true;
    } else {
      //handle errors
      return false;
    }
  };
</script>
</body>
</html>
