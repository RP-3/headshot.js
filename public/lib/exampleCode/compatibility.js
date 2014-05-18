//returns object whose properties are standardised references to 
//browser-specific media-interaction functions

var compatibility = (function() {
        var lastTime = 0,
        isLittleEndian = true,

        URL = window.URL || window.webkitURL,

        requestAnimationFrame = function(callback, element) { //modifies current frame of 'element'
            var requestAnimationFrame =
                window.requestAnimationFrame || 
                function(callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime)); //ensures 16ms between frames
                    var id = window.setTimeout(function() {
                        callback(currTime + timeToCall);
                    }, timeToCall);
                    lastTime = currTime + timeToCall;
                    return id; //passed to cancelAnimationFrame to stop next invokation of setTimeout
                };

            return requestAnimationFrame.call(window, callback, element);
        },

        cancelAnimationFrame = function(id) { //cancels queued animation frame, whose id is given by its setTimeout
            var cancelAnimationFrame = 
            window.cancelAnimationFrame ||
            function(id) {
                clearTimeout(id);
            };
            return cancelAnimationFrame.call(window, id);
        },

        getUserMedia = function(options, success, error) { //gets permission to use media, invokes callback
            var getUserMedia =
                window.navigator.webkitGetUserMedia ||
                function(options, success, error) {
                    error();
                };

            return getUserMedia.call(window.navigator, options, success, error);
        },

        detectEndian = function() { //binary arrays
            var buf = new ArrayBuffer(8); //8bit binary array
            var data = new Uint32Array(buf); //32bit binary array
            data[0] = 0xff000000; //sets value of array to positive
            isLittleEndian = true;
            if (buf[0] === 0xff) { //if false === all bits are zero, i.e., all bits are zero
                isLittleEndian = false;
            }
            return isLittleEndian; //tests is all bits in given array are false
        };

    return {
        URL: URL,
        requestAnimationFrame: requestAnimationFrame,
        cancelAnimationFrame: cancelAnimationFrame,
        getUserMedia: getUserMedia,
        detectEndian: detectEndian,
        isLittleEndian: isLittleEndian
    };
})();