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


        // a and b are javascript Date objects
        function dateDiffInDays(a, b) {

            var _MS_PER_DAY = 1000 * 60 * 60 * 24;

            // Discard the time and time-zone information.
            var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
            var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

            return Math.floor((utc2 - utc1) / _MS_PER_DAY);
        }


/*        function parseYYYYmmDDdate(dateString)
        {
            var year = parseInt(dateString.substring(0,4));
            var month = parseInt(dateString.substring(5,7));
            var day = parseInt(dateString.substring(8,10));

            return new Date(year, month - 1, day);
        }*/


       return {
           removeFromArray: removeFromArray,
           moveItemsInArray: moveItemsInArray,
        /*   parseYYYYmmDDdate: parseYYYYmmDDdate,*/
           dateDiffInDays: dateDiffInDays
       }
    });



})();
