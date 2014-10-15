
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
;LeapApp.maths = (function (app) {


	return {

	};

})(LeapApp);;LeapApp.monitor = (function (app) {
	
	var obj = {};

	// diameter of monitor in mms
	obj.d = 546.1;

	// ratio of monitor
	obj.ratio = {
		w: 16,
		h: 9
	};

	// resolution of monitor
	obj.resolution = {
		w: 1920,
		h: 1080
	};

	// ratio calculation coefficient
	obj.ratioCoeff = Math.sqrt(obj.ratio.w * obj.ratio.w + obj.ratio.h * obj.ratio.h);

	// ratio in percentages
	obj.ratioPcnt = {
		w: obj.ratio.w / obj.ratioCoeff,
		h: obj.ratio.h / obj.ratioCoeff
	};

	// measurements of monitor in mms
	obj.w = obj.d * obj.ratioPcnt.w;
	obj.h = obj.d * obj.ratioPcnt.h;

	// dot per inch
	obj.dpm = obj.resolution.w / (obj.w / 25.4);

	// dot per mm
	obj.dpm = obj.resolution.w / obj.w;

	return obj;

})(LeapApp);;LeapApp.Sensor = function() {

	var obj = {};

	var app = LeapApp;

	// Sensor measurements in mms
	obj.w = 76.20;
	obj.h = 30.48;

	// Sensor distances from the monitor in cms
	// Use the sensor size as a ference without a ruler
	// h : horizontal offset from the center of the monitor
	// v : vertical offset from the bottom of the monitor
	// d : distance from the surface of the monitor
	obj.distance = {
		h : 0,
		v : - obj.w * 1,
		d : + obj.w * 3,
		// Definition for the for loop
		def : ["h", "v", "d"]
	};

	var fingerBase = [],
		fingerTip = [],
		fingerBaseAbsolute = [],
		fingerTipAbsolute = [],
		fingerAngles = [];

	// Calculating the Y cursor coords
	obj.getCoords = function(direction){
		var monitor1 = document.getElementById('monitor1');
		var monitor2 = document.getElementById('monitor2');
		var monitor3 = document.getElementById('monitor3');

		var distance = fingerBaseAbsolute[2],
			fingerAngle = Math.abs(fingerAngles[direction]),
			fingerDirection = fingerAngles[direction] < 0 ? -1 : +1,
			fingerBaseC = fingerBaseAbsolute[direction],
			monitorAngle = Math.PI - (Math.PI / 2) - fingerAngle,
			monitorProjection = distance / Math.tan(monitorAngle);

		return fingerBaseC + (fingerDirection * monitorProjection);
	}

	// Calculating the cursor coords where the finger is pointing on the screen
	obj.calculateCoords = function(finger){

		for(var i = 0; i < 3; i++ ){

			// Storing the X, Y, Z coords of the finger base and tip
			fingerBase[i] = finger.mcpPosition[i];
			fingerTip[i] = finger.stabilizedTipPosition[i];

		}

		// Calculating and storing the absolute X, Y, Z coords of the finger base and tip relative to the screen position
		fingerBaseAbsolute[0] = fingerBase[0] + (app.monitor.w / 2) - obj.distance[ obj.distance.def[0] ];
		fingerTipAbsolute[0]  = fingerTip[0] + (app.monitor.w / 2) - obj.distance[ obj.distance.def[0] ];

		fingerBaseAbsolute[1] = fingerBase[1] + obj.distance.v;
		fingerTipAbsolute[1]  = fingerTip[1] + obj.distance.v;

		fingerBaseAbsolute[2] = obj.distance.d + fingerBase[2];
		fingerTipAbsolute[2]  = obj.distance.d + fingerBase[2];

		// Calculating and storing the finger angles in radians
		fingerAngles[0] = finger.direction[0];
		fingerAngles[1] = finger.direction[1];

		return {
			xCoord: obj.getCoords(0),
			yCoord: obj.getCoords(1)
		}

	}

	return obj;

};
// Start application when DOM ready
document.addEventListener('DOMContentLoaded', LeapApp.main);
