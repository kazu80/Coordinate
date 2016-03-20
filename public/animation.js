/**
 * Created by kawakamikazuyoshi on 2016/03/21.
 */

document.body.addEventListener('click', function () {

    var tops   = document.querySelector('.tops img');
    var bottom = document.querySelector('.bottom img');

    tops.classList.toggle('active');
    bottom.classList.toggle('active');

});
