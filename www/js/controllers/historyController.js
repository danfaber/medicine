(function(){
    var app = angular.module("medicine");

    app.controller("historyController", function($scope, historyDataService, currentRecordDataService) {

        $scope.data = {};
        $scope.data.historyRecords = historyDataService.getAllDisplayHistory();

/*        $scope.resume = function()
        {
            currentRecordDataService.hydrateCurrentRecords();
        }*/
    });

})();
