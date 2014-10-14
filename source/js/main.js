
var LeapApp = (function () {

	// Main application sequence
	var main = function () {

		// Declare self as app object
		var app = LeapApp;

		// Run the Leap Loop
		Leap.loop(loop);

	};

	var loop = function(space){
		// var m = document.getElementById('monitor');
		var cursor = document.getElementById('cursor'),
			cursorPos,
			finger;

		// If 1 hand and 1 pointing finger is in the space
		if(space.hands[0] && space.hands[0].fingers[0]) {

			finger = space.hands[0].fingers[0];

			// If the finger is in a pointing posture
			if(finger.extended) {
				// Calculate the cursor coords where the finger is pointing on the screen
				cursorPos = app.sensor.calucalteCoords( finger );
			}

		}

		// Move cursor to the calculated coords
		cursor.style.left = cursorPos.xCoord; 
		cursor.style.top  = cursorPos.yCoord;
	};

	return {
		main: main
	};

})();
