(function() {

    var app = angular.module("medicine");

    app.controller("addController", function($scope, $stateParams, currentRecordDataService, dataType, optionGroupDataService, $state, $ionicLoading, $ionicNavBarDelegate) {

        $scope.data = {};

        var recordId = $stateParams.recordId;

        $scope.isEdit = !!recordId;

        if ($scope.isEdit)
        {
            currentRecordDataService.loadHistoryRecord(recordId);
            $ionicNavBarDelegate.showBackButton(true);

        } else {
            $ionicNavBarDelegate.showBackButton(false);
        }

        $scope.data.currentRecord =  currentRecordDataService.getCurrentRecord($stateParams.typeId);

        $scope.selectedOptionValue = function(field, dropdown)
        {
            var index = field.dropdowns.indexOf(dropdown);

            // remove all lower down dropdowns coz they are no longer correct
            field.dropdowns.splice(index + 1, Number.MAX_VALUE);

            if (dropdown.value && optionGroupDataService.isParent(dropdown.value))
            {
                field.dropdowns.push(dropdown.value);
            }
        }

        $scope.isAnyFieldSet = function()
        {
            return currentRecordDataService.isAnyFieldSet($stateParams.typeId);
        }

        $scope.saveRecord = function()
        {
            currentRecordDataService.save($stateParams.typeId);
            $state.go('app.types');
            $ionicLoading.show({ template: 'Saved!', noBackdrop: true, duration: 1000 });
        }

    });

})();

