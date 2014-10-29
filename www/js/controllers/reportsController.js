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

            var fromDateTicks = Date.parse($scope.data.fromDate);
            var fromDate = fromDateTicks ? new Date(fromDateTicks) : null;

            var toDateTicks = Date.parse($scope.data.toDate);
            var toDate = toDateTicks ? new Date(toDateTicks) : null;

            var searchDefinition = new recordSearchService.SearchDefinition(fromDate, toDate, false, []);

            var viewModel = reportService.generateReport(searchDefinition);


            $http.get("templates/reportTemplate.html").success(function(template){

                var compiledTemplate = Handlebars.compile(template);

                var report = compiledTemplate(viewModel);


            });

         //   var x = $templateCache.get("templates/reportTemplate.html");



        }
    });

})();

