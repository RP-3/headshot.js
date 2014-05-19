//set up basic webGL renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( 640, 480 );
renderer.domElement.setAttribute('id', 'renderer');
document.body.appendChild( renderer.domElement );

var scene = new THREE.Scene();

//set up camera
var camera = new THREE.PerspectiveCamera(
	35, //FOV
	640 / 480, //aspect ratio
	.1,  //near value
	10000 //far value
);
camera.position.set( -15, 10, 15); //all coordinates given as x, y, z in arbitrary units

//random color generator for cube
var getRandomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//set up basic cube constructor
var cubeMaker = function(maxSize){
	var maxSize = maxSize || 5;
	var size = Math.random() * maxSize;
	var geometry = new THREE.BoxGeometry(size, size, size);
	var material = new THREE.MeshLambertMaterial( {color: function(){return getRandomColor();} } );
	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
}

//set up some light sources
var light = new THREE.PointLight(0xFFFF00);
light.position.set(10, 10, 10);
scene.add(light);
var ambientLight = new THREE.AmbientLight(0x000044);
scene.add(ambientLight);

//set up screen point for camera to focus on (this will equate to our device's screen)
var scn = new THREE.Vector3(0, 0, 0);

//render scene
renderer.render(scene, camera);

//initialise simple animation function
var animate = function(){
	setCamPos();
	camera.lookAt(scene.position);
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

//change camera position based on input from extractedValues
var setCamPos = function(cam){
	var cam = cam || camera; //if cam undefined, set cam to globally defined camera
	var camPos = extractedValues.getProjectedPosition()
	cam.position.set(
		camPos[0] - extractedValues.offSet[0],
		camPos[1] - extractedValues.offSet[1],
		camPos[2]
		);
}


















