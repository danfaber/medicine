(function(){
    'use strict';

    var app = angular.module("medicine");

    app.controller("reportsController", function($scope, $filter) {

        $scope.data = {
            fromDate:null,
            toDate: $filter('date')(new Date().setHours(0,0,0,0),'yyyy-MM-dd')
        };

        $scope.generateReport = function()
        {

        }
    });

})();

