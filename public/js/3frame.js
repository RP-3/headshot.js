//set up basic webGL renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerWidth*0.75 );
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
	var max = camera.position.z - 8;

	var orient = function(){ return (Math.random() > 0.5) ? 1 : -1;}

	subject.position.set(
		orient() * Math.random() * max,
		orient() * Math.random() * max,
		camera.position.z - (Math.random() * roomData.depth * 2) - 20
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
			if(Math.abs(cubes[i].position.x) < roomData.width && Math.abs(cubes[i].position.y) < roomData.height){
				tracker.missed++;
				$('#missed').text(tracker.missed + " missed");
			}
			scene.remove(cubes[i])
			cubes.splice(i, 1);
		}else{
			cubes[i].translateZ(0.05);
		}
	}
}

//set up some light sources
var light = new THREE.PointLight(0xffffff);
light.position.set(0, 0, 0);
scene.add(light);

//set up screen point for camera to focus on (this will equate to our device's screen)
var scn = new THREE.Vector3(0, 0, 0);

//render scene
renderer.render(scene, camera);

//initialise simple animation function
var animate = function(){
	dropCubes();
	laser.moveProjectiles();
	setCamPos();
	camera.lookAt(scn);
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


















