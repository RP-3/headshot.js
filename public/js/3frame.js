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
camera.lookAt(scene.position);

//set up basic cube
var geometry = new THREE.BoxGeometry(5, 5, 5);
var material = new THREE.MeshLambertMaterial( {color: 0xFF0000} );
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//set up light source
var light = new THREE.PointLight(0xFFFF00);
light.position.set(10, 10, 10);
scene.add(light);

var ambientLight = new THREE.AmbientLight(0x000044);
scene.add(ambientLight);

//render scene
renderer.render(scene, camera);

//initialise simple animation function
var animate = function(){
	setCamPos();
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

	cam.lookAt(mesh.position);
	renderer.render(scene, camera);
}





















