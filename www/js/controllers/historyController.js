(function(){
    var app = angular.module("medicine");

    app.controller("historyController", function($scope, historyDataService) {

        $scope.data = {};
        $scope.data.historyRecords = historyDataService.getAllDisplayHistory();
    });

})();
