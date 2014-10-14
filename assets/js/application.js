
var LeapApp = (function () {

   // Main application sequence
   var main = function () {
      
      // Declare self as app object
      var self = LeapApp;
      
      // Runnin the leap loop
      Leap.loop(loop);

   };

   var loop = function(space){
      // var m = document.getElementById('monitor');
      // if(space.hands[0] && space.hands[0].fingers[0]) {
      //          m.innerHTML = space.hands[0].fingers[0].tipPosition[0] / 10 + "cm";
         
      // }
   };

   return {
      main: main
   };

})();
;LeapApp.maths = (function (app) {


   return {
      
   };

})(LeapApp);;LeapApp.monitor = (function (app) {
	
	var obj = {};

	// diameter of monitor in cms
	obj.d = 54.61;

	// ratio of monitor
	obj.ratio = {
		w: 16,
		h: 9
	};

	// ratio calculation coefficiont
	obj.ratioCoeff = Math.sqrt(obj.ratio.w * obj.ratio.w + obj.ratio.h * obj.ratio.h);

	// ratio in percentages
	obj.ratioPcnt = {
		w: obj.ratio.w / obj.ratioCoeff,
		h: obj.ratio.h / obj.ratioCoeff
	};

	// measurements of monitor in cms
	obj.w = obj.d * obj.ratioPcnt.w;
	obj.h = obj.d * obj.ratioPcnt.h;

	return obj;

})(LeapApp);;LeapApp.sensor = (function (app) {
	
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
	}

	return obj;

})(LeapApp);;
// Start application when DOM ready
document.addEventListener('DOMContentLoaded', LeapApp.main);
