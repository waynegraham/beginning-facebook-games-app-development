"use strict"  // Use strict JavaScript mode

var cocos  = require('cocos2d')   // Import the cocos2d module
  , events = require('events')    // Import the events module
  , geo    = require('geometry')  // Import the geometry module
  , ccp    = geo.ccp              // Short hand to create points

var Cocos = cocos.nodes.Layer.extend(/** @lends Cocos# */{
    /**
     * @class Initial application layer
     * @extends cocos.nodes.Layer
     * @constructs
     */
    init: function () {
        // You must always call the super class version of init
        Cocos.superclass.init.call(this)

        // Get size of canvas
        var s = cocos.Director.get('sharedDirector.winSize')

        // Create label
        var label = cocos.nodes.Label.create({ string: 'Cocos', fontName: 'Arial', fontSize: 76 })

        // Add label to layer
        this.addChild({ child: label, z:1 })

        // Position the label in the centre of the view
        label.set('position', ccp(s.width / 2, s.height / 2))
    }
})

/**
 * Entry point for the application
 */
exports.main = function () {
    // Initialise application

    // Get director
    var director = cocos.Director.get('sharedDirector')

    // Attach director to our <div> element
    director.attachInView(document.getElementById('cocos_app'))

    // Wait for the director to finish preloading our assets
    events.addListener(director, 'ready', function (director) {
        // Create a scene
        var scene = cocos.nodes.Scene.create()

        // Add our layer to the scene
        scene.addChild({ child: Cocos.create() })

        // Run the scene
        director.replaceScene(scene)
    })

    // Preload our assets
    director.runPreloadScene()
}
