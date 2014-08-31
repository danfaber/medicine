(function() {

    var app = angular.module("medicine");

    app.controller("addController", function($scope, $stateParams, currentRecordDataService, dataType, optionGroupDataService, $state, $ionicLoading, $ionicPopup, $ionicNavBarDelegate, settingsDataService, $cordovaBarcodeScanner) {

/*        window.localStorage.setItem("sure","surely");
        $scope.sure = window.localStorage.getItem("sure");*/

        $scope.getPaused = function(){
            return window.localStorage.getItem("pause");
        };

        $scope.getResumed = function(){
            return window.localStorage.getItem("resume");
        };

        $scope.getReady = function(){
            return window.localStorage.getItem("deviceready");
        };


        $scope.pause = function()
        {
            currentRecordDataService.persistCurrentRecords();
        };

/*        $scope.resume = function()
        {
            currentRecordDataService.hydrateCurrentRecords();
        }*/

        $scope.data = {};

        $scope.isBarcodeScannerEnabled = settingsDataService.getBarcodeScannerEnabled();

        var recordId = $stateParams.recordId;

        $scope.isEdit = !!recordId;

        if ($scope.isEdit)
        {
            currentRecordDataService.loadHistoryRecord(recordId.toString());
        }

        $scope.data.currentRecord =  currentRecordDataService.getCurrentRecord($stateParams.typeId);

        $scope.$on("backButtonClicked", function () {

            var isNotChangedOrIsEmpty = !$scope.data.currentRecord.isDirty || !currentRecordDataService.isAnyFieldSet($stateParams.typeId);

            if (isNotChangedOrIsEmpty)
            {
                navigateBackAndDeleteCurrentRecord();
                return;
            }


/*            var isNewRecordWithNoFieldsSet = !$scope.isEdit && !currentRecordDataService.isAnyFieldSet($stateParams.typeId);

            if (isNewRecordWithNoFieldsSet || $scope.recordForm.$pristine) {
                $ionicNavBarDelegate.back();
                return;
            }*/

            var confirmBackPopup = $ionicPopup.confirm({
                title: 'Cancel Record',
                template: 'Are you sure you want to cancel this record without saving?'
            });

            confirmBackPopup.then(function (result) {
                if (result) {
                    navigateBackAndDeleteCurrentRecord();
/*                    currentRecordDataService.wipeCurrentRecord($stateParams.typeId);
                    $ionicNavBarDelegate.back();*/
                }
            })
        });

        function navigateBackAndDeleteCurrentRecord()
        {
            currentRecordDataService.wipeCurrentRecord($stateParams.typeId);
            $ionicNavBarDelegate.back();
        }


        $scope.setRecordToDirty = function()
        {
            $scope.data.currentRecord.isDirty = true;
        }


        $scope.selectedOptionValue = function(field, dropdown)
        {
            $scope.setRecordToDirty();

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

        $scope.openBarcodeScanner = function(field)
        {
            $cordovaBarcodeScanner.scan().then(function(imageData) {
                //success
                field.value = imageData.text;
            }, function(error) {
                //error
            });
        }

    });

})();

