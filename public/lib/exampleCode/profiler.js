//three constructor functions calculating rendering timing and statistics and providing access to them
//as variables and pre-rendered HTML

var stopwatch = (function() {
    "use strict"; //restricts loose behaviours (such as silent errors), patches mistakes to increase run-time 
    //engine's speed and prohibits changes wrought by future ECMAscript versions 
    function stopwatch() { //stopwatch constructor function
        this.start_time = 0;
        this.stop_time = 0;
        this.run_time = 0;
        this.running = false;
    }
    //realistically, these prototypes *should* be defined outside the constructor function, right?
    stopwatch.prototype.start = function() { //sets instance's start time to now and it's running value to true
        this.start_time = new Date().getTime(); 
        this.running = true;
    }

    stopwatch.prototype.stop = function() { //sets stop time, run time and running value
        this.stop_time = new Date().getTime();
        this.run_time = (this.stop_time - this.start_time);
        this.running = false;
    }

    stopwatch.prototype.get_runtime = function() { //returns run time.
        return this.run_time;
    }

    stopwatch.prototype.reset = function() { //resets run time. other properties remain accessible until start() invoked again
        this.run_time = 0;
    }

    return stopwatch;
})();

var ring_buffer = (function() { //ring buffer constructor (contains another constructor?)
    "use strict";
    
    function ring_buffer(size) { // unclear on why we're naming functions identically... run time vs compile time?
        this.arr = new Int32Array(size);
        this.begin = 0;
        this.end = -1;
        this.num_el = 0;
        this.arr_size = size;
    }

    ring_buffer.prototype.push_back = function(elem) { //array altering functions. Assuming functionality is hidden inside API
        if (this.num_el<this.arr_size) {
            this.end++;
            this.arr[this.end] = elem;
            this.num_el++;
        } else {
            this.end = (this.end+1)%this.arr_size;
            this.begin = (this.begin+1)%this.arr_size;
            this.arr[this.end] = elem;
        }
    }

    ring_buffer.prototype.get = function(i) {
        return this.arr[(this.begin+i)%this.arr_size];
    }

    ring_buffer.prototype.size = function() {
        return this.num_el;
    }

    return ring_buffer;

})();

var profiler = (function() { //profiler constructor function
    "use strict";
    //
    var count_frames = 0;
    var ringbuff = new ring_buffer(20);
    function profiler() {
        this.fps = 0.0; // yeah float
        this.timers = [];
        //this.names = [];
        this.frame_timer = new stopwatch();
    }

    profiler.prototype.add = function(subj) {
        this.timers.push([subj, new stopwatch()]);
    }

    profiler.prototype.new_frame = function() {
        ++count_frames;
        var i = 0;
        var n = this.timers.length | 0;
        for(i = 0; i < n; ++i) {
            var sw = this.timers[i][1];
            sw.reset();
        }

        if(count_frames >= 1) {
            this.frame_timer.stop();
            ringbuff.push_back(this.frame_timer.get_runtime());
            var size = ringbuff.size();
            var sum = 0;
            for(i = 0; i < size; ++i) {
                sum += ringbuff.get(i);
            }
            this.fps = size / sum * 1000;
            this.frame_timer.start();
        }
    }

    profiler.prototype.find_task = function(subj) {
        var n = this.timers.length | 0;
        var i = 0;
        for(i = 0; i < n; ++i) {
            var pair = this.timers[i];
            if(pair[0] === subj) {
                return pair;
            }
        }
        return null;
    }

    profiler.prototype.start = function(subj) {
        var task = this.find_task(subj);
        task[1].start();
    }

    profiler.prototype.stop = function(subj) {
        var task = this.find_task(subj);
        task[1].stop();
    }

    profiler.prototype.log = function() {
        var n = this.timers.length | 0;
        var i = 0;
        var str = "<strong>FPS: " + this.fps.toFixed(2) + "</strong>";
        for(i = 0; i < n; ++i) {
            var pair = this.timers[i];
            str += "<br/>" + pair[0] + ": " + pair[1].get_runtime() + "ms";
        }
        return str;
    }

    return profiler;
})();