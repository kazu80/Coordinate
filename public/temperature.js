/**
 * Pub Nub
 */
var pubnub = PUBNUB.init({
                             publish_key: 'pub-c-3104c76a-abd8-4faa-bfb5-44f503b86fbf',
                             subscribe_key: 'sub-c-cbde560a-ece9-11e5-8112-02ee2ddab7fe',
                             error: function (error) {
                                 console.log('Error:', error);
                             }
                         });

var temperature = document.querySelector('#el span');

pubnub.subscribe({
                     channel: 'temperature',
                     message: function (m) {
                         console.log("subscribe");
                         temperature.style.transform = "rotate("+m+"deg)";
                     },
                     error: function (e) {
                         console.log(e);
                     }
                 });

/**
 * 温度計
 */
var needle = document.getElementById('needle');
var el     = document.getElementById('el');

var measureDeg = function() {
    var st = window.getComputedStyle(needle, null);
    var tr = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") ||
        "fail...";

    var values = tr.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',');
    var a = values[0];
    var b = values[1];
    var c = values[2];
    var d = values[3];

    var scale = Math.sqrt(a*a + b*b);

    // arc sin, convert from radians to degrees, round
    var sin = b/scale;
    var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

    el.setAttribute('data-value', angle);
};

setInterval(measureDeg, 10);
