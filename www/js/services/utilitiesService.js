(function(){
    'use strict';

    var app = angular.module("medicine");

    app.factory("utilitiesService", function(){

       function removeFromArray(array, predicate)
       {
           for(var i = array.length - 1; i >= 0; i--)
           {
               if (predicate(array[i])){
                   array.splice(i,1);
               }
           }
       }

        function removeItemFromArray(array, item)
        {
            removeFromArray(array, function(val) {
                return val === item;
            });
        }

        function moveItemsInArray(array, from, to)
        {
            var itemToMove = array.splice(from, 1)[0];
            array.splice(to, 0, itemToMove);
        }


        // a and b are javascript Date objects
        function dateDiffInDays(a, b) {

            var _MS_PER_DAY = 1000 * 60 * 60 * 24;

            // Discard the time and time-zone information.
            var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
            var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

            return Math.floor((utc2 - utc1) / _MS_PER_DAY);
        }




       return {
           removeFromArray: removeFromArray,
           moveItemsInArray: moveItemsInArray,
           dateDiffInDays: dateDiffInDays,
           removeItemFromArray: removeItemFromArray
       }
    });



})();
