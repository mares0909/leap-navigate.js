LeapApp.monitor = (function (app) {
	
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

})(LeapApp);