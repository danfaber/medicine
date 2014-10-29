(function(){
    'use strict';

    var app = angular.module("medicine");

    app.controller("settingsController", function($scope, settingsDataService, pickListService, settingsRepository) {
        $scope.data = {};

        $scope.data.isBarcodeScannerEnabled = settingsDataService.getBarcodeScannerEnabled();
        $scope.data.userName = settingsRepository.getUserName();

        $scope.saveUserName = function()
        {
            settingsRepository.setUserName($scope.data.userName);
        };

        $scope.changeBarcodeScanner = function()
        {
            settingsDataService.setBarcodeScannerEnabled($scope.data.isBarcodeScannerEnabled);
        };

        $scope.simulateStop = function()
        {
            pickListService.persistPickLists();
        };

        $scope.clearStorage = function()
        {
          window.localStorage.clear();
        };

    });

})();

