CAAT.modules.initialization= CAAT.modules.initialization || {};


CAAT.modules.initialization.init = function( width, height, canvasId, imageURL, onEndLoading )   {

  var canvasContainer = document.getElementById(canvasId);  

    /**
     * create a director.
*/
  var director = new CAAT.Director().
    initialize(
      width||800,
  height||600,
  canvasContainer)
  ;
    /**
     * Load splash images. It is supossed the splash has some images.
*/
  new CAAT.ImagePreloader().loadImages(
    imageURL,
    function on_load( counter, images ) {

      if ( counter==images.length ) {

        director.emptyScenes();
        director.setImagesCache(images);

        onEndLoading(director);
        CAAT.loop(60);

      }
    }
  );
};

