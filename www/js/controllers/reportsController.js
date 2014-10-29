(function(){
    'use strict';

    var app = angular.module("medicine");

    app.controller("reportsController", function($scope, $filter, recordSearchService, reportService, $http) {

        $scope.data = {
            fromDate:null,
            toDate: $filter('date')(new Date().setHours(0,0,0,0),'yyyy-MM-dd')
        };

        $scope.generateReport = function()
        {
            $http.get("templates/reportTemplate.html").success(function(tpl){
                var html = tpl;
                var data = { "test": "New Value" };
                var output = Plates.bind(html, data);
            });

         //   var x = $templateCache.get("templates/reportTemplate.html");


            var fromDateTicks = Date.parse($scope.data.fromDate);
            var fromDate = fromDateTicks ? new Date(fromDateTicks) : null;

            var toDateTicks = Date.parse($scope.data.toDate);
            var toDate = toDateTicks ? new Date(toDateTicks) : null;

            var searchDefinition = new recordSearchService.SearchDefinition(fromDate, toDate, false, []);

            reportService.generateReport(searchDefinition);
        }
    });

})();

