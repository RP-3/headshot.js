var video = document.querySelector("#videoElement");
 
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

console.log(navigator.getUserMedia);

if (navigator.getUserMedia) {       
    navigator.getUserMedia({video: true}, handleVideo, videoError);
}
 
function handleVideo(stream) {
	console.log('steaming...');
    video.src = window.URL.createObjectURL(stream);
}
 
function videoError(e) {
    // do something
}