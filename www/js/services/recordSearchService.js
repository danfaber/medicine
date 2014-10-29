(function(){
    'use strict';

    var app = angular.module("medicine");

    app.factory("recordSearchService", function(){

        return {
            SearchDefinition: SearchDefinition

        };





        function getRecords(searchDefinition)
        {
            /* does some filtering logic */

            var fromDate = searchDefinition.fromDate ? searchDefinition.fromDate : new Date(2014,10,1);

            var today = new Date().setHours(0,0,0,0);
            var toDate = searchDefinition.toDate ? searchDefinition.toDate : today;


        }


        function SearchDefinition(fromDate, toDate, followUpOnly, filterWords)
        {
            this.fromDate = fromDate;
            this.toDate = toDate;
            this.followUpOnly = followUpOnly;
            this.filterWords = filterWords;
        }



    });



})();

