$(document).ready(function(){
	$(document).keypress(function(event){
		if(event.keyCode === 32){ //press space to fire
			laser.fire();
		}else if(event.keyCode === 48){ //press 0 to begin animation
			animate();
		}else if(event.keyCode === 49){ //press 1 to create cubes
			cubeMaker();
		}

	});
});