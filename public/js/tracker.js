var tracker = {};

tracker.getCone = function(target){
	projectionDistance = camera.position.z;

	var z = target.position.z;
	var xMax = (target.position.x + 0.5) / z;
	var xMin = (target.position.x - 0.5) / z;
	var yMax = (target.position.y + 0.5) / z;
	var yMin = (target.position.y - 0.5) / z;

	xMax = room.width + (-xMax * projectionDistance);
	xMin = room.width + (-xMin * projectionDistance);
	yMax = room.width + (-yMax * projectionDistance);
	yMin = room.width + (-yMin * projectionDistance);

	var camPosX = camera.position.x + 100;
	var camPosY = camera.position.y + 100;

	if ((camPosX > xMin) && (camPosX < xMax) && (camPosY > yMin) && (camPosY < yMax)){
		console.log('target Destroyed!');
	}
}

tracker.checkVectors = function(){
	for(var i=0; i<cubes.length; i++){
		tracker.getCone(cubes[i]);
	}
}