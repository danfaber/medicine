(function() {
    'use strict';

    angular.module("medicine").controller("addController", addController);

    function addController($scope, $stateParams, currentRecordService, $state, $ionicPopup, recordEntity, pickListService, pickListRepository)
    {
        var recordDefinitionId = parseInt($stateParams.recordDefinitionId);
        $scope.data = {};
        $scope.data.isEdit = false;

        if ($stateParams.recordId)
        {
            $scope.data.isEdit = true;
            var recordId = parseInt($stateParams.recordId);
            $scope.record = currentRecordService.setCurrentRecord(recordDefinitionId, recordId);
        }
        else
        {
            $scope.record = currentRecordService.get(recordDefinitionId);
        }

        $scope.globalData.currentRecordDefinition = $scope.record.recordDefinition;

        $scope.isBackButtonHidden = function()
        {
            return $scope.record.isDirty;
        };

        $scope.saveRecord = function()
        {
            currentRecordService.save(recordDefinitionId);

            if (typeof(Worker) !== "undefined")
            {
                var worker = new Worker("js/WebWorkers/pickListSaveWorker.js");
                worker.postMessage(pickListService.getAll());
                worker.onmessage = onPickListSerialized;
            }
            else
            {
                var pickListJson = angular.toJson(pickListService.getAll());
                pickListRepository.saveAll(pickListJson);
            }
            $state.go('app.recordDefinitions');
        };

        function onPickListSerialized(e)
        {
            var pickListJson = e.data;
            pickListRepository.saveAll(pickListJson);
        }

        $scope.cancelEdit = function()
        {
            var confirmBackPopup = $ionicPopup.confirm({
                title: 'Cancel Record',
                template: 'Are you sure you want to cancel this record without saving?'
            });

            confirmBackPopup.then(function (result) {
                if (result) {
                    currentRecordService.remove($scope.record.recordDefinitionId);
                    $state.go('app.recordDefinitions');
                }
            });

        };

/* KEEP THIS LOGIC BUT GOES ELSEWHERE
       $scope.$on("backButtonClicked", function () {

            if (!$scope.record.isDirty)
            {
                clearCurrentRecordAndNavigateBack();
                return;
            }

            var confirmBackPopup = $ionicPopup.confirm({
                title: 'Cancel Record',
                template: 'Are you sure you want to cancel this record without saving?'
            });

            confirmBackPopup.then(function (result) {
                if (result) {
                    clearCurrentRecordAndNavigateBack();
                }
            })
        });*/

/*        function clearCurrentRecordAndNavigateBack()
        {
            currentRecordService.remove($scope.record.recordDefinitionId);
            $ionicNavBarDelegate.back();
        }*/
    }


/*    app.controller("addController", function($scope, $stateParams, currentRecordDataService, dataType, optionGroupDataService, $state, $ionicLoading, $ionicPopup, $ionicNavBarDelegate, settingsDataService, $cordovaBarcodeScanner) {

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

            var confirmBackPopup = $ionicPopup.confirm({
                title: 'Cancel Record',
                template: 'Are you sure you want to cancel this record without saving?'
            });

            confirmBackPopup.then(function (result) {
                if (result) {
                    navigateBackAndDeleteCurrentRecord();
*//*                    currentRecordDataService.wipeCurrentRecord($stateParams.typeId);
                    $ionicNavBarDelegate.back();*//*
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
        };

        $scope.openBarcodeScanner = function(field)
        {
            $cordovaBarcodeScanner.scan().then(function(imageData) {
                //success
                field.value = imageData.text;
            }, function(error) {
                //error
            });
        }

    });*/

})();

