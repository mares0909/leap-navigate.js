
var LeapApp = (function () {

	// Main application sequence
	var main = function () {

		// Declare self as app object
		var self = LeapApp;

		// Run the Leap Loop
		Leap.loop(loop);

	};

	var loop = function(space){
		// var m = document.getElementById('monitor');
		var cursor = document.getElementById('cursor'),
			cursorX,
			cursorY,
			finger;

		// If 1 hand and 1 pointing finger is in the space calculate cursor coordinates
		if(space.hands[0] && space.hands[0].fingers[0]) {

			finger = space.hands[0].fingers[0];

			cursorX = self.sensor.calucalteX( finger[0] );
			cursorY = self.sensor.calucalteY( finger[1] );
		}

		// Move cursor to the calculated coordinates
		cursor.style.left = cursorX; 
		cursor.style.top  = cursorY;
	};

	return {
		main: main
	};

})();
