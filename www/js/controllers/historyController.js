(function(){
    var app = angular.module("medicine");

    app.controller("historyController", function($scope, recordDefinitions) {

        $scope.recordDefinitions = recordDefinitions.all;

/*        $scope.data = {};
        $scope.data.historyRecords = historyDataService.getAllDisplayHistory();*/
    });

})();
