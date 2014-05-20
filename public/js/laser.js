var laser = {};

laser.projectiles = [];

laser.velocity = 0.5;

laser.getVector = function(){
	var zVector = -camera.position.z;
	var xVector = -camera.position.x;
	var yVector = -camera.position.y;
	var distance = Math.sqrt( (zVector * zVector) + (xVector * xVector) + (yVector * yVector) );
	var speed = laser.velocity / distance;
	return [xVector, yVector, zVector];
}

laser.fire = function(){
	var vectrix = laser.getVector();
	var radius = 0.2, segments = 16, rings = 16;
	var material = new THREE.MeshLambertMaterial({color: '#FFFF00'});

	var projectile = new THREE.Mesh(
		new THREE.SphereGeometry(
			radius, segments, rings
			), 
		material
		);
	projectile.vectrix = vectrix;
	laser.projectiles.push(projectile);
	scene.add(projectile);
}

laser.moveProjectiles = function(){
	var projectiles = laser.projectiles;
	for(var i=0; i<projectiles.length; i++){
		if(projectiles[i].position.z < -roomData.depth){
			scene.remove(projectiles[i]);
			projectiles.splice(i, 1);
		}else{
			var vectrix = projectiles[i].vectrix;
			projectiles[i].translateX(vectrix[0]*laser.velocity);
			projectiles[i].translateY(vectrix[1]*laser.velocity);
			projectiles[i].translateZ(vectrix[2]*laser.velocity);			
		}
	}
}

