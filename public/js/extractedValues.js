var extractedValues = {};

//extractedValues.coords defined in sampleWorkFlow.js, since it needs access 
//to that file's internal closure scope

extractedValues.getCameraPosition = function(){
	var eye1 = extractedValues.coords(0);
	var eye2 = extractedValues.coords(1);

	var xOut = ( (eye1[0] + eye2[0]) >> 1 );
	var yOut = ( (eye1[1] + eye2[1]) >> 1 );

	return [xOut, yOut];
}

extractedValues.getScalingFactor = function(scalingArray, aspectArray){
	var aspectArray = aspectArray || [640, 480]; //default to aspect ratio of 640x480
	var scalingArray = scalingArray || [10, 7.5]; //default to given scaling array

	extractedValues.scalingFactor =  [
	scalingArray[0]/aspectArray[0],
	scalingArray[1]/aspectArray[1]
	];

	extractedValues.offSet = [ //subtract half of scaling array such that webcam vertex is inline 
	scalingArray[0] >> 1,	   //with threejs world origin
	scalingArray[1] >> 1
	]

	extractedValues.xMax = scalingArray[0];
	extractedValues.yMax = scalingArray[1];
}

extractedValues.getProjectedPosition = function(currentZ){
	var currentZ = currentZ || 15; //default camera distance from scene origin to 15

	var cameraPosition = extractedValues.getCameraPosition();

	return [
	extractedValues.xMax - (extractedValues.scalingFactor[0] * cameraPosition[0]),
	extractedValues.yMax - (extractedValues.scalingFactor[1] * cameraPosition[1]),
	currentZ
	];
}

extractedValues.getScalingFactor();