$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
      var centroid = position.coords.latitude + ',' + position.coords.longitude;
      var url = 'https://graph.facebook.com/search';
      var coffeeShops = [];

      $.getJSON(
        url,
        {
          q: 'coffee',
          type: 'place',
          center: centroid,
          access_token: '<?php echo $facebook->getAccessToken();?>',
          distance: 1000
        },

        function(data) {
          $.each(data.data, function(i, item) {
            coffeeShops.push('<li id="' + item.id + '">' + item.name + '</li>');
          });

          $('<ul/>', {
            'class': 'coffee-list',
            html: coffeeShops.join('')
          }).prependTo('body');

        }); // getJSON
    }); // getCurrentPosition
  } // navigator check
});

