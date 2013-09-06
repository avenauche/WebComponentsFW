define('custom-camera', [], function() {
    var idx = 0;

    var templateCSS = '<style>';
    templateCSS += '.cameraContainer{width:100%;}';
    templateCSS += '.videoContainer{width:100%;}';
    templateCSS += '.camera{}';
    templateCSS += '.btnContainer{}';
    templateCSS += '.leftBtnContainer{text-align:center; width:50%; float:left;}';
    templateCSS += '.rightBtnContainer{text-align:left;width:50%;float:left;}';
    templateCSS += '.blur {-webkit-filter: blur(3px);-moz-filter: blur(3px);-ms-filter: blur(3px);-o-filter: blur(3px);filter: blur(3px);}';
    templateCSS += '.brightness {-webkit-filter: brightness(5);-moz-filter: brightness(5);-ms-filter: brightness(5);-o-filter: brightness(5);filter: brightness(5);}';
    templateCSS += '.contrast {-webkit-filter: contrast(8);-moz-filter: contrast(8);-ms-filter: contrast(8);-o-filter: contrast(8);filter: contrast(8);}';
    templateCSS += '.hue-rotate {-webkit-filter: hue-rotate(90deg);-moz-filter: hue-rotate(90deg);-ms-filter: hue-rotate(90deg);-o-filter: hue-rotate(90deg);filter: hue-rotate(90deg);}';
    templateCSS += '.saturate {-webkit-filter: saturate(10);-moz-filter: saturate(10);-ms-filter: saturate(10);-o-filter: saturate(10);filter: saturate(10);}';
    templateCSS += '.grayscale {-webkit-filter: grayscale(1);-moz-filter: grayscale(1);-ms-filter: grayscale(1);-o-filter: grayscale(1);filter: grayscale(1);}';
    templateCSS += '.sepia {-webkit-filter: sepia(1);-moz-filter: sepia(1);-ms-filter: sepia(1);-o-filter: sepia(1);filter: sepia(1);}';
    templateCSS += '.invert {-webkit-filter: invert(1);-moz-filter: invert(1);-ms-filter: invert(1);-o-filter: invert(1);filter: invert(1);}';
    templateCSS += '</style>';

    var templateHTML = '';
    templateHTML += '<div class="cameraContainer" pseudo="cameraContainer">';
    templateHTML += '<div class="videoComtainer">';
    templateHTML += '<video class="camera" pseudo="camera" id="camera"></video>';
    templateHTML += '</div>';
    templateHTML += '<div class="btnContainer">';
    templateHTML += '<div class="leftBtnContainer">';
    templateHTML += '<button class="left">capture</button>';
    templateHTML += '</div>';
    templateHTML += '<div class="rightBtnContainer">';
    templateHTML += '<button class="right">stop</button>';
    templateHTML += '</div>';
    templateHTML += '</div>';
    templateHTML += '</div>';

    var filters = [
        'blur', 'brightness', 'contrast', 'hue-rotate',
        'saturate', 'grayscale', 'sepia', 'invert', 'none'
    ];

    var cloneVideo = "";

    var cameraProto = Object.create(HTMLElement.prototype);
    cameraProto.createdCallback = function() {
        var root = this.createShadowRoot();
        root.innerHTML = templateCSS + templateHTML;

        cloneVideo = root.querySelector('video');

        window.URL = window.URL || window.webkitURL;

        navigator.getUserMedia = navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;

        if (!navigator.getUserMedia) {
            fallback();
        } else {

            cloneVideo.addEventListener('click', changeFilter, false);
//            cloneVideo.setAttribute("pseudo", "camera");
//            cloneVideo.setAttribute("type", "video/webm; codecs='vp8, vorbis' ");
//            cloneVideo.setAttribute("autoplay", "");
//            cloneVideo.setAttribute("controls", "");
//            cloneVideo.src = "bucky.webm";
            navigator.getUserMedia({video: true, audio: true}, success, fallback);
        }

    };

    function fallback(e) {
        cloneVideo.title = "Camera Not Supported.";
        alert(cloneVideo.title);
    }

    function success(stream) {
        cloneVideo.src = window.URL.createObjectURL(stream);
        cloneVideo.play();
    }

    function changeFilter(e) {
        var el = e.target;
        el.className = '';
        var effect = filters[idx++ % filters.length]; // loop through filters.
        if (effect) {
            el.classList.add(effect);
        }
    }

    function capture() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            return;
        }

        intervalId = setInterval(function() {
            ctx.drawImage(video, 0, 0);
//            var img = document.createElement('img');
//            img.src = canvas.toDataURL('image/webp');

        }, 150);
    }

    document.register('custom-camera', {prototype: cameraProto});
});