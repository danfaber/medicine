(function(){

    var app = angular.module("medicine");

    app.factory("utilitiesService", function(){

       var removeFromArray = function(array, predicate)
       {
           for(var i = array.length - 1; i >= 0; i--)
           {
               if (predicate(array[i])){
                   array.splice(i,1);
               }
           }
       };


       return {
           removeFromArray: removeFromArray
       }
    });



})();
