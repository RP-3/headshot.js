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