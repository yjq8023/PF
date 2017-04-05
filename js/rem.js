//¿ØÖÆremµÄº¯Êý
(function (doc,win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
            window['rem']=20 * (clientWidth / 320)
            //window['rem']<102?102:20 * (clientWidth / 320)
            if(window['rem']<102){
                window['rem']=102
                docEl.style.fontSize = 102+ 'px';

            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document,window);
