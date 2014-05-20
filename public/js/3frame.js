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
camera.position.set( 0, 0, 25); //all coordinates given as x, y, z in arbitrary units

//random color generator
var getRandomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//random position generator
var setRandomPosition = function(subject){
	var max = camera.position.z - 10;

	var orient = function(){ return (Math.random() > 0.5) ? 1 : -1;}

	subject.position.set(
		orient() * Math.random() * max,
		orient() * Math.random() * max,
		camera.position.z - (Math.random() * roomData.depth * 2)
		);
}

var cubes = []; //storage array for cubes

//set up basic cube constructor
var cubeMaker = function(pox, posy, posz, maxSize){
	var maxSize = maxSize || 2;
	var size = 1; //Math.random() * maxSize;
	var geometry = new THREE.BoxGeometry(size, size, size);
	var material = new THREE.MeshLambertMaterial( {color: getRandomColor() }); 
	var mesh = new THREE.Mesh(geometry, material);
	setRandomPosition(mesh); console.log(mesh.position);
	cubes.push(mesh);
	scene.add(mesh);
}

var dropCubes = function(){
	for (var i=0; i<cubes.length; i++){
		if(cubes[i].position.z > camera.position.z){
			cubes.splice(i, 1);
		}else{
			cubes[i].translateZ(0.1);
		}
	}
}

//set up some light sources
var light = new THREE.PointLight(0xffffff);
light.position.set(0, 0, 0);
scene.add(light);

//set up screen point for camera to focus on (this will equate to our device's screen)
var scn = new THREE.Vector3(0, 0, -20);

//render scene
renderer.render(scene, camera);

//initialise simple animation function
var animate = function(){
	dropCubes();
	laser.moveProjectiles();
	setCamPos();
	camera.lookAt(scene.position);
	light.position = camera.position;
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


















