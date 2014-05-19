$(window).load(function() {
    "use strict";

    // initialises canvas and video stream, getting permissions and erroring otherwise
    var video = document.getElementById('webcam');
    var canvas = document.getElementById('canvas');
    try {
        compatibility.getUserMedia({video: true}, function(stream) {
            try {
                video.src = compatibility.URL.createObjectURL(stream);
            } catch (error) {
                video.src = stream;
            }
            setTimeout(function() {
                    video.play();
                    demo_app();
                
                    compatibility.requestAnimationFrame(tick);
                }, 500);
        }, function (error) {
            $('#canvas').hide();
            $('#log').hide();
            $('#no_rtc').html('<h4>WebRTC not available.</h4>');
            $('#no_rtc').show();
        });
    } catch (error) {
        $('#canvas').hide();
        $('#log').hide();
        $('#no_rtc').html('<h4>Something goes wrong...</h4>');
        $('#no_rtc').show();
    }

    var stat = new profiler(); //initialise profiler and defined in profiler.js

    var gui,options,ctx,canvasWidth,canvasHeight;
    var curr_img_pyr, prev_img_pyr, point_count, point_status, prev_xy, curr_xy;

    var demo_opt = function(){ //can be changed through jquery. controls defined in dat.gui.min.js <div class='dg main a'> in index.HTML
        this.win_size = 20;
        this.max_iterations = 30;
        this.epsilon = 0.01;
        this.min_eigen = 0.001;
    }

    function demo_app() {
        canvasWidth  = canvas.width; //size as defined in index.HTML
        canvasHeight = canvas.height;
        ctx = canvas.getContext('2d'); //specifies 2D as opposed to webGL etc.

        ctx.fillStyle = "rgb(0,255,0)"; //sets both fills and strokes to pure green
        ctx.strokeStyle = "rgb(0,255,0)";

        curr_img_pyr = new jsfeat.pyramid_t(3);
        prev_img_pyr = new jsfeat.pyramid_t(3);
        curr_img_pyr.allocate(640, 480, jsfeat.U8_t|jsfeat.C1_t);
        prev_img_pyr.allocate(640, 480, jsfeat.U8_t|jsfeat.C1_t);

        point_count = 0;
        point_status = new Uint8Array(5);
        prev_xy = new Float32Array(5*2);
        curr_xy = new Float32Array(5*2); //200-element array storing  up to 100 x, y coords in series. 
        extractedValues.coords = function(nth){
            return [ curr_xy[nth<<1], curr_xy[(nth<<1)+1] ]; //returns x-y pairs of nth coordinate pair (zero indexed)
        };  

        options = new demo_opt();
        gui = new dat.GUI(); //defined in http://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage

        gui.add(options, 'win_size', 7, 30).step(1);
        gui.add(options, 'max_iterations', 3, 30).step(1);
        gui.add(options, 'epsilon', 0.001, 0.1).step(0.0025);
        gui.add(options, 'min_eigen', 0.001, 0.01).step(0.0025);

        stat.add("grayscale");
        stat.add("build image pyramid");
        stat.add("optical flow lk");
    }

    function tick() {
        compatibility.requestAnimationFrame(tick);
        stat.new_frame();
        if (video.readyState === video.HAVE_ENOUGH_DATA) { //readyState is integer from 0-4. 4 === best possible state
            ctx.drawImage(video, 0, 0, 640, 480); //draw over canvas spanning 460x480
            var imageData = ctx.getImageData(0, 0, 640, 480); //is an imageData object https://developer.mozilla.org/en-US/docs/Web/API/ImageData

            // swap flow data
            var _pt_xy = prev_xy;
            prev_xy = curr_xy;
            curr_xy = _pt_xy;
            var _pyr = prev_img_pyr;
            prev_img_pyr = curr_img_pyr;
            curr_img_pyr = _pyr;

            stat.start("grayscale");
            jsfeat.imgproc.grayscale(imageData.data, curr_img_pyr.data[0].data);
            stat.stop("grayscale");

            stat.start("build image pyramid");
            curr_img_pyr.build(curr_img_pyr.data[0], true);
            stat.stop("build image pyramid");

            stat.start("optical flow lk");
            jsfeat.optical_flow_lk.track(prev_img_pyr, curr_img_pyr, prev_xy, curr_xy, point_count, options.win_size|0, options.max_iterations|0, point_status, options.epsilon, options.min_eigen);
            stat.stop("optical flow lk");

            prune_oflow_points(ctx);

            $('#log').html(stat.log() + '<br/>click to add tracking points: ' + point_count);
        }
    }

    function on_canvas_click(e) {
        var coords = canvas.relMouseCoords(e);
        if(coords.x > 0 & coords.y > 0 & coords.x < canvasWidth & coords.y < canvasHeight) {
            if(point_count === 2){point_count = 0;} //allow a maximum of two points
            curr_xy[point_count<<1] = coords.x;
            curr_xy[(point_count<<1)+1] = coords.y;
            point_count++;
        }
    }
    canvas.addEventListener('click', on_canvas_click, false);

    function draw_circle(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.fill();
    }

    function prune_oflow_points(ctx) {
        var n = point_count;
        var i=0,j=0;

        for(; i < n; ++i) {
            if(point_status[i] == 1) {
                if(j < i) {
                    curr_xy[j<<1] = curr_xy[i<<1];
                    curr_xy[(j<<1)+1] = curr_xy[(i<<1)+1];
                }
                draw_circle(ctx, curr_xy[j<<1], curr_xy[(j<<1)+1]);
                ++j;
            }
        }
        point_count = j;
    }

    function relMouseCoords(event) {
        var totalOffsetX=0,totalOffsetY=0,canvasX=0,canvasY=0;
        var currentElement = this;

        do {
            totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
            totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
        } while(currentElement = currentElement.offsetParent)

        canvasX = event.pageX - totalOffsetX;
        canvasY = event.pageY - totalOffsetY;

        return {x:canvasX, y:canvasY}
    }
    HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

    $(window).unload(function() {
        video.pause();
        video.src=null;
    });
});