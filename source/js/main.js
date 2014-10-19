
var LeapApp = (function () {

	var app,
		handCollection = {},
		fingerCollection = {},
		cursorCollection = {},
		cursorPosCollection = {};

	// Main application sequence
	var main = function () {

		// Declare self as app object
		app = LeapApp;

		handCollection = {
			left: new app.Sensor(),
			right: new app.Sensor()
		};

		cursorCollection = {
			left: document.getElementById('left-cursor'),
			right: document.getElementById('right-cursor')
		};
		
		// Run the Leap Loop
		Leap.loop(loop);

	};

	var loop = function(space){

		// If 1 hand and 1 pointing finger is in the space
		if(space.hands[0] && space.hands[0].fingers.length > 0) {

			for(hand in space.hands){
				side = space.hands[hand].type;
				// Calculate the cursor coords where the finger is pointing on the screen
				fingerCollection[side] = space.hands[hand].indexFinger;
				cursorPosCollection[side] = handCollection[side].calculateCoords( fingerCollection[side] );
				// If the finger is in a pointing posture
				if(fingerCollection[side].extended) {
					// Move cursor to the calculated coords
					cursorCollection[side].style.webkitTransform = "translate3d(" + (cursorPosCollection[side].xCoord * app.monitor.dpm) + "px, " + (cursorPosCollection[side].yCoord * -app.monitor.dpm) + "px, 0)";
				}
			}

		}
	};

	return {
		main: main
	};

})();
