
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
