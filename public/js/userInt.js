$(document).ready(function(){
	$(document).keypress(function(event){
		if(event.keyCode === 32){ //press space to fire
			laser.fire();
		}else if(event.keyCode === 48){ //press 0 to begin animation
			animate();
		}else if(event.keyCode === 49){ //press 1 to create cubes
			cubeMaker();
		}else if(event.keyCode === 93){ //press up to increase difficultly and play
			tracker.difficulty++;
			tracker.play();
		}else if(event.keyCode === 91){ //press down to decrease difficulty and play
			if(tracker.difficulty > 1){
				tracker.difficulty--;
			}
			tracker.play();
		}
	});
});