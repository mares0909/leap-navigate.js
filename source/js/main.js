
var VanillaApp = (function () {

   var number = 100;

   // Main application sequence
   var main = function () {

      var self = VanillaApp;

      self.myObject.greet();

   };

   return {
      main: main,
      number: number
   };

})();
