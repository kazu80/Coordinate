var five     = require('johnny-five');
var temporal = require("temporal");
var board    = new five.Board();

board.on("ready", function () {
    var strobe = this.pinMode(9, five.Pin.PWM);

    var foo = this.pinMode(9, five.Pin.PWM);

    temporal.loop(10, function (loop) {

        for (i=0;i<255;i++) {
            foo.analogWrite(9, i);
        }

        for (j=255;j>-1;j--) {
            foo.analogWrite(9, j);
        }

    });

});