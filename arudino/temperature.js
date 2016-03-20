/**
 * Created by kawakamikazuyoshi on 2016/03/20.
 *
 * left: 5V
 * center: A0
 * right: GMD
 *
 */

var five     = require('johnny-five');
var board    = new five.Board();
var temporal = require('temporal');

board.on('ready', function () {
    var pin = new five.Pin({
        pin: "A0",
        freq: 500
    });

    five.Pin.read(pin, function(error, value) {
        var cel = value * 500.0 / 1024.0 - 60.0;
    });
});
