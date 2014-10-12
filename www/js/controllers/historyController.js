(function(){
    var app = angular.module("medicine");

    app.controller("historyController", function($scope, recordDefinitions, recordRepository, recordEntity) {

        $scope.recordDefinitions = _(recordDefinitions.all)
            .map(function(recordDefinition) {return {
                id: recordDefinition.id,
                name: recordDefinition.name,
                records: recordRepository.all(recordDefinition.id)
            }});

        _($scope.recordDefinitions).each(function(recordDef) {
           _(recordDef.records).each(function(record) {
               recordEntity.setDisplayFields(record);
           });
        });


/*        $scope.isFieldToDisplay = function(recordField)
        {
            return recordFieldEntity.isDisplayedInSummaryView(recordField);
        };*/


/*        $scope.data = {};
        $scope.data.historyRecords = historyDataService.getAllDisplayHistory();*/
    });

})();
