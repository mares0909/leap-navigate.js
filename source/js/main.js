
var LeapApp = (function () {

	var app, hand;

	// Main application sequence
	var main = function () {

		// Declare self as app object
		app = LeapApp;

		// Declare hands
		hand = {
			left: new app.Sensor(),
			right: new app.Sensor()
		}

		// Run the Leap Loop
		Leap.loop(loop);

	};

	var loop = function(space){

		var cursor = {
				left: document.getElementById('left-cursor'),
				right: document.getElementById('right-cursor')
			},
			cursorPos = {},
			finger = {},
			hand;

		// If 1 hand and 1 pointing finger is in the space
		if(space.hands[0] && space.hands[0].fingers.length > 0) {

			for(hand in space.hands){
				hand = space.hands[hand];
				handleHand(space.hands[hand].type);
			}

		}
	};

	var handleHand = function(type){
		// Calculate the cursor coords where the finger is pointing on the screen
		finger[type] = hand.finger[type];
		cursorPos[type] = hand[type].calculateCoords( finger[type] );
		// If the finger is in a pointing posture
		if(finger[type].extended) {
			// Move cursor to the calculated coords
			cursor[type].style.webkitTransform = "translate3d(" + (cursorPos[type].xCoord * app.monitor.dpm) + "px, " + (cursorPos[hand.type].yCoord * -app.monitor.dpm) + "px, 0)";
		}
	}

	return {
		main: main
	};

})();
