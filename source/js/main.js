
var LeapApp = (function () {

	var app;

	// Main application sequence
	var main = function () {

		// Declare self as app object
		app = LeapApp;

		// Run the Leap Loop
		Leap.loop(loop);

	};

	var loop = function(space){
		// var m = document.getElementById('monitor');
		var cursor = document.getElementById('cursor'),
			cursorPos,
			finger;

		// If 1 hand and 1 pointing finger is in the space
		if(space.hands[0] && space.hands[0].fingers.length > 0) {

			indexFinger = space.hands[0].indexFinger;

			// If the finger is in a pointing posture
			if(indexFinger.extended) {
				// Calculate the cursor coords where the finger is pointing on the screen
				cursorPos = app.sensor.calculateCoords( indexFinger );

				// Move cursor to the calculated coords
				console.log(app.monitor.dpm);
				cursor.style.left = (cursorPos.xCoord * app.monitor.dpm) + "px"; 
				cursor.style.top  = (cursorPos.yCoord * app.monitor.dpm) + "px"; 
			}

		}
	};

	return {
		main: main
	};

})();
