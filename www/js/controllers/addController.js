(function() {

    var app = angular.module("medicine");

    app.controller("addController", function($scope, $stateParams, currentRecordDataService, dataType, optionGroupDataService, $state, $ionicLoading, $ionicPopup, $ionicNavBarDelegate) {

        $scope.data = {};

        var recordId = $stateParams.recordId;

        $scope.isEdit = !!recordId;

        if ($scope.isEdit)
        {
            currentRecordDataService.loadHistoryRecord(recordId);
        }

        $scope.$on("backButtonClicked", function () {

            var isNewRecordWithNoFieldsSet = !$scope.isEdit && !currentRecordDataService.isAnyFieldSet($stateParams.typeId);

            if (isNewRecordWithNoFieldsSet || $scope.recordForm.$pristine) {
                $ionicNavBarDelegate.back();
                return;
            }

            var confirmBackPopup = $ionicPopup.confirm({
                title: 'Cancel Record',
                template: 'Are you sure you want to cancel this record without saving?'
            });

            confirmBackPopup.then(function (result) {
                if (result) {
                    currentRecordDataService.wipeCurrentRecord($stateParams.typeId);
                    $ionicNavBarDelegate.back();
                }
            })
        });

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
        };

        $scope.saveRecord = function()
        {
            currentRecordDataService.save($stateParams.typeId);
            currentRecordDataService.wipeCurrentRecord($stateParams.typeId);
            $state.go('app.types');
        }

    });

})();

