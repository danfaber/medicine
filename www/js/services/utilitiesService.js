(function(){
    'use strict';

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

        function moveItemsInArray(array, from, to)
        {
            var itemToMove = array.splice(from, 1)[0];
            array.splice(to, 0, itemToMove);
        }


       return {
           removeFromArray: removeFromArray,
           moveItemsInArray: moveItemsInArray
       }
    });



})();
