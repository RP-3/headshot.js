headshot.js
=========== 

Simple, 3D, first-person shooter using JSFeat and Three js

Uses the Lucas Kanade optical tracking from JS feat to track the user's head. This was chosen because 
  a) I knew it worked smoothly and I needed something reliably for the Hackathon
  b) It is much smoother than other headtracking libraries I've come across, which keep racalculating the size of your head and therefore have too much 'jitter' in them. 
  
Work on this repo will require you spin up a server since chrome won't let you access your webcam from a local HTML file. If you're unfamiliar with node, you'll only have to:
  Install Node. 
  In terminal, when in the folder, run NPM install
  Run node server.js
  In your browser, navigate to localhost:8080
  
The meat of the repo is in the public folder. 

index.html
  Contains video element and canvas to render the video on to. 
  These are 'run' by the files in public/lib/exampleCode that are largely unchanged since forked from JS Feat. 
  In addition to my changes, I've added some annotation to help forkers understand what's going on. 
  
  Also contains a Three js webGL renderer, which is dynamically appended from /public/js/3frame.js. 
  Except for headtracking, all game logic and rendering lives inside /public/js. 
  
  Any other dynamic elements in index.html are also controlled from within /public/js
  
/public/js/3frame.js
  Primary controller of rendering and 3d effect. Rending behaviour, update patten and cube characteristics should be adjusted here. Renders cubes and controls camera position using inputs from:
  
/public/js/extractedValues.js
  Takes output from sampleWorkflow.js and converts it into meaningful coordinates in the context of the element and rendering from 3frame.js. Variables defining perspective and camera behaviour should be adjusted here. 
  
/public/js/room.js
  Statically defines a wireframe room rendered by 3frame.js. Variables defining these characteristics should be adjusted here. 
  
/public/js/laser.js
  Defines logic and animation behind the ball firing action. 
  
/public/js/tracker.js
  Defines aiming logic behind ball-firing action. Note this does not use collision detection but instead requires the user to be aiming at the front-facing surface of the cube to register a 'hit'.
  Also tracks game statistics and controlls DOM elements that reflect these to the user
  
/public/js/userInt.js
  Contains jQuery listeners that controll the game initialisation. No game logic or data here, just a control interface. 
  
/public/js/vid.js
  Deprecated. Simple js file used just to get video working during initial commit. Useful for debugging video issues or working out compatibility issues between browsers. 
  
