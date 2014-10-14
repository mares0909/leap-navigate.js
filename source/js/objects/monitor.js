LeapApp.monitor = (function (app) {
	
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

})(LeapApp);