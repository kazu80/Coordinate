/**
 * Created by kawakamikazuyoshi on 2016/03/18.
 *
 * left: 5V
 * center: A0
 * right: GMD
 *
 */

var five   = require('johnny-five');
var board  = new five.Board();
var pubnub = require('pubnub')({
                                   publish_key   : "pub-c-3104c76a-abd8-4faa-bfb5-44f503b86fbf",
                                   subscribe_key : "sub-c-cbde560a-ece9-11e5-8112-02ee2ddab7fe",
                                   error: function (error) {
                                       console.log('Error:', error);
                                   }
                               });

board.on("ready", function () {
    console.log('Ready...');

    var pin = new five.Pin({
        pin: "A0",
        freq: 1000
    });

    five.Pin.read(pin, function(error, value) {
        var cel = value * 500.0 / 1024.0 - 60.0;

        pubnub.publish({
                           channel: 'temperature',
                           message:  cel.toFixed(2),
                           callback : function(m){
                               console.log("send");
                           }
                       });
    });

});

