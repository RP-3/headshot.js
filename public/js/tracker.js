var tracker = {};

tracker.getCone = function(target){
	projectionDistance = camera.position.z;

	var z = target.position.z;
	var xMax = (target.position.x + 0.5) / z;
	var xMin = (target.position.x - 0.5) / z;
	var yMax = (target.position.y + 0.5) / z;
	var yMin = (target.position.y - 0.5) / z;

	xMax = roomData.width + (xMax * projectionDistance);
	xMin = roomData.width + (xMin * projectionDistance);
	yMax = roomData.width + (yMax * projectionDistance);
	yMin = roomData.width + (yMin * projectionDistance);

	var camPosX = camera.position.x + roomData.width;
	var camPosY = camera.position.y + roomData.width;

	if ((camPosX < xMin) && (camPosX > xMax) && (camPosY < yMin) && (camPosY > yMax)){
		tracker.hitCount++;
		return true;
	}
}

tracker.checkVectors = function(){
	for(var i=0; i<cubes.length; i++){
		if(tracker.getCone(cubes[i])){
			scene.remove(cubes[i]);
			cubes.splice(i, 1);
		}
	}
}

tracker.hitCount = 0;
tracker.fired = 0;
tracker.accuracy;
tracker.updateAccuracy = function(){
	return(tracker.hitCount/tracker.fired)*100
};