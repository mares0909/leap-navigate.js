LeapApp.sensor = (function (app) {
	
	var obj = {};

	// Sensor measurements in cms
	obj.w = 7.620;
	obj.h = 3.048;

	// Sensor data in cms
	obj.scale = 0.1;

	// Sensor distances from the monitor in cms
	// Use the sensor size as a ference without a ruler
	// h : horizontal offset from the center of the monitor
	// v : vertical offset from the bottom of the monitor
	// d : distance from the surface of the monitor
	obj.distane = {
		h : 0,
		v : - obj.w * 1,
		d : - obj.w * 2
	};

	

	// Pointing finger tip and origin positions
	var getX = function(){
		var finger = findFinger();
	}

	return obj;

})(LeapApp);