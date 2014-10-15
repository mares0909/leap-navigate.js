
var LeapApp = (function () {

	var app, leftHand, rightHand;

	// Main application sequence
	var main = function () {

		// Declare self as app object
		app = LeapApp;

		handLeft = new app.Sensor();
		handRight = new app.Sensor();

		// Run the Leap Loop
		Leap.loop(loop);

	};

	var loop = function(space){

		var cursorLeft = document.getElementById('left-cursor'),
			cursorPosLeft,
			fingerLeft;

		var cursorRight = document.getElementById('right-cursor'),
			cursorPosRight,
			fingerRight;

		// If 1 hand and 1 pointing finger is in the space
		if(space.hands[0] && space.hands[0].fingers.length > 0) {

			for(hand in space.hands){
				console.log(space.hands[hand]);
				if(space.hands[hand].type == "right") {
					// Calculate the cursor coords where the finger is pointing on the screen
					fingerRight = space.hands[hand].indexFinger;
					cursorPosRight = handRight.calculateCoords( fingerRight );
					// If the finger is in a pointing posture
					if(fingerRight.extended) {
						// Move cursor to the calculated coords
						cursorRight.style.webkitTransform = "translate3d(" + (cursorPosRight.xCoord * app.monitor.dpm) + "px, " + (cursorPosRight.yCoord * -app.monitor.dpm) + "px, 0)";
					}
				}
				if(space.hands[hand].type == "left") {
					// Calculate the cursor coords where the finger is pointing on the screen
					fingerLeft = space.hands[hand].indexFinger;
					cursorPosLeft = handLeft.calculateCoords( fingerLeft );
					// If the finger is in a pointing posture
					if(fingerLeft.extended) {
						// Move cursor to the calculated coords
						cursorLeft.style.webkitTransform = "translate3d(" + (cursorPosLeft.xCoord * app.monitor.dpm) + "px, " + (cursorPosLeft.yCoord * -app.monitor.dpm) + "px, 0)";
					}
				}
			}

		}
	};

	return {
		main: main
	};

})();
