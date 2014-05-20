//set up axes lines for orientation
var roomData = {};


var lineMaterial = new THREE.LineBasicMaterial({
	color: getRandomColor()
});

var setAxes = function(){

	var xAxisG = new THREE.Geometry();
	xAxisG.vertices.push(new THREE.Vector3(-100, 0, 0));
	xAxisG.vertices.push(new THREE.Vector3(0, 0, 0));
	xAxisG.vertices.push(new THREE.Vector3(100, 0, 0));
	var xAxis = new THREE.Line(xAxisG, lineMaterial)
	scene.add(xAxis);

	var yAxisG = new THREE.Geometry();
	yAxisG.vertices.push(new THREE.Vector3(0, 100, 0));
	yAxisG.vertices.push(new THREE.Vector3(0, 0, 0));
	yAxisG.vertices.push(new THREE.Vector3(0, -100, 0));
	var yAxis = new THREE.Line(yAxisG, lineMaterial)
	scene.add(yAxis);
}

var generateRoom = function(ceilHeight, roomWidth, roomDepth){
	roomData.height = ceilHeight;
	roomData.width = roomWidth;
	roomData.depth = roomDepth;

	var genHorizontalPlane = function(ceilHeight, roomDepth){
		for (var i= -roomWidth; i<roomWidth; i++){
			var zLineG = new THREE.Geometry();
			zLineG.vertices.push(new THREE.Vector3(i, ceilHeight, -roomDepth));
			zLineG.vertices.push(new THREE.Vector3(i, ceilHeight, 0));
			zLineG.vertices.push(new THREE.Vector3(i, ceilHeight, 50));
			var zLine = new THREE.Line(zLineG, lineMaterial)
			scene.add(zLine);
		}
	}

	var genVerticalPlane = function(roomWidth, roomDepth){
		for (var i= -ceilHeight; i<ceilHeight; i++){
			var zLineG = new THREE.Geometry();
			zLineG.vertices.push(new THREE.Vector3(roomWidth, i, -roomDepth));
			zLineG.vertices.push(new THREE.Vector3(roomWidth, i, 0));
			zLineG.vertices.push(new THREE.Vector3(roomWidth, i, 50));
			var zLine = new THREE.Line(zLineG, lineMaterial)
			scene.add(zLine);
		}
	}

	var genCrossHorizontal = function(roomDepth, roomWidth, ceilHeight){
		for (var i= -roomDepth; i<roomDepth; i++){
			var xLineG = new THREE.Geometry();
			xLineG.vertices.push(new THREE.Vector3(-roomWidth, -ceilHeight, i));
			xLineG.vertices.push(new THREE.Vector3(0, -ceilHeight, i));
			xLineG.vertices.push(new THREE.Vector3(roomWidth, -ceilHeight, i));
			var xLine = new THREE.Line(xLineG, lineMaterial)
			scene.add(xLine);
		}
	}

	var genCrossVertical = function(roomDepth, roomWidth, ceilHeight){
		for (var i= -roomDepth; i<roomDepth; i++){
			var xLineG = new THREE.Geometry();
			xLineG.vertices.push(new THREE.Vector3(-roomWidth, -ceilHeight, i));
			xLineG.vertices.push(new THREE.Vector3(-roomWidth, 0, i));
			xLineG.vertices.push(new THREE.Vector3(-roomWidth, ceilHeight, i));
			var xLine = new THREE.Line(xLineG, lineMaterial)
			scene.add(xLine);
		}
	}		

	genHorizontalPlane(ceilHeight, roomDepth);
	genVerticalPlane(roomWidth, roomDepth);
	genHorizontalPlane(-ceilHeight, roomDepth);
	genVerticalPlane(-roomWidth, roomDepth);

	genCrossHorizontal(roomDepth, roomWidth, ceilHeight);
	genCrossHorizontal(roomDepth, roomWidth, -ceilHeight);
	genCrossVertical(roomDepth, roomWidth, ceilHeight);
	genCrossVertical(roomDepth, -roomWidth, ceilHeight);
}

setAxes();
generateRoom(5, 5, 50);





