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

//render scene
renderer.render(scene, camera);

//initialise simple animation function
var animate = function(){
	mesh.rotation.x += 0.05;
	mesh.rotation.y += 0.05;
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}