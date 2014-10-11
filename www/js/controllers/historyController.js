(function(){
    var app = angular.module("medicine");

    app.controller("historyController", function($scope, recordDefinitions, recordRepository) {

        $scope.recordDefinitions = _(recordDefinitions.all)
            .map(function(recordDefinition) {return {
                id: recordDefinition.id,
                name: recordDefinition.name,
                records: recordRepository.all(recordDefinition.id)
            }});


/*        $scope.data = {};
        $scope.data.historyRecords = historyDataService.getAllDisplayHistory();*/
    });

})();
