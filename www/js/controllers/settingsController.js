(function(){
    'use strict';

    var app = angular.module("medicine");

    app.controller("settingsController", function($scope, pickListService, settingsRepository, $ionicPopup, $cordovaToast) {

        $scope.globalData.currentRecordDefinition = null;
        $scope.data = {};

        $scope.data.isBarcodeScannerEnabled = settingsRepository.getBarcodeScannerEnabled();
        $scope.data.userName = settingsRepository.getUserName();

        $scope.saveUserName = function()
        {
            settingsRepository.setUserName($scope.data.userName);
        };

        $scope.changeBarcodeScanner = function()
        {
            settingsRepository.setBarcodeScannerEnabled($scope.data.isBarcodeScannerEnabled);
        };

/*        $scope.simulateStop = function()
        {
            pickListService.persistPickLists();
        };*/

        $scope.clearStorage = function()
        {
            var popup = $ionicPopup.confirm({
                title: 'Warning! This will delete ALL data!',
                template: 'Are you sure you want to delete all records and settings?'
            });

            popup.then(function (result) {
                if (result) {
                    window.localStorage.clear();
                    $cordovaToast.show("Data Deleted","short", "bottom");
                }
            });

        };

    });

})();

