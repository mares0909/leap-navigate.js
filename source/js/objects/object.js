VanillaApp.myObject = (function (app) {

   // Main application sequence
   var greet = function () {

      alert("Hello!" + app.number);

   };

   return {
      greet: greet
   };

})(VanillaApp);