(function() {

    var app = angular.module("medicine");

    app.controller("addController", function($scope, $stateParams, currentRecordDataService, dataType, optionGroupDataService, $state, $ionicLoading) {

        $scope.data = {};

        var recordId = $stateParams.recordId;

        if (recordId)
        {
            currentRecordDataService.loadHistoryRecord(recordId);
        }

        $scope.data.currentRecord =  currentRecordDataService.getCurrentRecord($stateParams.typeId);

        $scope.selectedOptionValue = function(field, dropdown)
        {
            var index = field.dropdowns.indexOf(dropdown);

            // remove all lower down dropdowns coz they are no longer correct
            field.dropdowns.splice(index + 1, Number.MAX_VALUE);

            if (dropdown.selectedValue && optionGroupDataService.isParent(dropdown.selectedValue))
            {
                field.dropdowns.push(dropdown.selectedValue);
            }
        }

        $scope.saveRecord = function()
        {
            currentRecordDataService.save($stateParams.typeId);
            $state.go('app.types');
            $ionicLoading.show({ template: 'Saved!', noBackdrop: true, duration: 1000 });
        }

    });

})();

