(function(){
    'use strict';

    angular.module("medicine").factory("reportService",['recordSearchService', reportService]);

    function reportService(recordSearchService){


        return {
            generateReport:generateReport

        };


        function generateReport(searchDefinition)
        {
            var records = recordSearchService.getRecords(searchDefinition);




        }

        

    }

})();


